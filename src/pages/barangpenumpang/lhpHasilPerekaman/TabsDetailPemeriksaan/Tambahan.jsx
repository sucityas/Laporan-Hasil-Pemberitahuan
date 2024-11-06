import React,{Component} from 'react';
import {Row, Col, Card, Input, Form } from 'antd';


const {TextArea} = Input;

class Tambahan extends Component{
    constructor() {
        super();
        this.state = {
        };
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let DetailBarang = {
            KeteranganLain: this.state.keteranganTambahan,

        };
    }


    render(){
        return(
            <div>
                <Card size="small" title="Tambahan">
                    <Form>
                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={4}>
                                <p>Keterangan Lain</p>
                            </Col>
                            <Col span={20}>
                                <TextArea
                                    name="keteranganTambahan"
                                    rows={4}
                                    onChange={(e) => this.setState({keteranganTambahan: e.target.value})}
                                    style={{color: 'black'}}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}


export default Tambahan;