import React, {Component} from "react";
import {Col, Row, Form, Input, Radio, Button, Select, Table, Modal, Upload} from "antd";
import _ from "lodash";
import QuickSearch from "../../../Component/QuickSearch";

const {TextArea} = Input;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

class PendampingPemeriksaan extends Component {
    state = {
        valuekawasan: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            gudang: false,
            namatempat: false,
            modalPendamping: false,
            dataPendamping: [],


        };
        this.gudangHandler = this.gudangHandler.bind(this);
        this.pendampingHandler = this.pendampingHandler.bind(this);
        this.getGudang = this.getGudang.bind(this);
        this.getPendamping = this.getPendamping.bind(this);
    }

    async getGudang(e) {
        this.setState({fetching: true});
        let kodeKantor = localStorage.getItem("kodeKantor");
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/gudangTps/ByKodeKantor/${kodeKantor}/${e.toUpperCase()}`,
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

    gudangHandler(event) {
        this.setState({
            kodeGudang: event.kodeGudang,
            namaGudang: event.namaGudang
        });
        // console.log(this.state.kantorhasil)
    }


    async getPendamping(e) {
        this.setState({fetching: true});
        let pelData = await fetch(
            `${REACT_APP_REFERENSI}/v1/bidang-pendamping/${e.toUpperCase()}`,
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

    pendampingHandler(event) {
        this.setState({
            idBdgPendamping: event.idBdgPendamping,
            bdgPendamping: event.bdgPendamping
        });
        // console.log(this.state.kantorhasil)
    }


    onChangeKawasan = e => {
        console.log("radio checked", e.target.value);
        this.setState({
            valuekawasan: e.target.value
        });
        console.log(this.state.valuekawasan);
    };

    togglekawasan() {
        this.setState({
            namatempat: false,
            gudang: !this.state.gudang
        });
    }

    togglediluarkawasan() {
        this.setState({
            gudang: false,
            namatempat: !this.state.namatempat
        });
    }

    tambahPendamping = () => {
        var row = {
            bidangPendamping: this.state.bdgPendamping,
            namaPendamping: this.state.namaPendamping,
        };
        var newStateArray = [...this.state.dataPendamping];
        newStateArray.push(row);
        this.setState(() => {
            return {
                dataPendamping: newStateArray,
                bidangPendamping: "",
                namaPendamping: "",
                idBdgPendamping : "",
                bdgPendamping : "",
            };
        });
    };

    handleOkKontrak = () => {
        this.setState({modalPendamping: false});
        this.tambahPendamping();

    };
    handleCancelKontrak = () => {
        this.setState({
            modalPendamping: false
        });
    };

    modalUpload = () => {
        this.setState({
            modalPendamping: true,
        });
    };

    render() {
        const {modalPendamping} = this.state;
        const columns = [
            {
                title: "Bidang Pendamping",
                dataIndex: "bidangPendamping",
                key: "bidangPendamping"
            },
            {
                title: "Nama Pendamping",
                dataIndex: "namaPendamping",
                key: "namaPendamping"
            }
        ];
        return (
            <div>
                <Form>
                    <Row className="mb-2">
                        <Col span={6} style={{textAlign: "start"}}>
                            Lokasi
                        </Col>
                        <Col span={18}>
                            <Radio.Group
                                name="kodeLokasi"
                                value={this.state.valuekawasan}
                                onChange={this.onChangeKawasan}
                            >
                                <Radio value={1} onClick={this.togglekawasan.bind(this)}>Kawasan Pabean</Radio>
                                <Radio value={2} onClick={this.togglediluarkawasan.bind(this)}>Di Luar Kawasan
                                    Pabean</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    {this.state.gudang ? (
                        <Row className="mb-2">
                            <Col span={6} style={{textAlign: "start"}}>
                                Gudang
                            </Col>
                            <Col span={18}>
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <QuickSearch
                                            placeholder="Kawasan Pabean"
                                            clickHandler={this.gudangHandler}
                                            pointer2={"kodeGudang"}
                                            pointer={"namaGudang"}
                                            isFetching={this.fetching}
                                            data={this.getGudang}
                                        ></QuickSearch>
                                        {/* <Select ></Select> */}
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            type="text"
                                            disabled={this.state.valuekawasan === 2}
                                            value={this.state.namaGudang}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ) : null}

                    {this.state.namatempat ? (
                        <Row className="mb-2">
                            <Col span={6} style={{textAlign: "start"}}>
                                Nama Tempat
                            </Col>
                            <Col span={18}>
                                <TextArea
                                    type="text"
                                    name="tempatPemeriksaan"
                                    disabled={this.state.valuekawasan === 1}
                                    onChange={e => this.setState({
                                        tempatpemeriksa: e.target.value
                                    })}
                                />
                            </Col>
                        </Row>) : null}
                    <Row className="mb-2">
                        <Col span={6} style={{textAlign: "start"}}>
                            Pendamping Pemeriksa
                        </Col>
                        <Col span={18}>
                            <Button
                                onClick={this.modalUpload}
                                type="primary"
                                className={"secondarybutton"}
                                ghost
                            >
                                <i
                                    className="fas fa-plus"
                                    style={{lineHeight: "1"}}
                                />
                                &nbsp; TAMBAH
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        dataSource={this.state.dataPendamping}
                        columns={columns}
                        rowKey={"num"}
                        size="middle"
                    />
                </Form>
                {/* Modal Upload */}
                <Modal
                    visible={modalPendamping}
                    title="Tambah Pendamping"
                    onOk={this.handleOkKontrak}
                    width={"50%"}
                    onCancel={this.handleCancelKontrak}
                    footer={[
                        <Button
                            key="back"
                            type={"danger"}
                            onClick={this.handleCancelKontrak}
                        >
                            <i className="fas fa-times-circle"/>
                            &nbsp; BATAL
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOkKontrak}>
                            <i
                                className="fa fa-save"
                                style={{lineHeight: "1", marginRight: "5px"}}
                            />
                            &nbsp; SIMPAN
                        </Button>
                    ]}
                >
                    <Form
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        labelAlign="left"
                    >
                        <Form.Item label="Bidang Pendamping">
                            <QuickSearch
                                placeholder="Bidang Pendamping"
                                clickHandler={this.pendampingHandler}
                                pointer2={"idBdgPendamping"}
                                pointer={"bdgPendamping"}
                                isFetching={this.fetching}
                                data={this.getPendamping}
                            ></QuickSearch>
                        </Form.Item>
                        <Form.Item label="Nama Pendamping">
                            <Input
                                value={this.state.namaPendamping}
                                onChange={e =>
                                    this.setState({namaPendamping: e.target.value})
                                }
                            />
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

export default PendampingPemeriksaan;
