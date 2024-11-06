import React, {Component} from 'react'
import {Col, Row, Form, Input, Radio, Button} from 'antd';

class JumlahJenisBarang extends Component {
    state = {
        valuedimintakembali: 1
    };

    constructor(props) {
        super(props);
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            PartaiBarang: this.state.PartaiBarang,
            JumlahBarang: this.state.JumlahBarang,
            JumlahJenisBarang: this.state.JumlahJenisBarang
        };

        console.log(modelPenerbitanSkepAeo);
    }

    onChangeDiminta = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            valuedimintakembali: e.target.value
        });
        console.log(this.state.valuedimintakembali);
    };

    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Partai Barang
                        </Col>
                        <Col span={10}>
                            <Input
                                value={this.state.PartaiBarang}
                                onChange={e => this.setState({PartaiBarang: e.target.value})}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Barang yang Diperiksa
                        </Col>
                        <Col span={10}>
                            <Input
                                value={this.state.JumlahBarang}
                                onChange={e => this.setState({JumlahBarang: e.target.value})}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Jenis Barang yang Diperiksa
                        </Col>
                        <Col span={10}>
                            <Input
                                value={this.state.JumlahJenisBarang}
                                onChange={e => this.setState({JumlahJenisBarang: e.target.value})}
                            />
                        </Col>
                    </Row>

                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        )
    }
}


export default JumlahJenisBarang

