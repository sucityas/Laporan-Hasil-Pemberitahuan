import React, { Fragment } from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Table,
    Tabs,
    Pagination,
    Select,
    Spin,
    Tag,
    Popover,
    message
} from "antd";
import { Link } from "react-router-dom";
import * as moment from "moment";
import QuickSearch from "./Component/QuickSearch";
// import GlobalVariable from "../../../helpers/GlobalVariable";
import Swal from "sweetalert2";
import axios from "axios";
import { getUser } from "../../../utils/DataUser";
const { Option } = Select;

const { TabPane } = Tabs;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY
} = process.env;
const { RangePicker } = DatePicker;
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});

class IndexLhp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Masukkan: {
                dateAwal: null,
                dateAkhir: null
            },
            pagination: 0,
            loading: false,
            totalData: 0,
            kodeKantor: getUser().kodeKantor,
            page: 0,
            kodeProses: "1000001",
            listProses: null
        };
        this.getKantorPenerbit = this.getKantorPenerbit.bind(this);
        this.getDokumen = this.getDokumen.bind(this);
        this.kantorHandler = this.kantorHandler.bind(this);
        this.dokumenHandler = this.dokumenHandler.bind(this);
        this.getSemuaData = this.getSemuaData.bind(this);
        this.getidheader = this.getidheader.bind(this);
    }

    async getKantorPenerbit(e) {
        // console.log(this.props.idLhpHeader);
        this.setState({ fetching: true });
        let pelData = await fetch(
            `https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/kantor/all/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.data);
        return pelData;
    }

    kantorHandler(event) {
        this.setState({
            kantorPenerbit: event.namaKantorPendek,
            kodeKantor: event.kodeKantor,
        });
        // console.log(this.state.kantorhasil)
    }

    fetchReferensiKantor = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/kantor/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                // console.log('kode jenis pungutan:', res.data.data);
                const result = res.data.map(data => ({
                    text: `${data.kodeKantor} - ${data.namaKantorPendek}`,
                    value: data.kodeKantor,
                }));
                this.setState({ dataReferensiKantor: result, fetchingReferensiKantor: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    async getDokumen(e) {
        this.setState({ fetching: true });
        let pelData = await fetch(
            `https://apisdev-gw.beacukai.go.id/v2/Referensi/v1/dokumen/all?flag=Y`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.data);
        return pelData;
    }

    dokumenHandler(event) {
        this.setState({
            kodeDokumen: event.kodeDokumen,
            namaDokumen: event.namaDokumen,
        });
        // console.log(this.state.kantorhasil)
    }

    componentDidMount = () => {
        // this.setState({
        //     hasil:[
        //     { kodeDokumen : "BC 2.2" },
        //     { kodeDokumen : "BC 3.2" },
        //     { kodeDokumen : "BC 3.4" },

        // ]
        // });
        let Masukkan = []
        Masukkan.dateAwal = null
        Masukkan.dateAkhir = null
        this.setState({ loading: true, Masukkan: Masukkan });
        this.getSemuaData();
        this.fetchReferensiDokumen()
        this.fetchReferensiKantor()
        this.fetchReferensiKodeProses()
    }

    componentWillUnmount = () => {
        // document.removeEventListener("click", this.handleClickOutside, true);
     };

    fetchReferensiDokumen = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/dokumen/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                // console.log('kode jenis pungutan:', res.data.data);
                const result = res.data.map(data => ({
                    text: `${data.kodeDokumen} - ${data.namaDokumen}`,
                    value: data.kodeDokumen,
                }));
                this.setState({ dataReferensiDokumen: result, fetchingReferensiDokumen: false });
            })
            .catch(error => {
                console.log(error)
            });
    };

    fetchReferensiKodeProses = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/referensi/proses/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                this.setState({ listProses: res.data });
            })
            .catch(error => {
                console.log(error)
            });
    };

    handleDate(e) {
        // console.log(e);
        if (e[0] === "") {
            e[0] = null
            e[1] = null
        }
        this.setState({
            Masukkan: { ...this.state.Masukkan, dateAwal: e[0], dateAkhir: e[1] },
        });
    }

    getSemuaData(e) {
        this.setState({
            loading: true,
        });

        let niplogin = getUser().nip
        let param = ""

        if (!(this.state.kodeKantor === null || this.state.kodeKantor === undefined || this.state.kodeKantor === "")) {
            param += `kodeKantor=${this.state.kodeKantor}&`
        }
        if (!(this.state.kodeDokumen === null || this.state.kodeDokumen === undefined || this.state.kodeDokumen === "")) {
            param += `kodeDokumen=${this.state.kodeDokumen}&`
        }
        if (!(this.state.nomorDokumen === null || this.state.nomorDokumen === undefined || this.state.nomorDokumen === "")) {
            param += `nomorDokumen=${this.state.nomorDokumen}&`
        }
        if (!(this.state.Masukkan.dateAkhir === null || this.state.Masukkan.dateAkhir === undefined)) {
            param += `tanggalDokumenAkhir=${moment(this.state.Masukkan.dateAkhir, 'DD-MM-YYYY').format('YYYY-MM-DD')}&`
        }
        if (!(this.state.Masukkan.dateAwal === null || this.state.Masukkan.dateAwal === undefined)) {
            param += `tanggalDokumenAwal=${moment(this.state.Masukkan.dateAwal, 'DD-MM-YYYY').format('YYYY-MM-DD')}&`
        }
        if (!(this.state.qrCode === null || this.state.qrCode === undefined)) {
            param += `qrCode=${this.state.qrCode}&`
        }
        if (!(this.state.nama === null || this.state.nama === undefined)) {
            param += `nama=${this.state.nama}&`
        }
        if (!(this.state.paspor === null || this.state.paspor === undefined)) {
            param += `paspor=${this.state.paspor}&`
        }
        if (!(this.state.kodeProses === null || this.state.kodeProses === undefined)) {
            param += `kodeProses=${this.state.kodeProses}&`
        }
        if (!(this.state.kodeJalur === null || this.state.kodeJalur === undefined)) {
            param += `kodeJalur=${this.state.kodeJalur}&`
        }
        if (!(this.state.nomorPengangkut === null || this.state.nomorPengangkut === undefined)) {
            param += `nomorPengangkut=${this.state.nomorPengangkut}&`
        }
        // param += `kodeDokumen=34&`
        param += !(this.state.page === null || this.state.page === undefined || this.state.page === "") ? `page=${this.state.page}&` : `page=0&`
        param += `size=10&`


        if (param !== "") {
            param = param.substr(0, param.length - 1)
        }

        // console.log("param : ", param)


        // let body = {
        //     nip: niplogin,
        //     kodeKantor:
        //         // this.state.kodeKantor === undefined ? "040300" : "040300",
        //     this.state.kodeKantor === null ? '' : this.state.kodekantor,
        //     kodeDokumen:
        //         this.state.kodeDokumen === undefined ? "" : this.state.kodeDokumen,
        //     tanggalAkhir:
        //         this.state.Masukkan.dateAkhir === undefined
        //             ? ""
        //             : this.state.Masukkan.dateAkhir,
        //     tanggalAwal:
        //         this.state.Masukkan.dateAwal === undefined
        //             ? ""
        //             : this.state.Masukkan.dateAwal,
        //     offset: 0,
        //     limit: 10,
        //     nomorDokumen: this.state.noDok === undefined ? "" : this.state.noDok,
        // };
        // console.log(body);
        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/header/lhp/multi-param?${param}`, {
            headers: {
                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            }
        })
            .then(res => {
                this.setState({
                    loading: false,
                    hasil: res.data.data,
                    totalData: res.data.totalData,
                });
            })
            .catch((err) => {
                swalWithBootstrapButtons.fire(
                    "Oops!",
                    `${err.message}`,
                    "error"
                );
                this.setState({ loading: false });
                // GlobalVariable.openNotificationWithIcon("error");
            });
    }

    getidheader(e) {
        // this.setState({
        //     idHeader: e.idHeader,
        //     kodeDokumen: e.kodeDokumen,
        //     kodeKantor: e.kodeKantor,
        //     seriPeriksa: e.seriPeriksa,
        //     nipPfpd: e.nipPfpd,
        //     nomorDokumen: e.nomorDokumen,
        //     namaPerusahaan: e.namaPerusahaan,
        //     namaPegawai: e.namaPegawai,
        //     tanggalDokumen: e.tanggalDokumen,
        //     jenisDokumen: e.jenisDokumen,
        //     nomorAju: e.nomorAju,
        // });
        // console.log(e);
        localStorage.setItem("idHeader", e.idHeader);
        localStorage.setItem("idBpHeader", e.idBpHeader);
        localStorage.setItem("idLhpHeader", e.idLhpHeader);
        localStorage.setItem("kodeDokumen", e.kodeDokumen);
        localStorage.setItem("kodeKantor", e.kodeKantor);
        if (e.seriPeriksa === null) {
            localStorage.setItem("seriPeriksa", 0);
        } else {
            localStorage.setItem("seriPeriksa", e.seriPeriksa);
        }
        if (e.flagBap === null) {
            localStorage.setItem("flagBap", 0);
        } else {
            localStorage.setItem("flagBap", e.flagBap);
        }
        localStorage.setItem("nipPfpd", e.nipPfpd);
        localStorage.setItem("nomorDokumen", e.nomorDokumen);
        localStorage.setItem("namaPerusahaan", e.namaPerusahaan);
        localStorage.setItem("namaPegawai", e.namaPegawai);
        localStorage.setItem("tanggalDokumen", e.tanggalDokumen);
        localStorage.setItem("jenisDokumen", e.jenisDokumen);
        localStorage.setItem("nomorAju", e.nomorAju);
        localStorage.setItem("idProses", e.idProses);
        localStorage.setItem("jumlahKontainer", e.jumlahKontainer);
    }

    cariData = () => {
        this.getSemuaData();
    };

    cariData2 = () => {
        this.setState({
            page: 0
        }, () => {
            this.getSemuaData();
        })
    };

    resetData = () => {
        let Masukkan = { ...this.state.Masukkan, dateAwal: null, dateAkhir: null }
        this.setState({
            kodeKantor: null,
            kodeDokumen: null,
            nomorDokumen: null,
            Masukkan: Masukkan,
            qrCode: null,
            nama: null,
            paspor: null,
            kodeJalur: null,
            nomorPengangkut: null,
        })
    };

    handlePageChange = (page) => {
        this.setState({
            page: page - 1
        }, () => this.cariData())

    }

    handleGenerate(e) {
        // console.log(e)
        let idheader = e.idHeader;
        let nip = getUser().nip


        swalWithBootstrapButtons
            .fire({
                title: "Generate LHP Otomatis??",
                text: "Pastikan Hanya Jika Data Pemberitahuan Sesuai dan Tidak Perlu ke PDTT!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Tidak!",
                confirmButtonText: "Ya!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.value) {

                    const uploadData = message.loading("Sedang melakukan generate otomatis...", 0);
                    axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/lhp/generate-otomatis?idHeader=${idheader}&nip=${nip}`, null, {
                        headers: {
                            'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                        }
                    })
                        .then((body => {
                            // console.log(body)

                            setTimeout(uploadData, 1500);
                            if (body.data.status == true) {
                                this.getSemuaData();
                                Swal.fire(
                                    'Berhasil!',
                                    'Generate LHP Berhasil.',
                                    'success'
                                )
                            } else {
                                Swal.fire(
                                    'Gagal Generate LHP',
                                    'Terdapat kesalahan.',
                                    'error'
                                );
                                this.setState({ iconLoading: false });
                            }
                        }))
                        .catch(error => {
                            // console.log(error)
                            Swal.fire(
                                'Gagal Generate LHP',
                                'Terdapat kesalahan.',
                                'error'
                            );
                            this.setState({ iconLoading: false });
                        });

                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                    this.setState({ iconLoading: false });
                }
            });
    }

    render() {
        let noUrut = (this.state.page * 10);
        const columns = [
            {
                title: "No",
                dataIndex: ++this.count,
                render: () => noUrut = noUrut + 1,
                width: 50,
            },
            {
                title: "Jenis Dokumen",
                dataIndex: "kodeDokumen",
                key: "kodeDokumen",
            },
            // {
            //     title: "Nomor Dokumen",
            //     dataIndex: "nomorDokumen",
            //     key: "nomorDokumen",
            // },
            {
                title: "Tanggal Dokumen",
                dataIndex: "tanggalDokumen",
                key: "tanggalDokumen",
                render: (key) => {
                    if (key === null || key === undefined) {
                        return null;
                    } else {
                        return moment(key).format("DD-MM-YYYY");
                    }
                },
            },
            {
                title: "Paspor",
                dataIndex: "paspor",
                key: "paspor",
            },
            {
                title: "Nama",
                dataIndex: "nama",
                key: "nama",
            },
            {
                title: "Nomor Pengangkut",
                dataIndex: "nomorPengangkut",
                key: "nomorPengangkut",
            },
            {
                title: "Jalur",
                dataIndex: "kodeJalur",
                key: "kodeJalur",
            },
            {
                title: "QR Code",
                dataIndex: "qrCode",
                key: "qrCode",
            },
            {
                title: "Status",
                dataIndex: "kodeProses",
                key: "kodeProses",
                ellipsis: true,
                width: 170,
                size: "small",
                render: (key, record) => {
                    let proses = this.state.listProses !== null ? this.state.listProses.filter(item => item.kodeProses === key) : null;

                    // console.log(proses)
                    return (<Tag color={"magenta"} > {proses !== null && proses.length !== 0 ? proses[0].uraian : null} </Tag>)
                },
            },
            {
                title: "Aksi",
                dataIndex: "idHeader",
                key: "idHeader",
                width: 150,
                // fixed: "right",
                render: (key, record, e) => {
                    // console.log(record, e);
                    return (
                        <div>
                            {/* <Link
                                to={"/barang-penumpang/bap-perekaman"}
                                type="primary"
                                onClick={(evt) => this.getidheader(record, evt)}
                            >
                                &nbsp;
                                <button type="button" className="btn btn-bold btn-sm btn-label-primary">
                                    <span className="kt-hidden-mobile">BAP</span>
                                </button>
                            </Link>
                            &nbsp; */}
                            <Link
                                to={"/barang-penumpang/lhp-perekaman"}
                                type="primary"
                                onClick={(evt) => this.getidheader(record, evt)}
                            >
                                &nbsp;
                                <button type="button" className="btn btn-bold btn-sm btn-label-success">
                                    <span className="kt-hidden-mobile">Rekam</span>
                                    {/* <i className="flaticon2-document" /> */}
                                </button>
                                {/* <i className="fas fa-paper-plane"></i>
                                &nbsp; LHP */}
                            </Link>
                            &nbsp;
                            {record.kodeDokumen === "22" && record.kodeProses === "1000002" ? (
                                <Popover placement="top" content={"Generate LHP Otomatis"} trigger="hover" onClick={(evt) => this.handleGenerate(record, evt)}>
                                    <button className="btn btn-bold btn-sm btn-label-primary">
                                        <i className="flaticon2-gear" />
                                    </button>
                                </Popover>
                            ) : null

                            }
                        </div>
                    );
                },
            },
        ];
        return (
            <Fragment>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="">BARANG PENUMPANG</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/barang-penumpang/lhp">Pemeriksaan Barang </Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <Row gutter={8} className="mb-1">
                    <Card
                        title="Pencarian Dokumen Pemeriksaan Barang"
                    >
                        <Form>
                            <Row className="mb-2" gutter={8} style={{ margin: 20 }}>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Kode Kantor
                                </Col>
                                <Col span={8}>
                                    {/* <Input value={this.state.kodeKantor} disabled /> */}
                                    {/* <Input value={this.state.kodeKantor}
                                        onChange={(e) => this.setState({ kodeKantor: e.target.value })} /> */}
                                    <Select
                                        placeholder="Pilih Kantor"
                                        showArrow={true}
                                        notFoundContent={this.state.fetchingReferensiKantor ? <Spin size="small" /> : null}
                                        showSearch
                                        style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        readOnly={this.state.readOnly}
                                        disabled={this.state.readOnly}
                                        allowClear
                                        onChange={e => { this.setState({ kodeKantor: e }); }}
                                        value={this.state.kodeKantor}
                                        // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.state.dataReferensiKantor !== undefined ? this.state.dataReferensiKantor.map(d => (
                                            <Option key={d.value}>{d.text}</Option>
                                        )) : ""}
                                    </Select>
                                </Col>
                                <Col span={2} style={{ textAlign: "start" }}></Col>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Nama
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan Nama"}
                                        value={this.state.nama}
                                        onChange={(e) => this.setState({ nama: e.target.value })}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2" gutter={8} style={{ margin: 20 }}>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Jenis Dokumen
                                </Col>
                                <Col span={8}>
                                    <Select
                                        onChange={e => {
                                            this.setState({
                                                kodeDokumen: e
                                            })
                                        }}
                                        value={this.state.kodeDokumen}
                                        placeholder="Pilih Jenis Dokumen"
                                        allowClear
                                    >
                                        <Option value="22">BC 2.2</Option>
                                        <Option value="32">BC 3.2</Option>
                                        <Option value="34">BC 3.4</Option>
                                    </Select>
                                </Col>
                                <Col span={2} style={{ textAlign: "start" }}></Col>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Paspor
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan Paspor"}
                                        value={this.state.paspor}
                                        onChange={(e) => this.setState({ paspor: e.target.value })}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2" gutter={8} style={{ margin: 20 }}>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Nomor Dokumen
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan Nomor Dokumen"}
                                        value={this.state.nomorDokumen}
                                        onChange={(e) => this.setState({ nomorDokumen: e.target.value })}
                                    />
                                </Col>
                                <Col span={2} style={{ textAlign: "start" }}></Col>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Tgl Dokumen
                                </Col>
                                <Col span={8}>
                                    <RangePicker
                                        format={"DD-MM-YYYY"}
                                        placeholder={["Dari", "Sampai"]}
                                        onChange={(_, date) => this.handleDate(date)}
                                        value={!(this.state.Masukkan.dateAwal === null || this.state.Masukkan.dateAwal === undefined) ? [moment(this.state.Masukkan.dateAwal, "DD-MM-YYYY"), moment(this.state.Masukkan.dateAkhir, "DD-MM-YYYY")] : [null, null]}
                                    />
                                </Col>
                            </Row>


                            <Row className="mb-2" gutter={8} style={{ margin: 20 }}>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Nomor Pengangkut
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan Nomor Pengangkut"}
                                        value={this.state.nomorPengangkut}
                                        onChange={(e) => this.setState({ nomorPengangkut: e.target.value })}
                                    />
                                </Col>
                                <Col span={2} style={{ textAlign: "start" }}></Col>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    Jalur
                                </Col>
                                <Col span={8}>
                                    <Select
                                        onChange={e => {
                                            this.setState({
                                                kodeJalur: e
                                            })
                                        }}
                                        value={this.state.kodeJalur}
                                        placeholder="Pilih Jalur"
                                        allowClear
                                    >
                                        <Option value="H">H - Hijau</Option>
                                        <Option value="M">M - Merah</Option>
                                    </Select>
                                </Col>

                            </Row>
                            <Row className="mb-2" gutter={8} style={{ margin: 20 }}>
                                <Col span={3} style={{ textAlign: "start" }}>
                                    QR Code
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan QR Code"}
                                        value={this.state.qrCode}
                                        onChange={(e) => this.setState({ qrCode: e.target.value })}
                                    />
                                </Col>

                            </Row>

                            <Row gutter={8} className="mb-2" type="flex" justify="end" style={{ margin: 20 }}>
                                <Col>
                                    <Button
                                        type="primary"
                                        onClick={this.cariData2}
                                        htmlType="submit"
                                    // style={{ marginRight: "2%", justifyContent: "center" }}
                                    >
                                        <i className="fa fa-search" style={{ marginRight: 8 }} />
                                        Cari
                                    </Button>
                                    &nbsp;
                                    &nbsp;
                                    {/* <button type="button" className="btn btn-primary" onClick={this.cariData}>
                                        <i className="fa fa-search" /> &nbsp; Cari
                                    </button> */}
                                    <Button
                                        type="danger"
                                        onClick={this.resetData}
                                        ghost
                                        htmlType="submit"
                                    >
                                        <i className="fa fa-times" style={{ marginRight: 8 }} />
                                        Kosongkan
                                    </Button>
                                    {/* <button type="button" className="btn btn-danger" onClick={this.resetData}>
                                        Kosongkan
                                    </button> */}
                                </Col>
                            </Row>
                        </Form>
                        <hr />
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab="Daftar" key="1">
                                {/*<LhpDaftarDokumenStatus/>*/}
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    bordered={true}
                                    loading={this.state.loading}
                                    dataSource={this.state.hasil}
                                    rowKey={"ID"}
                                    size="small"
                                // scroll={{ x: 1200 }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <Pagination
                                        onChange={(event) => this.handlePageChange(event)}
                                        current={this.state.page + 1}
                                        defaultCurrent={1}
                                        defaultPageSize={10}
                                        total={this.state.totalData}
                                        showTotal={total => `Total ${total} items`}
                                    />
                                    &nbsp;
                                    {/*<Button type={'primary'} onClick={this.haii}>Refresh Data</Button>*/}
                                </div>
                            </TabPane>
                            {/*<TabPane tab="Header" key="2">*/}
                            {/*    <LhpHeader/>*/}
                            {/*</TabPane>*/}
                            {/*<TabPane tab="Detail" key="3">*/}
                            {/*    <LhpDetail/>*/}
                            {/*</TabPane>*/}
                        </Tabs>
                    </Card>
                </Row>
                {/*<Link to="/absen-pemeriksaan-barang">*/}
                {/*  <i className="fa fa-times" style={{ marginRight: 8 }} />*/}
                {/*  Pemeriksaan Barang*/}
                {/*</Link>*/}
                {/*<Link to="/perintah-kesiapan-barang">*/}
                {/*  <i className="fa fa-times" style={{ marginRight: 8 }} />*/}
                {/*  Kesiapan Barang*/}
                {/*</Link>*/}
            </Fragment>
        );
    }
}

export default IndexLhp;
