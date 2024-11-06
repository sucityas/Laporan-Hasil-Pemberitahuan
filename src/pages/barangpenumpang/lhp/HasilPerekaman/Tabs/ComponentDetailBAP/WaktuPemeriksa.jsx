import React, {Component} from 'react'
import {Col, Row, Form, Button, Input, DatePicker} from 'antd';
import QuickSearch from "../../../Component/QuickSearch";


const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
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
                    PenunjukanPemeriksaMulai: body.listData[0].waktuMulai === null ? 'data Kosong' : body.listData[0].waktuMulai,
                    PenunjukanPemeriksaSelesai: body.listData[0].waktuSelesai === null ? 'data Kosong' : body.listData[0].waktuSelesai,
                    PKBMulai: body.listData[1].waktuMulai === null ? 'data Kosong' : body.listData[1].waktuMulai,
                    PKBSelesai: body.listData[1].waktuSelesai === null ? 'data Kosong' : body.listData[1].waktuSelesai,
                    // waktuMulai: body.listData[1].kodeProses,
                    // waktuSelesai: body.listData[1],
                    // penujukpemeriksa : body.listData[1].waktuMulai,
                    // pkb : body.listData[0].waktuMulai === null ? '' : body.listData[0].waktuMulai

                });
            });
    }

    componentDidMount() {
        this.getDataBaru();

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

    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>

                        <Col span={4} style={{textAlign: 'start'}}>
                            Penunjuk Pemeriksa
                        </Col>

                        {/*<DatePicker showTime value={this.state.penujukpemeriksa} onOk={this.onOk}/>*/}
                        <Col span={8}>
                            <Input disabled value={this.state.PenunjukanPemeriksaMulai}/>
                            <Input disabled value={this.state.PenunjukanPemeriksaSelesai}/>
                        </Col>
                        <Col span={4} style={{textAlign: 'center'}}>
                            Waktu PKB
                        </Col>
                        <Col span={8}>
                            <Input disabled value={this.state.PKBMulai}/>
                            <Input disabled value={this.state.PKBSelesai}/>
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
            </div>
        )
    }
}

export default WaktuPemeriksa;

