import React, {Component} from "react";
import {Col, Row, Form, Input, Radio, Select, Button} from "antd";
import QuickSearch from "../../../Component/QuickSearch";

const {TextArea} = Input;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

class KesiapanKendala extends Component {
    state = {
        dataKesiapan: {
            valuesiap: "S",
            kendala: "",
            uraianKendala: ""
        }

    };

    constructor() {
        super();
        this.state = {
            kendala: false
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

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            pemeriksaanke: 1,
            kesiapanperiksa: this.state.valuesiap,
            kendala:
                this.state.valuesiap === "Y" ? "" : this.state.idJenisKendalaPeriksa,
            uraian: this.state.valuesiap === "Y" ? "" : this.state.uraianKendala
        };
        console.log(modelPenerbitanSkepAeo);
    }

    kendalaHandler(event) {
        this.setState({
            jenisKendalaPeriksa: event.jenisKendalaPeriksa,
            idJenisKendalaPeriksa: event.idJenisKendalaPeriksa
        });
        // console.log(this.state.kantorhasil)
    }

    togglesiap() {
        this.setState({
            kendala: false
        });
    }

    toggletdksiap() {
        this.setState({
            kendala: !this.state.kendala
        });
    }

    onChangeSiap = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            valuesiap: e.target.value,
        });
    };


    // handleKesiapanKendala = (newValue) => {
    //     console.log(newValue)
    //     this.props.ValueKesiapanKendala(newValue)
    // }

    render() {
        return (
            <div>
                <Form>
                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: "start"}}>
                            Pemeriksaan ke
                        </Col>
                        <Col span={4}>
                            <Input
                                type="text"
                                name="pemeriksaan_ke"
                                style={{color: "black"}}
                                value={1}
                                disabled
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2" gutter={8}>
                        <Col span={6} style={{textAlign: "start"}}>
                            Kesiapan Periksa
                        </Col>
                        <Col span={18}>
                            <Radio.Group
                                name="kesiapanPeriksa"
                                onChange={this.onChangeSiap}
                                value={this.state.valuesiap}
                            >
                                <Radio value="S" onClick={this.togglesiap.bind(this)}>
                                    Siap
                                </Radio>
                                <Radio value="T" onClick={this.toggletdksiap.bind(this)}>
                                    Tidak Siap
                                </Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    {this.state.kendala ? (
                        <div>
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: "start"}}>
                                    Kendala Pemeriksaan
                                </Col>

                                <Col span={18}>
                                    <QuickSearch
                                        placeholder="Kendala Pemeriksaan"
                                        clickHandler={this.kendalaHandler}
                                        pointer={"jenisKendalaPeriksa"}
                                        // pointer2={"kodeKantor"}
                                        isFetching={this.fetching}
                                        data={this.getKendala}
                                    ></QuickSearch>
                                </Col>
                            </Row>
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: "start"}}>
                                    Uraian Kendala
                                </Col>
                                <Col span={18}>
                                    <TextArea
                                        name="uraianKendala"
                                        value={this.state.uraianKendala}
                                        onChange={e => {
                                            this.setState({uraianKendala: e.target.value})
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    ) : null}
                </Form>
            </div>
        );
    }
}

export default KesiapanKendala;
