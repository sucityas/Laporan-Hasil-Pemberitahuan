import React, {Component} from 'react';
import {Card, Row, Col, Checkbox, Input, Table, Button, message} from 'antd';
import DaftarBarang from './LhpInstruksiPemeriksaan/DaftarBarang';
import moment from "moment";
import Notification from "./Component/Notifikasi";
import axios from "axios";
import Swal from "sweetalert2";

const {TextArea} = Input;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env;

class IntruksiPemeriksaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true,
        };
    }

    getTingkatPemeriksaan = () => {
        let idheader = localStorage.getItem('idHeader');
        fetch(`${REACT_APP_LHP}/instruksi-pemeriksaan/${idheader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.status === true) {
                    if (body.listData.length > 0) {
                        this.setState(
                            {
                                waktuMulai: body.listData[0].waktuMulai,
                                kodeTingkatPemeriksaan: body.listData[0].kodeTingkatPemeriksaan
                            });
                    } else {
                        this.setState(
                            {
                                waktuMulai: "",
                                kodeTingkatPemeriksaan: ""
                            });
                    }
                } else {
                    Notification(
                        "failed",
                        "Terjadi Kesalahan Pada Proses Pengambilan data"
                    );
                }
            });
    };

    getInfoPerintahLorong = () => {
        let idheader = localStorage.getItem('idHeader');
        fetch(`${REACT_APP_LHP}/info-perintah-lorong/${idheader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.status === true) {
                    this.setState(
                        {
                            loadingData: false,
                            dataKontainer: body.listData,
                        },
                        () => console.log('Info Perintah Lorong', this.state.dataKontainer)
                    );
                } else {
                    Notification(
                        "failed",
                        "Terjadi Kesalahan Pada Proses Pengambilan data"
                    );
                }
            });
        console.log(this.state.hasilKontainer);
    };

    getMemoPeriksa = () => {
        let idheader = localStorage.getItem('idHeader');
        fetch(`${REACT_APP_LHP}/memo-pemeriksaan/${idheader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.status === true) {
                    if (body.listData.length !== 0) {
                        this.setState(
                            {
                                loadingData: false,
                                memoDiperiksa: body.listData[0],
                                ajukanContohBarang: body.listData[0].ajukanContohBarang,
                                ajukanFoto: body.listData[0].ajukanFoto,
                                ajukanKatalogBarang: body.listData[0].ajukanKatalogBarang,
                                ajukanLabelBarang: body.listData[0].ajukanLabelBarang,
                                ajukanLabelKemasan: body.listData[0].ajukanLabelKemasan,
                                memoHeader: body.listData[0].memoHeader,
                            },
                            () => {
                                this.props.rekamMemo(false)
                            }
                        );
                    } else {
                        this.props.rekamMemo(true)
                    }
                } else {
                    Notification(
                        "failed",
                        "Terjadi Kesalahan Pada Proses Pengambilan data"
                    );
                    // setTimeout(function () {
                    //     window.location.href = "/lhp-pencarian-dokumen-status"; //will redirect to your blog page (an ex: blog.html)
                    // }, 5000); //window.location.href = '/BrowseEseal';
                }
            });
    };

    componentDidMount() {
        this.getTingkatPemeriksaan();
        this.getMemoPeriksa();
        this.getInfoPerintahLorong();
    }

    getIP = () => {
        const idHeader = localStorage.getItem("idHeader")
        const hide = message.loading('Sedang mengambil data..', 0);
        axios.get(`${REACT_APP_LHP}/get-respon?idHeader=${idHeader}&kodeRespon=2066&seri=IP`, {
            headers: {
                "Content-Type": "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(data => {
            const listData = data.data.listData[0]
            if (data.status === 200) {
                if (data.data.listData.length !== 0) {
                    this.setState({
                        idRespon: listData.idRespon
                    }, () => {
                        const idRespon = this.state.idRespon
                        if (this.state.idRespon !== '' || this.state.idRespon !== null) {
                            axios.get(`https://api.beacukai.go.id/parser/v1/report-respon/${idRespon}/responInhouse`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "beacukai-api-key": `56165f95-3bb7-4fd3-8a5d-e80b53ae1604`
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                            })
                                .then((response) => {
                                    setTimeout(hide, 2500);
                                    const validasiFile =
                                        response.data.split('.').pop() === 'jpg' ? 'image/jpg' : 'application/pdf';
                                    //Create a Blob from the PDF Stream
                                    const file = new Blob([response.data], {type: validasiFile});

                                    //Build a URL from the file
                                    const fileURL = URL.createObjectURL(file);
                                    //Open the URL on new Window
                                    window.open(fileURL);
                                    console.log('fileUrl', fileURL, file)
                                })
                                .catch((error) => {
                                    setTimeout(hide, 2500);

                                    if (error) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'File tidak tersedia!',
                                        })
                                    }
                                });
                        } else {
                            setTimeout(hide, 2500);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Id Respon tidak tersedia!',
                            })
                        }
                    })
                } else {
                    setTimeout(hide, 2500);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Id Respon tidak tersedia!',
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan silahkan cek koneksi internet anda!',
                })
            }
        })
    }

    render() {
        const {
            loadingData,
            dataKontainer,
            //Checker
            ajukanContohBarang,
            ajukanFoto,
            ajukanKatalogBarang,
            ajukanLabelBarang,
            ajukanLabelKemasan,
            memoHeader,
        } = this.state;
        const kodeDokumen = localStorage.getItem("kodeDokumen")
        let numb = 1;
        const columnPemeririksa = [
            {
                title: 'No.',
                dataIndex: ++this.count,
                render: () => numb++,
            },
            {
                title: 'No. Kontainer',
                dataIndex: 'nomorKontainer',
                key: 'nomorKontainer',
            },
            {
                title: 'Ukuran Kontainer',
                dataIndex: 'ukuranKontainer',
                key: 'ukuranKontainer',
            },
            {
                title: 'Perintah Lorong',
                dataIndex: 'perintahLorong',
                key: 'perintahLorong',
            },
        ];
        return (
            <div>
                <div>
                    <Card
                        size="small"
                        title="Instruksi Pemeriksaan Dari Sistem "
                        extra={
                            <>
                                {kodeDokumen === "23" || kodeDokumen === "25" || kodeDokumen === "261" || kodeDokumen === "262" || kodeDokumen === "27" ||
                                kodeDokumen === "40" || kodeDokumen === "41" || kodeDokumen === "16" || kodeDokumen === "28" || kodeDokumen === "33" ||
                                kodeDokumen === "30" ? null : (
                                    <div>
                            <span href="">Waktu instruksi pemeriksaan : <p style={{
                                fontWeigh: "bold",
                                color: "black"

                            }}>{this.state.waktuMulai == null ? 'waktu tidak tersedia' : moment(this.state.waktuMulai).format("DD-MM-YYYY H:mm:ss")}</p></span>
                                        <Button onClick={this.getIP} type={'primary'}>Cetak IP</Button><br/>
                                    </div>
                                )}

                            </>
                        }
                        style={{width: '100%'}}
                    >
                        <div>
                            <Row className="mb-2">
                                <Col span={5}>Tingkat Pemeriksaan</Col>
                                <Col span={1}>:</Col>
                                <Col span={18}>
                                    <b style={{fontSize: 20}}>{this.state.kodeTingkatPemeriksaan}%</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}>Kontainer yang harus diperiksa</Col>
                                <Col span={1}>:</Col>
                                <Col span={18}>
                                    <Table
                                        columns={columnPemeririksa}
                                        loading={loadingData}
                                        dataSource={dataKontainer}
                                        pagination={false}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card>
                        <Card
                            type="inner"
                            size="small"
                            title="Memo Pemeriksaan"
                            style={{width: '99%'}}
                        >
                            <Row>
                                <Col lg={12} md={24}>
                                    <Checkbox.Group
                                        // onChange={onChange}
                                        // value={this.props.input.memo_pemeriksaan}
                                    />
                                    <Col lg={15} md={24}>
                                        <Checkbox
                                            checked={ajukanContohBarang == 'Y' ? true : false}
                                        >
                                            Ajukan contoh barang jika memungkinkan
                                        </Checkbox>
                                        <br/>

                                        <Checkbox
                                            checked={ajukanLabelKemasan == 'Y' ? true : false}
                                            // value={memo_pemeriksaan.ajukanLabelKemasan}
                                            // onChange={this.handleInputChange}
                                            style={{marginLeft: 0}}
                                        >
                                            Ajukan label kemasan
                                        </Checkbox>
                                        <br/>

                                        <Checkbox
                                            checked={ajukanKatalogBarang == 'Y' ? true : false}
                                            // value={memo_pemeriksaan.ajukanKatalogBarang}
                                            style={{marginLeft: 0}}
                                            // onChange={this.handleInputChange}
                                        >
                                            Ajukan katalog barang jika ada
                                        </Checkbox>
                                        <br/>
                                    </Col>

                                    <Col lg={9} md={24}>
                                        <Checkbox
                                            checked={ajukanFoto == 'Y' ? true : false}
                                            // value={memo_pemeriksaan.ajukanFoto}
                                            // onChange={this.handleInputChange}
                                        >
                                            Ajukan foto
                                        </Checkbox>{' '}
                                        <br/>
                                        <Checkbox
                                            checked={ajukanLabelBarang == 'Y' ? true : false}
                                            // value={memo_pemeriksaan.ajukanLabelBarang}
                                            style={{marginLeft: 0}}
                                            // onChange={this.handleInputChange}
                                        >
                                            Ajukan label barang
                                        </Checkbox>
                                    </Col>
                                </Col>

                                <Col lg={12} md={24}>
                                    <p>Memo Header :</p>
                                    <TextArea
                                        rows={4}
                                        style={{backgroundColor: '#fff566'}}
                                        // onChange={this.handleInputChange}
                                        value={memoHeader}
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <DaftarBarang/>
                        {/*<LhpDaftarBarang />*/}
                    </Card>
                </div>
            </div>
        );
    }
}

export default IntruksiPemeriksaan;
