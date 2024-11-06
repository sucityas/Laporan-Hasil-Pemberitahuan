import { Col, DatePicker, Input, Row, Skeleton, Select } from 'antd';
import moment from 'moment';
import axios from "axios";
import SweetAlert from "sweetalert2";
import React, { Component } from 'react';

const { TextArea } = Input;
const { Option, OptGroup } = Select;
const {
    REACT_APP_PERIJINAN,
    REACT_APP_SECRET_KEY_PERIJINAN,
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
} = process.env;

class DetailBlokirForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        //     this.state={
        //         nomorSkepBlokir: this.props.data ? this.props.data.nomorSkep : null ,
        //         tanggalBlokir: this.props.data ? moment(this.props.data.tanggalBlokir, 'YYYY-MM-DD').format("DD-MM-YYYY")  : "",
        //         unitPemblokiran: this.props.data ? this.props.data.kantorBlokir : null ,
        //         kategoriBlokir: this.props.data ? this.props.data.kategoriBlokir : null ,
        //         catatan: this.props.data ? this.props.data.catatanPemblokiran : null
        //     }
    }

    componentDidMount() {

        const { data } = this.props.data;
        // console.log(data, 'data lempar')
        // console.log(data.seqIzin, 'data seqIzin')
        // const isLocalhost =
        //     window.location.host == "ceisa40-dev.customs.go.id" || "localhost:3150";
        axios
            .get(`${REACT_APP_PERIJINAN}/pemblokiran/noskep/${data.seqIzin}`, {
                // headers: {
                //     [isLocalhost
                //         ? "beacukai-api-key"
                //         : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
                //     // Authorization: "Bearer " + token,
                // },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'accept': 'application/json',
                    'beacukai-API-Key': `${REACT_APP_SECRET_KEY_PERIJINAN}`,
                    "cache-control": "no-cache"
                },
            })
            .then(res => {
                // const skep = data.data.data;
                // if (data.data.item.length > 0) {
                this.setState({
                    skepBlokir: res.data.data,
                    fetching: false
                });
                // } else 
                // {
                //     this.setState({
                //         loadingnoskep: false,
                //     });
                //     SweetAlert.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "Kantor tidak ditemukan silahkan tunggu beberapa saat lagi!",
                //     });
                // }
                console.log(this.state.skepBlokir, 'data skep blokir')
            })
            // console.log(this.state.skepBlokir, 'data skep blokir')
            .catch((err) => {
                if (err) {
                    this.setState({
                        loadingnoskep: false,
                    });
                    SweetAlert.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Skep pemblokiran tidak ditemukan silahkan tunggu beberapa saat lagi!",
                    });
                }
            });


        // this.getNoSkep();
        // this.getNomorSkep();


    }

    // getNoSkep = () => {
    //     this.setState({
    //         loadingnoskep: true,
    //     });
    //     axios
    //         .get(`http://10.102.104.163:8989/pemblokiran/noskep/${this.props.data.seqIzin}`, {
    //             // headers: {
    //             //     [isLocalhost
    //             //       ? "beacukai-api-key"
    //             //       : "customs-api-key"]: `${REACT_APP_SECRET_KEY_PERIJINAN}`,
    //             //     Authorization: "Bearer " + token,
    //             //   },
    //         })
    //         .then((data) => {
    //             const skep = data.data.data;
    //             if (skep.length > 0) {
    //                 this.setState({
    //                     skepBlokir: skep,
    //                     loadingnoskep: false,
    //                 });
    //             } else {
    //                 this.setState({
    //                     loadingnoskep: false,
    //                 });
    //                 SweetAlert.fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: "Kantor tidak ditemukan silahkan tunggu beberapa saat lagi!",
    //                 });
    //             }
    //         })
    //         // console.log(this.state.skepBlokir, 'data skep blokir')
    //         .catch((err) => {
    //             if (err) {
    //                 this.setState({
    //                     loadingnoskep: false,
    //                 });
    //                 SweetAlert.fire({
    //                     icon: "error",
    //                     title: "Oops...",
    //                     text: "Kantor tidak ditemukan silahkan tunggu beberapa saat lagi!",
    //                 });
    //             }
    //         });
    // };

    getNomorSkep = (e) => {
        this.setState({
            nomorSkep: e,
        });
        this.props.onSelectNomorSkep(e)

        axios
            .get(`${REACT_APP_PERIJINAN}/pemblokiran/dataSkep?nomorSkep=${e}`
                , {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        'accept': 'application/json',
                        'beacukai-API-Key': `${REACT_APP_SECRET_KEY_PERIJINAN}`,
                        "cache-control": "no-cache"
                    },
                })
            .then(res => {
                // const skep = data.data.data;
                // if (data.data.item.length > 0) {
                this.setState({
                    noSkepBlokir: res.data.data[0].nomorSkep,
                    tglSkepPemblokiran: res.data.data[0].tanggalBlokir,
                    idPerusahaanPajak: res.data.data[0].idPerusahaanPajak,
                    catatanPemblokiran: res.data.data[0].alasan,
                    uraian: res.data.data[0].uraian,
                    namaKantor: res.data.data[0].namaKantor,
                    idPerusahaanBlokir: res.data.data[0].idPerusahaanBlokir,
                    fetching: false
                });

                this.props.onSelectIdPerusahaanPajak(this.state.idPerusahaanBlokir)
                // } else 
                // {
                //     this.setState({
                //         loadingnoskep: false,
                //     });
                //     SweetAlert.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "Kantor tidak ditemukan silahkan tunggu beberapa saat lagi!",
                //     });
                // }
                // console.log(this.state.tglSkepPemblokiran, 'data tgl skep blokir')
            })

            // console.log(this.state.skepBlokir, 'data skep blokir')
            .catch((err) => {
                if (err) {
                    this.setState({
                        loadingnoskep: false,
                    });
                    // SweetAlert.fire({
                    //     icon: "error",
                    //     title: "Oops...",
                    //     text: "Skep pemblokiran tidak ditemukan silahkan tunggu beberapa saat lagi!",
                    // });
                }
            });



        console.log(e, 'tes nomor skep')
    };



    render() {
        const
            nomorSkepBlokir = this.props.data ? this.props.data.nomorSkep : null,
            tanggalBlokir = this.props.data ? moment(this.props.data.tanggalBlokir, 'YYYY-MM-DD').format("DD-MM-YYYY") : "",
            unitPemblokiran = this.props.data ? this.props.data.kantorBlokir : null,
            kategoriBlokir = this.props.data ? this.props.data.kategoriBlokir : null,
            catatan = this.props.data ? this.props.data.catatanPemblokiran : null;
        const { loading } = this.props
        return (
            <div>
                {
                    loading ?
                        <Skeleton active paragraph={{ rows: 8 }} />
                        :
                        <>
                            <hr />
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            No. Skep Pemblokiran
                                        </Col>
                                        {/* <Col span={12}>
                                            <Input
                                                value={nomorSkepBlokir}
                                                disabled={this.props.disabled}

                                            />
                                        </Col> */}
                                        <Col span={14}>
                                            <Select
                                                style={{ width: '100%' }}
                                                showSearch
                                                placeholder="Pilih Skep Blokir"
                                                optionFilterProp="children"
                                                onChange={this.getNomorSkep}
                                                loading={this.state.loadingnoskep}
                                                value={this.state.nomorSkep}
                                            >
                                                {this.state.skepBlokir != undefined ?
                                                    this.state.skepBlokir.map((item, index) => (
                                                        <Option key={index} value={item.nomorSkep}>
                                                            {item.nomorSkep}
                                                        </Option>
                                                    )) : null}
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row gutter={10}>
                                        <Col span={8} >
                                            Tgl. Skep Pemblokiran
                                        </Col>
                                        <Col span={16}>
                                            <DatePicker
                                                value={moment(this.state.tglSkepPemblokiran, "DD-MM-YYYY")}
                                                style={{ width: '100%' }}
                                                format={"DD-MM-YYYY"}
                                                disabled={this.props.disabled}

                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={4}>
                                    Kategori Blokir
                                </Col>
                                <Col span={16}>
                                    <Input
                                        width={"100%"}
                                        value={this.state.uraian}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={4}>
                                    Unit Pemblokiran
                                </Col>
                                <Col span={16}>
                                    <Input
                                        value={this.state.namaKantor}
                                        disabled={this.props.disabled}
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={4}>
                                    Catatan Pemblokiran
                                </Col>
                                <Col span={16}>
                                    <TextArea
                                        value={this.state.catatanPemblokiran}
                                        rows={4}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>
                        </>
                }
            </div>
        );
    }
}

export default DetailBlokirForm;
