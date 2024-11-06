import React, {Component} from "react";
import {Row, Col, Card, Input, Form, Button, Icon, Select, Modal, Pagination, InputNumber, Table, Spin, Checkbox} from "antd";
import axios from 'axios'
import '../TabsBAP/bebas.css'
import Highlighter from 'react-highlight-words';
import Swal from "sweetalert2";

const {TextArea} = Input;
const {Option} = Select;
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
} = process.env;


class DetailBarang extends Component {
    constructor() {
        super();
        this.state = {
            uraianBarang: "",
            kodeSatuanBarang: "",
            jumlahSatuan: "",
            visible: false,
            pages: 0,
            satuanBarangAll: [],
            searchText: '',
            hasil: null,
            dataDokumen: null,
            visibleBruto: false,
            visibleJumlahKemasan: false,
            visibleNilaiBarang:false,
            showBarangTidakBersamaan: false
        };
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.modal = this.modal.bind(this);
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
            UraianBarang: this.state.uraianBarang,
            JumlahBarang: this.state.jumlahSatuan,
            KodeJenisSatuan: this.state.kodeSatuanBarang,
        };
        console.log(DetailBarang);
    }

    getReferensi = () => {
        this.setState({
            loadingReferensi: true,
        })
        let idheader = localStorage.getItem("idHeader");
        fetch(`${REACT_APP_LHP}/referensi-detail/${idheader}/items?page=${this.state.pages}&size=5&nama=${this.state.searchText}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    hasil: body.listData,
                    totalDataReferensi: body.totalRow,
                    loadingReferensi: false,
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.uraian !== this.props.uraian) {
            // this.setState({
            //     uraianBarang: this.props.uraian,
            //     jumlahSatuan: this.props.jumlahSatuan,
            //     kodeSatuanBarang: this.props.kodeSatuanBarang

            // })
            console.log("Detail Barang Update: ", this.props.data)
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    hasil: this.props.data.barang,
                    dataDokumen: this.props.data,
                    showBarangTidakBersamaan: this.props.data.tdBpHeader.kodeDokumen === '22'? true : false,
                })
            } 
        }
    }

    componentDidMount() {
        console.log("Detail Barang Mount: ", this.props.data)
        if (!(this.props.data === null || this.props.data === undefined)) {
            this.setState({
                hasil: this.props.data.barang,
                dataDokumen: this.props.data,
                showBarangTidakBersamaan: this.props.data.tdBpHeader.kodeDokumen === '22'? true : false,
            })
        }        
        // this.getReferensi()
    }

    onSelectionChanged(data) {
        console.log("Selected Barang : ", data)
        this.setState({
            uraianBarang: data.uraian,
            kodeJenisSatuan: data.kodeSatuanBarang,
            idBarang: data.idBarang,
            showModal: false
        });
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

    onChangeData = (event, e) => {
        this.setState(
            {
                jumlahSatuan: event
            },
            () => {
                this.checkNumber(this.state.jumlahSatuan);
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

    onChangeDataNilaiBarang = (event, e) => {
        this.setState(
            {
                nilaiBarang: event
            },
            () => {
                this.checkNumberNilaiBarang(this.state.nilaiBarang);
            }
        );
    };

    checkNumberNilaiBarang = (e) => {
        if (typeof e !== "number") {
            this.setState({visible: true})
        } else {
            this.setState({visible: false})
        }
    };

    onChangeDataBruto = (event, e) => {
        this.setState(
            {
                bruto: event
            },
            () => {
                this.checkNumberBruto(this.state.bruto);
            }
        );
    };

    checkNumberBruto = (e) => {
        if (typeof e !== "number") {
            this.setState({visibleBruto: true})
        } else {
            this.setState({visibleBruto: false})
        }
    };

    onChangeDataJumlahKemasan = (event, e) => {
        this.setState(
            {
                jumlahKemasan: event
            },
            () => {
                this.checkNumberJumlahKemasan(this.state.jumlahKemasan);
            }
        );
    };

    checkNumberJumlahKemasan = (e) => {
        if (typeof e !== "number") {
            this.setState({visibleJumlahKemasan: true})
        } else {
            this.setState({visibleJumlahKemasan: false})
        }
    };

    handlePageChange = (page) => {
        this.setState({
            pages: page - 1
        }, () => this.getReferensi())

    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }, () => {
            this.getReferensi()
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''}, () => {
            this.getReferensi()
        });
    };

    getSatuanBarang = (e) => {
        if (e.length > 1) {
            this.setState({fetchingSatuan: true});
            axios.get(`${REACT_APP_REFERENSI}/v1/satuan-barang/kata/${e.toUpperCase()}`, {
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_REFERENSI}`
                },
            }).then(body => {
                console.log('datasatuan', body.data.data)
                if (body.data.data) {
                    if (body.data.data.length > 0) {
                        this.setState({
                            satuanBarangAll: body.data.data,
                            fetchingSatuan: false
                        })
                    } else {
                        this.setState({
                            fetchingSatuan: false
                        })
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Data tidak tersedia!',
                        })
                    }
                }
            }).catch(err => {
                if (err) {
                    this.setState({
                        fetchingSatuan: false
                    })
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data tidak tersedia!',
                    })
                }
            })
        }

    }

    getValueSatuanBarang = (e) => {
        this.setState({
            kodeSatuanBarang: e
        })
    }


    render() {
        const {hasil, loadingReferensi, totalDataReferensi} = this.state;
        const column = [
            
            {
                title: "Kategori",
                dataIndex: "kategori",
                key: 1,
            },
            {
                title: "Uraian",
                dataIndex: "tdBpDetails.uraian",
                key: 2,
                ...this.getColumnSearchProps('tdBpDetails.uraian'),
            },
            {
                title: "Jumlah",
                dataIndex: "tdBpDetails.jumlah",
                key: 3,
            },
            {
                title: "Satuan",
                dataIndex: "tdBpDetails.kodeSatuanBarang",
                key: 4,
            }
        ]
        return (
            <div id={this.props.requiredDetail === true ? "error" : ""}
            >

            { this.state.dataDokumen !== null ? ( this.state.dataDokumen.tdBpHeader.kodeDokumen === "34" ? (
                <Card
                    size="small"
                    title="Detail Barang"
                    extra={
                        <Button type="primary" onClick={this.modal}>
                            <Icon type="plus-square"/>
                            Tambah Referensi Barang
                        </Button>
                    }
                >
                    <Form>
                        {/* <Row gutter={8}>
                            <Col span={4}>
                                <p>Kategori Barang</p>
                            </Col>
                            <Col span={20}>
                                <Select
                                    placeholder="Pilih Kategori"
                                    showArrow={false}
                                    notFoundContent={this.state.fetchingKodeJenisPungutan ? <Spin size="small" /> : null}
                                    showSearch
                                    style={{ width: "100%" }}
                                    optionFilterProp="children"
                                    onChange={e => { this.setState({ searchKodeJenisPungutan: e }); }}
                                    // value={this.state.searchKodeJenisPungutan}
                                    // onSearch={(value) => this.fetchKodeJenisPungutan(value)}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {this.state.dataKodeJenisPungutan !== undefined ? this.state.dataKodeJenisPungutan.map(d => (
                                        <Option key={d.value}>{d.text}</Option>
                                    )) : ""}
                                </Select>
                            </Col>
                        </Row> */}
                        
                        <Row gutter={8}>
                            <Col span={12}>
                                <p>Uraian Barang</p>
                            </Col>
                            <Col span={12}>
                                <TextArea
                                    rows={4}
                                    name="uraian"
                                    value={this.state.uraian}
                                    onChange={(e) =>
                                        this.setState({uraian: e.target.value})
                                    }
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Uraian Barang</p>
                            </Col>
                            <Col span={20}>
                                <TextArea
                                    rows={4}
                                    name="uraian"
                                    value={this.state.uraian}
                                    onChange={(e) =>
                                        this.setState({uraian: e.target.value})
                                    }
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Spesifikasi</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    onChange={e => { this.setState({ spesifikasiLain: e.target.value }); }}
                                    value={
                                        this.state.spesifikasiLain === null
                                            ? "-"
                                            : this.state.spesifikasiLain
                                    }
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Merk</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    onChange={e => { this.setState({ merk : e.target.value }); }}
                                    value={
                                        this.state.merk === null
                                            ? "-"
                                            : this.state.merk
                                    }
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Tipe</p>
                            </Col>
                            <Col span={20}>
                                <Input
                                    onChange={e => { this.setState({ tipe : e.target.value }); }}
                                    value={
                                        this.state.tipe === null
                                            ? "-"
                                            : this.state.tipe
                                    }
                                />
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Jumlah Kemasan</p>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.jumlahKemasan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width: '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeData}
                                />
                                {this.state.visibleJumlahKemasan ?
                                    <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                    </div> : null}

                            </Col>
                            <Col span={12}>
                                <Select
                                    showSearch
                                    placeholder="Pilih satuan barang"
                                    optionFilterProp="children"
                                    style={{width: '100%'}}
                                    onSearch={this.getSatuanBarang}
                                    onChange={this.getValueSatuanBarang}
                                    loading={this.state.fetchingSatuan}
                                    value={this.state.kodeSatuanBarang}
                                >
                                    {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Jumlah Satuan</p>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.jumlahSatuan}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width: '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeData}
                                />
                                {this.state.visible ?
                                    <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                    </div> : null}

                            </Col>
                            <Col span={12}>
                                <Select
                                    showSearch
                                    placeholder="Pilih satuan barang"
                                    optionFilterProp="children"
                                    style={{width: '100%'}}
                                    onSearch={this.getSatuanBarang}
                                    onChange={this.getValueSatuanBarang}
                                    loading={this.state.fetchingSatuan}
                                    value={this.state.kodeSatuanBarang}
                                >
                                    {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Kondisi Barang</p>
                            </Col>
                            <Col span={20}>
                                <Select
                                    showSearch
                                    placeholder="Pilih satuan barang"
                                    optionFilterProp="children"
                                    style={{width: '100%'}}
                                    onSearch={this.getSatuanBarang}
                                    onChange={this.getValueSatuanBarang}
                                    loading={this.state.fetchingSatuan}
                                    value={this.state.kodeSatuanBarang}
                                >
                                    {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Berat Bruto (kg)</p>
                            </Col>
                            <Col span={4}>
                                {/* <InputNumber
                                    onChange={e => { this.setState({ bruto : e.target.value }); }}
                                    value={
                                        this.state.bruto === null || this.state.bruto === undefined
                                            ? 0
                                            : this.state.bruto
                                    }
                                /> */}
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.bruto}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width: '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataBruto}
                                />
                                {this.state.visibleBruto ?
                                    <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                    </div> : null}
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Nilai Barang</p>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    pattern="[0-9]+[.0-9]*"
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    value={this.state.nilaiBarang}
                                    formatter={(value) =>
                                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    }
                                    style={{width: '100%'}}
                                    placeholder={"0.000"}
                                    onChange={this.onChangeDataNilaiBarang}
                                />
                                {this.state.visibleNilaiBarang ?
                                    <div style={{color: 'red'}}><span>*</span><span>Harap memasukan angka saja!</span>
                                    </div> : null}
                            </Col>
                            <Col span={12}>
                                <Select
                                    showSearch
                                    placeholder="Pilih Valuta"
                                    optionFilterProp="children"
                                    style={{width: '100%'}}
                                    onSearch={this.getSatuanBarang}
                                    onChange={this.getValueSatuanBarang}
                                    loading={this.state.fetchingSatuan}
                                    value={this.state.kodeSatuanBarang}
                                >
                                    {this.state.satuanBarangAll !== undefined ? this.state.satuanBarangAll.map((item, index) => (
                                                <Option key={index}
                                                        value={item.kodeSatuanBarang}>{item.kodeSatuanBarang}-{item.namaSatuanBarang}</Option>
                                            )) : ""}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={4}>
                                <p>Keterangan</p>
                            </Col>
                            <Col span={20}>
                                <TextArea
                                    rows={4}
                                    name="uraian"
                                    value={this.state.keterangan}
                                    onChange={(e) =>
                                        this.setState({keterangan: e.target.value})
                                    }
                                />
                            </Col>
                        </Row>
                        <br></br>
                        { this.state.showDataKeluarga ? 
                        <Row>
                            <Col span={12}> 
                                <Checkbox
                                    checked={this.state.barangTidakBersamaan}
                                    disabled={this.state.disabled}
                                    onChange={this.onChange}
                                >
                                    Barang Tidak Datang Bersamaan
                                    {/* <p className={'text-red'}>Barang Tidak Datang Bersamaan</p> */}
                                </Checkbox>
                            </Col>
                        </Row>
                        : null }
                    </Form>
                    {/*<Button onClick={this.KirimData}></Button>*/}
                </Card> 
            ) : null ) : null }
                {this.props.requiredDetail === true ? (
                    <p className={'text-red'} style={{fontSize: '12px'}}>&nbsp; Silahkan isi semua data terlebih
                        dahulu!</p>) : null}
                <Modal
                    visible={this.state.showModal}
                    title="Tambah Referensi Barang"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Table dataSource={hasil} pagination={false} columns={column} loading={loadingReferensi}
                               onRowClick={(e) => this.onSelectionChanged(e)}/>
                        {/*<DataGrid*/}
                        {/*    dataSource={hasil}*/}
                        {/*    showBorders={true}*/}
                        {/*    allowColumnReordering={true}*/}
                        {/*    allowColumnResizing={true}*/}
                        {/*    columnAutoWidth={true}*/}
                        {/*    showColumnLines={true}*/}
                        {/*    selection={{mode: "single"}}*/}
                        {/*    hoverStateEnabled={true}*/}
                        {/*    onRowClick={this.onSelectionChanged}*/}
                        {/*>*/}
                        {/*    <SearchPanel visible={true} placeholder={"Cari..."} width={200}/>*/}
                        {/*    <Column dataField={"uraian"} caption={"Uraian"}/>*/}
                        {/*    <Column dataField={"seriBarang"} caption={"Seri Barang"}/>*/}
                        {/*    <Column dataField={"hsCode"} caption={"Kode HS"}/>*/}
                        {/*</DataGrid>*/}
                        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                            <Pagination
                                onChange={(event) => this.handlePageChange(event)}
                                current={this.state.pages + 1}
                                defaultCurrent={0}
                                defaultPageSize={5}
                                total={totalDataReferensi}
                                showTotal={totalDataReferensi => `Total ${totalDataReferensi} items`}
                            />
                            &nbsp;
                        </div>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default DetailBarang;
