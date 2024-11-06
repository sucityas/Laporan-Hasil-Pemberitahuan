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

class LhpPerekamanBP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idLhpHeade: null,
            modalImportir: false,
            modalPPJK: false,
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

    getValueTidakSiap = (bebas) => {
        this.setState({
            valuecoba: bebas,
        })
    }

    getFlagDisable = (e) => {
        this.setState({
            flagDisable: e
        })
    }

    rekamMemo = (rekamMemo) => {
        this.setState({
            rekamMemo: rekamMemo,
        })
    }

    showDataKeluarga = () => {
        this.setState({
            modalDataKeluarga: true,
        });
    };

    showDataPribadi = () => {
        this.setState({
            modalDataPribadi: true,
        });
    };

    showModalPpjk = () => {
        this.getDetailPPJK()
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            modalImportir: false,
            modalPPJK: false,
        });
    };

    handleOkDataPribadi = e => {
        this.setState({
            modalDataPribadi: false,
        });
    };

    handleCancelDataPribadi = e => {
        this.setState({
            modalDataPribadi: false,
        });
    };

    handleCancelDataKeluarga = e => {
        this.setState({
            modalDataKeluarga: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modalImportir: false,
            modalPPJK: false
        });
    };

    componentDidMount() {
        this.getDataDokumen();
        this.setState({
            flagDisable: localStorage.getItem('flagBap')
        });
    }

    render() {
        console.log('flagDisable', this.state.flagDisable)
        const flagBap = localStorage.getItem('flagBap')
        const idLhpHeader = localStorage.getItem('idLhpHeader')
        const {
            namaPerusahaan, alamatPerusahaan, npwp, npwp9,
            namaPPJK, alamatPPJK, nomorPPJK, flagDisable
        } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 24 },
                lg: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                md: { span: 16 },
                lg: { span: 19 }
            }
        };
        let noUrut = 1;
        const columns = [
            {
                title: "No",
                dataIndex: ++this.count,
                render: () => noUrut++,
            },
            {
                title: "Nama",
                dataIndex: "jenisDokumen",
                key: "jenisDokumen",
            },
            {
                title: "No Paspor",
                dataIndex: "noPaspor",
                key: "nomorDokumen",
            },
            {
                title: "Kewarganegaraan",
                dataIndex: "nomorDokumen",
                key: "nomorDokumen",
            },
            {
                title: "Hubungan Keluarga",
                dataIndex: "npwp",
                key: "npwp",
            },
            {
                title: "Aksi",
                dataIndex: "idHeader",
                key: "idHeader",
                fixed: "right",
                render: (key, record, e) => {
                    console.log(record, e);
                    return (
                        <div>
                            <Link
                                to={"lhp-pencarian-dokumen-status-bp/lhp-perekaman-new"}
                                type="primary"
                                onClick={(evt) => this.getidheader(record, evt)}
                            >
                                &nbsp;
                                <i className="fas fa-paper-plane"></i>
                                &nbsp; Delete
                            </Link>
                        </div>
                    );
                },
            },
        ];
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
                    <Card title="Perekaman LHP">
                        <Form {...formItemLayout}>
                            <Card title="Dokumen" size="small">
                                <Row gutter={8}>
                                    <Col lg={24} md={24}>
                                        <Card>
                                            <Row gutter={8} style={{ padding: "5px" }}>
                                                <Col span={4}>
                                                    <p style={{ color: "black" }}>Jenis Dok</p>
                                                </Col>
                                                <Col span={6}>
                                                    {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                        ? "-"
                                                        : this.state.dataBpHeader.kodeDokumen}
                                                </Col>
                                                <Col span={5}>
                                                    <p style={{ color: "black" }}>QR Code</p>
                                                </Col>
                                                <Col span={9}>
                                                    {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                        ? "-"
                                                        : this.state.dataBpHeader.qrCode}
                                                    {/* <Input
                                                        name="qr_code"
                                                        value={
                                                            this.state.hasil === null || this.state.hasil === undefined
                                                                ? "-"
                                                                : this.state.hasil.tdBpHeader.qrCode
                                                        }
                                                        onChange={this.handleInputChange}
                                                    /> */}
                                                </Col>
                                            </Row>
                                            <Row gutter={8} style={{ padding: "5px" }}>
                                                <Col span={4}>
                                                    <p style={{ color: "black" }}>Nomor Dok</p>
                                                </Col>
                                                <Col span={6}>
                                                    <Input
                                                        name="no_dok"
                                                        onChange={this.handleInputChange}
                                                        value={this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                            ? "-"
                                                            : this.state.dataBpHeader.nomorDokumen}
                                                    />
                                                </Col>
                                                <Col span={5}>
                                                    <p style={{ color: "black" }}>Tanggal Dok</p>
                                                </Col>
                                                <Col span={9}>
                                                    <Input
                                                        name="tanggal_dok"
                                                        onChange={this.handleInputChange}
                                                        value={moment(
                                                            this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                                ? "-"
                                                                : this.state.dataBpHeader.tanggalDokumen
                                                        ).format("DD-MM-YYYY")}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                            <br></br>
                            <Card title="Data Pribadi" size="small"
                                extra={
                                    <Button
                                        type="primary"
                                        icon="user"
                                        style={{ margin: "center" }}
                                        onClick={this.showDataPribadi}
                                    >
                                        Detail
                                    </Button>}>
                                <Row gutter={8}>
                                    <Col lg={24} md={24}>
                                        <Card>
                                            <Row gutter={8} style={{ padding: "5px" }}>
                                                <Col span={4}>
                                                    <p style={{ color: "black" }}>Nama</p>
                                                </Col>
                                                <Col span={6}>
                                                    <Input
                                                        name="no_dok"
                                                        onChange={this.handleInputChange}
                                                        value={this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                            ? "-"
                                                            : this.state.dataBpHeader.nama}
                                                    />
                                                </Col>
                                                <Col span={5}>
                                                    <p style={{ color: "black" }}>Paspor</p>
                                                </Col>
                                                <Col span={9}>
                                                    <Input
                                                        name="no_dok"
                                                        onChange={this.handleInputChange}
                                                        value={this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                                            ? "-"
                                                            : this.state.dataBpHeader.paspor}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                            <br></br>
                            {this.state.showDataKeluarga ?
                                <Card title="Data Keluarga" size="small"
                                    extra={
                                        <Button
                                            type="primary"
                                            icon="user"
                                            style={{ margin: "center" }}
                                            onClick={this.showDataKeluarga}
                                        >
                                            Tambah
                                        </Button>}>
                                    <Table
                                        columns={columns}
                                        // pagination={false}
                                        bordered={true}
                                        loading={this.state.loading}
                                        dataSource={this.state.dataKeluarga}
                                        rowKey={"ID"}
                                        size="small"
                                        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}

                                    // scroll={{ x: 1800 }}
                                    />
                                    {/* <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                                        <Pagination
                                            onChange={(event) => this.handlePageChange(event)}
                                            current={this.state.page + 1}
                                            defaultCurrent={1}
                                            defaultPageSize={10}
                                            total={this.state.dataKeluarga.pagination}
                                        />
                                        &nbsp;
                                    </div> */}
                                </Card> : null
                            }
                        </Form>
                    </Card>

                    <Card>
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab="Detail Pemeriksaan" key="1"
                            // disabled={this.state.valuecoba === "T" || flagDisable != 2 }
                            >
                                <LhpDetailPemeriksaan data={this.state.hasil} />
                            </TabPane>
                            {/* </div>): ''} */}
                        </Tabs>
                    </Card>
                </div>

                <Modal
                    title="Tambah Data Keluarga"
                    width="75%"
                    visible={this.state.modalDataKeluarga}
                    onOk={this.handleOk}
                    onCancel={this.handleCancelDataKeluarga}
                    footer={[
                        <Button key="back" type={'primary'} onClick={this.handleOk}>
                            Simpan
                        </Button>,
                    ]}
                >
                    <Form style={{ margin: 10 }}>
                        <Row className="mb-2" gutter={16}>
                            <Col span={4} style={{ textAlign: "start" }}>
                                Nama Lengkap
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="nama"
                                    // onChange={this.handleInputChange}
                                    value={npwp9}
                                />
                            </Col>
                            <Col span={4} style={{ textAlign: "start" }}>
                                No Paspor
                            </Col>
                            <Col span={8}>
                                <Input
                                    name="no Paspor"
                                    // onChange={this.handleInputChange}
                                    value={npwp9}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-2" gutter={16}>
                            <Col span={4} style={{ textAlign: "start" }}>
                                Kewarganegaraan
                            </Col>
                            <Col span={8}>
                                <Select
                                    size={"large"}
                                    style={{ width: "100%" }}
                                    placeholder={"Pilih Kewarganegaraan"}
                                    onChange={e => { this.setState({ sifatTindakLanjut: e }); }}
                                    defaultValue={this.state.sifatTindakLanjut}
                                >
                                    <Select.Option value="Diperintahkan">Indonesia</Select.Option>
                                    <Select.Option value="Direkomendasikan">Malaysia</Select.Option>
                                </Select>
                            </Col>
                            <Col span={4} style={{ textAlign: "start" }}>
                                Hubungan Keluarga
                            </Col>
                            <Col span={8}>
                                <Select
                                    size={"large"}
                                    style={{ width: "100%" }}
                                    placeholder={"Pilih Hubungan Keluarga"}
                                    onChange={e => { this.setState({ sifatTindakLanjut: e }); }}
                                    defaultValue={this.state.sifatTindakLanjut}
                                >
                                    <Select.Option value="Diperintahkan">Orang Tua</Select.Option>
                                    <Select.Option value="Direkomendasikan">Saudara Kandung</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

                <Modal
                    title="Data Pribadi"
                    width="75%"
                    visible={this.state.modalDataPribadi}
                    onOk={this.handleOkDataPribadi}
                    onCancel={this.handleCancelDataPribadi}
                    footer={[
                        <Button key="back" type={'primary'} onClick={this.handleOkDataPribadi}>
                            OK
                        </Button>,
                    ]}
                >
                    <Card>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Nama Lengkap</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.nama}
                            </Col>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Nomor Paspor</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.paspor}
                            </Col>
                        </Row>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Status</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.statusPembawa}
                            </Col>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Kebangsaan</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.kodeNegara}
                            </Col>
                        </Row>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Pekerjaan</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.kodePekerjaan}
                            </Col>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Tempat Bekerja</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.tempatBekerja}
                            </Col>
                        </Row>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Tanggal Lahir</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : moment(this.state.dataBpHeader.tanggalLahir).format("DD-MM-YYYY")}
                            </Col>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Email</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.nomorTelepon1}
                            </Col>
                        </Row>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Nomor Telepon 1</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.nomorTelepon1}
                            </Col>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Nomor Telepon 2</p>
                            </Col>
                            <Col span={8}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.nomorTelepon2}
                            </Col>
                        </Row>
                        <Row gutter={8} style={{ padding: "5px" }}>
                            <Col span={4}>
                                <p style={{ color: "black" }}>Alamat di Indonesia</p>
                            </Col>
                            <Col span={12}>
                                {this.state.dataBpHeader === null || this.state.dataBpHeader === undefined
                                    ? "-"
                                    : this.state.dataBpHeader.domisiliJalan}
                            </Col>
                        </Row>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default LhpPerekamanBP;
