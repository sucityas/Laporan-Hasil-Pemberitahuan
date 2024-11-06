import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {HashRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {
    Button,
    Col,
    Row,
    Icon,
    Card,
    message, Modal, Form, Upload, Table, Input,
} from 'antd';
import * as moment from 'moment';
import DetailBarang from './DetailBarang'
import Kemasan from './Kemasan'
import UnsurBarang from './UnsurBarang'
import Spesifikasi from './Spesifikasi'
import Kapasitas from './Kapasitas'
import Tambahan from './Tambahan'

import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import axios from "axios";
import Notification from "../../../mita-aeo/aeo/PenelitianPerijinanAeo/component/Notifikasi";
import Swal from "sweetalert2";

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


class TambahBarang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            open: false,
            openutama: false,
            berkasKontrakUtama: [],
            berkasKontrakListUtama: [],
            datafotoUtama: [],

        }
        this.opensliderutama = this.opensliderutama.bind(this);
        this.KirimData = this.KirimData.bind(this);
        this.detailBarang = React.createRef();
        this.kemasan = React.createRef();
        this.unsurBarang = React.createRef();
        this.spesifikasi = React.createRef();
        this.kapasitas = React.createRef();
        this.tambahan = React.createRef();


    }

    beforeImageUploadUtama = (file) => {
        this.setState({
            berkasKontrakUtama: [file],
        });
        return false;
    };

    onAddImageUtama = () => {
        if (this.state.berkasKontrakUtama.length === 0) return;
        this.setState(
            (prevState) => ({
                berkasKontrakListUtama: [
                    ...prevState.berkasKontrakListUtama,
                    {file: prevState.berkasKontrakUtama[0], path: "lhp_kontainer"},
                ],
                datafotoUtama: [
                    ...prevState.datafotoUtama,
                    {
                        nama: prevState.berkasKontrakUtama[0].name,
                        data: URL.createObjectURL(prevState.berkasKontrakUtama[0]),
                        urlFoto: "#",
                        keterangan: this.state.KeteranganFotoUtama,
                        lokasiRekamFoto: "lhp_kontainer",
                    },
                ],
            }),
            () => this.setState({berkasKontrakUtama: [], KeteranganFotoUtama: null})
        );
    };

    onUploadImageUtama = () => {
        const registerFoto = () => {
            const resAxios = {
                url: `${REACT_APP_LHP}/v1/UploadFoto`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_LHP,
                    },
                },
            };
            return axios
                .post(
                    resAxios.url,
                    {filterFotoList: this.state.datafotoUtama},
                    resAxios.options
                )
                .then(data => {
                    const foto = data.data.data
                    console.log(foto)
                    this.setState({
                        hasilFotoLhp: foto,
                    });
                    console.log(this.state.hasilFoto)
                }).catch(() => alert("Gagal"));
            ;
        };

        const uploadProcess = (data, index) => {
            let stateFotoUtama = [...this.state.datafotoUtama];
            console.log(stateFotoUtama);
            const resAxios = {
                url: `${REACT_APP_HDFS}/v1/hdfs/upload`,
                options: {
                    headers: {
                        "Beacukai-Api-Key": REACT_APP_SECRET_KEY_HDFS,
                    },
                },
            };
            return axios
                .post(resAxios.url, data, resAxios.options)
                .then(({data}) => {
                    const urlFoto = data.item;
                    stateFotoUtama[index] = {...stateFotoUtama[index], urlFoto};
                })
                .catch(() => alert("Gagal"));
        };

        const promiseLoopData = this.state.berkasKontrakListUtama.map(
            ({file, path}, index) => {
                return new Promise((y, n) => {
                    let uploadData = new FormData();
                    uploadData.set("file", file);
                    uploadData.set("path", path);
                    uploadProcess(uploadData, index)
                        .then(() => y())
                        .catch(() => n());
                });
            }
        );

        Promise.all(promiseLoopData).then(() => {
            registerFoto();
            this.setState({
                modalUploadUtama: false,
            });
        });
    };

    handleCancelKontrakUtama = () => {
        this.setState({
            modalUploadUtama: false,
        });
    };

    modalUploadUtama = () => {
        this.setState({
            modalUploadUtama: true,
            berkasKontrakUtama: [],
            keteranganfotoUtama: null,
        });
    };

    opensliderutama() {
        this.setState({
            openutama: !this.state.openutama,
        });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    async KirimData() {
        let idheader = localStorage.getItem("idHeader");
        console.log("klik ini");
        let fotoLhpBarang = []
        this.state.hasilFotoLhp.map(
            (item, index) => {
                fotoLhpBarang.push({
                    idLhpFotoBarang: item.idLhpFoto,
                });
            }
        );
        let body = {
            "asalBarang":this.unsurBarang.current.state.kodeAsalBarang,
            "asalNegaraBarang":this.unsurBarang.current.state.kodeNegara,
            fotoLhpBarang,
            "idLhpHeader":"916d2372-94e6-4937-9115-c5b3bd27c7fa",
            "jumlahKemasan":this.kemasan.current.state.jumlahKemasan,
            "jumlahSatuan":this.detailBarang.current.state.jumlahSatuan,
            "keteranganTambahan":this.tambahan.current.state.keteranganTambahan,
            "kodeJenisKemasan":this.kemasan.current.state.kodeKemasan,
            "kodeJenisSatuan":this.detailBarang.current.state.kodeJenisSatuan,
            "kondisiBarang":this.unsurBarang.current.state.kodeKondisiBarang,
            "lebarKemasan":this.kemasan.current.state.lebarKemasan,
            "merk":this.spesifikasi.current.state.merk,
            "model":this.spesifikasi.current.state.model,
            "panjangKemasan":this.kemasan.current.state.panjangKemasan,
            "seriBarang":"",
            "tinggiKemasan":this.kemasan.current.state.tinggiKemasan,
            "type":this.spesifikasi.current.state.type,
            "ukuranKemasan":this.kemasan.current.state.ukuranKemasan,
            "uraianBarang":this.detailBarang.current.state.uraianBarang,
            "kodeKapasitas":this.kapasitas.current.state.kodeSatuanBarang,
            "kapasitas":this.kapasitas.current.state.kapasitas
        };
        console.log(body);
        swalWithBootstrapButtons.fire({
            title: 'Apakah Anda Sudah Yakin??',
            text: "Pastikan Data Anda Sudah Benar!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Tidak!',
            confirmButtonText: 'Ya!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                console.log(result)
                console.log("test")
                fetch(`${REACT_APP_LHP}/rekam-detail-lhp`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, cors, *same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
                    headers: {
                        'Content-Type': 'application/json',
                        "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
                    },
                    body: JSON.stringify(body)// body data type must match "Content-Type" header
                })
                    .then(response => response.json())
                    .then(body => {
                        this.setState({
                            idLhpHeader: body.idLhpHeader
                        });
                        if (body.status == true) {
                            Notification('success', body.message)
                            // setTimeout(function () {
                            //     window.location.href = '/lhp-perekaman-new' //will redirect to your blog page (an ex: blog.html)
                            // }, 5000);//window.location.href = '/BrowseEseal';
                        } else {
                            Notification('failed', 'Terjadi Kesalahan Pada Proses Penyimpanan')
                            this.setState({iconLoading: false});
                        }
                        console.log(this.state.idLhpHeader)

                    });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
                this.setState({iconLoading: false})
            }
        })
    }


    render() {
        const uploadButton = (
            <Button onClick={this.modalUploadUtama}>
                <i className="fas fa-upload"></i> Tambah Foto Barang</Button>

        );
        const {modalUploadUtama} = this.state;

        const columnsutama = [
            {
                title: "Nama File",
                dataIndex: "nama",
                key: "namautama",
            },
            {
                title: "Keterangan",
                dataIndex: "keterangan",
                key: "keteranganutama",
            },
        ];
        return (

            <div>
                <div className="kt-portlet__body">

                    <div className="kt-section kt-section--last">

                        <Row className="mb-2" gutter={8}>
                            <Col span={24}>
                                <DetailBarang ref={this.detailBarang}/>
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={8}>
                            <Col span={24}>
                                <Kemasan ref={this.kemasan}/>
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={8}>
                            <Col span={24}>
                                <UnsurBarang ref={this.unsurBarang}/>
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={8}>
                            <Col lg={12} md={24} style={{maxHeight: 200, minHeight: 200}}>
                                <Spesifikasi ref={this.spesifikasi}/>
                            </Col>
                            <Col lg={12} md={24} style={{maxHeight: 200, minHeight: 200}}>
                                <Kapasitas ref={this.kapasitas}/>
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={8}>
                            <Col span={24}>
                                <Tambahan ref={this.tambahan}/>
                            </Col>
                        </Row>

                        <Row gutter={8}>
                            <Col span={24}>
                                <Card title="Foto LHP Barang">
                                    {/*Buat Button Upload*/}
                                    {uploadButton}
                                    <br/>
                                    <br/>
                                    <br/>
                                    {this.state.datafotoUtama.map((item, key) => (
                                        <img
                                            key={key}
                                            alt="example"
                                            src={item.data}
                                            style={{width: 200, display: "inline-block", marginRight: "20px"}}
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
                                                {this.state.datafotoUtama.map((item, key) => (
                                                    <Slide
                                                        // key={key}
                                                        media={<img src={item.data}/>}
                                                        mediaBackgroundStyle={{
                                                            backgroundColor: blue[400],
                                                        }}
                                                        style={{backgroundColor: blue[600]}}
                                                        title={item.nama}
                                                        subtitle={item.keterangan}
                                                    />
                                                ))}
                                            </AutoRotatingCarousel>
                                        ) : null}
                                    </Col>
                                    <Modal
                                        visible={modalUploadUtama}
                                        title="Tambah Foto Barang"
                                        width={"50%"}
                                        footer={[
                                            <Button
                                                key="back"
                                                type={"danger"}
                                                onClick={this.handleCancelKontrakUtama}
                                            >
                                                <i className="fas fa-times-circle"/>
                                                &nbsp; Batal
                                            </Button>,
                                            <Button key="submit" type="primary" onClick={this.onUploadImageUtama}>
                                                <i
                                                    className="fa fa-save"
                                                    style={{lineHeight: "1", marginRight: "5px"}}
                                                />
                                                &nbsp; Simpan
                                            </Button>,
                                        ]}
                                    >
                                        <Form
                                            labelCol={{span: 4}}
                                            wrapperCol={{span: 20}}
                                            labelAlign="left"
                                        >
                                            <Form.Item label="Upload File">
                                                <Upload
                                                    beforeUpload={this.beforeImageUploadUtama}
                                                    onRemove={() => this.setState({berkasKontrakUtama: []})}
                                                    fileList={this.state.berkasKontrakUtama}
                                                >
                                                    <Button icon="upload">Upload</Button>
                                                </Upload>
                                            </Form.Item>
                                            <Form.Item label="Keterangan">
                                                <TextArea
                                                    value={this.state.KeteranganFotoUtama}
                                                    onChange={(e) =>
                                                        this.setState({KeteranganFotoUtama: e.target.value})
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button onClick={this.onAddImageUtama} icon="plus">
                                                    Tambah
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <Table
                                            dataSource={this.state.datafotoUtama}
                                            columns={columnsutama}
                                            rowKey={"num"}
                                            size="middle"
                                        />
                                    </Modal>
                                </Card>
                            </Col>
                        </Row>

                        <Card>
                            <Row type="flex" justify="end" gutter={8}>
                                <Col>
                                    <Button type="primary" onClick={this.KirimData}><Icon type="save"/>Simpan Detail
                                        Barang</Button>
                                </Col>
                                <Col>
                                    <Button type="danger" ><Icon type="close-circle"/>Batal</Button>
                                </Col>
                            </Row>
                        </Card>

                    </div>

                </div>

            </div>

        )
    }
}

export default TambahBarang;
