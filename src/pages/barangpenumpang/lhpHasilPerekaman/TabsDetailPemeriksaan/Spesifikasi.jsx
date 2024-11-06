import React,{Component} from 'react';
import {Row, Col, Card, Input, Form, Button} from 'antd';


class Spesifikasi extends Component{
    constructor() {
        super();
        this.state = {};
        this.KirimData = this.KirimData.bind(this);
    }

    async KirimData() {
        let DetailBarang = {
            Merk: this.state.merk,
            Model: this.state.model,
            Type: this.state.type,

        };
        console.log(DetailBarang);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.merk !== this.props.merk){
            this.setState({
                merk : this.props.merk,
                model : this.props.model,
                type : this.props.type
            })
        }
    }

    render(){
        return(
            <div>
                <Card size="small" title="Spesifikasi">
                    <Form>
                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={4}>
                                <p>Merk</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    name="merk"
                                    value={this.state.merk}
                                    onChange={(e) => this.setState({merk: e.target.value})}
                                    style={{color: 'black', marginRight: '5px'}}
                                />
                            </Col>
                        </Row>

                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={4}>
                                <p>Model</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    name="model"
                                    value={this.state.model}
                                    onChange={(e) => this.setState({model: e.target.value})}
                                    style={{color: 'black', marginRight: '5px'}}
                                />
                            </Col>
                        </Row>

                        <Row gutter={8} style={{margin: '5px'}}>
                            <Col span={4}>
                                <p>Type</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    name="type"
                                    value={this.state.type}
                                    onChange={(e) => this.setState({type: e.target.value})}
                                    style={{color: 'black', marginRight: '5px'}}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        )
    }
}


export default Spesifikasi;