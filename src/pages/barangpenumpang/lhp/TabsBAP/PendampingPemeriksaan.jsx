import React, {Component} from "react";
import {Col, Row, Form, Input, Radio, Button, Select, Table, Modal, Upload, message} from "antd";
import _ from "lodash";
import QuickSearch from "../Component/QuickSearch";
import GlobalVariable from "../../../../helpers/GlobalVariable";
import Notification from "../Component/Notifikasi";
import Swal from "sweetalert2";

const {TextArea} = Input;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP
} = process.env;

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});

class PendampingPemeriksaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gudang: false,
            namatempat: false,
            modalPendamping: false,
            dataPendamping: [],
            valuekawasan: 2,
            idPendamping: 1,
        };
        this.gudangHandler = this.gudangHandler.bind(this);
        this.pendampingHandler = this.pendampingHandler.bind(this);
        this.getGudang = this.getGudang.bind(this);
        this.getPendamping = this.getPendamping.bind(this);
        this.KirimData = this.KirimData.bind(this);
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


    tambahPendamping = () => {
        this.setState({
            idPendamping: this.state.idPendamping + 1
        })
        var row = {
            idPendamping: this.state.idPendamping,
            unitPendamping: this.state.idBdgPendamping,
            bdgPendamping: this.state.bdgPendamping,
            namaPendamping: this.state.namaPendamping,
        };
        var newStateArray = [...this.state.dataPendamping];
        console.log('tengah', newStateArray)
        newStateArray.push(row);
        this.setState({
            dataPendamping: newStateArray,
        }, () => this.setState({
            dataPendampig: this.state.dataPendamping,
            bidangPendamping: "",
            namaPendamping: "",
            idBdgPendamping: "",
            bdgPendamping: "",
        }))
        // this.setState(() => {
        //     return {
        //         dataPendamping : newStateArray,
        //         bidangPendamping: "",
        //         namaPendamping: "",
        //         idBdgPendamping: "",
        //         bdgPendamping: "",
        //     };
        // });
        console.log('hasil', this.state.dataPendamping)
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

    getPendampingTable() {
        const idLhpHeader = this.props.idlhpheader
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-pendamping/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonPendamping: false,
                    //Card Pendamping Pemeriksa
                    dataPendamping: body.listData
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

    getLokasiPendamping() {
        const idLhpHeader = this.props.idlhpheader
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-bap-tempat-pemeriksaan/${idLhpHeader}`, {
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_LHP}`,
            },
            'Access-Control-Allow-Origin': '*',
        })
            .then((response) => response.json())

            .then((body) => {
                this.setState({
                    skeletonPendamping: false,
                    //Card Pendamping Pemeriksa
                    valuekawasan: body.listData[0].kodeLokasi,
                    namaGudang: body.listData[0].lokasiPerekamanBap,
                    kodeGudang: body.listData[0].kodeGudang,
                    tempatpemeriksa: body.listData[0].tempatPemeriksaan,
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
            this.getPendampingTable()
            this.getLokasiPendamping()
        }
    }

    async KirimData() {
        let modelPenerbitanSkepAeo = {
            valuekawasan: this.state.valuekawasan,
            namaGudang: this.state.valuekawasan === "2" ? '' : this.state.namaGudang,
            kodeGudang: this.state.valuekawasan === "2" ? '' : this.state.kodeGudang,
            tempatPemeriksaan: this.state.valuekawasan === "1" ? '' : this.state.tempatpemeriksa,
            datapendamping: this.state.dataPendamping
        };
        console.log(modelPenerbitanSkepAeo);
    }

    deleteData = (e) => {
        swalWithBootstrapButtons
            .fire({
                title: "Yakin??",
                text: "Pastikan menghapus data yang benar!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Tidak!",
                confirmButtonText: "Ya!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.value) {
                    const data = e.idPendamping
                    // console.log('delete',this.state.dataPendamping.splice(this.state.dataPendamping.indexOf(e), 1))
                    const dataPendamping = this.state.dataPendamping.filter(item => item.idPendamping !== data);
                    this.setState({dataPendamping}, () => {
                        console.log('delete', this.state.dataPendamping)
                    });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                    this.setState({iconLoading: false});
                }
            });
    }

    render() {
        const {flagBap} = this.props;
        const {modalPendamping} = this.state;
        console.log('pendamping', this.state.dataPendampig)
        let noUrut = 1
        const columns = [
            {
                title: 'No',
                dataIndex: ++this.count,
                render: () => noUrut++,
            },
            {
                title: "Bidang Pendamping",
                dataIndex: "bdgPendamping",
                key: "bdgPendamping"
            },
            {
                title: "Nama Pendamping",
                dataIndex: "namaPendamping",
                key: "namaPendamping"
            },
            {
                title: "Aksi",
                dataIndex: "idPendamping",
                key: "idPendamping",
                render: (_, record, index) => {
                    return (
                        <Button type={'danger'} ghost onClick={(env) => this.deleteData(record, env)}>
                            <i className="fas fa-trash-alt"></i>&nbsp;
                        </Button>
                    )

                }
            },
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
                                disabled={flagBap === '2'? true : flagBap === '5'}
                            >
                                <Radio value={"1"}>Kawasan Pabean</Radio>
                                <Radio value={"2"}>Di Luar Kawasan
                                    Pabean</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>

                    {this.state.valuekawasan === "1" ? (
                        <Row className="mb-2">
                            <Col span={6} style={{textAlign: "start"}}>
                                Gudang
                            </Col>
                            {flagBap === '0' ? (
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
                            ) : flagBap === '2' || flagBap === '5' ? (
                                <Col span={12}>
                                    <Input
                                        type="text"
                                        disabled={this.state.valuekawasan === 2 || flagBap === '2'? true : flagBap === '5'}
                                        value={this.state.namaGudang}
                                    />
                                </Col>
                            ) : flagBap === '3' ? (
                                <div>
                                    <Col span={6}>
                                        <QuickSearch
                                            placeholder="Kawasan Pabean"
                                            clickHandler={this.gudangHandler}
                                            pointer2={"kodeGudang"}
                                            pointer={"namaGudang"}
                                            isFetching={this.fetching}
                                            data={this.getGudang}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            type="text"
                                            disabled={this.state.valuekawasan === 2 || flagBap === '2'? true : flagBap === '5'}
                                            value={this.state.namaGudang}
                                        />
                                    </Col>
                                </div>
                            ) : null}
                        </Row>
                    ) : null}

                    {this.state.valuekawasan === "2" ? (
                        <Row className="mb-2">
                            <Col span={6} style={{textAlign: "start"}}>
                                Nama Tempat
                            </Col>
                            <Col span={18}>
                                <TextArea
                                    type="text"
                                    name="tempatPemeriksaan"
                                    value={this.state.tempatpemeriksa}
                                    disabled={this.state.valuekawasan === 1 || flagBap === '2'? true : flagBap === '5'}
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
                        {flagBap === '2' || flagBap === '5' ? null : (
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
                        )}
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
                            ghost
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
                {/*<Button onClick={this.KirimData}>Kirim</Button>*/}
            </div>
        );
    }
}

export default PendampingPemeriksaan;
