import React,{Component} from 'react';
import {Row, Col, Card, Input, Form, Select, InputNumber} from 'antd';
import QuickSearch from "../Component/QuickSearch";

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;


class Kapasitas extends Component{
    constructor() {
        super();
        this.state = {
            visible : false,
        };
        this.KirimData = this.KirimData.bind(this);

        this.getKapasitas = this.getKapasitas.bind(this);
        this.kapasitasHandler = this.kapasitasHandler.bind(this);

    }

    async getKapasitas(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/satuan-barang/all/${e.toUpperCase()}`,
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

    kapasitasHandler(event) {
        this.setState({
            kodeSatuanBarang: event.kodeSatuanBarang,
            namaSatuanBarang: event.namaSatuanBarang
        });
        // console.log(this.state.kodeAsalBarang)
    }

    async KirimData() {
        let DetailBarang = {
            Kapasitas: this.state.kapasitas,
            KodeKapasitas: this.state.kodeSatuanBarang,

        };
        console.log(DetailBarang);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.kapasitas !== this.props.kapasitas){
            this.setState({
                kapasitas : this.props.kapasitas,
                kodeSatuanBarang : this.props.kodeKapasitas
            })
        }
    }

    onChangeData = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                kapasitas: event
            },
            () => {
                this.checkNumber(this.state.kapasitas);
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

    render(){
        return(
            <div>
                <Card size="small" title="Kapasitas">
                    <Form>
                        <Row gutter={8} style={{margin: '5px'}}>

                            <Col lg={8} md={6}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.kapasitas}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width : '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeData}
                                />
                                {this.state.visible ?
                                    <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                            </Col>

                            <Col lg={16} md={18}>
                                <QuickSearch
                                    placeholder="Cari Satuan..."
                                    clickHandler={this.kapasitasHandler}
                                    pointer2={"kodeSatuanBarang"}
                                    pointer={"namaSatuanBarang"}
                                    isFetching={this.fetching}
                                    data={this.getKapasitas}
                                />
                            </Col>
                        </Row>

                    </Form>

                </Card>

            </div>
        )
    }
}
export default Kapasitas;
