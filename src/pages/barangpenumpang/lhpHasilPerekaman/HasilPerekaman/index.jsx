import React, {Fragment} from "react";
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    Pagination,
    Row,
    message,
    Table,
    Tabs,
    Modal,
    Spin,
    Select
} from "antd";
import {Link} from "react-router-dom";
import * as moment from "moment";
import DetailBAP from "./Tabs/DetailBAP";
import '../Component/style.css'
import QuickSearch from "../Component/QuickSearch"
import GlobalVariable from "../../../../helpers/GlobalVariable";
import DetailPemeriksaan from "./Tabs/DetailPemeriksaan";
import axios from 'axios'
import Swal from "sweetalert2";
import Iframe from "react-iframe";
import {getUser} from "../../../../utils/DataUser";


const {TabPane} = Tabs;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;
const {RangePicker} = DatePicker;
const kodeKantor = getUser().kodeKantor

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Masukkan: {
                npwp: null,
                nib: null
            },
            loading: false,
            page: 0,
            row: 10,
            kodeKantor: kodeKantor

        };
        this.getDokumen = this.getDokumen.bind(this);
        this.dokumenHandler = this.dokumenHandler.bind(this);
        this.getidheader = this.getidheader.bind(this);
        this.getKantor = this.getKantor.bind(this)
    }

    async getKantor() {
        const kodeKantorA = getUser().kodeKantor
        try {
            const res = await axios.get(`${process.env.REACT_APP_REFERENSI}/v1/kantor/all`, {
                headers: {
                    'beacukai-api-key': process.env.REACT_APP_SECRET_KEY_REFERENSI
                }
            })

            if (res.status === 200) {
                const children = []
                const data = res.data.data;
                let dataFilter = []
                if (kodeKantorA.substring(0, 2) === '00') {
                    dataFilter = data
                } else if (kodeKantorA.substring(2) === '0000') {
                    dataFilter = data.filter((e) => e.kodeKantor.substring(0, 2) === kodeKantorA.substring(0, 2))
                } else {
                    dataFilter = []
                }

                dataFilter.map(e => {
                    children.push(<Option key={e.kodeKantor}
                                          value={e.kodeKantor}>{`${e.kodeKantor} - ${e.namaKantorPendek}`}</Option>);
                })

                this.setState({
                    children
                })
            }
            console.log('data get kantor', res)
        } catch (e) {
            // console.warn('data get kantor', e)
        }
    }

    valueKodeKantor = (e) => {
        this.setState({
            kodeKantor: e
        })
    }

    async getDokumen(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/dokumen/all?flag=Y`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.data);
        return pelData;
    }

    dokumenHandler(event) {
        this.setState({
            kodeDokumen: event.kodeDokumen,
            namaDokumen: event.namaDokumen
        });
        // console.log(this.state.kantorhasil)
    }


    componentDidMount() {

        this.getSemuaData()
        // this.setState({
        //     hasil: [
        //         {jenisDokumen: "BC 2.2", nomorDokumen: "00000001"},
        //         {jenisDokumen: "BC 3.2", nomorDokumen: "00000002"},
        //         {jenisDokumen: "BC 3.4", nomorDokumen: "00000003"},
        //     ]
        // });
    }


    handleDate(e) {
        console.log(e);
        this.setState({
            Masukkan: {...this.state.Masukkan, dateAwal: e[0], dateAkhir: e[1]}
        });
    }

    getSemuaData = () => {
        this.setState({loading: true});
        let body = {
            // nip: niplogin,
            kodeKantor: this.state.kodeKantor,
            kodeDokumen:
                this.state.kodeDokumen === undefined ? "20" : this.state.kodeDokumen,
            tanggalAkhir:
                this.state.Masukkan.dateAkhir === undefined
                    ? ""
                    : this.state.Masukkan.dateAkhir,
            tanggalAwal:
                this.state.Masukkan.dateAwal === undefined
                    ? ""
                    : this.state.Masukkan.dateAwal,
            limit: this.state.row,
            offset: this.state.page,
            nomorDokumen: this.state.noDok === undefined ? "" : this.state.noDok,
        };
        console.log(body);
        fetch(`${REACT_APP_LHP}/browse-lhp`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cache
            headers: {
                "Content-Type": "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    loading: false,
                    hasil: body.listData,
                    pagination: body.totalRow
                });
                console.log(this.state.hasil);
            }).catch(err => {
            console.log(err.message);
            // if(error.response.status === 404){
            //     return Notification('failed', "Data Tidak Ditemukan")
            // }
            this.setState({loading: false});
            GlobalVariable.openNotificationWithIcon('error')
        });
    }


    getidheader(e) {
        this.setState({
            idHeader: e.idHeader,
            idLhpHeader: e.idLhpHeader,
            // idLhpHeader: "",
            kodeDokumen: e.kodeDokumen,
            kodeKantor: e.kodeKantor,
        });
        console.log(this.state.idLhpHeader);
        localStorage.setItem("idHeader", e.idHeader);
        localStorage.setItem("kodeDokumen", e.kodeDokumen);
        localStorage.setItem("kodeKantor", e.kodeKantor);
        localStorage.setItem("idLhpHeader", e.idLhpHeader);
    }

    handlePageChange = (page) => {
        this.setState({
            page: page - 1
        }, () => this.getSemuaData())

    }

    getBAP = (e) => {
        const BAP = e.keputusanLhp.kodeRespon1
        const hide = message.loading('Sedang mengambil data..', 0);
        axios.get(`${REACT_APP_LHP}/get-respon?idHeader=${e.idHeader}&kodeRespon=${BAP}&seri=${e.seriPeriksa}`, {
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
                        const APIjasper = process.env.REACT_APP_PARSER + '/v1/report-respon/' + idRespon + '/responInhouse'
                        if (this.state.idRespon !== '' || this.state.idRespon !== null) {
                            this.setState({
                                modalJasper: true,
                                keyIframe: this.state.keyIframe + 1,
                                loading: true,
                                // nmModal: urlFile.substring(41)
                            })
                            axios(`${APIjasper}`, {
                                method: 'GET',
                                headers: {
                                    'beacukai-Api-Key': `${process.env.REACT_APP_SECRET_KEY_PARSER}`,
                                },
                                // 'Access-Control-Allow-Origin': '*',
                                responseType: 'blob' //Force to receive data in a Blob Format
                            })
                                .then(response => {
                                    //Create a Blob from the PDF Stream
                                    console.log(response)
                                    const file = new Blob(
                                        [response.data],
                                        {type: 'application/pdf'});
                                    //Build a URL from the file
                                    const fileURL = URL.createObjectURL(file);
                                    // alert (response.data.size)
                                    //Open the URL on new Window
                                    if (response.data.size == 0) {
                                        console.log("Tidak ada jasper report")
                                        this.setState({loading: false});
                                        setTimeout(hide, 2500);
                                        Modal.error({
                                            title: 'Tidak ada File Report Respon',
                                        });
                                    } else {
                                        this.setState({urlFile: fileURL, loading: false});
                                        setTimeout(hide, 2500);
                                    }

                                    // window.open(fileURL);
                                })
                                .catch(error => {
                                    console.log(error);
                                    Modal.error({
                                        title: 'Tidak ada File Report Respon',
                                    });
                                    setTimeout(hide, 2500);
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
            console.log('dapet ga', data)
        }).catch(error => {
            console.log(error);
            Modal.error({
                title: 'Id respon tidak ditemukan!',
            });
            setTimeout(hide, 2500);
        })
    }

    getPreviewFile = (e) => {
        // const url = props.key;
        // alert (this.state.loading)
        this.setState({urlJasper: '', loading: true});
        console.log(e);
        axios(`${e}`, {
            method: 'GET',
            headers: {
                'beacukai-Api-Key': `${process.env.REACT_APP_API_PARSER_KEY}`,
            },
            // 'Access-Control-Allow-Origin': '*',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                console.log(response)
                const file = new Blob(
                    [response.data],
                    {type: 'application/pdf'});
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                // alert (response.data.size)
                //Open the URL on new Window
                if (response.data.size == 0) {
                    console.log("Tidak ada jasper report")
                    this.setState({loading: false});
                    Modal.error({
                        title: 'Tidak ada File Report Respon',
                    });
                } else {
                    this.setState({urlJasper: fileURL, loading: true});
                }

                // window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    };
    getLHP = (e) => {
        const LHP = e.keputusanLhp.kodeRespon2
        const hide = message.loading('Sedang mengambil data..', 0);
        axios.get(`${REACT_APP_LHP}/get-respon?idHeader=${e.idHeader}&kodeRespon=${LHP}&seri=${e.seriPeriksa}`, {
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
                        const APIjasper = process.env.REACT_APP_PARSER + '/v1/report-respon/' + idRespon + '/responInhouse'
                        if (this.state.idRespon !== '' || this.state.idRespon !== null) {
                            // const urlFile = this.state.INamaFile
                            this.setState({
                                modalJasper: true,
                                keyIframe: this.state.keyIframe + 1,
                                loading: true,
                                // nmModal: urlFile.substring(41)
                            })
                            axios(`${APIjasper}`, {
                                method: 'GET',
                                headers: {
                                    'beacukai-Api-Key': `${process.env.REACT_APP_SECRET_KEY_PARSER}`,
                                },
                                // 'Access-Control-Allow-Origin': '*',
                                responseType: 'blob' //Force to receive data in a Blob Format
                            })
                                .then(response => {
                                    //Create a Blob from the PDF Stream
                                    console.log(response)
                                    const file = new Blob(
                                        [response.data],
                                        {type: 'application/pdf'});
                                    //Build a URL from the file
                                    const fileURL = URL.createObjectURL(file);
                                    // alert (response.data.size)
                                    //Open the URL on new Window
                                    if (response.data.size == 0) {
                                        console.log("Tidak ada jasper report")
                                        this.setState({loading: false});
                                        setTimeout(hide, 2500);
                                        Modal.error({
                                            title: 'Tidak ada File Report Respon',
                                        });
                                    } else {
                                        this.setState({urlFile: fileURL, loading: false});
                                        setTimeout(hide, 2500);
                                    }

                                    // window.open(fileURL);
                                })
                                .catch(error => {
                                    console.log(error);
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

    onCloseJasper(modalJasper) {
        this.setState({modalJasper});
        this.setState({loading: false});
    }

    render() {
        console.log('kodeKantor', this.state.kodeKantor)
        const {idLhpHeader, idHeader} = this.state;
        const columns = [
            {
                title: "Jenis Dokumen",
                dataIndex: "jenisDokumen",
                key: "jenisDokumen"
            },
            {
                title: "Nomor Pendaftaran",
                dataIndex: "nomorDokumen",
                key: "nomorDokumen"
            },
            {
                title: "Tanggal Dokumen",
                dataIndex: "tanggalDokumen",
                key: "tanggalDokumen",
                render: key => {
                    if (key === null) {
                        return "data tidak tersedia";
                    } else {
                        return moment(key).format("DD-MM-YYYY");
                    }
                }
            },
            {
                title: "Nomor Identitas",
                dataIndex: "npwp",
                key: "npwp"
            },
            {
                title: "Nama Penumpang",
                dataIndex: "namaPerusahaan",
                key: "namaPerusahaan"
            },
            {
                title: "Seri Periksa",
                dataIndex: "seriPeriksa",
                key: "seriPeriksa"
            },
            {
                title: "Tgl Perekaman LHP",
                dataIndex: "waktuRekamLhp",
                key: "waktuRekamLhp"
            },
            {
                title: "Aksi",
                dataIndex: "idHeader",
                width: 250,
                key: "idHeader",
                render: (key, record, e) => {
                    // console.log(record, e);
                    return (
                        <div>
                            <Button
                                type="primary"
                                className={'btn-bap'}
                                onClick={(evt) => this.getBAP(record, evt)}
                            >BAP
                            </Button>
                            &nbsp;
                            <Button
                                type="primary"
                                className={'btn-lhp'}
                                onClick={(evt) => this.getLHP(record, evt)}
                            >LHP
                            </Button>
                            &nbsp;
                            <Button
                                type="primary"
                                className={'btn-info_me'}
                                onClick={evt => this.getidheader(record, evt)}
                            ><i className="fas fa-info"></i>&nbsp; DETAIL
                            </Button>
                        </div>
                    );
                }
            }
        ];

        return (
            <Fragment>
                <div className="kt-subheader kt-grid__item" id="kt_subheader">
                    <div className="kt-subheader__main">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="">LHP</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/lhp-hasil-perekaman">
                                    Pencarian Laporan Dokumen{" "}
                                </Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <Row gutter={8} className="mb-1">
                    <Card
                        title="Pencarian Dokumen Status Pemeriksaan Barang"
                        title="Pencarian Laporan Hasil Pemeriksaan Barang"
                    >
                        <Form>
                            <Row className="mb-3" gutter={8} style={{margin: 20}}>
                                <Col span={4} style={{textAlign: "start"}}>
                                    Kode Kantor
                                </Col>
                                <Col span={8}>
                                    <Select
                                        showSearch
                                        style={{width: '100%'}}
                                        placeholder="Pilih Kode Kantor"
                                        optionFilterProp="children"
                                        value={this.state.kodeKantor}
                                        onChange={this.valueKodeKantor}
                                        onFocus={this.getKantor}
                                    >
                                        {this.state.children}
                                    </Select>
                                </Col>
                                {/*{this.state.kodeKantor.substring(0, 2) === '00' ? (*/}
                                {/*    <>*/}
                                {/*        <Col span={8}>*/}
                                {/*            <Select*/}
                                {/*                showSearch*/}
                                {/*                style={{width: '100%'}}*/}
                                {/*                placeholder="Pilih Kode Kantor"*/}
                                {/*                optionFilterProp="children"*/}
                                {/*                value={this.state.kodeKantor}*/}
                                {/*                onChange={this.valueKodeKantor}*/}
                                {/*                onFocus={this.getKantor}*/}
                                {/*            >*/}
                                {/*                {this.state.children}*/}
                                {/*            </Select>*/}
                                {/*        </Col>*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <>*/}
                                {/*        <Col span={8}>*/}
                                {/*            <Input value={this.state.kodeKantor} disabled/>*/}
                                {/*        </Col>*/}
                                {/*    </>*/}

                                {/*)}*/}


                            </Row>

                            <Row className="mb-2" gutter={8} style={{margin: 20}}>
                                <Col span={4} style={{textAlign: "start"}}>
                                    Jenis Dokumen
                                </Col>
                                <Col span={8}>
                                    <QuickSearch
                                        placeholder="Jenis Dokumen"
                                        clickHandler={this.dokumenHandler}
                                        pointer={"kodeDokumen"}
                                        pointer2={"namaDokumen"}
                                        isFetching={this.fetching}
                                        data={this.getDokumen}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2" gutter={8} style={{margin: 20}}>
                                <Col span={4} style={{textAlign: "start"}}>
                                    Nomor Pendaftaran
                                </Col>
                                <Col span={8}>
                                    <Input
                                        placeholder={"Masukkan Nomor Dokumen"}
                                        value={this.state.noDok}
                                        onChange={e => this.setState({noDok: e.target.value})}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-2" gutter={8} style={{margin: 20}}>
                                <Col span={4} style={{textAlign: "start"}}>
                                    Tanggal Dokumen
                                </Col>
                                <Col span={20}>
                                    <RangePicker
                                        format={"DD-MM-YYYY"}
                                        placeholder={["Dari", "Sampai"]}
                                        onChange={(_, date) => this.handleDate(date)}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-4" gutter={8} style={{margin: 20}}>
                                <Col span={4}></Col>

                                <Col span={20}>
                                    <Button
                                        type="primary"
                                        onClick={this.getSemuaData}
                                        htmlType="submit"
                                        style={{marginRight: "2%", justifyContent: "center"}}
                                    >
                                        <i className="fa fa-search" style={{marginRight: 8}}/>
                                        Cari
                                    </Button>
                                    <Button
                                        type="danger"
                                        onClick={this.resetData}
                                        ghost
                                        htmlType="submit"
                                    >
                                        <i className="fa fa-times" style={{marginRight: 8}}/>
                                        Kosongkan
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <hr/>
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
                                />
                                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                                    <Pagination
                                        onChange={(event) => this.handlePageChange(event)}
                                        current={this.state.page + 1}
                                        defaultCurrent={1}
                                        defaultPageSize={10}
                                        total={this.state.pagination}
                                    />
                                    &nbsp;
                                    {/*<Button type={'primary'} onClick={this.haii}>Refresh Data</Button>*/}
                                </div>
                            </TabPane>
                            <TabPane tab="Berita Acara Pemeriksaan"
                                     disabled={idLhpHeader == undefined}
                                     key="2">
                                {/* <DetailBAP idLhpHeader={idLhpHeader}/> */}
                            </TabPane>
                            <TabPane tab="Detail Pemeriksaan"
                                     disabled={idLhpHeader == undefined}
                                     key="3">
                                {/*<DetailPemeriksaan/>*/}
                                <DetailPemeriksaan
                                    idLhpHeader={idLhpHeader}
                                    idHeader={idHeader}
                                />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Row>
                <Modal
                    title={this.state.nmModal}
                    centered
                    visible={this.state.modalJasper}
                    onOk={() => this.onCloseJasper(false)}
                    onCancel={() => this.onCloseJasper(false)}
                    width="70%"
                >
                    <Spin spinning={this.state.loading} size="large">
                        <Iframe url={this.state.urlFile}
                                display="initial"
                                position="relative"
                                width="100%"
                                height="800px"
                                onLoad={this.hideSpinner}
                                allowFullScreen
                            // loading="auto"
                                key={this.state.KeyIframe}
                                style={{border: "none"}}
                        />

                    </Spin>
                </Modal>
            </Fragment>
        );
    }
}

export default index;
