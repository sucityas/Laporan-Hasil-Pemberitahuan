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

    // componentDidMount() {    
    //     // console.log('Did Mount : ', this.props.data)   
    //     let updateData = this.props.data;
    //     if (updateData === null) {
    //         updateData = {}
    //     }
    //     this.props.form.setFieldsValue({
    //         idHargaEkspor : updateData.idHargaEkspor !== undefined ? updateData.idHargaEkspor : undefined,
    //         posTarif : updateData.posTarif !== undefined ? updateData.posTarif : undefined,
    //         tanggalAwalBerlaku : updateData.tanggalAwalBerlaku !== undefined && updateData.tanggalAwalBerlaku !== null ? moment(updateData.tanggalAwalBerlaku) : undefined,
    //         tanggalAkhirBerlaku : updateData.tanggalAkhirBerlaku !== undefined && updateData.tanggalAkhirBerlaku !== null ? moment(updateData.tanggalAkhirBerlaku) : undefined,                            
    //         dasarHukum : updateData.dasarHukum !== undefined ? updateData.dasarHukum : undefined,
    //         hargaEkspor : updateData.hargaEkspor !== undefined ? updateData.hargaEkspor : undefined,
    //     })
    // }

    // componentDidUpdate(prevProps) {
    //     // console.log('Update : ', this.props.data)  
    //     if (this.props.data !== prevProps.data) {
    //         let updateData = this.props.data;
    //         if (updateData === null) {
    //             updateData = {}
    //         }
    //         this.props.form.setFieldsValue({
    //             idHargaEkspor : updateData.idHargaEkspor !== undefined ? updateData.idHargaEkspor : undefined,
    //             posTarif : updateData.posTarif !== undefined ? updateData.posTarif : undefined,
    //             tanggalAwalBerlaku : updateData.tanggalAwalBerlaku !== undefined && updateData.tanggalAwalBerlaku !== null ? moment(updateData.tanggalAwalBerlaku) : undefined,
    //             tanggalAkhirBerlaku : updateData.tanggalAkhirBerlaku !== undefined && updateData.tanggalAkhirBerlaku !== null ? moment(updateData.tanggalAkhirBerlaku) : undefined,                            
    //             dasarHukum : updateData.dasarHukum !== undefined ? updateData.dasarHukum : undefined,
    //             hargaEkspor : updateData.hargaEkspor !== undefined ? updateData.hargaEkspor : undefined,
    //         })
    //     } 
    // }



    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("Rekam Barang Update: ", this.props.data)
        // console.log("Prevprops: ", prevProps.data)
        // console.log("Props: ", this.props.data)
        // console.log("State: ", this.state)
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
            });
        }
        if (prevProps.data !== this.props.data) {
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataBarang: this.props.data,
                    readOnly: this.props.readOnly,
                }, () => {
                    if (this.state.dataBarang !== null) {
                        this.props.form.setFieldsValue({
                            idDetail: this.props.data.idDetail,
                            uraian: this.props.data.uraian,
                            spesifikasiLain: this.props.data.spesifikasiLain,
                            merk: this.props.data.merk,
                            tipe: this.props.data.tipe,
                            kodeBarang: this.props.data.kodeBarang,
                            ukuran: this.props.data.ukuran,
                            kodeKondisiBarang: this.props.data.kodeKondisiBarang,
                            bruto: this.props.data.bruto,
                            hargaSatuan: this.props.data.hargaSatuan,
                            kodeMataUang: this.props.data.kodeMataUang,
                            jumlahHarga: this.props.data.jumlahHarga,
                            jumlahKemasan: this.props.data.jumlahKemasan,
                            kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                            jumlahSatuan: this.props.data.jumlahSatuan,
                            kodeSatuanBarang: this.props.data.kodeSatuanBarang,
                            keterangan: this.props.data.keterangan,
                            kodeDokumenIzin: this.props.data.kodeDokumenIzin,
                            tanggalDokumenIzin: this.props.data.tanggalDokumenIzin == null ? null : moment(this.props.data.tanggalDokumenIzin),
                            nomorDokumenIzin: this.props.data.nomorDokumenIzin
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
                dataBarang: this.props.data,
                readOnly: this.props.readOnly,
            }, () => {
                if (this.state.dataBarang !== null) {
                    this.props.form.setFieldsValue({
                        idDetail: this.props.data.idDetail,
                        uraian: this.props.data.uraian,
                        spesifikasiLain: this.props.data.spesifikasiLain,
                        merk: this.props.data.merk,
                        tipe: this.props.data.tipe,
                        kodeBarang: this.props.data.kodeBarang,
                        ukuran: this.props.data.ukuran,
                        kodeKondisiBarang: this.props.data.kodeKondisiBarang,
                        bruto: this.props.data.bruto,
                        hargaSatuan: this.props.data.hargaSatuan,
                        kodeMataUang: this.props.data.kodeMataUang,
                        jumlahHarga: this.props.data.jumlahHarga,
                        jumlahKemasan: this.props.data.jumlahKemasan,
                        kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                        jumlahSatuan: this.props.data.jumlahSatuan,
                        kodeSatuanBarang: this.props.data.kodeSatuanBarang,
                        keterangan: this.props.data.keterangan,
                        kodeDokumenIzin: this.props.data.kodeDokumenIzin,
                        tanggalDokumenIzin: this.props.data.tanggalDokumenIzin == null ? null : moment(this.props.data.tanggalDokumenIzin),
                        nomorDokumenIzin: this.props.data.nomorDokumenIzin
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
        this.fetchReferensiKemasan()
        this.fetchReferensiValuta()
        this.fetchReferensiDokumenIzin()
        this.fetchReferensiSatuan()

        // this.getReferensi()
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
                                data.idDetail = values.idDetail === null || values.idDetail === undefined ? null : values.idDetail
                                data.uraian = values.uraian
                                data.spesifikasiLain = values.spesifikasiLain
                                data.merk = values.merk
                                data.tipe = values.tipe
                                data.kodeBarang = values.kodeBarang
                                data.ukuran = values.ukuran
                                data.kodeKondisiBarang = values.kodeKondisiBarang
                                data.bruto = values.bruto
                                data.hargaSatuan = values.hargaSatuan
                                data.kodeMataUang = values.kodeMataUang
                                data.jumlahHarga = values.jumlahHarga
                                data.jumlahKemasan = values.jumlahKemasan
                                data.kodeJenisKemasan = values.kodeJenisKemasan
                                data.jumlahSatuan = values.jumlahSatuan
                                data.kodeSatuanBarang = values.kodeSatuanBarang
                                data.keterangan = values.keterangan
                                data.kodeDokumenIzin = values.kodeDokumenIzin
                                data.tanggalDokumenIzin = values.tanggalDokumenIzin == null ? null : moment(values.tanggalDokumenIzin).format("YYYY-MM-DD")
                                data.nomorDokumenIzin = values.nomorDokumenIzin
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

    fetchPosTarif = value => {
        // console.log('fetching user', value);
        this.setState({ dataPosTarif: [], fetchingPosTarif: true });
        if (value.length >= 3) {
            axios.get(`https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/pos-tarif/kata/` + value.toUpperCase(), { headers: { 'beacukai-API-Key': REACT_APP_SECRET_KEY_REFERENSI } })
                .then(res => {
                    // console.log('pos tarif:', res.data.data);
                    const result = res.data.data.map(data => ({
                        text: `${data.kodeHs} - ${data.uraianIndonesia}`,
                        value: data.kodeHs,
                    }));
                    this.setState({ dataPosTarif: result, fetchingPosTarif: false });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    fetchReferensiSatuan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/satuanbarang/list`,
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
                    text: `${data.kodeSatuanBarang} - ${data.namaSatuanBarang}`,
                    value: data.kodeSatuanBarang,
                }));
                this.setState({ dataReferensiSatuan: result, fetchingReferensiSatuan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchJenisSatuan = value => {
        // console.log('fetching user', value);
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id";
        this.setState({ dataJenisSatuan: [], fetching: true });
        if (value.length >= 2) {
            axios.get(`https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/satuan-barang/kata/` + value.toUpperCase(), {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                }
            })
                .then(res => {
                    // console.log('jenis satuan:', res.data.data);
                    const result = res.data.data.map(data => ({
                        text: `${data.kodeSatuanBarang} - ${data.namaSatuanBarang}`,
                        value: data.kodeSatuanBarang,
                    }));
                    this.setState({ dataJenisSatuan: result, fetching: false });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    fetchReferensiKemasan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kemasan/list`,
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
                    text: `${data.kodeKemasan} - ${data.namaKemasan}`,
                    value: data.kodeKemasan,
                }));
                this.setState({ dataReferensiKemasan: result, fetchingReferensiKemasan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiDokumenIzin = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/dokumen/flag/list`,
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
                    text: `${data.kodeDokumen} - ${data.namaDokumen}`,
                    value: data.kodeDokumen,
                }));
                this.setState({ dataReferensiDokumenIzin: result, fetchingReferensiDokumenIzin: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiValuta = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/valuta/list`,
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
                    text: `${data.kodeValuta} - ${data.namaValuta}`,
                    value: data.kodeValuta,
                }));
                this.setState({ dataReferensiValuta: result, fetchingReferensiValuta: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    handleHargaSatuan = (value, e) => {
        const jumlahSatuan = this.props.form.getFieldValue('jumlahSatuan');

        if (!(jumlahSatuan === null || jumlahSatuan === undefined)) {
            this.props.form.setFieldsValue({
                jumlahHarga: jumlahSatuan * value,
            })
        }
    };

    handleJumlahSatuan = (value, e) => {
        const hargaSatuan = this.props.form.getFieldValue('hargaSatuan');

        if (!(hargaSatuan === null || hargaSatuan === undefined)) {
            this.props.form.setFieldsValue({
                jumlahHarga: hargaSatuan * value,
            })
        }
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
                    {getFieldDecorator('idDetail')(<Input hidden />)}
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Uraian">
                                {getFieldDecorator('uraian', { rules: [{ required: true, message: 'Uraian Tidak Boleh Kosong!' }], })(<TextArea placeholder="Uraian Barang" rows="4" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Spesifikasi">
                                {getFieldDecorator('spesifikasiLain')(<TextArea placeholder="Spesifikasi Lain" rows="4" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Merk" style={{ marginTop: -20 }}>
                                {getFieldDecorator('merk', { rules: [{ required: true, message: 'Merk Tidak Boleh Kosong!' }], })(<Input placeholder="Merk" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tipe" style={{ marginTop: -20 }}>
                                {getFieldDecorator('tipe', { rules: [{ required: true, message: 'Tipe Tidak Boleh Kosong!' }], })(<Input placeholder="Tipe" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Ukuran" style={{ marginTop: -20 }}>
                                {getFieldDecorator('ukuran')(<Input placeholder="Ukuran" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Kode Barang" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeBarang')(<Input placeholder="Kode Barang" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Jumlah Kemasan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('jumlahKemasan', { rules: [{ required: true, message: 'Jumlah Kemasan Tidak Boleh Kosong!' }], })(
                                    <InputNumber placeholder="Jumlah Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Jenis Kemasan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeJenisKemasan', { rules: [{ required: true, message: 'Jenis Kemasan Tidak Boleh Kosong!' }], })(
                                    // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                    <Select
                                        placeholder="Pilih Jenis Kemasan"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiKemasan ? <Spin size="small" /> : null}
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
                                        {this.state.dataReferensiKemasan !== undefined ? this.state.dataReferensiKemasan.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>

                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Jumlah Satuan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('jumlahSatuan', { rules: [{ required: true, message: 'Jumlah Satuan Tidak Boleh Kosong!' }], })(
                                    <InputNumber placeholder="Jumlah Satuan" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={this.handleJumlahSatuan}
                                    />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Jenis Satuan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeSatuanBarang', { rules: [{ required: true, message: 'Jenis Satuan Tidak Boleh Kosong!' }], })(
                                    // <Input placeholder="Jenis Satuan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                    // <Select
                                    //     placeholder="Cari Jenis Satuan"
                                    //     showArrow={false}
                                    //     readOnly={this.state.readOnly}
                                    //     notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
                                    //     showSearch
                                    //     optionFilterProp="children"
                                    //     // onChange={e => {
                                    //     //     this.setState({
                                    //     //         kodeSatuan: e
                                    //     //     });
                                    //     //     // console.log(e)
                                    //     // }}
                                    //     disabled={this.state.readOnly}
                                    //     value={this.state.kodeSatuan}
                                    //     onSearch={(value) => this.fetchJenisSatuan(value)}
                                    //     filterOption={(input, option) =>
                                    //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    //     }
                                    // >
                                    //     {this.state.dataJenisSatuan !== undefined ? this.state.dataJenisSatuan.map(d => (
                                    //         <Option key={d.value}>{d.text}</Option>
                                    //     )) : ""}
                                    // </Select>
                                    <Select
                                        placeholder="Pilih Jenis Satuan"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiSatuan ? <Spin size="small" /> : null}
                                        showSearch
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        // value={this.state.kodeSatuanBarang}
                                        // onChange={e => { this.setState({ kodeSatuanBarang: e }); }}
                                        // value={this.state.searchKodeJenisPungutan}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataReferensiSatuan !== undefined ? this.state.dataReferensiSatuan.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>

                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        {/* <Col span={12}>
                            <Form.Item label="Kondisi Barang" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeKondisiBarang')(<Input placeholder="Kondisi Barang" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col> */}
                        <Col span={12}>
                            <Form.Item label="Berat Bruto" style={{ marginTop: -20 }}>
                                {getFieldDecorator('bruto')(
                                    <InputNumber placeholder="Berat Bruto" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Valuta" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeMataUang', { rules: [{ required: true, message: 'Valuta Tidak Boleh Kosong!' }], })(
                                    // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                    <Select
                                        placeholder="Pilih Jenis Valuta"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiValuta ? <Spin size="small" /> : null}
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
                                        {this.state.dataReferensiValuta !== undefined ? this.state.dataReferensiValuta.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>

                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Valuta" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeMataUang')(
                                    // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                    <Select
                                        placeholder="Pilih Jenis Valuta"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiValuta ? <Spin size="small" /> : null}
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
                                        {this.state.dataReferensiValuta !== undefined ? this.state.dataReferensiValuta.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>

                                )}
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Harga Satuan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('hargaSatuan', { rules: [{ required: true, message: 'Harga Satuan Tidak Boleh Kosong!' }], })(
                                    <InputNumber placeholder="Harga Satuan" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={this.handleHargaSatuan}
                                    />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Jumlah Harga" style={{ marginTop: -20 }}>
                                {getFieldDecorator('jumlahHarga', { rules: [{ required: true, message: 'Jumlah Harga Tidak Boleh Kosong!' }], })(
                                    // <InputNumber placeholder="Total Harga" style={{ width: "100%" }} readOnly
                                    //     formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    //     parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    // />
                                    <InputNumber
                                        pattern="[0-9]+[.0-9]*"
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                        // value={!(this.state.jumlahSatuan === null || this.state.jumlahSatuan === undefined) && !(this.state.hargaSatuan === null || this.state.hargaSatuan === undefined) ?
                                        //     (this.state.jumlahSatuan * this.state.hargaSatuan) : this.state.jumlahHarga}
                                        formatter={(value) =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                        style={{ width: '100%' }}
                                        placeholder={"0.000"}
                                        readOnly
                                    // onChange={e => {
                                    //     if (typeof e !== "number") {
                                    //         this.setState({ visibleJumlah: true });
                                    //     } else {
                                    //         this.setState({ jumlahHarga: e });
                                    //     }
                                    // }
                                    // }
                                    />

                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label="Keterangan" style={{ marginTop: -20 }}>
                                {getFieldDecorator('keterangan')(<TextArea placeholder="Keterangan" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="kt-portlet__head" style={{ marginTop: -70 }}>
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Dokumen Perizinan
                            </h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <br />
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item label="Jenis Dokumen Izin" style={{ marginTop: -20 }}>
                                            {getFieldDecorator('kodeDokumenIzin')(
                                                // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                                <Select
                                                    placeholder="Pilih Jenis Dokumen"
                                                    showArrow={true}
                                                    notFoundContent={this.state.fetchingReferensiDokumenIzin ? <Spin size="small" /> : null}
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
                                                    {this.state.dataReferensiDokumenIzin !== undefined ? this.state.dataReferensiDokumenIzin.map(d => (
                                                        <Option key={d.value}>{d.text}</Option>
                                                    )) : ""}
                                                </Select>

                                            )}
                                            {/* {getFieldDecorator('kodeDokumenIzin')(<Input placeholder="Jenis Dokumen Izin" style={{ width: "100%" }} readOnly={this.state.readOnly} />)} */}

                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Tanggal Dokumen Izin" style={{ marginTop: -20 }}>
                                            {getFieldDecorator('tanggalDokumenIzin')(<DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} allowClear={!this.state.readOnly} disabled={this.state.readOnly} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Nomor Dokumen Izin" style={{ marginTop: -20 }}>
                                            {getFieldDecorator('nomorDokumenIzin')(<Input placeholder="Nomor Dokumen Izin" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </div>

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