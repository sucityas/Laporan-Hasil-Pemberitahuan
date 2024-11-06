import React, {Component} from 'react';
import {Row, Col, Card, Input, Form, Button, InputNumber} from 'antd';
import QuickSearch from "../Component/QuickSearch";

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;


class Kemasan extends Component {
    constructor() {
        super();
        this.state = {
            visible : false,
        };
        this.getJenis = this.getJenis.bind(this);
        this.KirimData = this.KirimData.bind(this);
        this.jenisHandler = this.jenisHandler.bind(this);
    }


    async getJenis(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/kemasan/all/${e.toLowerCase()}`,
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

    jenisHandler(event) {
        this.setState({
            kodeKemasan: event.kodeKemasan,
            namaKemasan: event.namaKemasan
        });
    }

    async KirimData() {
        let DetailBarang = {
            Jumlah: this.state.jumlahKemasan,
            Panjang: this.state.panjangKemasan,
            Jenis: this.state.kodeKemasan,
            Ukuran: this.state.ukuranKemasan,
            Lebar: this.state.lebarKemasan,
            Tinggi: this.state.tinggiKemasan,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.jumlahKemasan !== this.props.jumlahKemasan){
            this.setState({
                jumlahKemasan : this.props.jumlahKemasan,
                panjangKemasan : this.props.panjangKemasan,
                kodeKemasan : this.props.kodeKemasan,
                ukuranKemasan : this.props.ukuranKemasan,
                lebarKemasan : this.props.lebarKemasan,
                tinggiKemasan : this.props.tinggiKemasan
            })
        }
    }

    onChangeDataJumlahKemasan = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                jumlahKemasan: event
            },
            () => {
                this.checkNumber(this.state.jumlahKemasan);
            }
        );
    };onChangeDataPanjangKemasan = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                panjangKemasan: event
            },
            () => {
                this.checkNumber(this.state.panjangKemasan);
            }
        );
    };onChangeDataLebarKemasan = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                lebarKemasan: event
            },
            () => {
                this.checkNumber(this.state.lebarKemasan);
            }
        );
    };onChangeDataUkuranKemasan = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                ukuranKemasan: event
            },
            () => {
                this.checkNumber(this.state.ukuranKemasan);
            }
        );
    };onChangeDataTinggiKemasan = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                tinggiKemasan: event
            },
            () => {
                this.checkNumber(this.state.tinggiKemasan);
            }
        );
    };

    checkNumber = (e) => {
        if (typeof e !== "number") {
            this.setState({visible: true})
        } else {
            this.setState({visible: false})
        }
    };

    render() {

        return (
            <div>
                <Card size="small" title="Kemasan">

                    <Form>

                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={3}>
                                <p>Jumlah</p>
                            </Col>
                            <Col span={9}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.jumlahKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataJumlahKemasan}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>
                            <Col span={3}>
                                <p>Panjang</p>
                            </Col>
                            <Col span={9}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.panjangKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataPanjangKemasan}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>
                        </Row>

                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={3}>
                                <p>Jenis</p>
                            </Col>
                            <Col span={9}>
                                <QuickSearch
                                    placeholder="Jenis Kemasan"
                                    clickHandler={this.jenisHandler}
                                    pointer={"kodeKemasan"}
                                    pointer2={"namaKemasan"}
                                    isFetching={this.fetching}
                                    data={this.getJenis}
                                />
                            </Col>

                            <Col span={3}>
                                <p>Lebar</p>
                            </Col>
                            <Col span={9}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.lebarKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataLebarKemasan}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>
                        </Row>

                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={3}>
                                <p>Ukuran</p>
                            </Col>
                            <Col span={9}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.ukuranKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataUkuranKemasan}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>
                            <Col span={3}>
                                <p>Tinggi</p>
                            </Col>
                            <Col span={9}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.tinggiKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataTinggiKemasan}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>
                        </Row>
                    </Form>

                </Card>


            </div>
        )
    }
}

export default Kemasan;
