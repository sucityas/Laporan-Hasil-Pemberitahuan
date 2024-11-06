import React, {Component} from "react";
import {Col, Row, Form, TimePicker, Input, DatePicker} from "antd";
import QuickSearch from "../Component/QuickSearch";
import moment from "moment";
import _ from "lodash";
import GlobalVariable from "../../../../helpers/GlobalVariable";
import './bebas.css'

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;

class WaktuPemeriksa extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.KirimData = this.KirimData.bind(this);
        this.alasanHandler = this.alasanHandler.bind(this);
        this.getAlasan = this.getAlasan.bind(this);
    }

    getDataBaru(e) {
        const idheader = localStorage.getItem('idHeader')
        fetch(`${REACT_APP_LHP}/waktu-pemeriksaan/${idheader}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                if (body.listData.length !== 0) {
                    let dataWaktu = body.listData;
                    var waktuPKB = _.find(dataWaktu, ["kodeProses", "310"]) || {};
                    var penunjukPemeriksa =
                        _.find(dataWaktu, ["kodeProses", "311"]) || {};

                    console.log("Waktu PKB", waktuPKB.waktuMulai);

                    this.setState({
                        penunjukanPemeriksaanMulai: penunjukPemeriksa.waktuMulai == null ? null
                            : moment(penunjukPemeriksa.waktuMulai).format("DD-MM-YYYY HH:mm:ss"),

                        PenunjukanPemeriksaSelesai:
                            penunjukPemeriksa.waktuSelesai === null
                                ? moment().format("DD-MM-YYYY H:mm:ss")
                                : moment(penunjukPemeriksa.waktuSelesai).format("DD-MM-YYYY H:mm:ss"),

                        PKBMulai:
                            waktuPKB.waktuMulai === null
                                ? null
                                : moment(waktuPKB.waktuMulai).format("DD-MM-YYYY H:mm:ss"),

                        PKBSelesai:
                            waktuPKB.waktuSelesai === null
                                ? moment().format("DD-MM-YYYY H:mm:ss")
                                : moment(waktuPKB.waktuSelesai).format("DD-MM-YYYY H:mm:ss"),
                    });
                }
            });
    }

    getWaktuPemeriksa() {
        const idLhpHeader = this.props.idlhpheader;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-waktu-periksa/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                let data1 = body.listData;
                var waktuPKB = _.find(data1, ['kodeProses', '310']) || {};
                var penunjukPemeriksa = _.find(data1, ['kodeProses', '311']) || {};
                var pengeluaranKemasan = _.find(data1, ['kodeProses', '314']) || {};
                var pemeriksaanBarang = _.find(data1, ['kodeProses', '330']) || {};

                // console.log(JSON.stringify(newData.waktuMulai, null, 3))
                this.setState({
                    skeleton: false,
                    //Waktu Pemeriksaan
                    penunjukanPemeriksaanMulai: penunjukPemeriksa.waktuMulai == null ? null
                        : moment(penunjukPemeriksa.waktuMulai).format("DD-MM-YYYY HH:mm:ss"),
                    penunjukanPemeriksaanSelesai: moment(penunjukPemeriksa.waktuSelesai).format("DD-MM-YYYY HH:mm:ss"),
                    tglPengeluaran: moment(pengeluaranKemasan.waktuMulai),
                    tglPengeluaranSelesai: moment(pengeluaranKemasan.waktuSelesai),
                    tglPemeriksaan: moment(pemeriksaanBarang.waktuMulai),
                    tglPemeriksaanSelesai: moment(pemeriksaanBarang.waktuSelesai),
                    PKBMulai: waktuPKB.waktuMulai === null
                        ? null
                        : moment(waktuPKB.waktuMulai).format("DD-MM-YYYY HH:mm:ss"),
                    PKBSelesai: moment(waktuPKB.waktuSelesai).format("DD-MM-YYYY HH:mm:ss"),


                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    getMemoJenis() {
        const idLhpHeader = this.props.idlhpheader
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-memo-jenis/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    //  alasan PKB
                    alasanPkb: body.listData[0].alasanPkb,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    componentDidMount() {
        const idLhpHeader = this.props.idlhpheader
        if (idLhpHeader !== "null") {
            this.getWaktuPemeriksa()
            this.getMemoJenis()
        } else {
            this.getDataBaru();

        }
    }

    async getAlasan(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/alasan-pkb/${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`,
                },
                "Access-Control-Allow-Origin": "*",
            }
        )
            .then((response) => response.json())
            .then((body) => body.data);
        return pelData;
    }

    alasanHandler(event) {
        this.setState({
            alasanPkb: event.alasanPkb,
            idAlasanPkb: event.idAlasanPkb,
        });
        // console.log(this.state.kantorhasil)
    }

    onOk(value) {
        console.log("onOk: ", value);
    }

    onChangeTimePengeluaran = (date, dateString) => {
        const tanggal = moment(this.state.timePengeluaran + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({
            tglPengeluaran: tanggal,
        }, () => {
            let a = moment(this.state.penunjukanPemeriksaanMulai, 'DD-MM-YYYY HH:mm:ss').format()
            let b = moment(this.state.tglPengeluaran, 'DD-MM-YYYY HH:mm:ss').format()
            console.log("cek nih", b < a)
            this.setState({requiredField: b < a}, () => {
                console.log("isi", b, a, b <= a)
            })
        });
    };
    onChangeTglPengeluaran = (e, date, dateString) => {
        this.setState({
            timePengeluaran: date
        }, () => {
            this.onChangeTimePengeluaran(date)
        })
    };
    //
    onChangeTglPengeluaranSelesai = (date, dateString) => {
        this.setState({timePengeluaranSelesai: dateString}, () => {
            this.onChangeTimePengeluaranSelesai(dateString)
        });
    };
    onChangeTimePengeluaranSelesai = (date, dateString) => {
        const tanggal = moment(this.state.timePengeluaranSelesai + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({tglPengeluaranSelesai: tanggal}, () => {
            let a = moment(this.state.tglPengeluaranSelesai, 'DD-MM-YYYY HH:mm:ss').format()
            let b = moment(this.state.tglPengeluaran, 'DD-MM-YYYY HH:mm:ss').format()
            this.setState({
                validateTanggalPengeluaran: a < b
            })
        });
    };
    //
    onChangeTglPemeriksaan = (date, dateString) => {
        this.setState({timePemeriksaan: dateString}, () => {
            this.onChangeTimePemeriksaan(dateString)
        });
    };
    onChangeTimePemeriksaan = (date, dateString) => {
        const tanggal = moment(this.state.timePemeriksaan + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({tglPemeriksaan: tanggal});
    };
    //
    onChangeTglPemeriksaanSelesai = (date, dateString) => {
        this.setState({timePemeriksaanSelesai: dateString}, () => {
            this.onChangeTimePemeriksaanSelesai(dateString)
        });
    };
    onChangeTimePemeriksaanSelesai = (date, dateString) => {
        const tanggal = moment(this.state.timePemeriksaanSelesai + dateString, 'DD-MM-YYYY HH:mm:ss')
        this.setState({tglPemeriksaanSelesai: tanggal}, () => {
            let a = moment(this.state.timePemeriksaanSelesai, 'DD-MM-YYYY HH:mm:ss').format()
            let b = moment(this.state.tglPemeriksaan, 'DD-MM-YYYY HH:mm:ss').format()
            this.setState({
                validateTanggalPemeriksaan: a < b
            })
        });
    };

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            tglpengeluaran: this.state.tglPengeluaran,
            tglpengeluaranselesai: this.state.tglPengeluaranSelesai,
            tglPemeriksaan: this.state.tglPemeriksaan,
            tglPemeriksaanselesai: this.state.tglPemeriksaanSelesai,
            alasan: this.state.idAlasanPkb,
        };

        console.log(modelPenerbitanSkepAeo);
    }

    render() {
        const {flagBap} = this.props;
        const {tglPengeluaran, tglPengeluaranSelesai, tglPemeriksaan, tglPemeriksaanSelesai} = this.state;
        const kodeDokumen = localStorage.getItem("kodeDokumen")

        console.log('debug', flagBap)
        return (
            <div>
                <Form>
                    {kodeDokumen === "23" || kodeDokumen === "25" || kodeDokumen === "261" || kodeDokumen === "262" || kodeDokumen === "27" ||
                    kodeDokumen === "40" || kodeDokumen === "41" || kodeDokumen === "16" || kodeDokumen === "28" || kodeDokumen === "33" ||
                    kodeDokumen === "30" ? null : (
                        <Row className="mb-2" gutter={8}>
                            <Col span={4} style={{textAlign: "start"}}>
                                Penunjuk Pemeriksa
                            </Col>

                            {/*<DatePicker showTime value={this.state.penujukpemeriksa} onOk={this.onOk}/>*/}
                            <Col span={6}>
                                <Input disabled value={this.state.penunjukanPemeriksaanMulai}/>
                            </Col>
                            {/*<Col span={4}>*/}
                            {/*    <Input disabled value={this.state.PenunjukanPemeriksaSelesai}/>*/}
                            {/*</Col>*/}
                            <Col span={4} style={{textAlign: "center"}}>
                                Waktu PKB
                            </Col>
                            <Col span={6}>
                                <Input disabled value={this.state.PKBMulai}/>
                            </Col>
                            {/*<Col span={4}>*/}
                            {/*    <Input disabled value={this.state.PKBSelesai}/>*/}
                            {/*</Col>*/}
                        </Row>
                    )}


                    <Row className="mb-2" gutter={8}>

                        <Col span={4} style={{textAlign: "start"}}>
                            {kodeDokumen === "20" ? (<span className={'text-red'}>* </span>) : null} Pengeluaran Kemasan
                        </Col>
                        <Col span={8}>
                            <DatePicker
                                id={kodeDokumen !== "20" ? null : this.state.requiredField === true ? "error" : ""}
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                onChange={this.onChangeTglPengeluaran}
                                format={"DD-MM-YYYY"}
                                value={tglPengeluaran}
                                onOk={this.onOk}
                            />
                            &nbsp;
                            <TimePicker
                                onChange={this.onChangeTimePengeluaran}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                value={tglPengeluaran}
                                disabled={flagBap === '2' ? true : flagBap === '5'}

                            />
                        </Col>
                        <Col span={1}><span>-</span></Col>
                        <Col span={8}>
                            <DatePicker
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                onChange={this.onChangeTglPengeluaranSelesai}
                                format={"DD-MM-YYYY"}
                                value={tglPengeluaranSelesai}
                                onOk={this.onOk}
                            />
                            &nbsp;
                            <TimePicker
                                onChange={this.onChangeTimePengeluaranSelesai}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                value={tglPengeluaranSelesai}
                                disabled={flagBap === '2' ? true : flagBap === '5'}

                            />
                            {
                                this.state.validateTanggalPengeluaran === true ? (
                                    <p className={'text-red'} style={{fontSize: '12px'}}>Format isian anda salah,
                                        harap
                                        tanggal lebih besar dari Pengeluaran Kemasan awal!</p>) : null
                            }
                        </Col>
                        <br/>
                        <br/>
                        {kodeDokumen === "20" ? (
                            <>
                                {
                                    this.state.requiredField === true ? (
                                        <p className={'text-red'} style={{fontSize: '12px'}}>Format isian anda salah,
                                            harap
                                            tanggal lebih besar dari penunjuk pemeriksa!</p>) : null
                                }
                            </>
                        ) : null}
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={4} style={{textAlign: "start"}}>
                            Pemeriksaan Barang
                        </Col>
                        <Col span={8}>
                            <DatePicker
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                onChange={this.onChangeTglPemeriksaan}
                                format={"DD-MM-YYYY"}
                                value={tglPemeriksaan}
                                onOk={this.onOk}
                            />
                            &nbsp;
                            <TimePicker
                                onChange={this.onChangeTimePemeriksaan}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                value={tglPemeriksaan}
                                disabled={flagBap === '2' ? true : flagBap === '5'}

                            />
                        </Col>
                        <Col span={1}>-</Col>
                        <Col span={8}>
                            <DatePicker
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                onChange={this.onChangeTglPemeriksaanSelesai}
                                format={"DD-MM-YYYY"}
                                value={tglPemeriksaanSelesai}
                                onOk={this.onOk}
                            />
                            &nbsp;
                            <TimePicker
                                onChange={this.onChangeTimePemeriksaanSelesai}
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                value={tglPemeriksaanSelesai}
                            />
                            {
                                this.state.validateTanggalPemeriksaan === true ? (
                                    <p className={'text-red'} style={{fontSize: '12px'}}>Format isian anda salah,
                                        harap
                                        tanggal lebih besar dari Pemeriksaan Barang awal!</p>) : null
                            }
                        </Col>
                    </Row>
                    {kodeDokumen === "23" || kodeDokumen === "25" || kodeDokumen === "261" || kodeDokumen === "262" || kodeDokumen === "27" ||
                    kodeDokumen === "40" || kodeDokumen === "41" || kodeDokumen === "16" || kodeDokumen === "28" || kodeDokumen === "33" ||
                    kodeDokumen === "30" ? null : (
                        <Row className="mb-2" gutter={8}>
                            <Col span={4} style={{textAlign: "start"}}>
                                Alasan Pemeriksaan > 1 jam sejak PKB
                            </Col>
                            {flagBap === '0' ? (<Col span={10}>
                                <QuickSearch
                                    placeholder="Alasan Pemeriksaan"
                                    clickHandler={this.alasanHandler}
                                    pointer={"alasanPkb"}
                                    // pointer2={"kodeKantor"}
                                    isFetching={this.fetching}
                                    data={this.getAlasan}
                                />
                            </Col>) : flagBap === '2' || flagBap === '5' ? (
                                <Col span={13}>
                                    <Input disabled={flagBap === '2' ? true : flagBap === '5'}
                                           value={this.state.alasanPkb}/>
                                </Col>
                            ) : flagBap === '3' ? (
                                <div>
                                    <Col span={6}>
                                        <QuickSearch
                                            placeholder="Alasan Pemeriksaan"
                                            clickHandler={this.alasanHandler}
                                            pointer={"alasanPkb"}
                                            // pointer2={"kodeKantor"}
                                            isFetching={this.fetching}
                                            data={this.getAlasan}
                                        ></QuickSearch>
                                    </Col>
                                    <Col span={10}>
                                        <Input disabled={flagBap === '2' ? true : flagBap === '5'}
                                               value={this.state.alasanPkb}/>
                                    </Col>
                                </div>
                            ) : null}

                        </Row>
                    )}

                </Form>
            </div>
        );
    }
}

export default WaktuPemeriksa;
