import React, {Component} from 'react'
import {Col, Row, Form, Input, Radio, Button} from 'antd';

class ContohBarang extends Component {
    state = {
        valuedimintakembali: 1
    };

    constructor(props) {
        super(props);
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            radio: this.state.valuedimintakembali,
            jenis: this.state.Jenis,
            Jumlah: this.state.Jumlah
        };

    }

    onChangeDiminta = e => {
        this.setState({
            valuedimintakembali: e.target.value
        });
    };

    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Jenis
                        </Col>
                        <Col span={18}>
                            <Input
                                value={this.state.Jenis}
                                onChange={e => this.setState({Jenis: e.target.value})}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Jumlah
                        </Col>
                        <Col span={18}>
                            <Input
                                value={this.state.Jumlah}
                                onChange={e => this.setState({Jumlah: e.target.value})}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Diminta Kembali
                        </Col>
                        <Col span={18}>
                            <Radio.Group value={this.state.valuedimintakembali} onChange={this.onChangeDiminta}>
                                <Radio value='Y'>Ya</Radio>
                                <Radio value='T'>Tidak</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        )
    }
}


export default ContohBarang

