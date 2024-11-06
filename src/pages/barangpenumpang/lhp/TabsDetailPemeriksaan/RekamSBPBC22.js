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
    Card,
    Modal,
    Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
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
        dataBarang: []
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            readOnly: true,
            clear: false,
            dataKeluarga: [],
            dataBarang: [],
            showModal: false,
            showKategoriKarantina: false,
            loadingReferensi: false,
            page: 0,
            dataReferensiBarang: [],
            dataHeader: null
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("Rekam Barang Update: ", this.props.data)
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly
            });
        }
        if (prevProps.data !== this.props.data) {
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataBarang: this.props.data,
                    readOnly: this.props.readOnly,
                    dataKeluarga: this.props.dataKeluarga
                }, () => {
                    if (this.state.dataBarang !== null) {
                        // this.handleKategori(this.props.data.kodeKategoriBarang)

                        // , () => {
                        this.props.form.setFieldsValue({
                            idDetail: this.props.data.idDetail,
                            idBarang: this.props.data.idBarang,
                            idPenelitianBarang: this.props.data.idPenelitianBarang,
                            idPemilik: this.props.data.idPemilik,
                            uraian: this.props.data.uraian,
                            pemilik: this.props.data.pemilik,
                            jumlahKemasan: this.props.data.jumlahKemasan,
                            kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                            jumlahSatuan: this.props.data.jumlahSatuan,
                            kodeSatuanBarang: this.props.data.kodeSatuanBarang
                        })
                        // }
                    } else {
                        this.props.form.resetFields();
                    }
                })

                this.getDataDokumen()
            }
        }

        else if (this.props.data === null && this.state.readOnly === false && prevProps.readOnly !== this.state.readOnly) {
            // console.log("Masuk ELSE 1")
            this.setState({
                readOnly: false,
                dataKeluarga: this.props.dataKeluarga
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
                dataKeluarga: this.props.dataKeluarga
            }, () => {
                if (this.state.dataBarang !== null) {
                    // this.handleKategori(this.props.data.kodeKategoriBarang)
                    // , () => {
                    this.props.form.setFieldsValue({
                        idDetail: this.props.data.idDetail,
                        idBarang: this.props.data.idBarang,
                        idPenelitianBarang: this.props.data.idPenelitianBarang,
                        idPemilik: this.props.data.idPemilik,
                        uraian: this.props.data.uraian,
                        pemilik: this.props.data.pemilik,
                        jumlahKemasan: this.props.data.jumlahKemasan,
                        kodeJenisKemasan: this.props.data.kodeJenisKemasan,
                        jumlahSatuan: this.props.data.jumlahSatuan,
                        kodeSatuanBarang: this.props.data.kodeSatuanBarang
                    })
                    // }
                } else {
                    this.props.form.resetFields();
                }
            })
        } else if (this.props.readOnly === false) {
            this.setState({
                readOnly: this.props.readOnly,
                dataKeluarga: this.props.dataKeluarga
            });
            this.props.form.resetFields();
        }
        this.fetchReferensiKemasan()
        this.fetchReferensiSatuan()
        this.getDataDokumen()

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

        if (!(kategori === null || kategori === undefined)) {
            this.setState({ showFormBiasa: false });
            if (kategori === '1') {
                this.setState({ showKategoriKarantina: true });
            } else {
                this.setState({ showKategoriKarantina: false });
                this.props.form.setFieldsValue({
                    kategoriKarantina: null,
                })
            }
            if (kategori === '1' || kategori === '2' || kategori === '5' || kategori === '6' || kategori === '7') {
                this.setState({ showFormBiasa: true });
            }
        }
    };

    onClose() {
        this.props.handleBarangCancel();
        this.props.form.resetFields();
    };

    handleOk = (e) => {
        // console.log(e);
        this.setState({
            showModal: false,
        });
    };

    handleCancel = (e) => {
        // console.log(e);
        this.setState({
            showModal: false,
        });
    };

    getDataDokumen(e) {
        let idHeader = localStorage.getItem("idHeader");
        // console.log("idHeader : ", idHeader)

        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            }
        })
            .then(res => {
                // console.log("Perekaman LHP", res)
                this.setState({
                    loading: false,
                    hasil: res.data,
                    dataHeader: !(res.data.header === null || res.data.header === undefined) ? res.data.header : null,
                    dataKeluarga: !(res.data.keluarga === null || res.data.keluarga === undefined) ? res.data.keluarga : null,
                    dataReferensiBarang: !(res.data.barang === null || res.data.barang === undefined) ? res.data.barang : null,
                    dataPemilik: !(res.data.pemilik === null || res.data.pemilik === undefined) ? res.data.pemilik : null,
                    showDataKeluarga: res.data.header.kodeDokumen === '22' ? true : false,
                    pagination: res.data.length,
                    kodeDokumen: res.data.header.kodeDokumen
                }, () => {
                    // console.log(this.state.hasil)
                });
            })
            .catch((err) => {
                Swal.fire(
                    'Gagal mengambil data Barang',
                    // 'Terdapat pengisian form yang salah.',
                    'error'
                );
            });
    }

    onSelectionChanged(data) {
        // console.log("Selected Barang : ", data)
        // this.props.handleClear();
        this.props.form.setFieldsValue({
            uraian: data.uraian,
            // merk: data.merk,
            // tipe: data.tipe,
            // spesifikasiLain: data.spesifikasiLain,
            // kodeBarang: data.kodeBarang,
            // kodeKondisiBarang: data.kodeKondisiBarang,
            // kodeMataUang: data.kodeMataUang,
            jumlahKemasan: null,
            jumlahSatuan: null,
            // jumlahHarga: data.jumlahHarga,
            kodeJenisKemasan: null,
            // hargaSatuan: data.hargaSatuan,
            // bruto: data.bruto,
            // ukuran: data.ukuran,
            kodeSatuanBarang: null,
            idDetail: data.idDetail,
            idBarang: data.idDetail,
            idPemilik: null,
            pemilik: null
            // keterangan: data.keterangan,
        });
        this.setState({

            showModal: false,
            clear: true
        });
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleDataRekam = (e) => {
        console.log('handleDataRekam')
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
                                data.idBarang = values.idBarang
                                data.idPenelitianBarang = values.idPenelitianBarang
                                data.idPemilik = values.idPemilik
                                // data.kodeKategoriBarang = values.kodeKategoriBarang
                                // data.kategoriKarantina = values.kategoriKarantina
                                data.uraian = values.uraian
                                // data.spesifikasiLain = values.spesifikasiLain
                                // data.merk = values.merk
                                // data.tipe = values.tipe
                                // data.kodeBarang = values.kodeBarang
                                // data.ukuran = values.ukuran
                                // data.kodeKondisiBarang = values.kodeKondisiBarang
                                // data.bruto = values.bruto
                                // data.hargaSatuan = values.hargaSatuan
                                // data.kodeMataUang = values.kodeMataUang
                                // data.jumlahHarga = values.jumlahHarga
                                data.jumlahKemasan = values.jumlahKemasan
                                data.kodeJenisKemasan = values.kodeJenisKemasan
                                data.jumlahSatuan = values.jumlahSatuan
                                data.kodeSatuanBarang = values.kodeSatuanBarang
                                // data.keterangan = values.keterangan
                                // data.flagTidakBersamaan = values.flagTidakBersamaan
                                // data.kodeDokumenIzin = values.kodeDokumenIzin
                                // data.tanggalDokumenIzin = values.tanggalDokumenIzin == null ? null : moment(values.tanggalDokumenIzin).format("YYYY-MM-DD")
                                // data.nomorDokumenIzin = values.nomorDokumenIzin
                                data.pemilik = values.pemilik
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

    modal() {
        this.setState({
            showModal: true,
            open: true,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 22 },
            wrapperCol: { span: 22 },
        };
        let numb = this.state.page + 1;
        const column = [
            {
                title: 'No.',
                dataIndex: ++this.count,
                render: () => numb++,
            },
            // {
            //     title: "idDetail",
            //     dataIndex: "idDetail",
            //     key: 5,
            // },
            {
                title: "Uraian",
                dataIndex: "uraian",
                key: 2,
                ...this.getColumnSearchProps('uraian'),
            },
            {
                title: "Jumlah",
                dataIndex: "jumlahSatuan",
                key: 3,
            },
            {
                title: "Satuan",
                dataIndex: "kodeSatuanBarang",
                key: 4,
            }
        ]
        return (

            <div className="kt-portlet__body">
                <div className="kt-section kt-section--first">
                    <div className="kt-section__body">
                        <Card
                            size="small"
                            title="Detail Barang"
                            style={{ paddingLeft: "20px", paddingRight: "20px" }}
                            extra={
                                // !this.state.readOnly && this.props.editData === null ? (
                                !this.state.readOnly ? (
                                    <button className="btn btn-primary" onClick={this.modal.bind(this)}>
                                        Referensi Barang
                                    </button>
                                ) : null
                            }
                        >
                            <Form labelAlign="left">
                                {/* {getFieldDecorator('id', { initialValue: undefined })(<Input hidden />)} */}
                                {getFieldDecorator('idBarang')(<Input hidden />)}
                                {getFieldDecorator('idDetail')(<Input hidden />)}
                                {getFieldDecorator('idPenelitianBarang')(<Input hidden />)}
                                {getFieldDecorator('pemilik')(<Input hidden />)}
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item label="Kepemilikan" >
                                            {getFieldDecorator('idPemilik', { rules: [{ required: true, message: 'Pemilik Tidak Boleh Kosong!' }], })(
                                                <Select
                                                    placeholder="Pilih Pemilik"
                                                    showArrow={true}
                                                    // notFoundContent={this.state.fetchingReferensiKemasan ? <Spin size="small" /> : null}
                                                    showSearch
                                                    style={{ width: "100%" }}
                                                    optionFilterProp="children"
                                                    readOnly={this.state.readOnly}
                                                    disabled={this.state.readOnly}
                                                    onChange={e => {
                                                        if (e !== null) {
                                                            let kepemilikan = this.state.dataKeluarga !== null ? this.state.dataKeluarga.filter(item => item.idEntitas === e) : null
                                                            this.props.form.setFieldsValue({
                                                                pemilik: kepemilikan !== null ? kepemilikan[0].nama : null
                                                            });
                                                        } else {
                                                            this.props.form.setFieldsValue({
                                                                pemilik: this.state.dataHeader !== null ? this.state.dataHeader.nama : null
                                                            });
                                                        }

                                                    }}
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {this.state.dataKeluarga !== undefined ? this.state.dataKeluarga.map(d => (
                                                        <Option key={d.idEntitas}>{d.nama}</Option>
                                                    )) : ""}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item label="Uraian" style={{ marginTop: -20 }} >
                                            {getFieldDecorator('uraian', { rules: [{ required: true, message: 'Uraian Tidak Boleh Kosong!' }], })(<TextArea placeholder="Uraian Barang" rows="4" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Jumlah Kemasan" style={{ marginTop: -20 }} >
                                            {getFieldDecorator('jumlahKemasan', { rules: [{ required: true, message: 'Jumlah Kemasan Tidak Boleh Kosong!' }], })(
                                                <InputNumber placeholder="Jumlah Kemasan" style={{ width: "100%" }} readOnly={this.state.readOnly}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Jenis Kemasan" style={{ marginTop: -20 }} >
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
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <Form.Item label="Jumlah Satuan" style={{ marginTop: -20 }} >
                                            {getFieldDecorator('jumlahSatuan', { rules: [{ required: true, message: 'Jumlah Satuan Tidak Boleh Kosong!' }], })(
                                                <InputNumber placeholder="Jumlah Satuan" style={{ width: "100%", marginTop: -10 }} readOnly={this.state.readOnly}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                    onChange={this.handleJumlahSatuan}
                                                />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Jenis Satuan" style={{ marginTop: -20 }} >
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
                                {this.state.readOnly ?
                                    <Row gutter={8} type="flex" justify="center">
                                        <Col>
                                            <button className="btn btn-primary" onClick={() => this.onClose()}>
                                                OK
                                            </button>
                                        </Col>
                                    </Row> :
                                    <Row gutter={8} type="flex" justify="center">
                                        <Col>
                                            <button className="btn btn-sm btn-primary" onClick={this.handleDataRekam}>
                                                {/* <i className="fa fa-save" /> &nbsp;  */}
                                                Simpan
                                            </button>
                                            &nbsp;
                                            <button className="btn btn-sm btn-danger" onClick={() => this.onClose()}>
                                                {/* <i className="fa fa-times-circle" /> &nbsp;  */}
                                                Batal
                                            </button>
                                        </Col>
                                    </Row>
                                }
                            </Form>
                        </Card>
                        <Modal
                            visible={this.state.showModal}
                            title="Pilih Referensi Barang Pemberitahuan"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            {/* <div> */}
                            <Table
                                dataSource={this.state.dataReferensiBarang}
                                pagination={{
                                    defaultPageSize: 5,
                                    total: this.state.dataReferensiBarang.length,
                                    current: this.state.current,
                                    onChange: (page, pageSize) => {
                                        // console.log("pageSize : ", pageSize)
                                        this.setState({
                                            current: page,
                                            page: (page - 1) * 5,
                                        })
                                    }
                                }} columns={column} loading={this.state.loadingReferensi}
                                onRowClick={(e) => this.onSelectionChanged(e)} />

                        </Modal>
                    </div >
                </div >
            </div >
        );
    }

}

const WrappedRekamBarangForm = Form.create()(RekamBarangForm);
export default WrappedRekamBarangForm;