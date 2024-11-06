import React, {Component} from "react";
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
    DatePicker,
    Skeleton,
    Spin,
    Select,
    Upload,
} from "antd";
// import { PlusOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Swal from "sweetalert2";
import GlobalVariable from "../../../../../helpers/GlobalVariable";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import axios from "axios";
import Notification from "../../Component/Notifikasi";
import QuickSearch from "../../Component/QuickSearch";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

let idLhpHeader = localStorage.getItem("idLhpHeader");

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env;

const {blue, green} = require("@material-ui/core/colors");
const {TextArea} = Input;

class DetailPemeriksaan extends Component {
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
        };
        this.opensliderutama = this.opensliderutama.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async getDokumen() {
        let idLhpHeader = localStorage.getItem("idLhpHeader")
        let idHeader = JSON.parse(localStorage.getItem("idHeader"))
        // console.log("from LHP",idHeader)
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
        let idLhpDetail = e.idLhpDetail;
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
                    dataFoto: body.listData,
                });
                console.log('[debug] , foto', this.state.dataFoto);
                if (body.status === true) {
                    this.previewFoto(e);
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

    async getKapasitas(e) {
        let idLhpDetail = e.idLhpDetail;
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
        let idLhpDetail = e.idLhpDetail;
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
        let idLhpDetail = e.idLhpDetail;
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
                if(body.listData.length === 0){
                    this.setState({
                        loading: false,
                        namaAsalBarang: "Data Kosong",
                        asalBarang : "Data Kosong",
                        namaNegara: "Data Kosong",
                        namaKondisiBarang: "Data Kosong",
                    });
                }else{
                    this.setState({
                        loading: false,
                        namaAsalBarang: body.listData[0].namaAsalBarang,
                        asalBarang : body.listData[0].asalBarang,
                        namaNegara: body.listData[0].namaNegara,
                        namaKondisiBarang: body.listData[0].namaKondisiBarang,
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
        const idLhp = localStorage.getItem("idLhpHeader");
        if (localStorage.getItem("idLhpHeader") == null) {
            console.log("no doing");
        } else {
            console.log("Component Did Mount");
            this.setState({loading: true});
            this.getDokumen();
            this.setState({
                idLhp: idLhp,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const data = localStorage.getItem("idLhpHeader");
        if (data != this.state.idLhp) {
            console.log("Component Did Update");
            this.setState({loading: true});
            this.getDokumen();
            this.setState({
                idLhp: data,
            });
        }
    }

    ambilSeqIzin(e) {
        console.log(e)
        this.setState({
            showing: true,
            //Detail Barang
            uraianBarang: e.uraianBarang,
            kodeJenisSatuan: e.kodeJenisSatuan,
            jumlahSatuan: e.jumlahSatuan,
            //Spesifikasi
            merk: e.merk,
            model: e.model,
            type: e.type,
            //Keterangan tambahan
            keteranganTambahan: e.keteranganTambahan,
            kesesuaianBarang: e.kesesuaianBarang,
        });
        // console.log(e.fotoBarangs.map((item, key) => item.urlFoto));
        //
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

    render() {
        const columnsdetail = [
            {
                title: "Uraian Barang Hasil Pemeriksaan",
                dataIndex: "uraianBarang",
            },
            {
                title: "Jumlah",
                dataIndex: "jumlahSatuan",
            },
            {
                title: "Asal Barang",
                dataIndex: "namaNegara",
            },
            {
                title: "Merek",
                dataIndex: "merk",
            },
            {
                title: "Sesuai",
                dataIndex: "kesesuaianBarang",
                key : "kesesuaianBarang",
                render : (key, record) => {
                    if(key === '1'){
                        return 'Sesuai'
                    }else{
                        return 'Tidak Sesuai'
                    }
                }
            },
            {
                title: "Catatan Hasil Pemeriksaan",
                dataIndex: "keteranganTambahan",
            },
            {
                title: "Seri Barang Dok",
                dataIndex: "seriBarangAsal",
            },
            {
                title: "Uraian Barang Dok",
                dataIndex: "uraianBarang",
            },
            {
                title: "Aksi",
                dataIndex: "aksi",
                key: "aksi",
                render: (key, record, e) => (
                    <Button
                        type="primary"
                        onClick={(evt) => this.ambilSeqIzin(record, evt)}
                    >
                        <Icon type="eye" />
                    </Button>
                ),
            },
        ];
        const {
            showing,
            //Detail Barang
            kodeJenisSatuan,
            uraianBarang,
            jumlahSatuan,
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
            //Spesifikasi
            merk,
            model,
            type,
            //Kapasitas
            kapasitas,
            namaKapasitas,
            //Keterangan Tambahan
            keteranganTambahan,
            kesesuaianBarang

        } = this.state;

        return (
            <div>
                <div className="kt-portlet">
                    <div className="kt-portlet__body">
                        <Table
                            dataSource={this.state.hasil}
                            rowKey={"id"}
                            size="small"
                            pagination={false}
                            columns={columnsdetail}
                            loading={this.state.loading}
                            bordered
                        />
                    </div>
                </div>
                {showing ? (
                    <div className={"kt-portlet"}>
                        <Card size="small" title="Detail Barang">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Uraian Barang</p>
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            rows={4}
                                            name="uraianBarang"
                                            value={uraianBarang}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Jumlah Barang</p>
                                    </Col>
                                    <Col span={20}>
                                        <Input
                                            style={{
                                                color: "black",
                                                width: "15%",
                                                marginRight: "5px",
                                            }}
                                            name="jumlahSatuan"
                                            value={jumlahSatuan}
                                        />
                                        <Input
                                            style={{color: "black", width: "30%"}}
                                            value={kodeJenisSatuan}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card size="small" title="Kemasan">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={3}>
                                        <p>Jumlah</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input name="jumlahKemasan" value={jumlahKemasan}/>
                                    </Col>
                                    <Col span={3}>
                                        <p>Panjang</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input name="panjangKemasan" value={panjangKemasan}/>
                                    </Col>
                                </Row>

                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={3}>
                                        <p>Jenis</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input value={namaKemasan}/>
                                    </Col>

                                    <Col span={3}>
                                        <p>Lebar</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input name="lebarKemasan" value={lebarKemasan}/>
                                    </Col>
                                </Row>

                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={3}>
                                        <p>Ukuran</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input name="ukuranKemasan" value={ukuranKemasan}/>
                                    </Col>
                                    <Col span={3}>
                                        <p>Tinggi</p>
                                    </Col>
                                    <Col span={9}>
                                        <Input name="tinggiKemasan" value={tinggiKemasan}/>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card size="small" title="Unsur Barang">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col lg={3}>
                                        <p>Asal Barang</p>
                                    </Col>
                                    <Col lg={14}>
                                        <Input value={namaAsalBarang}/>
                                    </Col>
                                    <Col lg={6}></Col>
                                    <Col lg={6}>
                                        {asalBarang == 1 ? <Input value={namaNegara}/> : null}
                                    </Col>
                                    <Col lg={6}></Col>
                                </Row>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col lg={3}>
                                        <p>Kondisi</p>
                                    </Col>
                                    <Col lg={6} md={8}>
                                        <Input value={namaKondisiBarang}/>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card size="small" title="Spesifikasi">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Merk</p>
                                    </Col>
                                    <Col span={20}>
                                        <Input
                                            name="merk"
                                            value={merk}
                                            style={{color: "black", marginRight: "5px"}}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Model</p>
                                    </Col>
                                    <Col span={20}>
                                        <Input
                                            name="model"
                                            value={model}
                                            style={{color: "black", marginRight: "5px"}}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Type</p>
                                    </Col>
                                    <Col span={20}>
                                        <Input
                                            name="type"
                                            value={type}
                                            style={{color: "black", marginRight: "5px"}}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card size="small" title="Kapasitas">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col lg={8} md={6}>
                                        <Input
                                            name="kapasitas"
                                            value={kapasitas}
                                            style={{color: "black"}}
                                        />
                                    </Col>
                                    <Col lg={16} md={18}>
                                        <Input
                                            name="nama_kapasitas"
                                            value={namaKapasitas}
                                            style={{color: "black"}}
                                        />
                                    </Col>
                                </Row>
                            </Form>
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
                                            style={{color: "black"}}
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
                        <Button
                            type="danger"
                            onClick={this.tutupForm.bind(this)}
                            ghost
                            style={{width: 220}}
                        >
                            <i className="fa fa-times" style={{marginRight: 8}}/>
                            Tutup
                        </Button>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default DetailPemeriksaan;
