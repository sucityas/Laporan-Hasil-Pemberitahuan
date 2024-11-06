import React, {Component} from 'react'
import {Col, Row, Form, Input, Radio, Button} from 'antd';

const {TextArea} = Input;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;
class KesimpulanHasil extends Component {
    state = {
        kesimpulanhasil: 1
    };

    constructor(props) {
        super(props);
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            radio: this.state.kesimpulanhasil,
            catatan: this.state.Catatan,
        };

        console.log(modelPenerbitanSkepAeo);
    }

    onChangeKesimpulan = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            kesimpulanhasil: e.target.value
        });
        console.log(this.state.kesimpulanhasil);
    };

    render() {
        let disable_value = localStorage.getItem("hiddenKirim")
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Kesimpulan
                        </Col>
                        <Col span={18}>
                            <Radio.Group value={this.state.kesimpulanhasil} onChange={this.onChangeKesimpulan}>
                                <Radio value={'S'}>Sesuai</Radio>
                                <Radio value={'T'}>Tidak Sesuai</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Catatan
                        </Col>
                        <Col span={18}>
                            <TextArea
                                value={this.state.Catatan}
                                disabled={disable_value == true}
                                onChange={e => this.setState({Catatan: e.target.value})}
                            />
                        </Col>
                    </Row>
                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        )
    }
}


export default KesimpulanHasil

