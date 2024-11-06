import React, {Component} from 'react'
import {Col, Row, Form, Input, InputNumber, Button} from 'antd';
import GlobalVariable from "../../../../helpers/GlobalVariable";

const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;

class JumlahJenisBarang extends Component {
    state = {
        valuedimintakembali: 1,
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

    getJumlahJenis() {
        const idLhpHeader = this.props.idlhpheader
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-jumlah-jenis/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                if (body.listData.length > 0) {

                    this.setState({
                        skeletonJumlahJenis: false,
                        //Jumlah Jenis Barang
                        PartaiBarang: body.listData[0].jumlahPartaiBarang,
                        JumlahBarang: body.listData[0].jumlahBarangDiperiksa,
                        JumlahJenisBarang:
                        body.listData[0].jumlahJenisBarangDiperiksa,
                    });
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon('error');
            });
    }

    componentDidMount() {
        const idLhpHeader = this.props.idlhpheader
        if (idLhpHeader !== "null") {
            this.getJumlahJenis()
        }
    }

    onChangeData = (event) => {
        if (event.target.name === "PartaiBarang") {
            if (event.target.validity.valid) {
                this.setState({PartaiBarang: event.target.value})
            }
        } else if (event.target.name === "JumlahBarang") {
            if (event.target.validity.valid) {
                this.setState({JumlahBarang: event.target.value})
            }
        } else if (event.target.name === "JumlahJenisBarang") {
            if (event.target.validity.valid) {
                this.setState({JumlahJenisBarang: event.target.value})
            }
        }
    }

    onChangeDataPartai = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                PartaiBarang: event
            },
            () => {
                this.checkNumber(this.state.PartaiBarang);
            }
        );
    };
    onChangeDataBarang = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                JumlahBarang: event
            },
            () => {
                this.checkNumber(this.state.JumlahBarang);
            }
        );
    };
    onChangeDataJenisBarang = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                JumlahJenisBarang: event
            },
            () => {
                this.checkNumber(this.state.JumlahJenisBarang);
            }
        );
    };

    checkNumber = (e) => {
        console.log("ccc", e);
        if (typeof e !== "number") {
            this.setState({visible: true})
        } else {
            this.setState({visible: false})
        }
    };

    render() {
        const {flagBap} = this.props;
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Partai Barang
                        </Col>
                        <Col span={10}>
                            <InputNumber
                                pattern="[0-9]+[.0-9]*"
                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                value={this.state.PartaiBarang}
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                style={{width : '100%'}}
                                placeholder={"0.000"}
                                onChange={this.onChangeDataPartai}
                            />
                            {this.state.visible ?
                                <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Barang yang Diperiksa
                        </Col>
                        <Col span={10}>
                            <InputNumber
                                pattern="[0-9]+[.0-9]*"
                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                value={this.state.JumlahBarang}
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                style={{width : '100%'}}
                                placeholder={"0.000"}
                                onChange={this.onChangeDataBarang}
                            />
                            {this.state.visible ?
                                <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                        </Col>
                    </Row>
                    <Row className="mb-2" gutter={8}>
                        <Col span={10} style={{textAlign: 'start'}}>
                            Jumlah Jenis Barang yang Diperiksa
                        </Col>
                        <Col span={10}>
                            <InputNumber
                                pattern="[0-9]+[.0-9]*"
                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                value={this.state.JumlahJenisBarang}
                                disabled={flagBap === '2' ? true : flagBap === '5'}
                                formatter={(value) =>
                                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                style={{width : '100%'}}
                                placeholder={"0.000"}
                                onChange={this.onChangeDataJenisBarang}
                            />
                            {this.state.visible ?
                                <div style={{color:'red'}}><span>*</span><span>Harap memasukan angka saja!</span></div> : null}
                        </Col>
                    </Row>

                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        )
    }
}


export default JumlahJenisBarang

