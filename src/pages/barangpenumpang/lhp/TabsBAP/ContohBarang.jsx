import React, {Component} from 'react'
import {Col, Row, Form, Input, Radio, Button, InputNumber} from 'antd';
import GlobalVariable from "../../../../helpers/GlobalVariable";
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;
class ContohBarang extends Component {
    state = {
        valuedimintakembali: 1,
        visible : false,
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

        console.log(modelPenerbitanSkepAeo);
    }

    onChangeDiminta = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            valuedimintakembali: e.target.value
        });
        console.log(this.state.valuedimintakembali);
    };

    getContohBarang() {
        const idLhpHeader = this.props.idlhpheader
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-contoh-barang/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                if(body.listData.length > 0){

                    this.setState({
                        skeletonContohBarang: false,
                        //Contoh Barang
                        Jenis: body.listData[0].jenisContohBarang,
                        Jumlah: body.listData[0].jumlahContohBarang,
                        valuedimintakembali: body.listData[0].dimintaKembali,

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
            this.getContohBarang()
        }
    }

    onChangeData = (event, e) => {
        console.log(event, e);
        this.setState(
            {
                Jumlah: event
            },
            () => {
                this.checkNumber(this.state.Jumlah);
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

    render() {
        const {flagBap} = this.props;
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Jenis
                        </Col>
                        <Col span={18}>
                            <Input
                                name={'jenisContohBarang'}
                                value={this.state.Jenis}
                                disabled={flagBap === '2'? true : flagBap === '5'}
                                onChange={e => this.setState({Jenis: e.target.value})}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Jumlah
                        </Col>
                        <Col span={18}>
                            <InputNumber
                                pattern="[0-9]+[.0-9]*"
                                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                value={this.state.Jumlah}
                                disabled={flagBap === '2'? true : flagBap === '5'}
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
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Diminta Kembali
                        </Col>
                        <Col span={18}>
                            <Radio.Group disabled={flagBap === '2'? true : flagBap === '5'} value={this.state.valuedimintakembali} onChange={this.onChangeDiminta}>
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

