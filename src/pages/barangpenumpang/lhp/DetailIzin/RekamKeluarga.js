import React, { Component } from "react";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    DatePicker,
    Row,
    Col,
    Table,
    Spin,

} from 'antd';
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { getUser } from "../../../../utils/DataUser";
const { Option } = Select;
const { Column } = Table;
const { TextArea } = Input;

const { REACT_APP_SECRET_KEY_REFERENSI, REACT_APP_REFERENSI, REACT_APP_UJILAB, REACT_APP_SECRET_KEY_UJILAB, REACT_APP_API_BARANG_PENUMPANG, REACT_APP_API_BARANG_PENUMPANG_KEY } = process.env;

class RekamBarangForm extends Component {
    state = {
        lokasiUsaha: [],
        dataPerusahaan: [],
        dataSatuPerusahaan: [],
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            readOnly: true,
            clear: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
            });
        }
        if (prevProps.data !== this.props.data) {
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataKeluarga: this.props.data,
                    readOnly: this.props.readOnly,
                }, () => {
                    if (this.state.dataBarang !== null) {
                        this.props.form.setFieldsValue({
                            idEntitas: this.props.data.idEntitas,
                            nama: this.props.data.nama,
                            paspor: this.props.data.paspor,
                            kodeNegara: this.props.data.kodeNegara,
                            status: this.props.data.status
                        })
                    } else {
                        this.props.form.resetFields();
                    }
                })
            }
        }

        else if (this.props.data === null && this.state.readOnly === false && prevProps.readOnly !== this.state.readOnly) {
            // console.log("Masuk ELSE 1")
            this.setState({
                readOnly: false,
            })
            this.props.form.resetFields();
        }
        else if (this.props.data === null && this.state.readOnly === false && this.props.clear) {
            this.props.form.resetFields();
            this.props.handleClear();
            // console.log("Masuk ELSE 2")
        }

    }

    componentDidMount() {
        // console.log("Rekam Barang Mount: ", this.props.data)
        if (!(this.props.data === null || this.props.data === undefined)) {
            this.setState({
                dataKeluarga: this.props.data,
                readOnly: this.props.readOnly,
            }, () => {
                if (this.state.dataBarang !== null) {
                    this.props.form.setFieldsValue({
                        idEntitas: this.props.data.idEntitas,
                        nama: this.props.data.nama,
                        paspor: this.props.data.paspor,
                        kodeNegara: this.props.data.kodeNegara,
                        status: this.props.data.status
                    })
                } else {
                    this.props.form.resetFields();
                }
            })
        } else if (this.props.readOnly === false) {
            this.setState({
                readOnly: this.props.readOnly,
            });
            this.props.form.resetFields();
        }
        this.fetchReferensiNegara()
        this.fetchReferensiStatus()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.readOnly) {
            this.props.form.resetFields();
        } else {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    Swal.fire({
                        title: "Apakah Anda Yakin Ingin Menambahkan Data Ini ?",
                        // text: "Pastikan Data Anda Sudah Benar!",
                        icon: "warning",
                        showCancelButton: true,
                        cancelButtonText: "Tidak!",
                        confirmButtonText: "Ya!",
                        reverseButtons: true,
                    })
                        .then((result) => {
                            if (result.value) {
                                const data = this.props.data === null || this.props.data === undefined ? {} : this.props.data
                                data.idEntitas = values.idEntitas === null || values.idEntitas === undefined ? null : values.idEntitas
                                data.nama = values.nama
                                data.paspor = values.paspor
                                data.kodeNegara = values.kodeNegara
                                data.status = values.status
                                data.nipRekam = data.nipRekam === null || data.nipRekam === undefined ? getUser().nip : data.nipRekam
                                data.waktuRekam = data.waktuRekam === null || data.waktuRekam === undefined ? moment().format("YYYY-MM-DD HH:mm:ss") : data.waktuRekam
                                data.nipUpdate = getUser().nip
                                data.waktuUpdate = moment().format("YYYY-MM-DD HH:mm:ss")
                                this.props.handleDataRekam(data);
                                this.props.form.resetFields();
                            }
                        });
                }
            });
        }

    };

    fetchReferensiStatus = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/keluarga/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                // console.log('kode jenis pungutan:', res.data.data);
                const result = res.data.map(data => ({
                    text: `${data.kodeKeluarga} - ${data.uraian}`,
                    value: data.kodeKeluarga,
                }));
                this.setState({ dataReferensiKeluarga: result, fetchingReferensiKeluarga: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiNegara = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/negara/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                // console.log('kode jenis pungutan:', res.data.data);
                const result = res.data.map(data => ({
                    text: `${data.kodeNegara} - ${data.namaNegara}`,
                    value: data.kodeNegara,
                }));
                this.setState({ dataReferensiNegara: result, fetchingReferensiNegara: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 22 },
            wrapperCol: { span: 22 },
        };
        return (

            <div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
                    {/* {getFieldDecorator('id', { initialValue: undefined })(<Input hidden />)} */}
                    {getFieldDecorator('idEntitas')(<Input hidden />)}
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Nama">
                                {getFieldDecorator('nama', { rules: [{ required: true, message: 'Nama Tidak Boleh Kosong!' }], })(<Input placeholder="Nama" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Nomor Paspor">
                                {getFieldDecorator('paspor')(<Input placeholder="Nomor Paspor" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Kebangsaan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeNegara', { rules: [{ required: true, message: 'Kebangsaan Tidak Boleh Kosong!' }], })(
                                    <Select
                                        placeholder="Pilih Kebangsaan"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiNegara ? <Spin size="small" /> : null}
                                        showSearch
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {(this.state.dataReferensiNegara !== undefined && this.state.dataReferensiNegara.length !== 0) ? this.state.dataReferensiNegara.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Hubungan Keluarga" style={{ marginTop: -20 }}>
                                {getFieldDecorator('status', { rules: [{ required: true, message: 'Hubungan Keluarga Tidak Boleh Kosong!' }], })(
                                    <Select
                                        placeholder="Pilih"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiKeluarga ? <Spin size="small" /> : null}
                                        showSearch
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {(this.state.dataReferensiKeluarga !== undefined && this.state.dataReferensiKeluarga.length !== 0) ? this.state.dataReferensiKeluarga.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    {this.state.readOnly ? null :
                        <Row style={{ marginTop: -20 }}>
                            <Col span={10}></Col>
                            <Col span={12}>
                                <Button type="primary" htmlType="submit">
                                    Simpan
                                </Button>
                            </Col>
                        </Row>
                    }
                    <br />
                    <br />
                    <br />
                </Form>

            </div >
        );
    }

}

const WrappedRekamBarangForm = Form.create()(RekamBarangForm);
export default WrappedRekamBarangForm;