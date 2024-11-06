import React,{Component} from 'react';
import {Row, Col, Card, Button, Form, Select } from 'antd';
import QuickSearch from "../Component/QuickSearch";

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
} = process.env;


class UnsurBarang extends Component{
    constructor() {
        super();
        this.state = {
        };
        this.getAsalBarang = this.getAsalBarang.bind(this);
        this.getNegara = this.getNegara.bind(this);
        this.KirimData = this.KirimData.bind(this);
        this.asalbarangHandler = this.asalbarangHandler.bind(this);
        this.negaraHandler = this.negaraHandler.bind(this);
        this.getKondisiBarang = this.getKondisiBarang.bind(this);
        this.kondisibarangHandler = this.kondisibarangHandler.bind(this);
    }


    async getAsalBarang(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/asal-barang/${e.toUpperCase()}`,
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

    asalbarangHandler(event) {
        this.setState({
            kodeAsalBarang: event.kodeAsalBarang,
            asalBarang: event.asalBarang
        });
        console.log(this.state.kodeAsalBarang)
    }

    async getNegara(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/negara/all/${e.toUpperCase()}`,
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

    negaraHandler(event) {
        this.setState({
            kodeNegara: event.kodeNegara,
            namaNegara: event.namaNegara
        });
        console.log(this.state.kodeAsalBarang)
    }
    async getKondisiBarang(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/kondisi-barang/lhp/${e.toUpperCase()}`,
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

    kondisibarangHandler(event) {
        this.setState({
            kodeKondisiBarang: event.kodeKondisiBarang,
            namaKondisiBarang: event.namaKondisiBarang
        });
        // console.log(this.state.kodeAsalBarang)
    }

    async KirimData() {
        let DetailBarang = {
            AsalBarang: this.state.kodeAsalBarang,
            AsalNegaraBarang: this.state.kodeNegara == 1 ? null : this.state.kodeNegara,
            KondisiBarang: this.state.kodeKondisiBarang,

        };
        console.log(DetailBarang);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.kondisiBarang !== this.props.kondisiBarang){
            this.setState({
                kodeAsalBarang : this.props.kodeAsalbarang,
                kodeNegara : this.props.kodeNegara,
                kondisiBarang : this.props.kondisiBarang
            })
        }
    }

    render(){
        return(
            <div>
                <Card size="small" title="Unsur Barang">
                    <Form>
                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col lg={3}>
                                <p>Asal Barang</p>
                            </Col>
                            <Col lg={14} >
                                <QuickSearch
                                    placeholder="..."
                                    clickHandler={this.asalbarangHandler}
                                    pointer2={"kodeAsalBarang"}
                                    pointer={"asalBarang"}
                                    isFetching={this.fetching}
                                    data={this.getAsalBarang}
                                ></QuickSearch>
                            </Col>
                            <Col lg={6}>
                            </Col>
                            <Col lg={6}>
                                {this.state.kodeAsalBarang == 1 ? (
                                    <QuickSearch
                                        placeholder="Asal Negara"
                                        clickHandler={this.negaraHandler}
                                        pointer2={"kodeNegara"}
                                        pointer={"namaNegara"}
                                        isFetching={this.fetching}
                                        data={this.getNegara}
                                    ></QuickSearch>
                                ) : null}

                            </Col>
                            <Col lg={6}></Col>
                        </Row>
                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col lg={3}>
                                <p>Kondisi</p>
                            </Col>
                            <Col lg={6} md={8}>
                                <QuickSearch
                                    placeholder="Kondisi Barang"
                                    clickHandler={this.kondisibarangHandler}
                                    pointer2={"kodeKondisiBarang"}
                                    pointer={"namaKondisiBarang"}
                                    isFetching={this.fetching}
                                    data={this.getKondisiBarang}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}


export default UnsurBarang;