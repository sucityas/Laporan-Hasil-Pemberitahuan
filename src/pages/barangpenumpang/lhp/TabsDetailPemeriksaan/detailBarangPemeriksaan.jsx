import React, {Component} from "react";
import {
    Col,
    Row,
    Card,
    Radio,
    Form,
    Input,
    Empty,
    Spin,
    Skeleton, Button, Icon, Select, InputNumber, Checkbox
} from "antd";
// import { PlusOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Swal from "sweetalert2";
import GlobalVariable from "../../../../helpers/GlobalVariable";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import axios from "axios";
import "../TabsBAP/bebas.css"
import QuickSearch from "../Component/QuickSearch";
const {Option} = Select;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const {
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
} = process.env;

const {blue} = require("@material-ui/core/colors");
const {TextArea} = Input;

class detailBarangPemeriksaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skeleton: false,
            open: false,
            openutama: false,
            fotonih: [],
            loading: false,
            loadingFoto: false,
            idLhp: null,
            showing: false,
            dataKosong: false,
            fetching: false,
            //Detail Barang
            kodeJenisSatuan: this.props.kodeJenisSatuan,
            uraianBarang: this.props.uraianBarang,
            jumlahSatuan: this.props.jumlahSatuan,
            //Spesifikasi
            merk: this.props.merk,
            model: this.props.model,
            type: this.props.type,
            //Keterangan Tambahan
            keteranganTambahan: this.props.keteranganTambahan,
            kesesuaianBarang: this.props.kesesuaianBarang,
        };
        this.opensliderutama = this.opensliderutama.bind(this);
        this.getAsalBarang = this.getAsalBarang.bind(this);
        this.asalbarangHandler = this.asalbarangHandler.bind(this);
        this.getNegara = this.getNegara.bind(this);
        this.negaraHandler = this.negaraHandler.bind(this);
        this.getJenis = this.getJenis.bind(this);
        this.jenisHandler = this.jenisHandler.bind(this);
        this.getKapasitass = this.getKapasitass.bind(this);
        this.kapasitasHandler = this.kapasitasHandler.bind(this);
        this.getKondisiBarang = this.getKondisiBarang.bind(this);
        this.kondisibarangHandler = this.kondisibarangHandler.bind(this);
        this.getKapasitasss = this.getKapasitasss.bind(this);
        this.getkapasitasHandler = this.getkapasitasHandler.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async getDokumen() {
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let idHeader = localStorage.getItem("idHeader");
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-daftar-detil-lhp/${idLhpHeader}/${idHeader}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    hasil: body.listData,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getFotoDetail(e) {
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let idLhpDetail = this.props.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-foto-pemeriksaan/${idLhpHeader}/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    loadingFoto: false,
                    dataFoto: body.listData,
                });
                console.log('[debug] , cek panjang data', body.listData.length);
                if (body.listData.length > 0) {
                    this.setState({
                        dataKosong: false
                    })
                    this.previewFoto(e);
                } else {
                    this.setState({
                        fotonih: [],
                        dataKosong: true
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    loadingFoto: false
                })
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getKapasitas(e) {
        let idLhpDetail = this.props.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-kapasitas-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    namaKapasitas: body.listData[0].namaKapasitas,
                    kapasitas: body.listData[0].kapasitas,
                    kodeKapasitas : body.listData[0].kodeKapasitas
                });
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getKemasan(e) {
        let idLhpDetail = this.props.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-kemasan-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    jumlahKemasan: body.listData[0].jumlahKemasan,
                    ukuranKemasan: body.listData[0].ukuranKemasan,
                    panjangKemasan: body.listData[0].panjangKemasan,
                    lebarKemasan: body.listData[0].lebarKemasan,
                    tinggiKemasan: body.listData[0].tinggiKemasan,
                    namaKemasan: body.listData[0].namaKemasan,
                    kodeKemasan: body.listData[0].kodeKemasan
                });
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getUnsurBarang(e) {
        let idLhpDetail = this.props.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-unsur-barang-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.listData.length === 0) {
                    this.setState({
                        loading: false,
                        namaAsalBarang: "Data Kosong",
                        asalBarang: "Data Kosong",
                        namaNegara: "Data Kosong",
                        namaKondisiBarang: "Data Kosong",
                        fetching: false
                    });
                } else {
                    this.setState({
                        loading: false,
                        namaAsalBarang: body.listData[0].namaAsalBarang,
                        asalBarang: body.listData[0].asalBarang,
                        namaNegara: body.listData[0].namaNegara,
                        namaKondisiBarang: body.listData[0].namaKondisiBarang,
                        kodeNegara: body.listData[0].kodeNegara,
                        kodeKondisiBarang : body.listData[0].kodeKondisiBarang,
                        fetching: false
                    });
                }
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    componentDidMount() {
        this.ambilSeqIzin()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.idLhpDetail !== this.props.idLhpDetail) {
            this.componentDidMount()
            this.setState({
                //Detail Barang
                kodeJenisSatuan: this.props.kodeJenisSatuan,
                uraianBarang: this.props.uraianBarang,
                jumlahSatuan: this.props.jumlahSatuan,
                //Spesifikasi
                merk: this.props.merk,
                model: this.props.model,
                type: this.props.type,
                //Keterangan Tambahan
                keteranganTambahan: this.props.keteranganTambahan,
                kesesuaianBarang: this.props.kesesuaianBarang
            })
        }
    }

    ambilSeqIzin(e) {
        this.getFotoDetail(e)
        this.getKapasitas(e)
        this.getKemasan(e)
        this.getUnsurBarang(e)
    }

    tutupForm() {
        this.setState({
            showing: false,
        });
    }

    previewFoto(e) {
        const dataFotoCoy = [];
        this.setState({
            loadingFoto: true,
        });

        this.state.dataFoto.map((item, key) =>
            axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${item.urlFoto}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_HDFS}`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: "blob", //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: "jpg || jpeg"});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    dataFotoCoy.push({url: fileURL, keterangan: item.keterangan});
                    this.setState({
                        fotonih: dataFotoCoy,
                        loadingFoto: false,
                    });
                    console.log(this.state.fotonih);
                })
                .catch((error) => {
                    this.setState({
                        loadingFoto: false,
                        fotonih: []
                    })
                    console.log(error);
                })
        );
    }

    openslider() {
        this.setState({
            open: !this.state.open,
        });
    }

    opensliderutama() {
        this.setState({
            openutama: !this.state.openutama,
        });
    }

    closeslider() {
        this.setState({
            open: false,
        });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    BatalSimpan() {
        const {hidetambahbarang} = this.state;
        this.setState({
            hidetambahbarang: !hidetambahbarang,
            detailBarangPemeriksaan: false,
            idLhpDetail: "",
            uraian: "",
            jumlahSatuan: "",
            negaraAsal: "",
            kodeKemasan: "",
            idBarang: "",
            jumlahKemasan: "",
            panjangKemasan: "",
            kondisiBarang: "",
            asalNegaraBarang: "",
            tinggiKemasan: "",
            type: "",
            ukuranKemasan: "",
            merk: "",
            asalBarang: "",
            kodeKapasitas: "",
            kapasitas: "",
            kodeJenisSatuan: "",
            model: "",
            kodeJenisKemasan: "",
            lebarKemasan: "",
            kesesuaianBarang: "",
            keteranganTambahan: "",
            hasilFotoLhp: [],
        })
    }

    onChangeSiap = (e) => {
        console.log("radio checked", e.target.value);
        this.setState({
            kesesuaianBarang: e.target.value,
        });
    };

    async getAsalBarang(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/asal-barang/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    asalbarangHandler(event) {
        this.setState({
            kodeAsalBarangEdit: event.kodeAsalBarang,
            asalBarangEdit: event.asalBarang
        });
        console.log(this.state.kodeAsalBarang)
    }


    async getNegara(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/negara/all/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    negaraHandler(event) {
        this.setState({
            kodeNegaraEdit: event.kodeNegara,
            namaNegaraEdit: event.namaNegara
        });
        console.log(this.state.kodeAsalBarang)
    }

    async getJenis(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/kemasan/all/${e.toLowerCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    jenisHandler(event) {
        this.setState({
            kodeKemasanEdit: event.kodeKemasan,
            namaKemasanEdit: event.namaKemasan
        });
    }

    async getKapasitass(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/satuan-barang/all/`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    kapasitasHandler(event) {
        this.setState({
            kodeSatuanBarangEditBarang: event.kodeSatuanBarang,
            namaSatuanBarangEdit: event.namaSatuanBarang
        });
        // console.log(this.state.kodeAsalBarang)
    }

    async getKondisiBarang(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/kondisi-barang/lhp/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    kondisibarangHandler(event) {
        this.setState({
            kodeKondisiBarangEdit: event.kodeKondisiBarang,
            namaKondisiBarangEdit: event.namaKondisiBarang
        });
        // console.log(this.state.kodeAsalBarang)
    }

    async getKapasitasss(e) {
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/satuan-barang/all/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    getkapasitasHandler(event) {
        this.setState({
            kodeSatuanBarangEditKapasitas: event.kodeSatuanBarang,
            namaSatuanBarangEditKapasitas: event.namaSatuanBarang
        });
        // console.log(this.state.kodeAsalBarang)
    }

    render() {
        console.log('loading', this.state.loadingFoto)
        const {
            showing,
            //Kemasan
            jumlahKemasan,
            kodeJenisKemasan,
            ukuranKemasan,
            panjangKemasan,
            lebarKemasan,
            tinggiKemasan,
            namaKemasan,
            //Unsur Barang
            namaAsalBarang,
            namaKondisiBarang,
            namaNegara,
            asalBarang,
            //Kapasitas
            kapasitas,
            namaKapasitas,
            //Detail Barang
            kodeJenisSatuan,
            uraianBarang,
            jumlahSatuan,
            //Spesifikasi
            merk,
            model,
            type,
            //Keterangan Tambahan
            keteranganTambahan,
            kesesuaianBarang
        } = this.state;

        const {disableButton} = this.props

        return (
            <div>
                <div className={"kt-portlet"}>
                    <Skeleton loading={this.state.fetching} paragraph={{rows: 10}}>
                        {/* <div id={this.props.requiredDetail === true ? "error" : ""}> */}
                        <Card
                            size="small"
                            title="Detail Barang"
                            extra={
                                <Button type="primary" onClick={this.modal}>
                                    <Icon type="plus-square"/>
                                    Tambah Referensi Barang
                                </Button>
                            }
                        >
                            <Form>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Kategori Barang</p>
                                    </Col>
                                    <Col span={20}>
                                        <Select
                                            placeholder="Pilih Kategori"
                                            showArrow={false}
                                            notFoundContent={this.state.fetchingKodeJenisPungutan ? <Spin size="small" /> : null}
                                            showSearch
                                            style={{ width: "100%" }}
                                            optionFilterProp="children"
                                            onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                            // value={this.state.searchKodeJenisPungutan}
                                            // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.state.dataKodeJenisPungutan !== undefined ? this.state.dataKodeJenisPungutan.map(d => (
                                                <Option key={d.value}>{d.text}</Option>
                                            )) : ""}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Uraian Barang</p>
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            rows={4}
                                            name="uraianBarang"
                                            value={this.state.uraianBarang}
                                            onChange={(e) =>
                                                this.setState({uraianBarang: e.target.value})
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Jumlah Barang</p>
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            pattern="[0-9]+[.0-9]*"
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                            value={this.state.jumlahSatuan}
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            }
                                            style={{width: '100%'}}
                                            placeholder={"0.000"}
                                            onChange={this.onChangeData}
                                        />
                                        {this.state.visible ?
                                            <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                            </div> : null}

                                    </Col>
                                    <Col span={12}>
                                        <Select
                                            showSearch
                                            placeholder="Pilih satuan barang"
                                            optionFilterProp="children"
                                            style={{width: '100%'}}
                                            onSearch={this.getSatuanBarang}
                                            onChange={this.getValueSatuanBarang}
                                            loading={this.state.fetchingSatuan}
                                            value={this.state.kodeSatuanBarang}
                                        >
                                            {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Nilai Barang</p>
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            pattern="[0-9]+[.0-9]*"
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                            value={this.state.jumlahSatuan}
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            }
                                            style={{width: '100%'}}
                                            placeholder={"0.000"}
                                            onChange={this.onChangeData}
                                        />
                                        {this.state.visible ?
                                            <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                            </div> : null}

                                    </Col>
                                    <Col span={12}>
                                        <Select
                                            showSearch
                                            placeholder="Pilih Valuta"
                                            optionFilterProp="children"
                                            style={{width: '100%'}}
                                            onSearch={this.getSatuanBarang}
                                            onChange={this.getValueSatuanBarang}
                                            loading={this.state.fetchingSatuan}
                                            value={this.state.kodeSatuanBarang}
                                        >
                                            {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                        </Select>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row>
                                    <Col span={12}> 
                                        <Checkbox
                                            checked={this.state.checked}
                                            disabled={this.state.disabled}
                                            onChange={this.onChange}
                                        >
                                            Barang Tidak Datang Bersamaan
                                            {/* <p className={'text-red'}>Barang Tidak Datang Bersamaan</p> */}
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Form>
                            {/*<Button onClick={this.KirimData}></Button>*/}
                        </Card>
                        <br/>
                        <Card size="small" title="Hasil Pemeriksaan PerBarang">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Kesesuaian Barang</p>
                                    </Col>
                                    <Col span={18}>
                                        <Radio.Group
                                            name="kesiapanPeriksa"
                                            value={kesesuaianBarang}
                                            disabled={disableButton}
                                            onChange={this.onChangeSiap}
                                        >
                                            <Radio value="1">Sesuai</Radio>
                                            <Radio value="0">Tidak Sesuai</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Keterangan Lain</p>
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            name="keteranganTambahan"
                                            rows={4}
                                            value={keteranganTambahan}
                                            disabled={disableButton}
                                            style={{color: "black"}}
                                            onChange={e => {
                                                this.setState({keteranganTambahan: e.target.value})
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card title="Foto LHP Barang">
                            <Spin
                                spinning={this.state.loadingFoto}
                                tip={"Sedang memuat gambar ..."}
                            >
                                {this.state.dataKosong ? <Empty/> : null}
                                {this.state.fotonih.map((item, key) => (
                                    <img
                                        // key={key}
                                        alt="example"
                                        src={item.url}
                                        style={{
                                            width: 200,
                                            display: "inline-block",
                                            marginRight: "20px",
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
                                            style={{position: "absolute"}}
                                            autoplay={false}
                                        >
                                            {this.state.fotonih.map((item, key) => (
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
                        </Card>
                    </Skeleton>
                </div>
            </div>
        );
    }
}

export default detailBarangPemeriksaan;
