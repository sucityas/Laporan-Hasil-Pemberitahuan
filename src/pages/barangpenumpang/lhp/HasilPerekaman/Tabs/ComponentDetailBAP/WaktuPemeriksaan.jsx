import React, {Component} from 'react'
import {Col, Row, Form, Button, DatePicker, Input, TimePicker} from 'antd';
import QuickSearch from "../Component/QuickSearch";

import * as moment from 'moment';

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

class WaktuPemeriksaan extends Component {
    constructor(props) {
        super(props);

        this.KirimData = this.KirimData.bind(this);
        this.alasanHandler = this.alasanHandler.bind(this);
        this.getAlasan = this.getAlasan.bind(this);
    }

    getDataDokumen(e) {
        let idheader = localStorage.getItem("idHeader");
        fetch(`${REACT_APP_LHP}/waktu-pemeriksaan/${idheader}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`
            },
            "Access-Control-Allow-Origin": "*"
        })
            .then(response => response.json())
            .then(body => {
                this.setState({
                    hasil: body.listData[1],
                    waktuMulai: body.listData[1].waktuMulai,
                    waktuSelesai: body.listData[1].waktuSelesai,

                });
                console.log(this.state.waktuMulai);
            });
    }

    componentDidMount() {
        this.getDataDokumen();
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            tglpengeluaran: this.state.tglPengeluaran,
            tglpengeluaranselesai: this.state.tglPengeluaranSelesai,
            tglPemeriksaan: this.state.tglPemeriksaan,
            tglPemeriksaanselesai: this.state.tglPemeriksaanSelesai,
            alasan: this.state.idAlasanPkb

        };

        console.log(modelPenerbitanSkepAeo);
    }

    async getAlasan(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/alasan-pkb/${e.toUpperCase()}`,
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

    alasanHandler(event) {
        this.setState({
            alasanPkb: event.alasanPkb,
            idAlasanPkb: event.idAlasanPkb
        });
        // console.log(this.state.kantorhasil)
    }

    onOk(value) {
        console.log('onOk: ', value);
    }

    onChangeTglPengeluaran = (date, dateString) => {
        this.setState({
            tglPengeluaran: dateString,
        });
        console.log('tglPengeluaran', dateString)
    };
    onChangeTglPengeluaranSelesai = (date, dateString) => {
        this.setState({tglPengeluaranSelesai: dateString,});
    };
    onChangeTglPemeriksaan = (date, dateString) => {
        this.setState({tglPemeriksaan: dateString,});
    };
    onChangeTglPemeriksaanSelesai = (date, dateString) => {
        this.setState({tglPemeriksaanSelesai: dateString,});
    };


    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>

                        <Col span={4} style={{textAlign: 'start'}}>
                            Penunjuk Pemeriksa
                        </Col>


                        <Col span={8}>
                            <Input value={
                                this.state.waktuMulai === null
                                    ? "Data Tidak Tersedia"
                                    : this.state.waktuMulai} disabled/>
                        </Col>
                        <Col span={4} style={{textAlign: 'center'}}>
                            Waktu PKB
                        </Col>
                        <Col span={8}>
                            <Input value={
                                this.state.waktuSelesai === null
                                    ? "Data Tidak Tersedia"
                                    : this.state.waktuSelesai
                            } disabled/>
                        </Col>

                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={4} style={{textAlign: 'start'}}>
                            Pengeluaran Kemasan
                        </Col>

                        <Col span={6}>
                            <DatePicker showTime onChange={this.onChangeTglPengeluaran} onOk={this.onOk}/>
                        </Col>

                        {/*<Col span={4}>*/}
                        {/*    <TimePicker*/}
                        {/*        style={{ color: 'black' }}*/}
                        {/*        placeholder={'Waktu Mulai'}*/}
                        {/*        onChange={this.onChangeWaktuPengeluaran}*/}
                        {/*        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}*/}
                        {/*    />*/}
                        {/*</Col>*/}
                        <Col span={1}>
                            -
                        </Col>
                        <Col span={6}>
                            <DatePicker showTime onChange={this.onChangeTglPengeluaranSelesai} onOk={this.onOk}/>
                        </Col>
                        {/*<Col span={4}>*/}
                        {/*    <TimePicker*/}
                        {/*        // defaultValue={pengeluaran_kemasan_selesaij}*/}
                        {/*        onChange={this.onChangeWaktuPengeluaranSelesai}*/}
                        {/*        style={{color: 'black'}}*/}
                        {/*        placeholder={'Waktu Selesai'}*/}
                        {/*        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}*/}
                        {/*    />*/}
                        {/*</Col>*/}
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={4} style={{textAlign: 'start'}}>
                            Pemeriksaan Barang
                        </Col>
                        <Col span={6}>
                            <DatePicker showTime onChange={this.onChangeTglPemeriksaan} onOk={this.onOk}/>
                        </Col>

                        {/*<Col span={4}>*/}
                        {/*    <TimePicker*/}
                        {/*        style={{color: 'black'}}*/}
                        {/*        onChange={this.onChangeWaktuPemeriksaan}*/}
                        {/*        placeholder={'Waktu Mulai'}*/}
                        {/*        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}*/}
                        {/*    />*/}
                        {/*</Col>*/}

                        <Col span={1}>
                            -
                        </Col>

                        <Col span={6}>
                            <DatePicker showTime onChange={this.onChangeTglPemeriksaanSelesai} onOk={this.onOk}/>
                        </Col>

                        {/*<Col span={4}>*/}
                        {/*    <TimePicker*/}
                        {/*        style={{color: 'black'}}*/}
                        {/*        onChange={this.onChangeWaktuPemeriksaanSelesai}*/}
                        {/*        placeholder={'Waktu Selesai'}*/}
                        {/*        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}*/}
                        {/*    />*/}
                        {/*</Col>*/}

                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={4} style={{textAlign: 'start'}}>
                            Alasan Pemeriksaan > 1 jam sejak PKB
                        </Col>


                        <Col span={19}>
                            <QuickSearch
                                placeholder="Alasan Pemeriksaan"
                                clickHandler={this.alasanHandler}
                                pointer={"alasanPkb"}
                                // pointer2={"kodeKantor"}
                                isFetching={this.fetching}
                                data={this.getAlasan}
                            ></QuickSearch>
                        </Col>

                    </Row>
                </Form>
                <Button onClick={this.KirimData}>Kirim</Button>
            </div>
        )
    }
}


export default WaktuPemeriksaan

