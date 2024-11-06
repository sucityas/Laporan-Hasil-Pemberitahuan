import React, { Component, Fragment } from "react";
import { Input, Button, Icon, Table, Col, Row, Form, DatePicker, Tabs, Modal, Select, Spin } from 'antd';
// import Select from 'react-select'
import axios from "axios";
import moment from "moment";

const { REACT_APP_SECRET_KEY_REFERENSI, REACT_APP_REFERENSI, REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS, REACT_APP_FORM_TIGAD, REACT_APP_API_FORM_TIGAD_KEY } = process.env;
var getSeqIzin = localStorage.getItem('seqIzin');
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

class PemuatanBentukCurah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPelabuhan: [],
            dataPelabuhanLn: [],
            fetching: false,
            visible: false,
            urlShipping: '',
            lampiranName: '',
        };

        this.onChange = this.onChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        getSeqIzin = localStorage.getItem('seqIzin');
        this.fetchLampiran();
        this.fetchDpHeader();
    }

    fetchLampiran = () => {
        // axios.get(`http://10.102.104.164:8782/servicetigad/lampiran/listBySeqIzin?seqIzin=${getSeqIzin}`)
        axios.get(`${REACT_APP_FORM_TIGAD}/servicetigad/lampiran/listBySeqIzin?seqIzin=${getSeqIzin}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_FORM_TIGAD_KEY}`,
            }
        })
            .then(res => {
                var shipping = res.data.data.filter((data) => {
                    return data.jenisLampiran == '071'
                });
                shipping[0] != undefined ? this.setState({
                    urlShipping: shipping[0].urlFile,
                    lampiranName: shipping[0].urlFile.substring(40),
                }) : this.setState({ undefined });
                shipping[0] != undefined ?
                    this.props.form.setFieldsValue({
                        nomorDokumenShipping: shipping[0].nomorDokumen,
                        tanggalDokumenShipping: moment(shipping[0].tanggalDokumen, 'YYYY-MM-DD HH:mm:ss')
                    }) : this.props.form.setFieldsValue({ undefined })
            });
    }

    fetchDpHeader = () => {
        // axios.get(`http://10.102.104.164:8782/servicetigad/header/selectListBySeqIzin?seqIzin=${getSeqIzin}`)
        axios.get(`${REACT_APP_FORM_TIGAD}/servicetigad/header/selectListBySeqIzin?seqIzin=${getSeqIzin}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_FORM_TIGAD_KEY}`,
            }
        })
            .then(res => {
                if (res.data.data !== undefined) {
                    this.fetchPelabuhan(res.data.data[0].pelMuatAsal!=null?res.data.data[0].pelMuatAsal:'');
                    this.props.form.setFieldsValue({
                        pelabuhanMuatAsal: res.data.data[0].pelMuatAsal
                    })
                    this.fetchPelabuhan(res.data.data[0].pelMuatEkspor!= null?res.data.data[0].pelMuatEkspor:'');
                    this.props.form.setFieldsValue({
                        pelabuhanMuatEkspor: res.data.data[0].pelMuatEkspor
                    })
                    this.fetchPelabuhanLn(res.data.data[0].pelBongkar!= null?res.data.data[0].pelBongkar:'');
                    this.props.form.setFieldsValue({
                        pelabuhanBongkarLN: res.data.data[0].pelBongkar
                    })
                }

            })
    }

    fetchPelabuhan = (value) => {
        // console.log("value : ", value)
        this.setState({
            dataPelabuhan: [],
            fetching: true
        });

        if (value.length > 2) {
            axios.get(`${REACT_APP_REFERENSI}/v1/pelabuhan/getByparams/` + value.toUpperCase(), { headers: { 'beacukai-API-Key': REACT_APP_SECRET_KEY_REFERENSI } })
                .then(res => {
                    // console.log(res.data.data);
                    const result = res.data.data.map(data => ({
                        text: `${data.kodePelabuhan} - ${data.namaPelabuhan}`,
                        value: data.kodePelabuhan,
                    }));
                    this.setState({
                        dataPelabuhan: result,
                        fetching: false
                    });
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    };

    fetchPelabuhanLn = (value) => {
        this.setState({
            dataPelabuhanLn: [],
            fetching: true
        });

        if (value.length > 2) {
            axios.get(`${REACT_APP_REFERENSI}/v1/pelabuhan/getByparamsExclude/` + value.toUpperCase(), { headers: { 'beacukai-API-Key': REACT_APP_SECRET_KEY_REFERENSI } })
                .then(res => {
                    const result = res.data.data.map(data => ({
                        text: `${data.kodePelabuhan} - ${data.namaPelabuhan}`,
                        value: data.kodePelabuhan,
                    }));
                    this.setState({
                        dataPelabuhanLn: result,
                        fetching: false
                    });
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    };

    showModalUpload = (e) => {
        this.setState({
            visible: true,
        });
    };

    async handleOk() {
        var LampiranData = new FormData();
        LampiranData.append("file", this.state.lampiran);
        LampiranData.append("path", "pp");

        await fetch(`${REACT_APP_HDFS}/v1/hdfs/upload`, {
            method: 'POST',
            headers: new Headers({
                'Beacukai-Api-Key': `${REACT_APP_SECRET_KEY_HDFS}`,
            }),
            body: LampiranData
        })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    getLampiranNameShipping: body.item
                })

            })
        this.setState({
            visible: false,
            loading: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
            lampiranName: undefined,
        });
    }

    async handleDownload(e) {
        // console.log('e :', e)
        axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${e}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'accept': 'application/json',
                'beacukai-API-Key': `${REACT_APP_SECRET_KEY_HDFS}`,
                "cache-control": "no-cache"
            },
            responseType: 'blob'
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                // console.log('', response)
                let dataType = e.split('.').pop();
                const validasiFile = dataType.toLowerCase() === 'jpg' ? 'image/jpg' : dataType.toLowerCase() === 'png' ? 'image/jpg' : 'application/pdf';
                const file = new Blob(
                    [response.data],
                    { type: validasiFile });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    }

    async onChange(e) {
        switch (e.target.name) {
            case 'berkasLampiran': {
                if (e.target.files[0].size < 512000) {
                    let name = e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    let that = this

                    this.setState({ lampiran: e.target.files[0] })
                    // console.log(this.state.lampiran)
                    reader.onloadend = () => that.setState({
                        lampiranName: name
                    })
                    reader.readAsDataURL(file);
                } else {
                    alert('File Harus Pdf dan Ukuran File Harus Dibawah 512Kb')
                }
                break;
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 12 },
        };


        return (
            <Fragment>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>



                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title kt-font-bolder">
                                Pelabuhan
                            </h3>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Form.Item label="Pelabuhan Muat Asal" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('pelabuhanMuatAsal')(
                                        <Select
                                            open={false}
                                            style={{ width: '70%' }}
                                            showArrow={false}
                                            notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                            placeholder="Cari Pelabuhan"
                                            // showSearch
                                            optionFilterProp="children"
                                            onSearch={(value) => this.fetchPelabuhan(value)}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>
                                            {this.state.dataPelabuhan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            ))}
                                        </Select>)}
                                </Form.Item>
                                <Form.Item label="Pelabuhan Muat Ekspor" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('pelabuhanMuatEkspor')
                                        (<Select
                                            open={false}
                                            style={{ width: '70%' }}
                                            placeholder="Cari Pelabuhan"
                                            showArrow={false}
                                            notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                            // showSearch
                                            optionFilterProp="children"
                                            onSearch={(value) => this.fetchPelabuhan(value)}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.state.dataPelabuhan !== undefined ? this.state.dataPelabuhan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>)}
                                </Form.Item>
                                <Form.Item label="Pelabuhan Bongkar LN" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('pelabuhanBongkarLN')
                                        (<Select
                                            open={false}
                                            style={{ width: '70%' }}
                                            placeholder="Cari Pelabuhan"
                                            showArrow={false}
                                            notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                            // showSearch
                                            optionFilterProp="children"
                                            onSearch={(value) => this.fetchPelabuhanLn(value)}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.state.dataPelabuhanLn !== undefined ? this.state.dataPelabuhanLn.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title kt-font-bolder">
                                Dokumen Pelengkap
                            </h3>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                {getFieldDecorator('urlShipping', { initialValue: this.state.getLampiranNameShipping })(<Input hidden />)}
                                <Form.Item label="Jenis Dokumen" style={{ marginTop: -20 }}>
                                    <label>Shipping Order/Instruction</label>
                                </Form.Item>
                                <Form.Item label="Nomor / Tanggal Dokumen" style={{ marginTop: -20 }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    >
                                        {getFieldDecorator('nomorDokumenShipping')(<Input placeholder="Nomor Dokumen" readOnly />)}
                                    </Form.Item>
                                    <span
                                        style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                    >

                                    </span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('tanggalDokumenShipping')(<DatePicker open={false} allowClear={false} />)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="File" style={{ marginTop: -20 }}>
                                    <Row gutter={8}>
                                        <Col span={10}>
                                            <Form.Item>
                                                <Input disabled value={this.state.lampiranName ? this.state.lampiranName : 'File Belum Dipilih!'} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Button type='primary' onClick={() => this.handleDownload(this.state.urlShipping)}>Download</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </div>
                        </div>
                    </div>



                </Form>
                <Modal
                    visible={this.state.visible}
                    title="Lampiran"
                    onOk={this.handleOk}
                    width={'80%'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Batal
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Tambah
                        </Button>,
                    ]}
                >
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Upload" key="1">
                            <Row>
                                <Col span={6}>
                                    <label htmlFor="">Jenis Lampiran</label>
                                </Col>
                                <Col span={7}>
                                    <Input value="Shipping Order/Instruction" disabled />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '10px' }}>
                                <Col span={6}>
                                    <label htmlFor="">Keterangan</label>
                                </Col>
                                <Col span={6}>
                                    <TextArea style={{ width: 300 }} value={this.state.keterangan} onChange={e => this.setState({ keterangan: e.target.value })} placeholder="Masukkan Text" />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{ marginTop: '10px' }}>
                                <Col span={6}>
                                    <label htmlFor=""></label>
                                </Col>
                                <Col span={6}>
                                    <Button onClick={() => document.getElementById('berkasLampiran').click()} type="primary" ><Icon type="upload" /> {this.state.lampiranName ? this.state.lampiranName : 'Upload file lampiran'}</Button>
                                    <Input style={{ display: 'none' }} id='berkasLampiran' type="file" name="berkasLampiran"
                                        onChange={this.onChange} />
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Modal>
            </Fragment>
        );
    }
}
const WrappedPemuatanBentukCurah = Form.create()(PemuatanBentukCurah);
export default WrappedPemuatanBentukCurah;