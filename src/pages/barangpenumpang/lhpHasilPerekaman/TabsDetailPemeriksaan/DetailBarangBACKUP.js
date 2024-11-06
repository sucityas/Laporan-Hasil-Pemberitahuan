import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button, Icon, Select, Modal } from "antd";
import DataGrid, { Column, SearchPanel } from "devextreme-react/data-grid";
import QuickSearch from "../Component/QuickSearch";

const { TextArea } = Input;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;
const {Option} = Select;


class DetailBarangBACKUP extends Component{
    constructor() {
        super();
        this.state = {
        };
        this.getKapasitas = this.getKapasitas.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.modal = this.modal.bind(this);
        this.KirimData = this.KirimData.bind(this);
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
            UraianBarang: this.state.uraianBarang,
            JumlahBarang: this.state.jumlahSatuan,
            KodeJenisSatuan: this.state.kodeJenisSatuan,
        };
        console.log(DetailBarang);
    }

    getReferensi = () => {
        let idheader = localStorage.getItem("idHeader");
        fetch(`${REACT_APP_LHP}/referensi-detail/${idheader}/items`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    hasil: body.listData,
                    loading: false,
                });
            });
    }

    componentDidMount() {
        this.getReferensi()
    }

    onSelectionChanged(selectedRowsData) {
        const data = selectedRowsData.key;

        console.log(data);
        this.setState({
            uraianBarang: data.uraian,
            kodeJenisSatuan: data.kodeSatuanBarang,
            idBarang: data.idBarang,
        });
        console.log(this.state.idBarang);
    }

    modal() {
        console.log("debug:038");
        this.setState({
            showModal: true,
            open: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };


    render() {
        const { hasil, loadingSatuan, kodeSatuanBarang } = this.state;
        return (
            <div>
                <Card
                    size="small"
                    title="Detail Barang"
                    extra={
                        <Button type="primary" onClick={this.modal}>
                            <Icon type="plus-square" />
                            Tambah Referensi Barang
                        </Button>
                    }
                >
                    <Form>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Uraian Barang</p>
                            </Col>
                            <Col span={20}>
                                <TextArea
                                    rows={4}
                                    name="uraianBarang"
                                    value={this.state.uraianBarang}
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Jumlah Barang</p>
                            </Col>
                            <Col span={4}>
                                <Input
                                    style={{ color: "black", marginRight: "5px" }}
                                    name="jumlahSatuan"
                                    onChange={(e) =>
                                        this.setState({ jumlahSatuan: e.target.value })
                                    }
                                />

                            </Col>
                            <Col span={12}>
                                <QuickSearch
                                    placeholder="Cari Satuan..."
                                    clickHandler={this.kapasitasHandler}
                                    pointer2={"kodeSatuanBarang"}
                                    pointer={"namaSatuanBarang"}
                                    isFetching={this.fetching}
                                    data={this.getKapasitas}
                                ></QuickSearch>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Modal
                    visible={this.state.showModal}
                    title="Tambah Referensi Barang"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <DataGrid
                            dataSource={hasil}
                            showBorders={true}
                            allowColumnReordering={true}
                            allowColumnResizing={true}
                            columnAutoWidth={true}
                            showColumnLines={true}
                            selection={{ mode: "single" }}
                            hoverStateEnabled={true}
                            onRowClick={this.onSelectionChanged}
                        >
                            <SearchPanel visible={true} placeholder={"Cari..."} width={200} />
                            <Column dataField={"uraian"} caption={"Uraian"} />
                            <Column dataField={"seriBarang"} caption={"Seri Barang"} />
                            <Column dataField={"hsCode"} caption={"Kode HS"} />
                        </DataGrid>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default DetailBarangBACKUP;
