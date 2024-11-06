import React, {Component} from 'react'
import {Col, Row, Form, Input, Radio, Button} from 'antd';

const {TextArea} = Input;

class RealisasiMemo extends Component {
    state = {
        memopfpd: 1
    };

    constructor(props) {
        super(props);
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            radiomemo: this.state.memopfpd,
            keteranganmemo: this.state.Keterangan,
        };

        console.log(modelPenerbitanSkepAeo);
    }

    onChangeMemo = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            memopfpd: e.target.value
        });
        console.log(this.state.valuedimintakembali);
    };

    render() {
        return (
            <div>
                <Form>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Memo PFPD dilaksanakan?
                        </Col>
                        <Col span={18}>
                            <Radio.Group value={this.state.memopfpd} onChange={this.onChangeMemo}>
                                <Radio value={'Y'}>Ya</Radio>
                                <Radio value={'S'}>Sebagian</Radio>
                                <Radio value={'T'}>Tidak</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Keterangan
                        </Col>
                        <Col span={18}>
                            <TextArea
                                value={this.state.Keterangan}
                                onChange={e => this.setState({Keterangan: e.target.value})}
                            />
                        </Col>
                    </Row>
                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        )
    }
}


export default RealisasiMemo

