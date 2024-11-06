import React, { Component, Fragment } from "react";
import {
    Button,
    Col,
    Row,
    Icon,
    Modal,
    Card,
    message,
    Table,
    Form,
    Upload,
    Input, Pagination,
    DatePicker,
    TimePicker,
    Select,
    Spin,
    Radio,
    Drawer
} from "antd";
import moment from 'moment';
import DetailBarang from "./TabsDetailPemeriksaan/DetailBarang";
import Kemasan from "./TabsDetailPemeriksaan/Kemasan";
import UnsurBarang from "./TabsDetailPemeriksaan/UnsurBarang";
import Spesifikasi from "./TabsDetailPemeriksaan/Spesifikasi";
import Kapasitas from "./TabsDetailPemeriksaan/Kapasitas";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import axios from "axios";
import Swal from "sweetalert2";
import HasilPemeriksaanPerBarang from "./TabsDetailPemeriksaan/HasilPemeriksaanPerBarang";
import SweetAlert from "sweetalert2";
import GlobalVariable from "../../../helpers/GlobalVariable";
import DetailBarangPemeriksaan from './TabsDetailPemeriksaan/detailBarangPemeriksaan'
import './Component/style.css'
/* PAGE */
import PDFViewer from "./pdfViewerBap";

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const { Option } = Select;
const {

    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
   REACT_APP_SECRET_KEY_HDFS,
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY
} = process.env;

const { Column, ColumnGroup } = Table;
const { blue, green } = require("@material-ui/core/colors");
const { TextArea } = Input;
let dataFotoBAPUtama = [];

class LhpDetailPemeriksaan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            dataLog: [],
            totalData: 0
        };
    }

    componentDidMount() {
        this.getDataLog();
        this.setState({
            hasil: this.props.data
        });
    }

    getDataLog(e) {
        this.setState({
            loading: true
        });
        let idHeader = localStorage.getItem("idHeader");

        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/log/list/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            }
        })
            .then(res => {
                if (res.data.totalData !== 0) {
                    const manageData = res.data.data.map((item, index) => {
                        let lhp = (JSON.parse(item.data))
                        return {
                            ...item,
                            kesimpulan: lhp.tdLhp !== undefined ? lhp.tdLhp.kesimpulanPemeriksaan : null
                        };
                    });
                    this.setState({
                        loading: false,
                        dataLog: manageData,
                        totalData: res.data.totalData
                    });
                } else {
                    this.setState({
                        loading: false,
                        dataLog: res.data.data,
                        totalData: res.data.totalData
                    });
                }
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

    render() {
        // console.log('fotoLhp',this.state.datafotoUtama)
        const { hidetambahbarang, detailBarangPemeriksaan, disableButton, totalData } = this.state;
        let noUrut = 1
        const columns = [
            {
                title: "No",
                dataIndex: "nomor",
                render: () => noUrut = noUrut + 1,
                width: 50,
            },
            // {
            //     title: "Kategori",
            //     dataIndex: "tdLhpDetailBp.kategori",
            //     width: 200,
            // },
            {
                title: "Uraian",
                dataIndex: "tdLhpDetailBp.uraian",
                width: 250,
            },
            {
                title: "Jumlah",
                dataIndex: "tdLhpDetailBp.jumlahSatuan",
                width: 80,
            },
            {
                title: "Satuan",
                dataIndex: "tdLhpDetailBp.satuan",
                width: 80,
            },
            {
                title: "Aksi",
                dataIndex: "aksi",
                key: "aksi",
                fixed: "right",
                width: 160,
                render: (key, record, e) => (
                    <div>
                        {/* <Button
                            type="primary"
                            onClick={(evt) => this.detailBarangTable(record, evt)}
                        >
                            <i className="fas fa-info" />
                        </Button> &nbsp;
                        <Button
                            className={'btn-info_me'}
                            onClick={(evt) => this.editBarangTable(record, evt)}
                        >
                            <i className="fas fa-edit" />
                        </Button> &nbsp;
                        <Button type={'danger'} ghost onClick={(env) => this.deleteData(record, env)}
                        >
                            <i className="fas fa-trash-alt" />
                        </Button> */}
                        <button className="btn btn-primary" onClick={(evt) => this.detailBarangTable(record, evt)}>
                            <i className="fa fa-info" /> &nbsp; Lihat
                        </button> &nbsp;
                        <button className="btn btn-success" onClick={(evt) => this.editBarangTable(record, evt)}>
                            <i className="fa fa-edit" /> &nbsp; Ubah
                        </button> &nbsp;
                        <button className="btn btn-danger" onClick={(evt) => this.deleteData(record, evt)}>
                            <i className="fa fa-trash-alt" /> &nbsp; Hapus
                        </button> &nbsp;
                    </div>
                ),
            },
        ];

        return (
            <div>
                <div className="kt-portlet__body">
                    <div className="kt-section kt-section--last">
                        <Card>
                            <div className="kt-portlet">
                                <div className="kt-portlet__body">
                                    <Table
                                        dataSource={this.state.dataLog}
                                        rowKey={"id"}
                                        size="small"
                                        loading={this.state.loading}
                                        // pagination={false}
                                        // columns={columns}
                                        bordered
                                        // scroll={{ x: 1000 }}
                                        pagination={{
                                            pageSize: 10, total: this.state.totalData,
                                            current: this.state.current,
                                            onChange: (page, pageSize) => {
                                                this.setState({
                                                    current: page,
                                                    page: (page - 1) * 10
                                                })
                                            },
                                            showSizeChanger: true, pageSizeOptions: ['5', '10', '20']
                                        }}

                                    >
                                        <Column title="No." dataIndex="nomor" key="nomor" render={(value, item, index) => (this.state.page + index) + 1} />
                                        <Column title="Status" dataIndex="statusAkhir" key="statusAkhir" />
                                        <Column title="Kesimpulan" dataIndex="kesimpulan" key="kesimpulan" />
                                        <Column title="NIP Rekam" dataIndex="nipRekam" key="nipRekam" />
                                        <Column title="Nama Petugas" dataIndex="statusAwal" key="statusAwal" />
                                        <Column title="Waktu Rekam" dataIndex="waktuRekam" key="waktuRekam" />
                                    </Table>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

// const WrappedLhpDetailPemeriksaan = Form.create()(LhpDetailP);
export default LhpDetailPemeriksaan;
