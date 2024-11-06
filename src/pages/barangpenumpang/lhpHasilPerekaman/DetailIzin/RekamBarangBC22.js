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
import { Fragment } from "react";
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
            clear: false,
            refBarang: [],
            dataReferensiKategori: [],
            showFormBiasa: false,
            showKategoriKarantina: false,
            kategori1: true
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("Rekam Barang Update: ", this.props.data)
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
                dataReferensiKategori: this.props.refBarang
            });
        }
        if (prevProps.data !== this.props.data) {
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataBarang: this.props.data,
                    readOnly: this.props.readOnly,
                    dataReferensiKategori: this.props.refBarang
                }, () => {
                    if (this.state.dataBarang !== null) {
                        this.handleKategori(this.props.data.kodeKategoriBarang)

                        // , () => {
                        this.props.form.setFieldsValue({
                            idDetail: this.props.data.idDetail,
                            kodeKategoriBarang: this.props.data.kodeKategoriBarang,
                            kategoriKarantina: this.props.data.kategoriKarantina,
                            uraian: this.props.data.uraian,
                            merk: this.props.data.merk,
                            tipe: this.props.data.tipe,
                            ram: this.props.data.ram,
                            kapasitas: this.props.data.kapasitas,
                            imei1: this.props.data.imei1,
                            imei2: this.props.data.imei2,
                            warna: this.props.data.warna,
                            idEntitas: this.props.data.idEntitas,
                            // merk: this.props.data.merk,
                            // tipe: this.props.data.tipe,
                            // kodeBarang: this.props.data.kodeBarang,
                            // ukuran: this.props.data.ukuran,
                            // kodeKondisiBarang: this.props.data.kodeKondisiBarang,
                            // bruto: this.props.data.bruto,
                            hargaSatuan: this.props.data.hargaSatuan,
                            kodeMataUang: this.props.data.kodeMataUang,
                            jumlahHarga: this.props.data.jumlahHarga,
                            // jumlahKemasan: this.props.data.jumlahKemasan,
                            // kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                            jumlahSatuan: this.props.data.jumlahSatuan,
                            kodeSatuanBarang: this.props.data.kodeSatuanBarang,
                            keterangan: this.props.data.keterangan,
                            flagTidakBersamaan: this.props.data.flagTidakBersamaan,
                            kodeDokumenIzin: this.props.data.kodeDokumenIzin,
                            tanggalDokumenIzin: this.props.data.tanggalDokumenIzin == null ? null : moment(this.props.data.tanggalDokumenIzin),
                            nomorDokumenIzin: this.props.data.nomorDokumenIzin
                        })
                        // }
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
                dataReferensiKategori: this.props.refBarang
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
                dataReferensiKategori: this.props.refBarang
            }, () => {
                if (this.state.dataBarang !== null) {
                    this.handleKategori(this.props.data.kodeKategoriBarang)
                    // , () => {
                    this.props.form.setFieldsValue({
                        idDetail: this.props.data.idDetail,
                        kodeKategoriBarang: this.props.data.kodeKategoriBarang,
                        kategoriKarantina: this.props.data.kategoriKarantina,
                        uraian: this.props.data.uraian,
                        merk: this.props.data.merk,
                        tipe: this.props.data.tipe,
                        ram: this.props.data.ram,
                        kapasitas: this.props.data.kapasitas,
                        imei1: this.props.data.imei1,
                        imei2: this.props.data.imei2,
                        warna: this.props.data.warna,
                        idEntitas: this.props.data.idEntitas,
                        // merk: this.props.data.merk,
                        // tipe: this.props.data.tipe,
                        // kodeBarang: this.props.data.kodeBarang,
                        // ukuran: this.props.data.ukuran,
                        // kodeKondisiBarang: this.props.data.kodeKondisiBarang,
                        // bruto: this.props.data.bruto,
                        hargaSatuan: this.props.data.hargaSatuan,
                        kodeMataUang: this.props.data.kodeMataUang,
                        jumlahHarga: this.props.data.jumlahHarga,
                        // jumlahKemasan: this.props.data.jumlahKemasan,
                        // kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                        jumlahSatuan: this.props.data.jumlahSatuan,
                        kodeSatuanBarang: this.props.data.kodeSatuanBarang,
                        keterangan: this.props.data.keterangan,
                        flagTidakBersamaan: this.props.data.flagTidakBersamaan,
                        kodeDokumenIzin: this.props.data.kodeDokumenIzin,
                        tanggalDokumenIzin: this.props.data.tanggalDokumenIzin == null ? null : moment(this.props.data.tanggalDokumenIzin),
                        nomorDokumenIzin: this.props.data.nomorDokumenIzin
                    })
                    // }
                } else {
                    this.props.form.resetFields();
                }
            })
        } else if (this.props.readOnly === false) {
            this.setState({
                readOnly: this.props.readOnly,
                dataReferensiKategori: this.props.refBarang
            });
            this.props.form.resetFields();
        }
        this.fetchReferensiKemasan()
        this.fetchReferensiValuta()
        this.fetchReferensiDokumenIzin()
        this.fetchReferensiSatuan()

        this.fetchReferensiPemilik()
        // this.getReferensi()
    }

    fetchReferensiPemilik = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        let idHeader = localStorage.getItem("idHeader");
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/entitas/keluarga/${idHeader}`,
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
                    text: `${data.nama}`,
                    value: data.idEntitas,
                }));
                if (this.props.data !== null) {
                    const add = {
                        text: this.props.data.nama,
                        value: null
                    }
                    result.push(add)
                }
                this.setState({ dataReferensiPemilik: result, fetchingReferensiPemilik: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

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
                                data.kodeKategoriBarang = values.kodeKategoriBarang
                                data.kategoriKarantina = values.kategoriKarantina
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
                                data.flagTidakBersamaan = values.flagTidakBersamaan
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

    handleKategori = (value, e) => {
        const kategori = value;
        if (!this.state.readOnly) {
            if (!(kategori === null || kategori === undefined)) {
                this.setState({ showFormBiasa: true, kategori1: true });
                if (kategori === '1') {
                    this.setState({ showKategoriKarantina: true, kategori1: true, kategoriUang: false });
                    this.props.form.setFieldsValue({
                        kodeMataUang: null,
                        hargaSatuan: null,
                        jumlahHarga: null
                    })
                } else if (kategori === '3' || kategori === '4') {
                    this.setState({ kategoriUang: true });
                } else {
                    this.setState({ showKategoriKarantina: false, kategori1: false, kategoriUang: false });
                    this.props.form.setFieldsValue({
                        kategoriKarantina: null,
                    })
                }
                // if (kategori === '1' || kategori === '2' || kategori === '5' || kategori === '6' || kategori === '7') {
                //     this.setState({ showFormBiasa: true });
                // }
            } else {
                this.setState({ showFormBiasa: true });
                if (kategori === '1') {
                    this.setState({ showKategoriKarantina: true, kategori1: true, kategoriUang: false });
                }
            }
        } else if (kategori === '3' || kategori === '4') {
            this.setState({ showFormBiasa: true, showKategoriKarantina: false, kategori1: false, kategoriUang: true, kategoriBC34: false, kategoriHkt: false });
        } else if (kategori === '8') {
            this.setState({ showFormBiasa: true, showKategoriKarantina: false, kategori1: false, kategoriUang: false, kategoriBC34: true, kategoriHkt: false });
        } else if (kategori === '9') {
            this.setState({ showFormBiasa: false, showKategoriKarantina: false, kategori1: false, kategoriUang: false, kategoriBC34: false, kategoriHkt: true });
        } else {
            this.setState({ showFormBiasa: true, showKategoriKarantina: kategori === '1' ? true : false, kategori1: kategori === '1' ? true : false, kategoriUang: false, kategoriBC34: false, kategoriHkt: false });
        }
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 22 },
            wrapperCol: { span: 22 },
        };
        return (

            <div className="kt-portlet__body">
                <div className="kt-section kt-section--first">
                    <div className="kt-section__body">
                        <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
                            {/* {getFieldDecorator('id', { initialValue: undefined })(<Input hidden />)} */}
                            {getFieldDecorator('idDetail')(<Input hidden />)}
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label="Kategori" style={{ marginTop: -20 }}>
                                        {getFieldDecorator('kodeKategoriBarang', { rules: [{ required: true, message: 'Kategori Tidak Boleh Kosong!' }], })(
                                            // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                            <Select
                                                placeholder="Pilih Kategori"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiKategori ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%", marginTop: -40 }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}
                                                onChange={this.handleKategori}
                                                // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                                // value={this.state.searchKodeJenisPungutan}
                                                // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {this.state.dataReferensiKategori !== undefined ? this.state.dataReferensiKategori.map(d => (
                                                    <Option key={d.value}>{d.text}</Option>
                                                )) : ""}
                                            </Select>

                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label="Kategori Karantina" style={{ marginTop: -20 }} hidden={!this.state.showKategoriKarantina}>
                                        {getFieldDecorator('kategoriKarantina', { rules: [{ required: this.state.kategori1, message: 'Kategori Karantina Tidak Boleh Kosong!' }], })(
                                            // <Input placeholder="Jenis Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly} />
                                            // <Select
                                            //     placeholder="Pilih Kategori"
                                            //     showArrow={true}
                                            //     notFoundContent={this.state.fetchingReferensiKategori ? <Spin size="small" /> : null}
                                            //     showSearch
                                            //     style={{ width: "100%", marginTop: -10 }}
                                            //     optionFilterProp="children"
                                            //     readOnly={this.state.readOnly}
                                            //     disabled={this.state.readOnly}
                                            //     // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                            //     // value={this.state.searchKodeJenisPungutan}
                                            //     // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                            //     filterOption={(input, option) =>
                                            //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            //     }
                                            // >
                                            //     {this.state.dataReferensiKategori !== undefined ? this.state.dataReferensiKategori.map(d => (
                                            //         <Option key={d.value}>{d.text}</Option>
                                            //     )) : ""}
                                            // </Select>
                                            <Select
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}
                                                placeholder="Pilih Kategori"
                                                style={{ width: "100%", marginTop: -10 }}
                                                allowClear
                                            >
                                                <Option value="HEWAN">HEWAN</Option>
                                                <Option value="TUMBUHAN">TUMBUHAN</Option>
                                                <Option value="IKAN">IKAN</Option>
                                                {/* <Option value="ASP">Awak Sarana Pengangkut</Option> */}
                                            </Select>

                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label="Uraian" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa}>
                                        {getFieldDecorator('uraian', { rules: [{ required: true, message: 'Uraian Tidak Boleh Kosong!' }], })(<TextArea placeholder="Uraian Barang" rows="4" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                                {/* <Col span={12}>
                            <Form.Item label="Spesifikasi" hidden={!this.state.showFormBiasa}>
                                {getFieldDecorator('spesifikasiLain')(<TextArea placeholder="Spesifikasi Lain" rows="4" style={{ width: "100%" }} readOnly={this.state.readOnly} />)}
                            </Form.Item>
                        </Col> */}
                            </Row>
                            {/* <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Merk" style={{ marginTop: -20 }}>
                                {getFieldDecorator('merk', { rules: [{ required: true, message: 'Merk Tidak Boleh Kosong!' }], })(<Input placeholder="Merk" style={{ width: "100%" }} readOnly={this.state.readOnly}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Tipe" style={{ marginTop: -20 }}>
                                {getFieldDecorator('tipe', { rules: [{ required: true, message: 'Tipe Tidak Boleh Kosong!' }], })(<Input placeholder="Tipe" style={{ width: "100%" }} readOnly={this.state.readOnly}/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Ukuran" style={{ marginTop: -20 }}>
                                {getFieldDecorator('ukuran')(<Input placeholder="Ukuran" style={{ width: "100%" }} readOnly={this.state.readOnly}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Kode Barang" style={{ marginTop: -20 }}>
                                {getFieldDecorator('kodeBarang')(<Input placeholder="Kode Barang" style={{ width: "100%" }} readOnly={this.state.readOnly}/>)}
                            </Form.Item>
                        </Col>
                    </Row> */}
                            {/* <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Jumlah Kemasan" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa}>
                                        {getFieldDecorator('jumlahKemasan', { rules: [{ required: true, message: 'Jumlah Kemasan Tidak Boleh Kosong!' }], })(
                                            <InputNumber placeholder="Jumlah Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Jenis Kemasan" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa}>
                                        {getFieldDecorator('kodeJenisKemasan', { rules: [{ required: true, message: 'Jenis Kemasan Tidak Boleh Kosong!' }], })(
                                            <Select
                                                placeholder="Pilih Jenis Kemasan"
                                                showArrow={true}
                                                // notFoundContent={this.state.fetchingReferensiKemasan ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%" }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}

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
                            </Row> */}
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Jumlah Satuan" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa || this.state.kategoriUang}>
                                        {getFieldDecorator('jumlahSatuan', { rules: [{ required: true, message: 'Jumlah Satuan Tidak Boleh Kosong!' }], })(
                                            <InputNumber placeholder="Jumlah Satuan" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                onChange={this.handleJumlahSatuan}
                                            />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Jenis Satuan" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa || this.state.kategoriUang}>
                                        {getFieldDecorator('kodeSatuanBarang', { rules: [{ required: true, message: 'Jenis Satuan Tidak Boleh Kosong!' }], })(
                                            <Select
                                                placeholder="Pilih Jenis Satuan"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiSatuan ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%", marginTop: -10 }}
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
                                <Col span={12}>
                                    <Form.Item label="Merk" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('merk', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="Merk" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Tipe" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('tipe', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="Tipe" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="RAM" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('ram', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="RAM" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Kapasitas" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('kapasitas', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="Kapasitas" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Warna" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('warna', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="Warna" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Pemilik" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('idEntitas', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })
                                            (<Select
                                                placeholder="Pilih Pemilik"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiPemilik ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%" }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}
                                                // onChange={this.handleKategori}
                                                // onChange={e => { this.setState({ idEntitas: e }); }}
                                                // value={this.state.idEntitas}
                                                // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {this.state.dataReferensiPemilik !== undefined ? this.state.dataReferensiPemilik.map(d => (
                                                    <Option key={d.value}>{d.text}</Option>
                                                )) : ""}
                                            </Select>)
                                        }
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="IMEI 1" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('imei1', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="IMEI 1" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="IMEI 2" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('imei2', { rules: [{ required: true, message: 'Tidak Boleh Kosong!' }], })(<Input placeholder="IMEI 2" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Valuta" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('kodeMataUang', { rules: [{ required: !this.state.kategori1, message: 'Valuta Tidak Boleh Kosong!' }], })(
                                            <Select
                                                placeholder="Pilih Jenis Valuta"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiValuta ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%", marginTop: -10 }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}

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
                                <Col span={11}>
                                    <Form.Item label="Jumlah Harga" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('jumlahHarga', { rules: [{ required: !this.state.kategori1, message: 'Jumlah Harga Tidak Boleh Kosong!' }], })(
                                            <InputNumber
                                                pattern="[0-9]+[.0-9]*"
                                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                                formatter={(value) =>
                                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                }
                                                style={{ width: '100%', marginTop: -10 }}
                                                placeholder={"0.000"}
                                                readOnly
                                            />

                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label="Keterangan" style={{ marginTop: -20 }} hidden={!this.state.kategoriHkt}>
                                        {getFieldDecorator('keterangan')(<TextArea placeholder="Keterangan" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                {/* <Col span={12}>
                            <Form.Item label="Berat Bruto" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa}>
                                {getFieldDecorator('bruto')(
                                    <InputNumber placeholder="Berat Bruto" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    />)}
                            </Form.Item>
                        </Col> */}
                                <Col span={24}>
                                    <Form.Item label="Valuta" style={{ marginTop: -20 }} hidden={this.state.kategori1 || this.state.kategoriBC34 || this.state.kategoriHkt}>
                                        {getFieldDecorator('kodeMataUang', { rules: [{ required: !this.state.kategori1, message: 'Valuta Tidak Boleh Kosong!' }], })(
                                            <Select
                                                placeholder="Pilih Jenis Valuta"
                                                showArrow={true}
                                                notFoundContent={this.state.fetchingReferensiValuta ? <Spin size="small" /> : null}
                                                showSearch
                                                style={{ width: "100%", marginTop: -10 }}
                                                optionFilterProp="children"
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}

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
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item label="Harga Satuan" style={{ marginTop: -20 }} hidden={this.state.kategori1 || this.state.kategoriBC34 || this.state.kategoriHkt}>
                                        {getFieldDecorator('hargaSatuan', { rules: [{ required: !this.state.kategori1, message: 'Harga Satuan Tidak Boleh Kosong!' }], })(
                                            <InputNumber placeholder="Harga Satuan" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                onChange={this.handleHargaSatuan}
                                            />)}
                                    </Form.Item>
                                </Col>
                                <Col span={11}>
                                    <Form.Item label="Jumlah Harga" style={{ marginTop: -20 }} hidden={this.state.kategori1 || this.state.kategoriBC34 || this.state.kategoriHkt}>
                                        {getFieldDecorator('jumlahHarga', { rules: [{ required: !this.state.kategori1, message: 'Jumlah Harga Tidak Boleh Kosong!' }], })(
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
                                                style={{ width: '100%', marginTop: -10 }}
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
                                    <Form.Item label="Keterangan" style={{ marginTop: -20 }} hidden={!this.state.showFormBiasa}>
                                        {getFieldDecorator('keterangan')(<TextArea placeholder="Keterangan" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item label="Flag Barang Tidak Datang Bersamaan" style={{ marginTop: -20 }}>
                                        {getFieldDecorator('flagTidakBersamaan', { rules: [{ required: true, message: 'Flag Tidak Boleh Kosong!' }], })(
                                            <Select
                                                placeholder="Pilih"
                                                allowClear
                                                readOnly={this.state.readOnly}
                                                disabled={this.state.readOnly}
                                            >
                                                <Option value="Y">Ya</Option>
                                                <Option value="N">Tidak</Option>
                                                {/* <Option value="ASP">Awak Sarana Pengangkut</Option> */}
                                            </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            {this.state.showFormBiasa && !this.state.kategoriHkt ?
                                <Fragment>
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
                                                                    style={{ width: "100%", marginTop: -10 }}
                                                                    optionFilterProp="children"
                                                                    readOnly={this.state.readOnly}
                                                                    disabled={this.state.readOnly}
                                                                    filterOption={(input, option) =>
                                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                    }
                                                                >
                                                                    {this.state.dataReferensiDokumenIzin !== undefined ? this.state.dataReferensiDokumenIzin.map(d => (
                                                                        <Option key={d.value}>{d.text}</Option>
                                                                    )) : ""}
                                                                </Select>

                                                            )}

                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={24}>
                                                    <Col span={12}>
                                                        <Form.Item label="Tanggal Dokumen Izin" style={{ marginTop: -20 }}>
                                                            {getFieldDecorator('tanggalDokumenIzin')(<DatePicker format="DD-MM-YYYY" style={{ width: "100%", marginTop: -10 }} allowClear={!this.state.readOnly} disabled={this.state.readOnly} />)}
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={11}>
                                                        <Form.Item label="Nomor Dokumen Izin" style={{ marginTop: -20 }}>
                                                            {getFieldDecorator('nomorDokumenIzin')(<Input placeholder="Nomor Dokumen Izin" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </div>
                                    </div>
                                </Fragment> : null}
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
                </div >
            </div >
        );
    }

}

const WrappedRekamBarangForm = Form.create()(RekamBarangForm);
export default WrappedRekamBarangForm;