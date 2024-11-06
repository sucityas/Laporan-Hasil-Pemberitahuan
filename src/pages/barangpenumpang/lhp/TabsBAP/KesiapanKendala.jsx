import React, {Component} from 'react';
import {Col, Row, Form, Input, Radio, Select, Button} from 'antd';
import QuickSearch from '../Component/QuickSearch';
import GlobalVariable from "../../../../helpers/GlobalVariable";

const {TextArea} = Input;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;

class KesiapanKendala extends Component {

    constructor() {
        super();
        let seriPeriksa = parseInt(localStorage.getItem('seriPeriksa'))
        this.state = {
            openkendala: false,
            uraianKendala: '',
            valuesiap: 'S',
            kendala: '',
            seriPeriksa: seriPeriksa,


        };
        this.getKendala = this.getKendala.bind(this);
        this.KirimData = this.KirimData.bind(this);
        this.kendalaHandler = this.kendalaHandler.bind(this);
    }

    async getKendala(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/jenis-kendala-pemeriksaan${e.toUpperCase()}`,
            {
                headers: {
                    accept: 'application/json',
                    'beacukai-api-key': `${REACT_APP_SECRET_KEY_REFERENSI}`,
                },
                'Access-Control-Allow-Origin': '*',
            }
        )
            .then((response) => response.json())
            .then((body) => body.data);
        return pelData;
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            pemeriksaanke: parseInt(this.state.seriPeriksa) + 1,
            kesiapanperiksa: this.state.valuesiap,
            kendala:
                this.state.valuesiap === 'S' ? '' : this.state.idJenisKendalaPeriksa,
            uraian: this.state.valuesiap === 'S' ? '' : this.state.uraianKendala,
        };
        console.log(modelPenerbitanSkepAeo);
    }

    kendalaHandler(event) {
        this.setState({
            jenisKendalaPeriksa: event.jenisKendalaPeriksa,
            idJenisKendalaPeriksa: event.idJenisKendalaPeriksa,
        });
        // console.log(this.state.kantorhasil)
    }

    onChangeSiap = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            valuesiap: e.target.value,
        }, () => {
            this.props.nilai(this.state.valuesiap)
        });

    };

    getMemoJenis() {
        const idLhpHeader = this.props.idlhpheader;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-memo-jenis/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    //Card Kesiapan dan Kendala Pemeriksaan
                    valuesiap: body.listData[0].kesiapanPeriksa,
                    jenisKendalaPeriksa: body.listData[0].jenisKendala,
                    uraianKendala: body.listData[0].uraianKendala,
                });
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
            this.getMemoJenis()
        }
    }

    render() {
        // let seriPeriksa = parseInt(localStorage.getItem('seriPeriksa'));
        const {flagBap} = this.props
        console.log('bug', this.props.idlhpheader)
        const {seriPeriksa} = this.state;

        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Pemeriksaan ke
                        </Col>
                        <Col span={4}>
                            <Input
                                type="text"
                                name="pemeriksaan_ke"
                                style={{color: 'black'}}
                                value={parseInt(seriPeriksa) + 1}
                                disabled
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: 'start'}}>
                            Kesiapan Periksa
                        </Col>
                        <Col span={18}>
                            <Radio.Group
                                name="kesiapanPeriksa"
                                onChange={this.onChangeSiap}
                                value={this.state.valuesiap}
                                disabled={flagBap === '2'? true : flagBap === '5'}
                            >
                                <Radio value="S">
                                    Siap
                                </Radio>
                                <Radio value="T">
                                    Tidak Siap
                                </Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    {this.state.valuesiap === "T" ? (
                        <div>
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: 'start'}}>
                                    Kendala Pemeriksaan
                                </Col>
                                {flagBap === '3' ? (
                                    <div>
                                        <Col span={4}>
                                            <QuickSearch
                                                placeholder="Kendala Pemeriksaan"
                                                clickHandler={this.kendalaHandler}
                                                pointer={'jenisKendalaPeriksa'}
                                                pointer2={"idJenisKendalaPeriksa"}
                                                isFetching={this.fetching}
                                                data={this.getKendala}
                                            ></QuickSearch>
                                        </Col>
                                        <Col span={12}>
                                            <Input disabled={flagBap === '2'? true : flagBap === '5'} value={this.state.jenisKendalaPeriksa}/>
                                        </Col>
                                    </div>
                                ) : flagBap === '0' ? (
                                    <Col span={18}>
                                        <QuickSearch
                                            placeholder="Kendala Pemeriksaan"
                                            clickHandler={this.kendalaHandler}
                                            pointer={'jenisKendalaPeriksa'}
                                            pointer2={"idJenisKendalaPeriksa"}
                                            isFetching={this.fetching}
                                            data={this.getKendala}
                                        ></QuickSearch>
                                    </Col>
                                ) : flagBap === '2' ? (<Col span={12}>
                                    <Input disabled={flagBap === '2'? true : flagBap === '5'} value={this.state.jenisKendalaPeriksa}/>
                                </Col>) : null}
                            </Row>
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: 'start'}}>
                                    Uraian Kendala
                                </Col>
                                <Col span={18}>
                                    <TextArea
                                        name="uraianKendala"
                                        value={this.state.uraianKendala}
                                        onChange={(e) => {
                                            this.setState({uraianKendala: e.target.value});
                                        }}
                                        disabled={flagBap === '2'? true : flagBap === '5'}
                                    />
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                </Form>
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        );
    }
}

export default KesiapanKendala;
