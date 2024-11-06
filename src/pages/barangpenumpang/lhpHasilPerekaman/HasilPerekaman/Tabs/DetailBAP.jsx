import React, {Component} from 'react';
import {
    Col,
    Row,
    Card,
    Radio,
    Modal,
    Button,
    Form,
    Input,
    Table,
    Icon,
    Empty,
    Skeleton,
    Spin,
    message,
} from 'antd';
import _ from 'lodash';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import GlobalVariable from '../../../../../helpers/GlobalVariable';
import {AutoRotatingCarousel, Slide} from 'material-auto-rotating-carousel';
import axios from 'axios';
import '../../Component/style.css';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env;

const {blue, green} = require('@material-ui/core/colors');
const {TextArea} = Input;

class DetailBAP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skeleton: false,
            skeletonContohBarang: false,
            skeletonMemoJenis: false,
            skeletonFotoUtama: false,
            skeletonPendamping: false,
            skeletonJumlahJenis: false,
            skeletonKontainer: false,
            openutama: false,
            openkontainer: false,
            dataFotoUtama: [],
            dataKontainer: [],
            loading: false,
            loadingKontainer: false,
            idLhp: null,
            visible: false,
        };
        this.opensliderutama = this.opensliderutama.bind(this);
        this.opensliderkontainer = this.opensliderkontainer.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    getWaktuPemeriksa() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');

        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-waktu-periksa/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                let data1 = body.listData;
                var waktuPKB = _.find(data1, ['kodeProses', '310']) || {};
                var penunjukPemeriksa = _.find(data1, ['kodeProses', '311']) || {};
                var pengeluaranKemasan = _.find(data1, ['kodeProses', '314']) || {};
                var pemeriksaanBarang = _.find(data1, ['kodeProses', '330']) || {};

                // console.log(JSON.stringify(newData.waktuMulai, null, 3))
                this.setState({
                    skeleton: false,
                    //Waktu Pemeriksaan
                    penunjukanPemeriksaanMulai: penunjukPemeriksa.waktuMulai,
                    penunjukanPemeriksaanSelesai: penunjukPemeriksa.waktuSelesai,
                    pengeluaranKemasanMulai: pengeluaranKemasan.waktuMulai,
                    pengeluaranKemasanSelesai: pengeluaranKemasan.waktuSelesai,
                    pemeriksaanBarangMulai: pemeriksaanBarang.waktuMulai,
                    pemeriksaanBarangSelesai: pemeriksaanBarang.waktuSelesai,
                    perintahKesiapanBarangMulai: waktuPKB.waktuMulai,
                    perintahKesiapanBarangSelesai: waktuPKB.waktuSelesai,


                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                // GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getContohBarang() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-contoh-barang/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonContohBarang: false,
                    //Contoh Barang
                    jenisContohBarang: body.listData[0].jenisContohBarang,
                    jumlahContohBarang: body.listData[0].jumlahContohBarang,
                    dimintaKembali: body.listData[0].dimintaKembali,

                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getFotoUtama() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-foto-utama/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonFotoUtama: false,
                    //Contoh Barang
                    dataFotoUtama: body.listData,
                });
                if (body.listData.length > 0) {
                    this.previewFoto();
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getMemoJenis() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-memo-jenis/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonMemoJenis: false,
                    //Hasil Pemeriksaan
                    kondisiSegel: body.listData[0].kondisiSegel,
                    realisasiIp: body.listData[0].realisasiIp,
                    kodeJenisKemasan: body.listData[0].kodeJenisKemasan,
                    //Realisasi Memo PFPD
                    realisasiMemo: body.listData[0].realisasiMemo,
                    keteranganRealisasiMemo: body.listData[0].keteranganRealisasiMemo,
                    //Kesimpulan Hasil Pemeriksaan
                    KesimpulanHasil: body.listData[0].kesimpulanPemeriksaan,
                    CatatanHasil: body.listData[0].catatanKesimpulan,
                    //Nomor dan Jumlah Kemasan
                    nomorKemasan: body.listData[0].nomorKemasan,
                    jumlahKemasan: body.listData[0].jumlahKemasan,
                    //Card Kesiapan dan Kendala Pemeriksaan
                    kesiapanPeriksa: body.listData[0].kesiapanPeriksa,
                    seriPeriksa: body.listData[0].seriPeriksa,
                    jenisKendala: body.listData[0].kendala,
                    uraianKendala: body.listData[0].uraianKendala,
                    //  alasan PKB
                    alasanPemeriksaan: body.listData[0].alasanPkb,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getPendamping() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-pendamping/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                if (body.listData.length > 0) {
                    this.setState({
                        skeletonPendamping: false,
                        //Card Pendamping Pemeriksa
                        kodeLokasi: body.listData[0].kodeLokasi,
                        namaGudang: body.listData[0].lokasiPerekamanBap,
                        kodeGudang: body.listData[0].kodeGudang,
                        tempatPemeriksaan: body.listData[0].tempatPemeriksaan,
                        dataPendamping: body.listData
                    });
                } else {
                    this.setState({
                        skeletonPendamping: false
                    })
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getLokasiPendamping() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-tempat-pemeriksaan/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonPendamping: false,
                    //Card Pendamping Pemeriksa
                    kodeLokasi: body.listData[0].kodeLokasi,
                    namaGudang: body.listData[0].lokasiPerekamanBap,
                    kodeGudang: body.listData[0].kodeGudang,
                    tempatPemeriksaan: body.listData[0].tempatPemeriksaan,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getJumlahJenis() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-jumlah-jenis/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonJumlahJenis: false,
                    //Jumlah Jenis Barang
                    jumlahPartaiBarang: body.listData[0].jumlahPartaiBarang,
                    jumlahBarangDiperiksa: body.listData[0].jumlahBarangDiperiksa,
                    jumlahJenisBarangDiperiksa:
                    body.listData[0].jumlahJenisBarangDiperiksa,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getKontainer() {
        let idLhpHeader = localStorage.getItem('idLhpHeader');
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-perintah-lorong/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                if (body.status === true) {
                    this.setState({
                        skeletonKontainer: false,
                        //Kontainer
                        dataKontainer: body.listData,
                    });
                } else {
                    GlobalVariable.openNotificationWithIcon('error');
                }
            })
            .catch((err) => {
                console.log('[error]', err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});


            });
    }

    previewFoto() {
        const dataFotoArray = [];
        this.setState({
            loading: true,
        });
        this.state.dataFotoUtama.map((item, key) =>
            axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${item.urlFoto}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'beacukai-api-key': `${REACT_APP_SECRET_KEY_HDFS}`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: 'blob', //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: 'jpg || jpeg'});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    dataFotoArray.push({url: fileURL, keterangan: item.keterangan});
                    this.setState({
                        dataFotoUtama: dataFotoArray,
                    });
                    console.log('[ngebug]', this.state.dataFotoUtama);
                    this.setState({
                        loading: false,
                        fotoKosong: false,
                    });
                })
                .catch((error) => {
                    if (error) {
                        this.setState({
                            loading: false,
                            fotoKosong: true,
                            dataFotoUtama: []
                        })
                    }
                })
        );
    }

    previewFotoKontainer(e) {
        const dataFotoArrayKontainer = [];
        this.setState({
            loadingKontainer: true,
        });
        e.tupleLhpFotoKontainer.map((item, key) =>
            axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${item.urlFoto}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'beacukai-api-key': `${REACT_APP_SECRET_KEY_HDFS}`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: 'blob', //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: 'jpg || jpeg'});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    dataFotoArrayKontainer.push({
                        url: fileURL,
                        keterangan: item.keterangan,
                    });
                    this.setState({
                        dataFotoKontainerNew: dataFotoArrayKontainer,
                    });
                    console.log(this.state.dataFotoKontainerNew);
                    if (this.state.dataFotoKontainerNew !== null) {
                        console.log('HAIII');
                        this.setState({
                            loadingKontainer: false,
                        });
                        console.log(this.state.dataFotoKontainerNew);
                        this.showModal();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    message.error('Foto yang Anda cari tidak tersedia!');
                })
        );
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        console.log('Component Did Mount');
        const idLhp = localStorage.getItem('idLhpHeader');
        console.log('idlhpheader', idLhp)
        if (localStorage.getItem('idLhpHeader') !== null) {
            this.setState({
                skeleton: true,
                skeletonContohBarang: true,
                skeletonMemoJenis: true,
                skeletonFotoUtama: true,
                skeletonPendamping: true,
                skeletonJumlahJenis: true,
                skeletonKontainer: true,
            });
            this.getSemuaData()
            this.setState({
                idLhp: idLhp,
            });
        } else {
            console.log('nothing')
        }

        // this.previewFoto()
    }

    getSemuaData() {
        this.getWaktuPemeriksa();
        this.getContohBarang();
        this.getFotoUtama();
        this.getMemoJenis();
        this.getPendamping();
        this.getLokasiPendamping();
        this.getJumlahJenis();
        this.getKontainer();
    }

    componentDidUpdate(prevProps, prevState) {
        const data = localStorage.getItem('idLhpHeader');
        if (data != this.state.idLhp) {
            console.log('Component Did Update');
            this.setState({
                skeleton: true,
                skeletonContohBarang: true,
                skeletonMemoJenis: true,
                skeletonFotoUtama: true,
                skeletonPendamping: true,
                skeletonJumlahJenis: true,
                skeletonKontainer: true,
            });
            this.getWaktuPemeriksa();
            this.getContohBarang();
            this.getFotoUtama();
            this.getMemoJenis();
            this.getPendamping();
            this.getLokasiPendamping();
            this.getJumlahJenis();
            this.getKontainer();
            this.setState({
                idLhp: data,
            });
        }
    }

    async ambilSeqIzin(e) {
        console.log(e.tupleLhpFotoKontainer);
        this.previewFotoKontainer(e);
    }

    opensliderutama() {
        this.setState({
            openutama: !this.state.openutama,
        });
    }

    opensliderkontainer() {
        this.setState({
            openkontainer: !this.state.openkontainer,
        });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    closesliderkontainer() {
        this.setState({
            openkontainer: false,
        });
    }

    render() {
        const kodeDokumen = localStorage.getItem("kodeDokumen")
        const {
            //Kesiapan dan Kendala Pemeriksa
            kesiapanPeriksa,
            seriPeriksa,
            jenisKendala,
            uraianKendala,
            //Pendamping Pemeriksa
            kodeLokasi,
            kodeGudang,
            namaGudang,
            tempatPemeriksaan,
            //Waktu Pemeriksaan
            penunjukanPemeriksaanMulai,
            penunjukanPemeriksaanSelesai,
            pengeluaranKemasanMulai,
            pengeluaranKemasanSelesai,
            pemeriksaanBarangMulai,
            pemeriksaanBarangSelesai,
            perintahKesiapanBarangMulai,
            perintahKesiapanBarangSelesai,
            alasanPemeriksaan,
            //Contoh Barang
            jenisContohBarang,
            jumlahContohBarang,
            dimintaKembali,
            //Jumlah Jenis Barang
            jumlahPartaiBarang,
            jumlahBarangDiperiksa,
            jumlahJenisBarangDiperiksa,
            //Hasil Pemeriksaan
            kondisiSegel,
            realisasiIp,
            kodeJenisKemasan,
            //Nomor dan Jumlah Kemasan
            nomorKemasan,
            jumlahKemasan,
            //Kontainer
            dataKontainer,
            dataFotoKontainerNew,
            //Realisasi Memo PFPD
            realisasiMemo,
            keteranganRealisasiMemo,
            //Kesimpulan Hasil Pemeriksaan
            KesimpulanHasil,
            CatatanHasil,
        } = this.state;
        const columns = [
            {
                title: 'Nama File',
                dataIndex: 'nama',
                key: 'nama',
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                key: 'keterangan',
            },
        ];
        const columnsPendamping = [
            {
                title: 'Bidang Pendamping',
                dataIndex: 'bdgPendamping',
                key: 'bdgPendamping',
            },
            {
                title: 'Nama Pendamping',
                dataIndex: 'namaPendamping',
                key: 'namaPendamping',
            },
        ];
        const columnskontainer = [
            {
                title: 'Nomor Kontainer',
                dataIndex: 'nomorKontainer',
                key: 'nomorKontainer',
            },
            {
                title: 'Ukuran Kontainer',
                dataIndex: 'ukuranKontainer',
                key: 'ukuranKontainer',
            },
            {
                title: 'Pelaksanaan Perintah Lorong',
                dataIndex: 'pelaksanaanPerintahLorong',
                key: 'pelaksanaanPerintahLorong',
                render: (key, dataIndex) => {
                    if (key === 'Y') {
                        return <label>Dilaksanakan</label>;
                    } else if (key === 'T') {
                        return <label>Tidak Dilaksanakan</label>;
                    } else {
                        return <label>Belum Direkam</label>;
                    }
                },
            },
            {
                title: 'Alasan Tidak Perintah',
                dataIndex: 'alasanTidakPerintah',
                key: 'alasanTidakPerintah',
            },
            {
                title: 'Perintah Lorong',
                dataIndex: 'perintahLorong',
                key: 'perintahLorong',
            },
            {
                title: 'Waktu Mulai',
                dataIndex: 'waktuMulai',
                key: 'waktuMulai',
            },
            {
                title: 'Waktu Selesai',
                dataIndex: 'waktuSelesai',
                key: 'waktuSelesai',
            },
            {
                title: 'Preview Foto',
                dataIndex: 'tupleLhpFotoKontainer',
                key: 'tupleLhpFotoKontainer',
                render: (key, record, e) => (
                    <Button
                        type="primary"
                        onClick={(evt) => this.ambilSeqIzin(record, evt)}
                    >
                        <Icon type="eye"/>
                    </Button>
                ),
            },
        ];

        return (
            <div>
                <Card>
                    {/*Kesiapan Kendala & Pendamping Pemeriksa*/}
                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Kesiapan dan Kendala Pemeriksaan"
                                style={{minHeight: '300px', maxHeight: '300px'}}
                            >
                                <Skeleton active loading={this.state.skeleton}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Pemeriksaan ke
                                                </Col>
                                                <Col span={4}>
                                                    <Input
                                                        type="text"
                                                        name="pemeriksaan_ke"
                                                        style={{color: 'black'}}
                                                        value={seriPeriksa === null ? 0 : seriPeriksa}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Kesiapan Periksa
                                                </Col>
                                                <Col span={18}>
                                                    <Radio.Group
                                                        name="kesiapanPeriksa"
                                                        // onChange={this.onChangeSiap}
                                                        value={kesiapanPeriksa}
                                                    >
                                                        <Radio value="S">Siap</Radio>
                                                        <Radio value="T">Tidak Siap</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                            {kesiapanPeriksa == 'N' ? (
                                                <div>
                                                    <Row className="mb-2" gutter={8}>
                                                        <Col span={6} style={{textAlign: 'start'}}>
                                                            Kendala Pemeriksaan
                                                        </Col>

                                                        <Col span={18}>
                                                            <Input value={jenisKendala}/>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-2" gutter={8}>
                                                        <Col span={6} style={{textAlign: 'start'}}>
                                                            Uraian Kendala
                                                        </Col>
                                                        <Col span={18}>
                                                            <TextArea
                                                                name="uraianKendala"
                                                                value={uraianKendala}
                                                                // onChange={e => {
                                                                //     this.setState({uraianKendala: e.target.value})
                                                                // }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : null}
                                        </Form>
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                        <Col lg={12} md={24}>
                            <Card
                                title="Pendamping Pemeriksaan"
                                style={{minHeight: '300px'}}
                            >
                                <Skeleton active loading={this.state.skeletonPendamping}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2">
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Lokasi
                                                </Col>
                                                <Col span={18}>
                                                    <Radio.Group
                                                        name="kodeLokasi"
                                                        value={kodeLokasi}
                                                        // onChange={this.onChangeKawasan}
                                                    >
                                                        <Radio value={'1'}>Kawasan Pabean</Radio>
                                                        <Radio value={'2'}>Di Luar Kawasan Pabean</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>

                                            {kodeLokasi == 1 ? (
                                                <Row className="mb-2">
                                                    <Col span={6} style={{textAlign: 'start'}}>
                                                        Gudang
                                                    </Col>
                                                    <Col span={18}>
                                                        <Row gutter={8}>
                                                            <Col span={12}>
                                                                <Input value={kodeGudang}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Input type="text" value={namaGudang}/>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            ) : null}

                                            {kodeLokasi == 2 ? (
                                                <Row className="mb-2">
                                                    <Col span={6} style={{textAlign: 'start'}}>
                                                        Nama Tempat
                                                    </Col>
                                                    <Col span={18}>
                                                        <TextArea
                                                            type="text"
                                                            value={tempatPemeriksaan}
                                                            name="tempatPemeriksaan"
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                            ) : null}
                                            <Table
                                                dataSource={this.state.dataPendamping}
                                                columns={columnsPendamping}
                                                rowKey={'num'}
                                                size="middle"
                                            />
                                        </Form>
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                    </Row>
                    {/*Waktu Pemeriksaan*/}
                    <Row>
                        <Card title="Waktu Pemeriksaan">
                            <Skeleton active loading={this.state.skeleton}>
                                <div>
                                    <Form>
                                        <Row className="mb-2" gutter={8}>
                                            <Col span={4} style={{textAlign: 'start'}}>
                                                Penunjuk Pemeriksa
                                            </Col>
                                            <Col span={4}>
                                                <Input
                                                    value={
                                                        penunjukanPemeriksaanMulai != null
                                                            ? moment(penunjukanPemeriksaanMulai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                            <Col span={4}>

                                            </Col>
                                            <Col span={4} style={{textAlign: 'center'}}>
                                                Waktu PKB
                                            </Col>
                                            <Col span={4}>
                                                <Input
                                                    value={
                                                        perintahKesiapanBarangMulai != null
                                                            ? moment(perintahKesiapanBarangMulai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                            <Col span={4}>

                                            </Col>
                                        </Row>
                                        <Row className="mb-2" gutter={8}>
                                            <Col span={4} style={{textAlign: 'start'}}>
                                                Pengeluaran Kemasan
                                            </Col>
                                            <Col span={6}>
                                                <Input
                                                    value={
                                                        pengeluaranKemasanMulai != null
                                                            ? moment(pengeluaranKemasanMulai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                            <Col span={1}>-</Col>
                                            <Col span={6}>
                                                <Input
                                                    value={
                                                        pengeluaranKemasanSelesai != null
                                                            ? moment(pengeluaranKemasanSelesai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mb-2" gutter={8}>
                                            <Col span={4} style={{textAlign: 'start'}}>
                                                Pemeriksaan Barang
                                            </Col>
                                            <Col span={6}>
                                                <Input
                                                    value={
                                                        pemeriksaanBarangMulai != null
                                                            ? moment(pemeriksaanBarangMulai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                            <Col span={1}>-</Col>
                                            <Col span={6}>
                                                <Input
                                                    value={
                                                        pemeriksaanBarangSelesai != null
                                                            ? moment(pemeriksaanBarangSelesai).format(
                                                            'DD-MM-YYYY HH:mm:ss'
                                                            )
                                                            : null
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                        {kodeDokumen === "23" || kodeDokumen === "25" || kodeDokumen === "261" || kodeDokumen === "262" || kodeDokumen === "27" ||
                                        kodeDokumen === "40" || kodeDokumen === "41" || kodeDokumen === "16" || kodeDokumen === "28" || kodeDokumen === "33" ||
                                        kodeDokumen === "30" ? null : (
                                            <>
                                                <Row className="mb-2" gutter={8}>
                                                    <Col span={4} style={{textAlign: 'start'}}>
                                                        Alasan Pemeriksaan > 1 jam sejak PKB
                                                    </Col>
                                                    <Col span={19}>
                                                        <Input value={alasanPemeriksaan}/>
                                                    </Col>
                                                </Row>
                                            </>)}
                                    </Form>
                                </div>
                            </Skeleton>
                        </Card>
                    </Row>
                    {/*Contoh Barang & Jumlah dan Jenis Barang*/}
                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Contoh Barang"
                                style={{minHeight: '230px', maxHeight: '230px'}}
                            >
                                <Skeleton active loading={this.state.skeletonContohBarang}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Jenis
                                                </Col>
                                                <Col span={18}>
                                                    <Input value={jenisContohBarang}/>
                                                </Col>
                                            </Row>

                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Jumlah
                                                </Col>
                                                <Col span={18}>
                                                    <Input value={jumlahContohBarang}/>
                                                </Col>
                                            </Row>

                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Diminta Kembali
                                                </Col>
                                                <Col span={18}>
                                                    <Radio.Group value={dimintaKembali}>
                                                        <Radio value="Y">Ya</Radio>
                                                        <Radio value="T">Tidak</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                        <Col lg={12} md={24}>
                            <Card
                                title="Jumlah dan Jenis Barang"
                                style={{minHeight: '230px', maxHeight: '230px'}}
                            >
                                <Skeleton active loading={this.state.skeletonJumlahJenis}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={10} style={{textAlign: 'start'}}>
                                                    Jumlah Partai Barang
                                                </Col>
                                                <Col span={10}>
                                                    <Input value={jumlahPartaiBarang}/>
                                                </Col>
                                            </Row>

                                            <Row className="mb-2" gutter={8}>
                                                <Col span={10} style={{textAlign: 'start'}}>
                                                    Jumlah Barang yang Diperiksa
                                                </Col>
                                                <Col span={10}>
                                                    <Input value={jumlahBarangDiperiksa}/>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={10} style={{textAlign: 'start'}}>
                                                    Jumlah Jenis Barang yang Diperiksa
                                                </Col>
                                                <Col span={10}>
                                                    <Input value={jumlahJenisBarangDiperiksa}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                    </Row>
                    {/*Hasil Pemeriksaan*/}
                    <Row>
                        <Col lg={24} md={24}>
                            <Card
                                title="Hasil Pemeriksaan"
                                style={{minHeight: '230px', maxHeight: '230px'}}
                            >
                                <Skeleton active loading={this.state.skeletonMemoJenis}>
                                    <Row className="mb-2" gutter={8}>
                                        <Col span={10} style={{textAlign: 'start'}}>
                                            Kondisi Segel
                                        </Col>
                                        <Col span={14}>
                                            <Radio.Group value={kondisiSegel}>
                                                <Radio value={'1'}>Utuh</Radio>
                                                <Radio value={'2'}>Rusak</Radio>
                                                <Radio value={'3'}>Berbeda</Radio>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2" gutter={8}>
                                        <Col span={10} style={{textAlign: 'start'}}>
                                            Realisasi Tingkat Pemeriksaan
                                        </Col>
                                        <Col span={14}>
                                            <Input value={realisasiIp}/>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2" gutter={8}>
                                        <Col span={10} style={{textAlign: 'start'}}>
                                            Jenis Kemasan
                                        </Col>
                                        <Col span={14}>
                                            <Radio.Group value={kodeJenisKemasan}>
                                                <Radio value={'FCL'}>FCL</Radio>
                                                <Radio value={'LCL'}>LCL</Radio>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Skeleton>
                            </Card>
                        </Col>
                    </Row>
                    {/*Nomor dan Jumlah Kemasan*/}
                    {kodeJenisKemasan == 'LCL' ? (
                        <Row>
                            <Col lg={24} md={24}>
                                <Card
                                    title="Nomor dan Jumlah Kemasan"
                                    style={{minHeight: '230px', maxHeight: '230px'}}
                                >
                                    <Skeleton active loading={this.state.skeletonMemoJenis}>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={10} style={{textAlign: 'start'}}>
                                                    Jumlah Kemasan
                                                </Col>
                                                <Col span={14}>
                                                    <Input value={jumlahKemasan}/>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={10} style={{textAlign: 'start'}}>
                                                    Nomor Kemasan
                                                </Col>
                                                <Col span={14}>
                                                    <Input value={nomorKemasan}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Skeleton>
                                </Card>
                            </Col>
                        </Row>
                    ) : null}

                    {/*Kontainer*/}

                    {kodeJenisKemasan == 'FCL' ? (
                        <Row>
                            <Col span={24}>
                                <Card title="Kontainer">
                                    <Skeleton active loading={this.state.skeleton}>
                                        <Row gutter={8} className="mb-2" type="flex" justify="end">
                                            <Col>
                                                {this.state.visible === true ? (
                                                    <Modal
                                                        title="Preview Foto"
                                                        visible={this.state.visible}
                                                        onOk={this.handleOk}
                                                        onCancel={this.handleCancel}
                                                    >
                                                        <Spin
                                                            spinning={this.state.loadingKontainer}
                                                            tip={'Sedang memuat gambar ...'}
                                                        >
                                                            {this.state.dataFotoKontainerNew.map(
                                                                (item, key) => (
                                                                    <img
                                                                        // key={key}
                                                                        alt="example"
                                                                        src={item.url}
                                                                        style={{
                                                                            width: 200,
                                                                            display: 'inline-block',
                                                                            marginRight: '20px',
                                                                        }}
                                                                        onClick={this.opensliderkontainer}
                                                                    />
                                                                )
                                                            )}
                                                            <Col>
                                                                {this.state.openkontainer ? (
                                                                    <AutoRotatingCarousel
                                                                        label="TUTUP"
                                                                        open={this.opensliderkontainer}
                                                                        onClose={this.closesliderkontainer.bind(
                                                                            this
                                                                        )}
                                                                        onStart={this.closesliderkontainer.bind(
                                                                            this
                                                                        )}
                                                                        style={{position: 'absolute'}}
                                                                        autoplay={false}
                                                                    >
                                                                        {this.state.dataFotoKontainerNew.map(
                                                                            (item, key) => (
                                                                                <Slide
                                                                                    // key={key}
                                                                                    media={<img src={item.url}/>}
                                                                                    mediaBackgroundStyle={{
                                                                                        backgroundColor: blue[400],
                                                                                    }}
                                                                                    style={{backgroundColor: blue[600]}}
                                                                                    // title={item.nama}
                                                                                    subtitle={item.keterangan}
                                                                                />
                                                                            )
                                                                        )}
                                                                    </AutoRotatingCarousel>
                                                                ) : null}
                                                            </Col>
                                                        </Spin>
                                                    </Modal>
                                                ) : null}
                                            </Col>
                                        </Row>
                                        <Table
                                            dataSource={dataKontainer}
                                            columns={columnskontainer}
                                            // rowKey={"num"}
                                            size="middle"
                                        />
                                    </Skeleton>
                                </Card>
                            </Col>
                        </Row>
                    ) : null}

                    {/*Realisasi Memo PFPD*/}
                    <Row>
                        <Col lg={12} md={24}>
                            <Card
                                title="Realisasi Memo PFPD"
                                style={{minHeight: '200px', maxHeight: '200px'}}
                            >
                                <Skeleton active loading={this.state.skeletonMemoJenis}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Memo PFPD dilaksanakan?
                                                </Col>
                                                <Col span={18}>
                                                    <Radio.Group
                                                        value={
                                                            realisasiMemo == null
                                                                ? 'Data tidak ditemukan'
                                                                : realisasiMemo
                                                        }
                                                        disabled={realisasiMemo == null}
                                                    >
                                                        <Radio value={'Y'}>Ya</Radio>
                                                        <Radio value={'S'}>Sebagian</Radio>
                                                        <Radio value={'T'}>Tidak</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Keterangan
                                                </Col>
                                                <Col span={18}>
                                                    <TextArea
                                                        value={
                                                            keteranganRealisasiMemo == null
                                                                ? 'Data tidak ditemukan'
                                                                : keteranganRealisasiMemo
                                                        }
                                                        disabled={keteranganRealisasiMemo == null}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                        <Col lg={12} md={24}>
                            <Card
                                title="Kesimpulan Hasil Pemeriksaan"
                                style={{minHeight: '200px', maxHeight: '200px'}}
                            >
                                <Skeleton active loading={this.state.skeleton}>
                                    <div>
                                        <Form>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Kesimpulan
                                                </Col>
                                                <Col span={18}>
                                                    <Radio.Group value={KesimpulanHasil}>
                                                        <Radio value={'S'}>Sesuai</Radio>
                                                        <Radio value={'T'}>Tidak Sesuai</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mb-2" gutter={8}>
                                                <Col span={6} style={{textAlign: 'start'}}>
                                                    Catatan
                                                </Col>
                                                <Col span={18}>
                                                    <TextArea value={CatatanHasil}/>
                                                </Col>
                                            </Row>
                                        </Form>
                                        {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
                                    </div>
                                </Skeleton>
                            </Card>
                        </Col>
                    </Row>
                    {/*Foto Utama Pemeriksaan Barang*/}
                    <Row>
                        <Card title="Foto Utama Pemeriksaan Barang">
                            <Skeleton active loading={this.state.skeletonFotoUtama}>
                                <Spin
                                    spinning={this.state.loading}
                                    tip={'Sedang memuat gambar ...'}
                                >
                                    {this.state.fotoKosong ? (<Empty/>) : null}
                                    {this.state.dataFotoUtama.map((item, key) => (
                                        <img
                                            // key={key}
                                            alt="example"
                                            src={item.url}
                                            style={{
                                                width: 200,
                                                display: 'inline-block',
                                                marginRight: '20px',
                                            }}
                                            onClick={this.opensliderutama}
                                        />
                                    ))}
                                    <Col>
                                        {this.state.openutama ? (
                                            <AutoRotatingCarousel
                                                label="TUTUP"
                                                open={this.opensliderutama}
                                                onClose={this.closesliderutama.bind(this)}
                                                onStart={this.closesliderutama.bind(this)}
                                                style={{position: 'absolute'}}
                                                autoplay={false}
                                            >
                                                {this.state.dataFotoUtama.map((item, key) => (
                                                    <Slide
                                                        // key={key}
                                                        media={<img src={item.url}/>}
                                                        mediaBackgroundStyle={{
                                                            backgroundColor: blue[400],
                                                        }}
                                                        style={{backgroundColor: blue[600]}}
                                                        // title={item.nama}
                                                        subtitle={item.keterangan}
                                                    />
                                                ))}
                                            </AutoRotatingCarousel>
                                        ) : null}
                                    </Col>
                                </Spin>
                            </Skeleton>
                        </Card>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default DetailBAP;
