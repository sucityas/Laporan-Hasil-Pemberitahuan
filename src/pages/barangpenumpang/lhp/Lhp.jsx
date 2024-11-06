import React, { Component } from "react";
import {
    Menu,
    Button,
    Icon,
    Card,
    Row,
    Col,
    Breadcrumb,
    Dropdown,
    Tabs,
    Select,
    Form,
    Input,
    message,
    Modal,
    Table,
    Pagination,
    DatePicker,
    Result,
    Spin
} from "antd";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import LhpBAP from "./LhpBAP";
import LhpDetailPemeriksaan from "./LhpDetailPemeriksaan";
import IntruksiPemeriksaan from "./IntruksiPemeriksaan"
import moment from "moment";
import axios from "axios";
import GlobalVariable from "../../../helpers/GlobalVariable";
import Swal from "sweetalert2";
import PermohonanIzin from "./DetailIzin/PermohonanIzinDetail"
// import PenindakanBC22 from "./PenindakanBC22"
import LHP from "./LhpDetailPemeriksaan"
import LHPBC22 from "./LhpDetailPemeriksaanBC22"
import LHPBC32 from "./LhpDetailPemeriksaanBC32"
import { Fragment } from "react";
import PDFViewer from "./pdfViewerBC34";


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
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY,
    REACT_APP_API_BARANG_PENUMPANG_REPORT,
    REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY
} = process.env;

const { TabPane } = Tabs;
const { TextArea } = Input;

class Lhp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idLhpHeader: null,
            flagDisable: 0,
            pagination: {},
            dataBpHeader: null,
            dataKeluarga: null,
            dataHeader: null,
            dataBarang: null,
            showDataKeluarga: false,
            kodeDokumen: null
        };
    }

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
                    dataBarang: !(res.data.barang === null || res.data.barang === undefined) ? res.data.barang : null,
                    dataPemilik: !(res.data.pemilik === null || res.data.pemilik === undefined) ? res.data.pemilik : null,
                    showDataKeluarga: res.data.header.kodeDokumen === '22' ? true : false,
                    pagination: res.data.length,
                    kodeDokumen: res.data.header.kodeDokumen,
                    idHeader: !(res.data.header === null || res.data.header === undefined) ? res.data.header.idHeader : null,
                }, () => {
                    // console.log(this.state.hasil)
                });
            })
            .catch((err) => {
                swalWithBootstrapButtons.fire(
                    "Oops!",
                    `${err.message}`,
                    "error"
                );
                this.setState({ loading: false });
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    batal = () => {
        localStorage.clear();
        window.location.href = "/barang-penumpang/lhp";
    }

    componentDidMount() {
        this.getDataDokumen();
        this.setState({
            flagDisable: localStorage.getItem('flagBap')
        });
    }

    downloadBap(e) {
        this.setState({
            visibleBap: true,
            loadingPdfBap: true
        });

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG_REPORT}/formulir/BAP/${this.state.idLhp}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY}`,
            },
            // 'Access-Control-Allow-Origin': '*',
            responseType: 'blob', //Force to receive data in a Blob Format
        })
            .then((res) => {
                const fileTemp = new Blob([res.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(fileTemp);

                this.setState({
                    pdfUrlBap: fileURL,
                    loadingPdfBap: false,
                });
            })
            .catch((err) => {
                console.log(
                    "Get File Error!",
                    err
                );

                this.setState({
                    loadingPdfBap: false,
                });
            });

    }

    handleSendEmail = (e) => {
        swalWithBootstrapButtons
            .fire({
                title: "Kirim Email Perbaikan Dokumen?",
                text: "Pastikan Data Anda Sudah Benar!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Tidak!",
                confirmButtonText: "Ya!",
                reverseButtons: true,
            })
            .then((result) => {

                if (result.value) {
                    const uploadData = message.loading("Email anda sedang dikirim...", 0);
                    axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/respon/sendemail/?emailTo=${this.state.dataHeader.email}&idHeader=${localStorage.getItem("idHeader")}&kodeDokumen=${this.state.dataHeader.kodeDokumen}`, null, {
                        headers: {
                            'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                        }
                    })
                        .then((body => {

                            setTimeout(uploadData, 1500);
                            // if (body.data.status == true) {
                            Swal.fire(
                                'Berhasil!',
                                'Email Berhasil Dikirim.',
                                'success'
                            )
                            // }
                        }))
                        .catch((err) => {
                            swalWithBootstrapButtons.fire(
                                "Oops!",
                                `${err.message}`,
                                "error"
                            );
                            this.setState({ loading: false });

                            setTimeout(uploadData, 1500);
                            GlobalVariable.openNotificationWithIcon("error");
                        });
                }
            });
    }

    onCloseDownloadBc34 = () => {
        this.setState({
            visibleDownloadBc34: false,
        });
    };

    // handleDownloadBc34 = (e) => {
    //     let idheader = localStorage.getItem("idHeader");

    //     this.setState({
    //         reload: this.state.reload + 1,
    //         idHeader: idheader,
    //         visibleDownloadBc34: true
    //     })

    // }

    handleDownloadBc34 = (e) => {
        this.setState({
            visibleDownloadBc34: true,
            loadingPdfBap: true
        });
    // handleDownloadBc32 = (e) => {
    //     this.setState({
    //         visibleDownloadBc32: true,
    //         loadingPdfBap: true
    //     });

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG_REPORT}/formulir/34/${this.state.idHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_API_BARANG_PENUMPANG_REPORT_KEY}`,
            },
            // 'Access-Control-Allow-Origin': '*',
            responseType: 'blob', //Force to receive data in a Blob Format
        })
            .then((res) => {
                const fileTemp = new Blob([res.data], { type: "application/pdf" });
                const fileURL = URL.createObjectURL(fileTemp);

                this.setState({
                    pdfUrlBap: fileURL,
                    loadingPdfBap: false,
                });
            })
            .catch((err) => {
                console.log(
                    "Get File Error!",
                    err
                );

                this.setState({
                    loadingPdfBap: false,
                });
            });

    }

    render() {
        return (
            <div>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <Breadcrumb>
                            <Breadcrumb.Item>LHP</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Perekaman</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="kt-subheader__main"></div>
                </div>
                <div>
                    <Card title="Perekaman LHP"
                        extra={
                            <Fragment>
                                {this.state.kodeDokumen != '22' ? (
                                    <button className="btn btn-success btn-sm" onClick={this.handleSendEmail}>
                                        <i className="fa fa-envelope" /> &nbsp; Kirim Email Perbaikan Dokumen
                                    </button>) : null
                                }
                                &nbsp;
                                {this.state.kodeDokumen == '34' ? (
                                    <button className="btn btn-primary btn-sm" onClick={this.handleDownloadBc34}>
                                        <i className="fa fa-save" /> &nbsp; BC 3.4
                                    </button>) : null
                                }
                                &nbsp;
                                {this.state.kodeDokumen == '32' ? (
                                    <button className="btn btn-primary btn-sm" onClick={this.handleDownloadBc32}>
                                        <i className="fa fa-save" /> &nbsp; BC 3.2
                                    </button>) : null
                                }
                                &nbsp;
                                <button className="btn btn-danger btn-sm" onClick={this.batal.bind(this)}>
                                    <i className="fa fa-backspace" /> &nbsp; Kembali
                                </button>
                            </Fragment>
                        }
                    >
                        <Tabs defaultActiveKey="2" type="card">
                            <TabPane tab="Data Pemberitahuan" key="1">
                                <PermohonanIzin data={this.state.hasil} />
                            </TabPane>
                            <TabPane tab="Perekaman LHP" key="2">
                                {this.state.kodeDokumen == '32' ? (<LHPBC32 data={this.state.hasil} />) :
                                    (this.state.kodeDokumen == '22' ? (<LHPBC22 data={this.state.hasil} />) :
                                        (<LHP data={this.state.hasil} />))}
                            </TabPane>
                            {/* {this.state.kodeDokumen == '22' ? (
                                <TabPane tab="Penindakan" key="3">
                                    <PenindakanBC22 data={this.state.hasil} />
                                </TabPane>
                            )
                                : null} */}
                        </Tabs>
                    
                    </Card>
                    <Modal
                        visible={this.state.visibleDownloadBc3422}
                        title="Form BC 3.4"
                        width="60%"
                        onCancel={this.onCloseDownloadBc34}
                        onOk={this.onCloseDownloadBc34}
                    >
                        <PDFViewer
                            idHeader={this.state.idHeader} reload={this.state.reload}
                        />
                    </Modal>

                    <Modal
                        width="1000px"
                        title="Form BC 3.4"
                        visible={this.state.visibleDownloadBc34}
                        onCancel={this.onCloseDownloadBc34}
                        onOk={this.onCloseDownloadBc34}
                    >
                        {this.state.loadingPdfBap ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: 600,
                                }}
                            >
                                <Spin description="Menunggu Server ..." />
                            </div>
                        ) : (
                            <Iframe
                                width="100%"
                                height="600"
                                src={this.state.pdfUrlBap}
                                frameborder="0"
                                allowtransparency
                                allowfullscreen
                            />
                        )}
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Lhp;
