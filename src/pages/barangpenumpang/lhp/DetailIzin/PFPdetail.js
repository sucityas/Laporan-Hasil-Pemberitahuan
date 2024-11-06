import React, { Component, Fragment } from "react";
import { Input, Button, Icon, Table, Col, Row, Form, DatePicker, Tabs, Checkbox, Select, Tooltip, Modal } from 'antd';
import axios from "axios";
import moment from "moment";


const { TextArea } = Input;
const { Option } = Select;
const { Column } = Table;
const { TabPane } = Tabs;

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS, REACT_APP_FORM_TIGAD, REACT_APP_API_FORM_TIGAD_KEY  } = process.env;
var getSeqIzin = localStorage.getItem('seqIzin');

class PFP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visiblePacking: false,
            visibleInvoice: false,
            id: 1,
            dataKontainer: [],
        };

        this.onChange = this.onChange.bind(this);
        this.handleOkPacking = this.handleOkPacking.bind(this);
        this.handleOkInvoice = this.handleOkInvoice.bind(this);
        this.handleCancelPacking = this.handleCancelPacking.bind(this);
        this.handleCancelInvoice = this.handleCancelInvoice.bind(this);
    }

    componentDidMount() {
        getSeqIzin = localStorage.getItem('seqIzin');
        this.fetchLampiran();
        this.fetchKontainer();
    }

    fetchLampiran = () => {
        // axios.get(`http://10.102.104.164:8782/servicetigad/lampiran/listBySeqIzin?seqIzin=${getSeqIzin}`)
        axios.get(`${REACT_APP_FORM_TIGAD}/servicetigad/lampiran/listBySeqIzin?seqIzin=${getSeqIzin}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_FORM_TIGAD_KEY}`,
            }
        })
            .then(res => {
                // console.log('data lampiran:', res.data.data);
                var invoice = res.data.data.filter((data) => {
                    return data.jenisLampiran == '035'
                });
                var packing = res.data.data.filter((data) => {
                    return data.jenisLampiran == '036'
                });
                // console.log('invoice:', invoice[0]);
                invoice[0] != undefined ?
                    this.props.form.setFieldsValue({
                        nomorDokumenInvoice: invoice[0].nomorDokumen,
                        tanggalDokumenInvoice: moment(invoice[0].tanggalDokumen, 'YYYY-MM-DD HH:mm:ss')
                    }) : this.props.form.setFieldsValue({ undefined })
                invoice[0] != undefined ? this.setState({
                    urlInvoice: invoice[0].urlFile,
                    lampiranNameInvoice: invoice[0].urlFile.substring(40),
                }) : this.setState({ undefined });
                packing[0] != undefined ?
                    this.props.form.setFieldsValue({
                        nomorDokumenPacking: packing[0].nomorDokumen,
                        tanggalDokumenPacking: moment(packing[0].tanggalDokumen, 'YYYY-MM-DD HH:mm:ss')
                    }) : this.props.form.setFieldsValue({ undefined })
                packing[0] != undefined ? this.setState({
                    urlPacking: packing[0].urlFile,
                    lampiranNamePacking: packing[0].urlFile.substring(40),
                }) : this.setState({ undefined });
            });
    }

    fetchKontainer = () => {
        // axios.get(`http://10.102.104.164:8782/servicetigad/kontainer/listBySeqIzin?seqIzin=${getSeqIzin}`)
        axios.get(`${REACT_APP_FORM_TIGAD}/servicetigad/kontainer/listBySeqIzin?seqIzin=${getSeqIzin}`,{
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_FORM_TIGAD_KEY}`,
            }
        })
            .then(res => {
                this.setState({
                    dataKontainer: res.data.data,
                })
            })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const data = {};
            data.noKontainer = values.noPetiKemas;
            data.ukuranKontainer = values.ukuran;
            data.statusKontainer = values.status;
            if (values.id === undefined) {
                // console.log('masuk data rekam')
                data.id = this.state.id;
                this.setState({
                    id: this.state.id + 1,
                    dataKontainer: this.state.dataKontainer.concat(data)
                })
            }
            this.props.form.resetFields();
            this.props.handleDataRekam(data);


        })
    };

    handleDelete(record) {
        var index = this.state.dataKontainer.findIndex(x => x.id === record.id);
        // console.log('index', index)
        this.state.dataKontainer.splice(index, 1);
        this.setState({
            dataKontainer: this.state.dataKontainer
        })

        console.log(this.state.dataKontainer);
    }

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    async onChange(e) {
        switch (e.target.name) {
            case 'berkasLampiranPacking': {
                if (e.target.files[0].size < 512000) {
                    let name = e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    let that = this

                    this.setState({ lampiran: e.target.files[0] })
                    reader.onloadend = () => that.setState({
                        lampiranNamePacking: name
                    })
                    reader.readAsDataURL(file);
                } else {
                    alert('File Harus Pdf dan Ukuran File Harus Dibawah 512Kb')
                }
                break;
            }
            case 'berkasLampiranInvoice': {
                if (e.target.files[0].size < 512000) {
                    let name = e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    let that = this

                    this.setState({ lampiran: e.target.files[0] })
                    reader.onloadend = () => that.setState({
                        lampiranNameInvoice: name
                    })
                    reader.readAsDataURL(file);
                } else {
                    alert('File Harus Pdf dan Ukuran File Harus Dibawah 512Kb')
                }
                break;
            }
        }
    }

    async handleOkPacking() {
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
                    getLampiranNamePacking: body.item
                })

            })
        this.setState({
            visiblePacking: false,
            loading: true
        });
    }

    async handleOkInvoice() {
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
                    getLampiranNameInvoice: body.item
                })

            })
        this.setState({
            visibleInvoice: false,
            loading: true
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

    handleCancelPacking() {
        this.setState({
            visiblePacking: false,
            lampiranNamePacking: undefined,

        });
    }

    showModalUploadPacking = (e) => {
        this.setState({
            visiblePacking: true,
        });
    };
    handleCancelInvoice() {
        this.setState({
            visibleInvoice: false,
            lampiranNameInvoice: undefined,

        });
    }

    showModalUploaInvoice = (e) => {
        this.setState({
            visibleInvoice: true,
        });
    };

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
                                Dokumen Pelengkap
                                        </h3>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                {getFieldDecorator('urlPackingList', { initialValue: this.state.getLampiranNamePacking })(<Input hidden />)}
                                {getFieldDecorator('urlInvoice', { initialValue: this.state.getLampiranNameInvoice })(<Input hidden />)}
                                <Form.Item label="Jenis Dokumen" style={{ marginTop: -20 }}>
                                    <label>Packing List</label>
                                </Form.Item>
                                <Form.Item label="Nomor & Tanggal Dokumen" style={{ marginTop: -20 }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    >
                                        {getFieldDecorator('nomorDokumenPacking')(<Input placeholder="Nomor Dokumen" readOnly/>)}
                                    </Form.Item>
                                    <span
                                        style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                    >

                                    </span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('tanggalDokumenPacking')(<DatePicker open={false} allowClear={false}/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="File" style={{ marginTop: -20 }}>
                                    <Row gutter={8}>
                                        <Col span={10}>
                                            <Form.Item>
                                                <Input disabled value={this.state.lampiranNamePacking ? this.state.lampiranNamePacking : 'File Belum Dipilih!'} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Button type='primary' onClick={() => this.handleDownload(this.state.urlPacking)}>Download</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label="Jenis Dokumen" style={{ marginTop: -20 }}>
                                    <label>Invoice</label>
                                </Form.Item>
                                <Form.Item label="Nomor & Tanggal Dokumen" style={{ marginTop: -20 }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    >
                                        {getFieldDecorator('nomorDokumenInvoice')(<Input placeholder="Nomor Dokumen" readOnly/>)}
                                    </Form.Item>
                                    <span
                                        style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                    >

                                    </span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        {getFieldDecorator('tanggalDokumenInvoice')(<DatePicker open={false} allowClear={false}/>)}
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="File" style={{ marginTop: -20 }}>
                                    <Row gutter={8}>
                                        <Col span={10}>
                                            <Form.Item>
                                                <Input disabled value={this.state.lampiranNameInvoice ? this.state.lampiranNameInvoice : 'File Belum Dipilih!'} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Button type='primary' onClick={() => this.handleDownload(this.state.urlInvoice)}>Download</Button>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title kt-font-bolder">
                                Peti Kemas
                            </h3>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                {/* <Button type="primary" htmlType="submit" onClick={this.showModal}>
                                    Tambah Peti Kemas
                                </Button> */}
                                <Table
                                    // loading={this.state.loading}
                                    dataSource={this.state.dataKontainer}
                                    pagination={{ pageSize: 5 }}
                                >

                                    {/* <Column title="No." dataIndex="nomor" key="nomor" /> */}
                                    <Column title="Nomor" dataIndex="noKontainer" key="nomor" />
                                    <Column title="Ukuran" dataIndex="ukuranKontainer" key="ukuran" />
                                    <Column title="Status" dataIndex="statusKontainer" key="status" />
                                </Table>

                                <Modal
                                    visible={this.state.visiblePacking}
                                    title="Lampiran"
                                    onOk={this.handleOkPacking}
                                    width={'80%'}
                                    onCancel={this.handleCancelPacking}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancelPacking}>
                                            Batal
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={this.handleOkPacking}>
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
                                                    <Input value="Packing List" disabled />
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
                                                    <Button onClick={() => document.getElementById('berkasLampiranPacking').click()} type="primary" ><Icon type="upload" /> {this.state.lampiranNamePacking ? this.state.lampiranNamePacking : 'Upload file lampiran'}</Button>
                                                    <Input style={{ display: 'none' }} id='berkasLampiranPacking' type="file" name="berkasLampiranPacking"
                                                        onChange={this.onChange} />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </Tabs>
                                </Modal>
                                <Modal
                                    visible={this.state.visibleInvoice}
                                    title="Lampiran"
                                    onOk={this.handleOkInvoice}
                                    width={'80%'}
                                    onCancel={this.handleCancelInvoice}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancelInvoice}>
                                            Batal
                                        </Button>,
                                        <Button key="submit" type="primary" onClick={this.handleOkInvoice}>
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
                                                    <Input value="Invoice" disabled />
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
                                                    <Button onClick={() => document.getElementById('berkasLampiranInvoice').click()} type="primary" ><Icon type="upload" /> {this.state.lampiranNameInvoice ? this.state.lampiranNameInvoice : 'Upload file lampiran'}</Button>
                                                    <Input style={{ display: 'none' }} id='berkasLampiranInvoice' type="file" name="berkasLampiranInvoice"
                                                        onChange={this.onChange} />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </Tabs>
                                </Modal>

                            </div>
                        </div>
                    </div>

                </Form>
            </Fragment>
        );
    }
}
const WrappedPFP = Form.create()(PFP);
export default WrappedPFP;