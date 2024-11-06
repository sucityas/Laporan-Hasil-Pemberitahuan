import React, {Component} from 'react'
import {Col, Row, Form, Button, Input, Select} from 'antd';
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
        };

        this.KirimData = this.KirimData.bind(this);
    }


    componentDidMount() {
    }


    async KirimData() {
        let modelPenerbitanSkepAeo = {
            jumlahKemasan: this.state.jumlahKemasan,
            nomorKemasan: this.state.nomorKemasan,
        };
    }


    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Kemasan
                        </Col>
                        <Col span={14}>
                            <Input
                                value={this.state.jumlahKemasan}
                                onChange={e => this.setState({jumlahKemasan : e.target.value})}/>
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Nomor Kemasan
                        </Col>
                        <Col span={14}>
                            <Input
                                value={this.state.nomorKemasan}
                                onChange={e => this.setState({nomorKemasan : e.target.value})}/>
                        </Col>
                    </Row>


                </Form>
                <Button onClick={this.KirimData}>Kirim</Button>
            </div>
        )
    }
}

export default HasilPeriksa;

