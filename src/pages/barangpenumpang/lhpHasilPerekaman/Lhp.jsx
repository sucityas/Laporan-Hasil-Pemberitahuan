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
    Result
} from "antd";
import { Link } from "react-router-dom";
import LhpBAP from "./LhpBAP";
import LhpDetailPemeriksaan from "./LhpDetailPemeriksaan";
import IntruksiPemeriksaan from "./IntruksiPemeriksaan"
import moment from "moment";
import axios from "axios";
import GlobalVariable from "../../../helpers/GlobalVariable";
import Swal from "sweetalert2";
import PermohonanIzin from "./DetailIzin/PermohonanIzinDetail"
import LHP from "./LhpDetailPemeriksaan"
import Riwayat from "./LhpRiwayat"
import LHPBC22 from "./LhpDetailPemeriksaanBC22"
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
    REACT_APP_API_BARANG_PENUMPANG_KEY
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

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG}/header/dokumen/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
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
                    kodeDokumen: res.data.header.kodeDokumen
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
        window.location.href = "/barang-penumpang/lhp-hasil";
    }

    componentDidMount() {
        this.getDataDokumen();
        this.setState({
            flagDisable: localStorage.getItem('flagBap')
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
                    axios.post(`${REACT_APP_API_BARANG_PENUMPANG}/respon/sendemail/?emailTo=${this.state.dataHeader.email}&idHeader=${localStorage.getItem("idHeader")}&kodeDokumen=${this.state.dataHeader.kodeDokumen}`, null, {
                        headers: {
                            'beacukai-API-Key': `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
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

    handleDownloadBc34 = (e) => {
        let idheader = localStorage.getItem("idHeader");

        this.setState({
            reload: this.state.reload + 1,
            idHeader: idheader,
            visibleDownloadBc34: true
        })

    }

    render() {
        return (
            <div>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <Breadcrumb>
                            <Breadcrumb.Item>LHP</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Hasil Pemeriksaan Barang</a>
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
                            <TabPane tab="Hasil Pemeriksaan Barang" key="2">
                                {this.state.kodeDokumen == '32' ? (<LHP data={this.state.hasil} />) :
                                    (this.state.kodeDokumen == '22' ? (<LHPBC22 data={this.state.hasil} />) :
                                        (<LHP data={this.state.hasil} />))}
                            </TabPane>
                            <TabPane tab="Riwayat Status" key="3">
                                <Riwayat data={this.state.hasil} />
                            </TabPane>
                        </Tabs>
                    </Card>
                    <Modal
                        visible={this.state.visibleDownloadBc34}
                        title="Form BC 3.4"
                        width="60%"
                        onCancel={this.onCloseDownloadBc34}
                        onOk={this.onCloseDownloadBc34}
                    >
                        <PDFViewer
                            idHeader={this.state.idHeader} reload={this.state.reload}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Lhp;
