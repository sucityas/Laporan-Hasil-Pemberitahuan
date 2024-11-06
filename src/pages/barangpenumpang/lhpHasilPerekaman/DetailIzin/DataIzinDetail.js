import React, { Component, Fragment } from "react";
import { Input, Spin, Form, DatePicker, Radio, Checkbox, Select, Row, Col, Tooltip, Button, Popover } from 'antd';
import PemuatanBentukCurah from './PemuatanBentukCurahDetail'
import PFP from './PFPdetail'
import axios from "axios";
import moment from "moment";
import { getUser } from "../../../../utils/DataUser";
import Swal from "sweetalert2";
import { sortedUniq } from "lodash";

// import Select from 'react-select'

// const { REACT_APP_SECRET_KEY_REFERENSI, REACT_APP_REFERENSI, REACT_APP_API_SCE_WS, REACT_APP_API_SCE_WS_KEY} = process.env;
// var getSeqIzin = localStorage.getItem('seqIzin');
const divStyle = {
    color: 'blue',
    border: 1
};
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const {

    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
   REACT_APP_SECRET_KEY_HDFS,
    REACT_APP_API_SCE_WS,
    REACT_APP_API_SCE_WS_KEY,
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY
} = process.env;

class DataIzinDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pemuatanBentukCurah: false,
            pfp: false,
            dataKantor: [],
            lokasi: null,
            kodeKantor: null,
            readOnly: true,
            prevData: {},
            dataDokumen: null,
            initialLokasiKeberangkatan: "AAA",
            domisiliKodeProvinsi: null,
            domisiliKodeKelurahan: null,
            domisiliKodeKecamatan: null,
            domisiliKodeKabupaten: null,
            nikMatch: false,
            pasporMatch: false,
            loadingPaspor: false,
            loadingNik: false

        };

        this.handlePemuatanBentukCurah = this.handlePemuatanBentukCurah.bind(this);
        this.handlePfp = this.handlePfp.bind(this);
        this.editData = this.editData.bind(this);
        this.editDataBatal = this.editDataBatal.bind(this);
    }

    editData() {
        // console.log("Edit Data: ")
        this.setState({
            readOnly: !this.state.readOnly,
            prevData: this.props.data
        })
    }

    editDataSimpan = e => {
        // console.log("Edit Data Simpan: ")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(values);
                Swal.fire({
                    title: 'Apakah Anda Sudah Yakin?',
                    text: 'Pastikan Data Anda Sudah Benar',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya!',
                    cancelButtonText: 'Tidak!',
                }).then((result) => {
                    if (result.value) {
                        const lhp = {};
                        let user = getUser().nip;
                        let tdHeader = this.state.dataDokumen !== null && this.state.dataDokumen !== undefined ? this.state.dataDokumen.header : null;

                        tdHeader.email = values.email
                        tdHeader.nama = values.nama
                        tdHeader.paspor = values.paspor
                        tdHeader.nik = values.nik
                        tdHeader.statusPembawa = values.statusPembawa
                        tdHeader.nomorTelepon1 = values.nomorTelepon1
                        tdHeader.nomorTelepon2 = values.nomorTelepon2
                        tdHeader.email = values.email
                        tdHeader.kodePekerjaan = values.kodePekerjaan
                        tdHeader.tempatBekerja = values.tempatBekerja
                        tdHeader.tanggalLahir = values.tanggalLahir === null ? null : moment(values.tanggalLahir).format('YYYY-MM-DD')
                        tdHeader.kodeNegara = values.kodeNegara
                        tdHeader.domisiliJalan = values.domisiliJalan
                        tdHeader.domisiliRt = values.domisiliRt
                        tdHeader.domisiliRw = values.domisiliRw
                        tdHeader.domisiliKodeKelurahan = values.domisiliKodeKelurahan
                        tdHeader.domisiliKodeKecamatan = values.domisiliKodeKecamatan
                        tdHeader.domisiliKodeKabupaten = values.domisiliKodeKabupaten
                        tdHeader.domisiliKodeProvinsi = values.domisiliKodeProvinsi
                        tdHeader.domisiliKodePos = values.domisiliKodePos
                        tdHeader.kodeKantorBerangkat = values.kodeKantorBerangkat
                        tdHeader.kodeKantorTiba = values.kodeKantorTiba
                        tdHeader.lokasiKeberangkatan = values.lokasiKeberangkatan
                        tdHeader.lokasiKedatangan = values.lokasiKedatangan
                        tdHeader.kodeNegaraAsal = values.kodeNegaraAsal
                        tdHeader.kodeNegaraTujuan = values.kodeNegaraTujuan
                        tdHeader.tujuanPerjalanan = values.tujuanPerjalanan
                        tdHeader.namaPengangkut = values.namaPengangkut
                        tdHeader.nomorPengangkut = values.nomorPengangkut
                        tdHeader.kodeCaraAngkut = values.kodeCaraAngkut
                        tdHeader.tujuanPembawaan = values.tujuanPembawaan
                        tdHeader.tanggalBerangkat = values.tanggalBerangkat === null ? null : moment(values.tanggalBerangkat).format('YYYY-MM-DD HH:mm:ss')
                        tdHeader.tanggalTiba = values.tanggalTiba === null ? null : moment(values.tanggalTiba).format('YYYY-MM-DD HH:mm:ss')
                        tdHeader.nipRekam = this.state.dataDokumen.header.nipRekam === null ? getUser().nip : this.state.dataDokumen.header.nipRekam
                        tdHeader.nipUpdate = getUser().nip
                        tdHeader.kodeNegaraKeterangan = values.kodeNegaraKeterangan
                        // this.props.form.resetFields();
                        let dokumenHeader = {}
                        dokumenHeader.tdHeader = tdHeader
                        // console.log("Data diedit : ", tdHeader)

                        axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen-header/update`, dokumenHeader, {
                            headers: {
                                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            }
                        })
                            .then((body => {
                                // console.log(body)
                                if (body.data.status == true) {
                                    // setTimeout(SimpanData, 500);
                                    // localStorage.clear();
                                    this.setState({ readOnly: true })
                                    Swal.fire(
                                        'Berhasil!',
                                        'Data Header Berhasil Disimpan.',
                                        'success'
                                    )
                                } else {
                                    Swal.fire(
                                        'Gagal Menyimpan data Header',
                                        'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                }
                            }))
                    }
                })
            }
        });
    }

    editDataBatal() {
        // console.log("Edit Data Batal: ")
        this.setState({
            readOnly: !this.state.readOnly,
        })

        this.props.form.setFieldsValue({
            nama: this.state.dataDokumen.header.nama,
            paspor: this.state.dataDokumen.header.paspor,
            nik: this.state.dataDokumen.header.nik,
            statusPembawa: this.state.dataDokumen.header.statusPembawa,
            nomorTelepon1: this.state.dataDokumen.header.nomorTelepon1,
            nomorTelepon2: this.state.dataDokumen.header.nomorTelepon2,
            email: this.state.dataDokumen.header.email,
            kodePekerjaan: this.state.dataDokumen.header.kodePekerjaan,
            tempatBekerja: this.state.dataDokumen.header.tempatBekerja,
            tanggalLahir: this.state.dataDokumen.header.tanggalLahir == null ? null : moment(this.state.dataDokumen.header.tanggalLahir, 'DD-MM-YYYY'),
            kodeNegara: this.state.dataDokumen.header.kodeNegara,
            alamat: this.state.dataDokumen.header.domisiliJalan,
            domisiliRt: this.state.dataDokumen.header.domisiliRt,
            domisiliRw: this.state.dataDokumen.header.domisiliRw,
            domisiliKodeKelurahan: this.state.dataDokumen.header.domisiliKodeKelurahan,
            domisiliKodeKecamatan: this.state.dataDokumen.header.domisiliKodeKecamatan,
            domisiliKodeKabupaten: this.state.dataDokumen.header.domisiliKodeKabupaten,
            domisiliKodeProvinsi: this.state.dataDokumen.header.domisiliKodeProvinsi,
            domisiliKodePos: this.state.dataDokumen.header.domisiliKodePos,
            kodeNegaraKeterangan: this.state.dataDokumen.header.kodeNegaraKeterangan,

            kodeDokumen: this.state.dataDokumen.header.kodeDokumen,
            nomorDokumen: this.state.dataDokumen.header.nomorDokumen,
            tanggalDokumen: this.state.dataDokumen.header.tanggalDokumen == null ? null : moment(this.state.dataDokumen.header.tanggalDokumen, 'DD-MM-YYYY'),
            qrCode: this.state.dataDokumen.header.qrCode,
            kodeKantorBerangkat: this.state.dataDokumen.header.kodeKantorBerangkat,
            kodeKantorTiba: this.state.dataDokumen.header.kodeKantorTiba,
            lokasiKeberangkatan: this.state.dataDokumen.header.lokasiKeberangkatan,
            lokasiKedatangan: this.state.dataDokumen.header.lokasiKedatangan,
            kodeNegaraAsal: this.state.dataDokumen.header.kodeNegaraAsal,
            kodeNegaraTujuan: this.state.dataDokumen.header.kodeNegaraTujuan,
            tujuanPerjalanan: this.state.dataDokumen.header.tujuanPerjalanan,
            namaPengangkut: this.state.dataDokumen.header.namaPengangkut,
            nomorPengangkut: this.state.dataDokumen.header.nomorPengangkut,
            kodeCaraAngkut: this.state.dataDokumen.header.kodeCaraAngkut,
            tanggalBerangkat: this.state.dataDokumen.header.tanggalBerangkat == null ? null : moment(this.state.dataDokumen.header.tanggalBerangkat, 'DD-MM-YYYY HH:mm:ss'),
            tanggalTiba: this.state.dataDokumen.header.tanggalTiba == null ? null : moment(this.state.dataDokumen.header.tanggalTiba, 'DD-MM-YYYY HH:mm:ss'),
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
            });
        }

        if (prevProps.data !== this.props.data) {

            // console.log("Detail Izin Update: ", this.props.data)
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    hasil: this.props.data.barang,
                    dataDokumen: this.props.data,
                    showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
                }, () => {
                    if (this.state.dataDokumen !== null) {
                        this.props.form.setFieldsValue({
                            nama: this.state.dataDokumen.header.nama,
                            paspor: this.state.dataDokumen.header.paspor,
                            nik: this.state.dataDokumen.header.nik,
                            statusPembawa: this.state.dataDokumen.header.statusPembawa,
                            nomorTelepon1: this.state.dataDokumen.header.nomorTelepon1,
                            nomorTelepon2: this.state.dataDokumen.header.nomorTelepon2,
                            email: this.state.dataDokumen.header.email,
                            kodePekerjaan: this.state.dataDokumen.header.kodePekerjaan,
                            tempatBekerja: this.state.dataDokumen.header.tempatBekerja,
                            tanggalLahir: this.state.dataDokumen.header.tanggalLahir == null ? null : moment(this.state.dataDokumen.header.tanggalLahir),
                            kodeNegara: this.state.dataDokumen.header.kodeNegara,
                            domisiliJalan: this.state.dataDokumen.header.domisiliJalan,
                            domisiliRt: this.state.dataDokumen.header.domisiliRt,
                            domisiliRw: this.state.dataDokumen.header.domisiliRw,
                            domisiliKodeKelurahan: this.state.dataDokumen.header.domisiliKodeKelurahan,
                            domisiliKodeKecamatan: this.state.dataDokumen.header.domisiliKodeKecamatan,
                            domisiliKodeKabupaten: this.state.dataDokumen.header.domisiliKodeKabupaten,
                            domisiliKodeProvinsi: this.state.dataDokumen.header.domisiliKodeProvinsi,
                            domisiliKodePos: this.state.dataDokumen.header.domisiliKodePos,

                            kodeDokumen: this.state.dataDokumen.header.kodeDokumen,
                            nomorDokumen: this.state.dataDokumen.header.nomorDokumen,
                            tanggalDokumen: this.state.dataDokumen.header.tanggalDokumen == null ? null : moment(this.state.dataDokumen.header.tanggalDokumen),
                            qrCode: this.state.dataDokumen.header.qrCode,
                            kodeKantorBerangkat: this.state.dataDokumen.header.kodeKantorBerangkat,
                            kodeKantorTiba: this.state.dataDokumen.header.kodeKantorTiba,
                            lokasiKeberangkatan: this.state.dataDokumen.header.lokasiKeberangkatan,
                            lokasiKedatangan: this.state.dataDokumen.header.lokasiKedatangan,
                            kodeNegaraAsal: this.state.dataDokumen.header.kodeNegaraAsal,
                            kodeNegaraTujuan: this.state.dataDokumen.header.kodeNegaraTujuan,
                            tujuanPerjalanan: this.state.dataDokumen.header.tujuanPerjalanan,
                            namaPengangkut: this.state.dataDokumen.header.namaPengangkut,
                            nomorPengangkut: this.state.dataDokumen.header.nomorPengangkut,
                            kodeCaraAngkut: this.state.dataDokumen.header.kodeCaraAngkut,
                            tanggalBerangkat: this.state.dataDokumen.header.tanggalBerangkat == null ? null : moment(this.state.dataDokumen.header.tanggalBerangkat, 'DD-MM-YYYY HH:mm:ss'),
                            tanggalTiba: this.state.dataDokumen.header.tanggalTiba == null ? null : moment(this.state.dataDokumen.header.tanggalTiba, 'DD-MM-YYYY HH:mm:ss'),
                            tujuanPembawaan: this.state.dataDokumen.header.tujuanPembawaan,
                            kodeNegaraKeterangan: this.state.dataDokumen.header.kodeNegaraKeterangan,
                            kodeNegaraAsalKeterangan: this.state.dataDokumen.header.kodeNegaraAsalKeterangan,
                            kodeNegaraTujuanKeterangan: this.state.dataDokumen.header.kodeNegaraTujuanKeterangan,

                        }, () => {
                            this.fetchKodePelabuhan()
                            this.setState({
                                domisiliKodeProvinsi: this.state.dataDokumen.header.domisiliKodeProvinsi,
                                domisiliKodeKabupaten: this.state.dataDokumen.header.domisiliKodeKabupaten,
                                domisiliKodeKecamatan: this.state.dataDokumen.header.domisiliKodeKecamatan,
                                domisiliKodeKelurahan: this.state.dataDokumen.header.domisiliKodeKelurahan
                            }, () => {
                                if (this.state.domisiliKodeProvinsi !== null || this.state.domisiliKodeKabupaten !== null) {
                                    this.fetchReferensiKabupaten()
                                }
                                if (this.state.domisiliKodeKabupaten !== null || this.state.domisiliKodeKecamatan !== null) {
                                    this.fetchReferensiKecamatan()
                                }
                                if (this.state.domisiliKodeKecamatan !== null || this.state.domisiliKodeKelurahan !== null) {
                                    this.fetchReferensiKelurahan()
                                }
                            })

                            if (this.state.dataDokumen.header.nik !== null) {
                                this.fetchDataDukcapil(this.state.dataDokumen.header.nik)
                            }

                            if (this.state.dataDokumen.header.paspor !== null) {
                                this.fetchDataPaspor(this.state.dataDokumen.header.paspor)
                            }

                        })
                    }
                })
            }
        }
    }

    componentDidMount() {
        // console.log("Detail Izin Mount: ", this.props.data)
        if (!(this.props.data === null || this.props.data === undefined)) {
            this.setState({
                dataDokumen: this.props.data,
                readOnly: this.props.readOnly,
                showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
            }, () => {
                if (this.state.dataDokumen !== null) {
                    this.props.form.setFieldsValue({
                        nama: this.state.dataDokumen.header.nama,
                        paspor: this.state.dataDokumen.header.paspor,
                        nik: this.state.dataDokumen.header.nik,
                        statusPembawa: this.state.dataDokumen.header.statusPembawa,
                        nomorTelepon1: this.state.dataDokumen.header.nomorTelepon1,
                        nomorTelepon2: this.state.dataDokumen.header.nomorTelepon2,
                        email: this.state.dataDokumen.header.email,
                        kodePekerjaan: this.state.dataDokumen.header.kodePekerjaan,
                        tempatBekerja: this.state.dataDokumen.header.tempatBekerja,
                        tanggalLahir: this.state.dataDokumen.header.tanggalLahir == null ? null : moment(this.state.dataDokumen.header.tanggalLahir),
                        kodeNegara: this.state.dataDokumen.header.kodeNegara,
                        domisiliJalan: this.state.dataDokumen.header.domisiliJalan,
                        domisiliRt: this.state.dataDokumen.header.domisiliRt,
                        domisiliRw: this.state.dataDokumen.header.domisiliRw,
                        domisiliKodeKelurahan: this.state.dataDokumen.header.domisiliKodeKelurahan,
                        domisiliKodeKecamatan: this.state.dataDokumen.header.domisiliKodeKecamatan,
                        domisiliKodeKabupaten: this.state.dataDokumen.header.domisiliKodeKabupaten,
                        domisiliKodeProvinsi: this.state.dataDokumen.header.domisiliKodeProvinsi,
                        domisiliKodePos: this.state.dataDokumen.header.domisiliKodePos,

                        kodeDokumen: this.state.dataDokumen.header.kodeDokumen,
                        nomorDokumen: this.state.dataDokumen.header.nomorDokumen,
                        tanggalDokumen: this.state.dataDokumen.header.tanggalDokumen == null ? null : moment(this.state.dataDokumen.header.tanggalDokumen),
                        qrCode: this.state.dataDokumen.header.qrCode,
                        kodeKantorBerangkat: this.state.dataDokumen.header.kodeKantorBerangkat,
                        kodeKantorTiba: this.state.dataDokumen.header.kodeKantorTiba,
                        lokasiKeberangkatan: this.state.dataDokumen.header.lokasiKeberangkatan,
                        lokasiKedatangan: this.state.dataDokumen.header.lokasiKedatangan,
                        kodeNegaraAsal: this.state.dataDokumen.header.kodeNegaraAsal,
                        kodeNegaraTujuan: this.state.dataDokumen.header.kodeNegaraTujuan,
                        tujuanPerjalanan: this.state.dataDokumen.header.tujuanPerjalanan,
                        namaPengangkut: this.state.dataDokumen.header.namaPengangkut,
                        nomorPengangkut: this.state.dataDokumen.header.nomorPengangkut,
                        kodeCaraAngkut: this.state.dataDokumen.header.kodeCaraAngkut,
                        tanggalBerangkat: this.state.dataDokumen.header.tanggalBerangkat == null ? null : moment(this.state.dataDokumen.header.tanggalBerangkat, 'DD-MM-YYYY HH:mm:ss'),
                        tanggalTiba: this.state.dataDokumen.header.tanggalTiba == null ? null : moment(this.state.dataDokumen.header.tanggalTiba, 'DD-MM-YYYY HH:mm:ss'),
                        tujuanPembawaan: this.state.dataDokumen.header.tujuanPembawaan,
                        kodeNegaraKeterangan: this.state.dataDokumen.header.kodeNegaraKeterangan,
                        kodeNegaraAsalKeterangan: this.state.dataDokumen.header.kodeNegaraAsalKeterangan,
                        kodeNegaraTujuanKeterangan: this.state.dataDokumen.header.kodeNegaraTujuanKeterangan,
                    }, () => {
                        this.fetchKodePelabuhan()
                        this.setState({
                            domisiliKodeProvinsi: this.state.dataDokumen.header.domisiliKodeProvinsi,
                            domisiliKodeKabupaten: this.state.dataDokumen.header.domisiliKodeKabupaten,
                            domisiliKodeKecamatan: this.state.dataDokumen.header.domisiliKodeKecamatan,
                            domisiliKodeKelurahan: this.state.dataDokumen.header.domisiliKodeKelurahan
                        }, () => {
                            if (this.state.domisiliKodeProvinsi !== null || this.state.domisiliKodeKabupaten !== null) {
                                this.fetchReferensiKabupaten()
                            }
                            if (this.state.domisiliKodeKabupaten !== null || this.state.domisiliKodeKecamatan !== null) {
                                this.fetchReferensiKecamatan()
                            }
                            if (this.state.domisiliKodeKecamatan !== null || this.state.domisiliKodeKelurahan !== null) {
                                this.fetchReferensiKelurahan()
                            }
                        })

                        if (this.state.dataDokumen.header.nik !== null) {
                            this.fetchDataDukcapil(this.state.dataDokumen.header.nik)
                        }

                        if (this.state.dataDokumen.header.paspor !== null) {
                            this.fetchDataPaspor(this.state.dataDokumen.header.paspor)
                        }

                    })
                }
            })
        }

        this.fetchReferensiNegara()
        this.fetchReferensiPekerjaan()
        this.fetchReferensiTujuanPerjalanan()
        this.fetchReferensiKantor()
        this.fetchReferensiCaraAngkut()
        this.fetchReferensiProvinsi()
        // this.getReferensi()
    }

    fetchDataDukcapil = (nik) => {
        this.setState({
            loadingNik: true
        });

        axios.get(encodeURI(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/dukcapil/get-nik?kodeAplikasi=89&nik=` + nik + "&nip=" + getUser().nip), {
            headers: {
                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`
            }
        }
        )
            .then(res => {
                this.setState({
                    loadingNik: false,
                    dataDiri: res.data == undefined ? "" : res.data,
                    NAMA_LGKP: res.data[0].NAMA_LGKP == undefined ? "" : res.data[0].NAMA_LGKP,
                    NIK: res.data[0].NIK == undefined ? "" : res.data[0].NIK,
                    ALAMAT: res.data[0] == undefined ? "" : res.data[0].ALAMAT,
                    NO_RT: res.data[0] == undefined ? "" : res.data[0].NO_RT,
                    NO_RW: res.data[0] == undefined ? "" : res.data[0].NO_RW,
                    KEL_NAME: res.data[0] == undefined ? "" : res.data[0].KEL_NAME,
                    KEC_NAME: res.data[0] == undefined ? "" : res.data[0].KEC_NAME,
                    KAB_NAME: res.data[0] == undefined ? "" : res.data[0].KAB_NAME,
                    PROP_NAME: res.data[0] == undefined ? "" : res.data[0].PROP_NAME,
                    KODE_POS: res.data[0] == undefined ? "" : res.data[0].KODE_POS,
                    NO_KK: res.data[0] == undefined ? "" : res.data[0].NO_KK,
                    STAT_HBKEL: res.data[0] == undefined ? "" : res.data[0].STAT_HBKEL,
                    JENIS_KLMIN: res.data[0] == undefined ? "" : res.data[0].JENIS_KLMIN,
                    TMPT_LHR: res.data[0] == undefined ? "" : res.data[0].TMPT_LHR,
                    TGL_LHR: res.data[0] == undefined ? "" : res.data[0].TGL_LHR,
                    PDDK_AKH: res.data[0] == undefined ? "" : res.data[0].PDDK_AKH,
                    JENIS_PKRJN: res.data[0] == undefined ? "" : res.data[0].JENIS_PKRJN,
                    AGAMA: res.data[0] == undefined ? "" : res.data[0].AGAMA,
                    GOL_DARAH: res.data[0] == undefined ? "" : res.data[0].GOL_DARAH,
                    nikMatch: res.data[0] == undefined ? false : (nik == res.data[0].NIK && this.props.form.getFieldValue('nama').toUpperCase() == res.data[0].NAMA_LGKP ? true : false)
                });
            });
    }

    fetchDataPaspor = (paspor) => {
        this.setState({
            loadingPaspor: true
        });

        axios.get(encodeURI(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/imigrasi/get-passport?kodeAplikasi=89&nationality=` + this.props.form.getFieldValue('kodeNegara').toUpperCase() + `&passport=` + paspor + "&nip=" + getUser().nip), {
            headers: {
                "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`
            }
        }
        )
            .then(res => {
                this.setState({
                    loadingPaspor: false,
                    TGL_HABIS_BERLAKU_PASPOR: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].TGL_HABIS_BERLAKU_PASPOR : res.data.data[0].TGL_HABIS_BERLAKU_PASPOR_OA,
                    KEBANGSAAN: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? "ID" : res.data.data[0].KEBANGSAAN_OA,
                    TEMPAT_LAHIR: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? "" : res.data.data[0].TEMPAT_LAHIR_OA,
                    TGL_DITERBITKAN_PASPOR: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? "" : res.data.data[0].TGL_DITERBITKAN_PASPOR_OA,
                    NAMA: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].NAMA_DI_PASPOR : res.data.data[0].NAMA_OA,
                    JENIS_KELAMIN: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].JENIS_KELAMIN : res.data.data[0].JENIS_KELAMIN_OA,
                    ALAMAT: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? "" : res.data.data[0].ALAMAT_OA,
                    TGL_LAHIR: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].TGL_LAHIR : res.data.data[0].TGL_LAHIR_OA,
                    NO_PASPOR: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].NO_PASPOR : res.data.data[0].NO_PASPOR_OA,
                    PHOTO: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].PHOTO : "",
                    NAMA_LENGKAP: res.data.data[0] == undefined ? "" : (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].NAMA_LENGKAP : "",
                    // pasporMatch: res.data.data[0] == undefined ? false :
                    //     (this.props.form.getFieldValue('kodeNegara').toUpperCase() == "ID") ? res.data.data[0].TGL_HABIS_BERLAKU_PASPOR : res.data.data[0].TGL_HABIS_BERLAKU_PASPOR_OA
                    //         (paspor == res.data.data[0].NIK && this.props.form.getFieldValue('nama').toUpperCase() == res.data.data[0].NAMA_LGKP ? true : false)
                }, () => {
                    this.setState({
                        pasporMatch: res.data.data[0] == undefined ? false : ((paspor == this.state.NO_PASPOR || paspor == this.state.NO_PASPOR_OA) && (this.props.form.getFieldValue('nama').toUpperCase() == this.state.NAMA_LENGKAP || this.props.form.getFieldValue('nama').toUpperCase() == this.state.NAMA) ? true : false)
                    });
                });
            });
    }

    fetchReferensiPekerjaan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/pekerjaan/list`,
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
                    // text: `${data.kodePekerjaan} - ${data.namaPekerjaan}`,
                    text: `${data.namaPekerjaan}`,
                    value: data.kodePekerjaan,
                }));
                this.setState({ dataReferensiPekerjaan: result, fetchingReferensiPekerjaan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiTujuanPerjalanan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/tujuanperjalanan/list`,
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
                    // text: `${data.kodePekerjaan} - ${data.namaPekerjaan}`,
                    text: `${data.uraian}`,
                    value: data.kodeTujuanPerjalanan,
                }));
                this.setState({ dataReferensiTujuanPerjalanan: result, fetchingReferensiTujuanPerjalanan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiCaraAngkut = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/moda/list`,
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
                    // text: `${data.kodePekerjaan} - ${data.namaPekerjaan}`,
                    text: `${data.jenis}`,
                    value: data.kodeModa,
                }));
                this.setState({ dataReferensiCaraAngkut: result, fetchingReferensiCaraAngkut: false });
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

    fetchReferensiPelabuhan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/pelabuhan/find`,
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

    fetchReferensiKantor = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kantor/list`,
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
                    text: `${data.kodeKantor} - ${data.namaKantorPendek}`,
                    value: data.kodeKantor,
                }));
                this.setState({ dataReferensiKantor: result, fetchingReferensiKantor: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiProvinsi = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/provinsi/list/param`,
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
                    // text: `${data.kodeProvinsi} - ${data.namaProvinsi}`,
                    text: `${data.namaProvinsi}`,
                    value: data.kodeProvinsi,
                }));
                this.setState({ dataReferensiProvinsi: result, fetchingReferensiProvinsi: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiKabupaten = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kabupaten/list/param?kodeKabupaten=${this.state.domisiliKodeProvinsi}%25`,
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
                    // text: `${data.kodeKabupaten} - ${data.namaKabupaten}`,
                    text: `${data.namaKabupaten}`,
                    value: data.kodeKabupaten,
                }));
                this.setState({ dataReferensiKabupaten: result, fetchingReferensiKabupaten: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiKecamatan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kecamatan/list/param?kodeKecamatan=${this.state.domisiliKodeKabupaten}%25`,
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
                    // text: `${data.kodeKabupaten} - ${data.namaKabupaten}`,
                    text: `${data.namaKecamatan}`,
                    value: data.kodeKecamatan,
                }));
                this.setState({ dataReferensiKecamatan: result, fetchingReferensiKecamatan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiKelurahan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kelurahan/list/param?kodeKelurahan=${this.state.domisiliKodeKecamatan}%25`,
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
                    // text: `${data.kodeKabupaten} - ${data.namaKabupaten}`,
                    text: `${data.namaKelurahan}`,
                    value: data.kodeKelurahan,
                }));
                this.setState({ dataReferensiKelurahan: result, fetchingReferensiKelurahan: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchKodePelabuhan = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/pelabuhan/findByKode?kode=${this.props.form.getFieldValue('lokasiKeberangkatan')}`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                if (res.data !== null) {
                    let initial = res.data.kodePelabuhan + " - " + res.data.namaPelabuhan
                    // console.log(initial)
                    this.setState({ initialLokasiKeberangkatan: initial });
                    // this.props.form.setFieldsValue({
                    //     lokasiKeberangkatan: initial
                    // })
                }
            })
            .catch(error => {
                console.log(error)
            });
    };

    handleLokasiKeberangkatan = (value, e) => {
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";

        if (value.length >= 3) {
            axios.get(
                `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/pelabuhan/find/?nama=${value}`,
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
                        text: `${data.kodePelabuhan} - ${data.namaPelabuhan}`,
                        value: data.kodePelabuhan,
                    }));
                    this.setState({ dataReferensiPelabuhan: result, fetchingReferensiPelabuhan: false });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };


    handlePemuatanBentukCurah = e => {
        this.setState({ pemuatanBentukCurah: e.target.checked })
    };
    handlePfp = e => {
        this.setState({ pfp: e.target.checked })
    };

    handleDataRekam = (data) => {
        this.props.handleDataRekam(data);
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
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Data Dokumen
                            </h5>
                        </div>
                        {!this.state.readOnly ?
                            <div className="kt-portlet__head-label">
                                <button className="btn btn-success" onClick={this.editDataSimpan}>
                                    <i className="fa fa-save" /> &nbsp; Simpan
                                </button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={this.editDataBatal}>
                                    <i className="fa fa-times" /> &nbsp; Batal
                                </button>
                            </div> : null
                            // <div className="kt-portlet__head-label">
                            //     <button className="btn btn-primary" onClick={this.editData}>
                            //         <i className="fa fa-edit" /> &nbsp; Ubah Data Header
                            //     </button>
                            // </div>
                        }
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Form.Item label="Kode Dokumen" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeDokumen')(<Input readOnly placeholder="Kode Dokumen" disabled />)}
                                </Form.Item>
                                <Form.Item label="Nomor Dokumen" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nomorDokumen')(<Input readOnly placeholder="Nomor Dokumen" disabled />)}
                                </Form.Item>
                                <Form.Item label="Tanggal Dokumen" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('tanggalDokumen')(<DatePicker format="DD-MM-YYYY" allowClear={!this.state.readOnly} disabled />)}
                                </Form.Item>
                                <Form.Item label="QR Code" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('qrCode')(<Input readOnly placeholder="QR Code" disabled />)}
                                </Form.Item>

                                <Form.Item label="Tujuan Perjalanan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('tujuanPerjalanan', { rules: [{ required: true, message: 'Tujuan Perjalanan Tidak Boleh Kosong!' }], })(
                                        <Select
                                            placeholder="Pilih Tujuan Perjalanan"
                                            showArrow={true}
                                            notFoundContent={this.state.fetchingReferensiTujuanPerjalanan ? <Spin size="small" /> : null}
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
                                            {this.state.dataReferensiTujuanPerjalanan !== undefined ? this.state.dataReferensiTujuanPerjalanan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Maksud Pembawaan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('tujuanPembawaan', { rules: [{ required: true, message: 'Maksud Pembawaan Tidak Boleh Kosong!' }], })
                                        (<Input placeholder="Maksud Pembawaan" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__head" style={{ marginTop: -70 }}>
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Identitas Pembawa
                            </h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Form.Item label="Nama Lengkap" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nama', { rules: [{ required: true, message: 'Nama Tidak Boleh Kosong!' }], })(<Input placeholder="Nama Lengkap" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Status" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('statusPembawa', { rules: [{ required: true, message: 'Status Tidak Boleh Kosong!' }], })
                                        (<Select
                                            // onChange={e => {
                                            //     // console.log('e', e)
                                            //     this.setState({
                                            //         lokasi: e
                                            //     })
                                            // }}
                                            placeholder="Pilih Status"
                                            readOnly={this.state.readOnly}
                                            disabled={this.state.readOnly}
                                        >
                                            <Option value="P">Penumpang</Option>
                                            <Option value="ASP">Awak Sarana Pengangkut</Option>
                                        </Select>)}

                                </Form.Item>
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
                                <Form.Item label="Kebangsaan (jika Others)" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeNegaraKeterangan', { rules: [{ required: true, message: 'Kebangsaan Tidak Boleh Kosong!' }], })(<Input readOnly placeholder="Keterangan" disabled />)}
                                </Form.Item>
                                {/* <Form.Item label="Nomor Paspor" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('paspor', { rules: [{ required: true, message: 'Paspor Tidak Boleh Kosong!' }], })(<Input placeholder="Nomor Paspor" readOnly={this.state.readOnly} />)}
                                </Form.Item> */}
                                {/* <Form.Item label="NIK" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nik')(<Input placeholder="NIK" readOnly={this.state.readOnly} />)}
                                </Form.Item> */}
                                <Form.Item label="Nomor Paspor" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('paspor', { rules: [{ required: true, message: 'Paspor Tidak Boleh Kosong!' }], })(
                                        <Search style={divStyle}
                                            placeholder="Paspor"
                                            onSearch={value => this.fetchDataPaspor(value)}
                                            readOnly={this.state.readOnly}
                                            loading={this.state.loadingPaspor}
                                            style={{ width: 'calc(100% - 50px)' }}
                                        />)
                                    }
                                    &nbsp;
                                    &nbsp;
                                    {this.state.pasporMatch ?
                                        // <Tooltip title="Match">
                                        //     <i className="fa fa-check-circle" style={{ color: "green", size: '500px' }} />
                                        // </Tooltip> 
                                        <Popover placement="top" title={"Data Imigrasi Sesuai"} content={
                                            <div>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>No Paspor</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NO_PASPOR == "" ? "Data tidak ditemukan" : this.state.NO_PASPOR}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Nama</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NAMA == "" ? "Data tidak ditemukan" : this.state.NAMA}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Kebangsaan</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.KEBANGSAAN == "" ? "Data tidak ditemukan" : this.state.KEBANGSAAN}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        } trigger="hover" overlayStyle={{
                                            width: "20vw"
                                        }}>
                                            <i className="fa fa-check-circle" style={{ color: "green", size: '500px' }} />
                                        </Popover>
                                        :
                                        <Popover placement="top" title={"Data Imigrasi Tidak Sesuai"} content={
                                            <div>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>No Paspor</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NO_PASPOR == "" ? "Data tidak ditemukan" : this.state.NO_PASPOR}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Nama</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NAMA == "" ? "Data tidak ditemukan" : this.state.NAMA}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Kebangsaan</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.KEBANGSAAN == "" ? "Data tidak ditemukan" : this.state.KEBANGSAAN}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        } trigger="hover" overlayStyle={{
                                            width: "20vw"
                                        }}>
                                            <i className="flaticon-close" style={{ color: "red" }} />
                                        </Popover>
                                        // <Tooltip title="Not Match">
                                        //     <i className="flaticon-close" style={{ color: "red" }} />
                                        // </Tooltip>
                                    }
                                </Form.Item>

                                <Form.Item label="NIK" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nik')(
                                        <Search style={divStyle}
                                            placeholder="NIK"
                                            onSearch={value => this.fetchDataDukcapil(value)}
                                            readOnly={this.state.readOnly}
                                            loading={this.state.loadingNik}
                                            style={{ width: 'calc(100% - 50px)' }}
                                        />)
                                    }
                                    &nbsp;
                                    &nbsp;
                                    {this.state.nikMatch ?
                                        <Popover placement="top" title={"Data Dukcapil Sesuai"} content={
                                            <div>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>NIK</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NIK === "" ? "Data tidak ditemukan" : this.state.NIK}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Nama</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NAMA_LGKP === "" ? "Data tidak ditemukan" : this.state.NAMA_LGKP}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        } trigger="hover" overlayStyle={{
                                            width: "20vw"
                                        }}>
                                            <i className="fa fa-check-circle" style={{ color: "green", size: '500px' }} />
                                        </Popover>
                                        :
                                        <Popover placement="top" title={"Data Dukcapil Tidak Sesuai"} content={
                                            <div>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>NIK</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NIK === "" ? "Data tidak ditemukan" : this.state.NIK}</p>
                                                    </Col>
                                                </Row>
                                                <Row gutter={8} style={{ padding: "5px" }}>
                                                    <Col span={9}>
                                                        <p style={{ color: "black" }}>Nama</p>
                                                    </Col>
                                                    <Col span={2}>
                                                        <p style={{ color: "black" }}>: </p>
                                                    </Col>
                                                    <Col span={13}>
                                                        <p style={{ color: "black" }}>{this.state.NAMA_LGKP === "" ? "Data tidak ditemukan" : this.state.NAMA_LGKP}</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        } trigger="hover" overlayStyle={{
                                            width: "20vw"
                                        }}>
                                            <i className="flaticon-close" style={{ color: "red" }} />
                                        </Popover>
                                    }
                                </Form.Item>




                                {/* </Row> */}
                                <Form.Item label="Tanggal Lahir" style={{ marginTop: -20 }} hidden>
                                    {getFieldDecorator('tanggalLahir', { rules: [{ required: false, message: 'Tanggal Lahir Tidak Boleh Kosong!' }], })(<DatePicker format="DD-MM-YYYY" allowClear={!this.state.readOnly} disabled={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Pekerjaan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodePekerjaan', { rules: [{ required: true, message: 'Pekerjaan Tidak Boleh Kosong!' }], })(
                                        <Select
                                            placeholder="Pilih Pekerjaan"
                                            showArrow={true}
                                            notFoundContent={this.state.fetchingReferensiPekerjaan ? <Spin size="small" /> : null}
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
                                            {(this.state.dataReferensiPekerjaan !== undefined && this.state.dataReferensiPekerjaan.length !== 0) ? this.state.dataReferensiPekerjaan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Tempat Bekerja" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('tempatBekerja')(<Input placeholder="Tempat Bekerja" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Alamat di Indonesia" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('domisiliJalan')(<Input placeholder="Alamat di Indonesia" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label=" " colon={false}>
                                    <Row gutter={24} style={{ marginTop: -20, marginBottom: -20 }}>
                                        <Col span={12}>
                                            <Form.Item label="RT" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliRt')(<Input placeholder="RT" readOnly={this.state.readOnly} />)}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} >
                                            <Form.Item label="RW" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliRw')(<Input placeholder="RW" readOnly={this.state.readOnly} />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label=" " colon={false}>
                                    <Row gutter={24} style={{ marginTop: -40, marginBottom: -20 }}>
                                        <Col span={12}>
                                            <Form.Item label="Provinsi" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliKodeProvinsi')(
                                                    <Select
                                                        placeholder="Pilih Provinsi"
                                                        showArrow={true}
                                                        notFoundContent={this.state.fetchingReferensiProvinsi ? <Spin size="small" /> : null}
                                                        showSearch
                                                        style={{ width: "100%" }}
                                                        optionFilterProp="children"
                                                        readOnly={this.state.readOnly}
                                                        disabled={this.state.readOnly}
                                                        allowClear
                                                        onChange={e => {
                                                            this.props.form.setFieldsValue({
                                                                domisiliKodeKabupaten: null,
                                                                domisiliKodeKecamatan: null,
                                                                domisiliKodeKelurahan: null
                                                            });
                                                            this.setState({
                                                                domisiliKodeProvinsi: e,
                                                            }, () => {
                                                                this.fetchReferensiKabupaten()
                                                            })
                                                        }}
                                                        // value={this.state.searchKodeJenisPungutan}
                                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {(this.state.dataReferensiProvinsi !== undefined && this.state.dataReferensiProvinsi.length !== 0) ? this.state.dataReferensiProvinsi.map(d => (
                                                            <Option key={d.value}>{d.text}</Option>
                                                        )) : ""}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} >
                                            <Form.Item label="Kab/Kota" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliKodeKabupaten')(
                                                    <Select
                                                        placeholder="Pilih Kabupaten"
                                                        showArrow={true}
                                                        notFoundContent={this.state.fetchingReferensiKabupaten ? <Spin size="small" /> : null}
                                                        showSearch
                                                        style={{ width: "100%" }}
                                                        optionFilterProp="children"
                                                        readOnly={this.state.readOnly}
                                                        disabled={this.state.readOnly}
                                                        allowClear
                                                        onChange={e => {
                                                            // console.log(" kab ", this.props.form.getFieldValue("domisiliKodeKabupaten"))
                                                            this.props.form.setFieldsValue({
                                                                domisiliKodeKecamatan: null,
                                                                domisiliKodeKelurahan: null
                                                            });
                                                            this.setState({
                                                                domisiliKodeKabupaten: e,
                                                            }, () => {
                                                                this.fetchReferensiKecamatan()
                                                            })
                                                        }}
                                                        // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                                        // value={this.state.searchKodeJenisPungutan}
                                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {(this.state.dataReferensiKabupaten !== undefined && this.state.dataReferensiKabupaten.length !== 0) ? this.state.dataReferensiKabupaten.map(d => (
                                                            <Option key={d.value}>{d.text}</Option>
                                                        )) : ""}
                                                    </Select>

                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label=" " colon={false}>
                                    <Row gutter={24} style={{ marginTop: -40, marginBottom: -20 }}>
                                        <Col span={12}>
                                            <Form.Item label="Kecamatan" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliKodeKecamatan')(

                                                    // <Input placeholder="Kecamatan" readOnly={this.state.readOnly} />
                                                    <Select
                                                        placeholder="Pilih Kecamatan"
                                                        showArrow={true}
                                                        notFoundContent={this.state.fetchingReferensiKecamatan ? <Spin size="small" /> : null}
                                                        showSearch
                                                        style={{ width: "100%" }}
                                                        optionFilterProp="children"
                                                        readOnly={this.state.readOnly}
                                                        disabled={this.state.readOnly}
                                                        allowClear
                                                        onChange={e => {
                                                            this.props.form.setFieldsValue({
                                                                domisiliKodeKelurahan: null
                                                            });
                                                            this.setState({
                                                                domisiliKodeKecamatan: e,
                                                            }, () => {
                                                                this.fetchReferensiKelurahan()
                                                            })
                                                        }}
                                                        // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                                        // value={this.state.searchKodeJenisPungutan}
                                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {(this.state.dataReferensiKecamatan !== undefined && this.state.dataReferensiKecamatan.length !== 0) ? this.state.dataReferensiKecamatan.map(d => (
                                                            <Option key={d.value}>{d.text}</Option>
                                                        )) : ""}
                                                    </Select>

                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} >
                                            <Form.Item label="Kelurahan" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliKodeKelurahan')(

                                                    // <Input placeholder="Kelurahan" readOnly={this.state.readOnly} />
                                                    <Select
                                                        placeholder="Pilih Kelurahan"
                                                        showArrow={true}
                                                        notFoundContent={this.state.fetchingReferensiKelurahan ? <Spin size="small" /> : null}
                                                        showSearch
                                                        style={{ width: "100%" }}
                                                        optionFilterProp="children"
                                                        readOnly={this.state.readOnly}
                                                        disabled={this.state.readOnly}
                                                        allowClear
                                                        // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                                        // value={this.state.searchKodeJenisPungutan}
                                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                                        filterOption={(input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {(this.state.dataReferensiKelurahan !== undefined && this.state.dataReferensiKelurahan.length !== 0) ? this.state.dataReferensiKelurahan.map(d => (
                                                            <Option key={d.value}>{d.text}</Option>
                                                        )) : ""}
                                                    </Select>

                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label=" " colon={false}>
                                    <Row gutter={24} style={{ marginTop: -40, marginBottom: -20 }}>
                                        <Col span={24}>
                                            <Form.Item label="Kode Pos" style={{ marginTop: -10 }}>
                                                {getFieldDecorator('domisiliKodePos')(<Input placeholder="Kode Pos" readOnly={this.state.readOnly} />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item label="Nomor Telepon 1" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nomorTelepon1', { rules: [{ required: true, message: 'Nomor Telepon Tidak Boleh Kosong!' }], })(<Input placeholder="Nomor Telepon" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Nomor Telepon 2" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nomorTelepon2')(<Input placeholder="Nomor Telepon" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Email" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('email', { rules: [{ required: true, message: 'Email Tidak Boleh Kosong!' }], })(<Input placeholder="Email" readOnly={this.state.readOnly} />)}
                                </Form.Item>

                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__head" style={{ marginTop: -70 }}>
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Keberangkatan
                            </h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Form.Item label="Moda" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeCaraAngkut', { rules: [{ required: true, message: 'Moda Tidak Boleh Kosong!' }], })(
                                        // <Select
                                        //     placeholder="Pilih Moda"
                                        //     showArrow={true}
                                        //     notFoundContent={this.state.fetchingReferensiCaraAngkut ? <Spin size="small" /> : null}
                                        //     showSearch
                                        //     style={{ width: "100%" }}
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
                                        //     {this.state.dataReferensiCaraAngkut !== undefined ? this.state.dataReferensiCaraAngkut.map(d => (
                                        //         <Option key={d.value}>{d.text}</Option>
                                        //     )) : ""}
                                        // </Select>
                                        <Select
                                            placeholder="Pilih Jenis Moda"
                                            allowClear
                                            readOnly={this.state.readOnly}
                                            disabled={this.state.readOnly}
                                        >
                                            <Option value="4">Udara</Option>
                                            <Option value="1">Laut</Option>
                                            {/* <Option value="ASP">Awak Sarana Pengangkut</Option> */}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Negara Asal" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeNegaraAsal')(
                                        <Select
                                            placeholder="Pilih Negara Asal"
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
                                            {this.state.dataReferensiNegara !== undefined ? this.state.dataReferensiNegara.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Negara Tujuan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeNegaraTujuan', { rules: [{ required: true, message: 'Negara Tujuan Tidak Boleh Kosong!' }], })(
                                        <Select
                                            placeholder="Pilih Negara Tujuan"
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
                                            {this.state.dataReferensiNegara !== undefined ? this.state.dataReferensiNegara.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Negara Tujuan (jika Others)" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeNegaraTujuanKeterangan')(<Input readOnly placeholder="Keterangan" disabled readOnly />)}
                                </Form.Item>
                                <Form.Item label="Tanggal Keberangkatan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('tanggalBerangkat', { rules: [{ required: true, message: 'Tanggal Keberangkatan Tidak Boleh Kosong!' }], })(<DatePicker format="DD-MM-YYYY HH:mm:ss" allowClear={!this.state.readOnly} disabled={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Kantor Keberangkatan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeKantorBerangkat', { rules: [{ required: true, message: 'Kantor Keberangkatan Tidak Boleh Kosong!' }], })(
                                        <Select
                                            placeholder="Pilih Kantor Keberangkatan"
                                            showArrow={true}
                                            notFoundContent={this.state.fetchingReferensiKantor ? <Spin size="small" /> : null}
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
                                            {this.state.dataReferensiKantor !== undefined ? this.state.dataReferensiKantor.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Tempat Keberangkatan" style={{ marginTop: -20 }}>
                                    {/* {getFieldDecorator('lokasiKeberangkatan')(<Input placeholder="Lokasi Keberangkatan" readOnly={this.state.readOnly} />)} */}
                                    {getFieldDecorator('lokasiKeberangkatan', { rules: [{ required: true, message: 'Tempat Keberangkatan Tidak Boleh Kosong!' }], })(
                                        <Select
                                            placeholder="Ketikkan minimal 3 huruf"
                                            showArrow={true}
                                            initialValues={this.state.initialLokasiKeberangkatan}
                                            notFoundContent={this.state.fetchingReferensiPelabuhan ? <Spin size="small" /> : null}
                                            showSearch
                                            style={{ width: "100%" }}
                                            optionFilterProp="children"
                                            readOnly={this.state.readOnly}
                                            disabled={this.state.readOnly}
                                            // onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                            // value={this.state.searchKodeJenisPungutan}
                                            onSearch={this.handleLokasiKeberangkatan}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.state.dataReferensiPelabuhan !== undefined ? this.state.dataReferensiPelabuhan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Nama Sarana Pengangkut" style={{ marginTop: -20 }} hidden>
                                    {getFieldDecorator('namaPengangkut')(<Input placeholder="Nama Sarana Pengangkut" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Nomor Penerbangan/Pelayaran" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('nomorPengangkut', { rules: [{ required: true, message: 'Nomor Tidak Boleh Kosong!' }], })(<Input placeholder="Nomor Penerbangan/Pelayaran" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__head" style={{ marginTop: -70 }}>
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Kedatangan
                            </h5>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Form.Item label="Tanggal Kedatangan" style={{ marginTop: -20 }} hidden>
                                    {getFieldDecorator('tanggalTiba')(<DatePicker format="DD-MM-YYYY HH:mm:ss" allowClear={!this.state.readOnly} disabled={this.state.readOnly} />)}
                                </Form.Item>
                                <Form.Item label="Kantor Kedatangan" style={{ marginTop: -20 }}>
                                    {getFieldDecorator('kodeKantorTiba')(
                                        <Select
                                            placeholder="Pilih Kantor Kedatangan"
                                            showArrow={true}
                                            notFoundContent={this.state.fetchingReferensiKantor ? <Spin size="small" /> : null}
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
                                            {this.state.dataReferensiKantor !== undefined ? this.state.dataReferensiKantor.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="Lokasi Kedatangan" style={{ marginTop: -20 }} hidden>
                                    {getFieldDecorator('lokasiKedatangan')(<Input placeholder="Lokasi Kedatangan" readOnly={this.state.readOnly} />)}
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </Fragment>
        );
    }
}
const WrappedDataIzin = Form.create()(DataIzinDetail);
export default WrappedDataIzin;