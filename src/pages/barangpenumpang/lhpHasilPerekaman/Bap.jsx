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
import LhpDetailPemeriksaan from "./LhpDetailPemeriksaan";
import IntruksiPemeriksaan from "./IntruksiPemeriksaan"
import moment from "moment";
import axios from "axios";
import GlobalVariable from "../../../helpers/GlobalVariable";
import Swal from "sweetalert2";
import PermohonanIzin from "./DetailIzin/PermohonanIzinDetail"
import LhpBAP from "./LhpBAP"

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

class BAPS extends React.Component {
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
            showDataKeluarga: false
        };
    }

    getDataDokumen(e) {
        let idHeader = localStorage.getItem("idHeader");
        console.log("idHeader : ", idHeader)

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG}/header/dokumen/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
            }
        })
            .then(res => {
                console.log("Perekaman LHP", res)
                this.setState({
                    loading: false,
                    hasil: res.data,
                    dataHeader: !(res.data.header === null || res.data.header === undefined) ? res.data.header : null,
                    dataKeluarga: !(res.data.keluarga === null || res.data.keluarga === undefined) ? res.data.keluarga : null,
                    dataBarang: !(res.data.barang === null || res.data.barang === undefined) ? res.data.barang : null,
                    dataPemilik: !(res.data.pemilik === null || res.data.pemilik === undefined) ? res.data.pemilik : null,
                    showDataKeluarga: res.data.header.kodeDokumen === '22' ? true : false,
                    pagination: res.data.length,
                }, () => {
                    console.log(this.state.hasil)
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

    getDataLhp(e) {
        let idHeader = localStorage.getItem("idHeader");

        axios.get(`${REACT_APP_API_BARANG_PENUMPANG}/lhp/getByIdHeader/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `${REACT_APP_API_BARANG_PENUMPANG_KEY}`,
            }
        })
            .then(res => {
                this.setState({
                    loading: false,
                    dataDokumen: res.data.data
                }, () => {
                    if (!(this.state.dataDokumen === null || this.state.dataDokumen === undefined)) {
                        if (!(res.data.data.tdLhp === null || res.data.data.tdLhp === undefined)) {
                            this.setState({
                                tdLhp: res.data.data.tdLhp
                            });
                        }
                    }
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

    componentDidMount() {
        this.getDataDokumen();
        this.getDataLhp();
    }

    render() {
        return (
            <div>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <Breadcrumb>
                            <Breadcrumb.Item>BAP</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">Perekaman</a>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="kt-subheader__main"></div>
                </div>
                <div>
                    <Card title="Perekaman BAP">
                        <Tabs defaultActiveKey="2" type="card">
                            <TabPane tab="Data Izin" key="1">
                                <PermohonanIzin data={this.state.hasil} />
                            </TabPane>
                            <TabPane tab="Perekaman BAP" key="2">
                                <LhpBAP data={this.state.hasil} tdLhp={this.state.tdLhp} />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        );
    }
}

export default BAPS;
