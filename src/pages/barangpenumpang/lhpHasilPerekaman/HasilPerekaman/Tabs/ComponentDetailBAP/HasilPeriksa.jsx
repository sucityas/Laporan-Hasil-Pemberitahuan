import React, {Component} from 'react'
import {Col, Row, Form, Button, Radio, Select} from 'antd';
import QuickSearch from "../Component/QuickSearch";


const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

class HasilPeriksa extends Component {
    state = {
        kondisiSegel: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            nilaiKontainer: [],
        }
        ;
        this.getPemeriksaan = this.getPemeriksaan.bind(this);
        this.pemeriksaanHandler = this.pemeriksaanHandler.bind(this);
        this.KirimData = this.KirimData.bind(this);
    }

    getDataDokumen(e) {
        let idheader = localStorage.getItem("idHeader");
        let kodeDokumen = localStorage.getItem("kodeDokumen");
        fetch(`${REACT_APP_LHP}/header-dokumen/${idheader}/${kodeDokumen}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
            },
            "Access-Control-Allow-Origin": "*"
        })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    hasil: body.listData,
                    jumlahKontainer: body.listData[0].jumlahKontainer
                });
                console.log(this.state.jumlahKontainer);
            });
    }

    componentDidMount() {
        this.getDataDokumen();
    }

    async getPemeriksaan(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_LHP}/tingkat-ip${e.toUpperCase()}`,
            {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
                },
                "Access-Control-Allow-Origin": "*"
            }
        )
            .then(response => response.json())
            .then(body => body.listData);
        return pelData;
    }

    pemeriksaanHandler(event) {
        this.setState({
            tingkatIp: event.tingkatIp,
            idTingkatIp: event.idTingkatIp
        });
        // console.log(this.state.kantorhasil)
    }


    async KirimData() {
        let modelPenerbitanSkepAeo = {
            kondisiSegel: this.state.kondisiSegel,
            tingkat_pemeriksaan: this.state.idTingkatIp,
            kodeJenisKemasan: this.state.jumlahKontainer > 0 ? 'FLC' : 'LCL'
        };

        console.log(modelPenerbitanSkepAeo);
    }


    onChangeKondisiSegel = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            kondisiSegel: e.target.value
        });
        console.log(this.state.kondisiSegel);
    };

    onChangeJenisKemasan = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            jenisKemasan: e.target.value
        });
        console.log(this.state.jenisKemasan);
    };

    render() {
        const nilaiKontainer = [this.state.jumlahKontainer]
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Kondisi Segel
                        </Col>
                        <Col span={14}>
                            <Radio.Group
                                value={this.state.kondisiSegel}
                                onChange={this.onChangeKondisiSegel}
                            >
                                <Radio value={1}>Utuh</Radio>
                                <Radio value={2}>Rusak</Radio>
                                <Radio value={3}>Berbeda</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Realisasi Tingkat Pemeriksaan
                        </Col>
                        <Col span={14}>
                            <QuickSearch
                                placeholder="Kendala Pemeriksaan"
                                clickHandler={this.pemeriksaanHandler}
                                pointer={"tingkatIp"}
                                // pointer2={"kodeKantor"}
                                isFetching={this.fetching}
                                data={this.getPemeriksaan}
                            ></QuickSearch>
                        </Col>
                    </Row>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jenis Kemasan
                        </Col>
                        <Col span={14}>
                            <Radio.Group
                                value={nilaiKontainer > 0 ? 'fcl' : 'lcl'}
                                onChange={this.onChangeJenisKemasan}
                                disabled={true}
                            >
                                <Radio value={'fcl'}>FCL</Radio>
                                <Radio value={'lcl'}>LCL</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                </Form>
                <Button onClick={this.KirimData}>Kirim</Button>
            </div>
        )
    }
}

export default HasilPeriksa;

