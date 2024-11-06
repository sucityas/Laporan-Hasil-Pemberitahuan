import React, {Component} from "react";
import {
    Col,
    Row,
    Card,
    Radio,
    Modal,
    Button,
    Form,
    Input,
    Table,
    Icon,
    DatePicker,
    TimePicker,
    Skeleton,
    Spin,
    Select,
    Upload,
    InputNumber,
    Checkbox
} from "antd";
// import { PlusOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Swal from "sweetalert2";
import GlobalVariable from "../../../../../helpers/GlobalVariable";
import {AutoRotatingCarousel, Slide} from "material-auto-rotating-carousel";
import axios from "axios";
import Notification from "../../Component/Notifikasi";
import QuickSearch from "../../Component/QuickSearch";
import DetailBarang from "../../TabsDetailPemeriksaan/DetailBarang";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

let idLhpHeader = localStorage.getItem("idLhpHeader");
const { Option } = Select;
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
});
const {
    REACT_APP_REFERENSI,
    REACT_APP_SECRET_KEY_REFERENSI,
    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env;

const {blue, green} = require("@material-ui/core/colors");
const {TextArea} = Input;

class DetailPemeriksaan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skeleton: false,
            open: false,
            openutama: false,
            fotonih: [],
            loading: false,
            loadingFoto: false,
            idLhp: null,
            showing: false,
        };
        this.opensliderutama = this.opensliderutama.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async getDokumen() {
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let idHeader = localStorage.getItem("idHeader");
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-daftar-detil-lhp/${idLhpHeader}/${idHeader}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    hasil: body.listData,
                });
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getFotoDetail(e) {
        let idLhpHeader = localStorage.getItem("idLhpHeader");
        let idLhpDetail = e.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-foto-pemeriksaan/${idLhpHeader}/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    dataFoto: body.listData,
                });
                console.log('[debug] , foto', this.state.dataFoto);
                if (body.status === true) {
                    this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getKapasitas(e) {
        let idLhpDetail = e.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-kapasitas-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    namaKapasitas: body.listData[0].namaKapasitas,
                    kapasitas: body.listData[0].kapasitas,
                });
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getKemasan(e) {
        let idLhpDetail = e.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-kemasan-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                this.setState({
                    loading: false,
                    jumlahKemasan: body.listData[0].jumlahKemasan,
                    ukuranKemasan: body.listData[0].ukuranKemasan,
                    panjangKemasan: body.listData[0].panjangKemasan,
                    lebarKemasan: body.listData[0].lebarKemasan,
                    tinggiKemasan: body.listData[0].tinggiKemasan,
                    namaKemasan: body.listData[0].namaKemasan,
                });
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }

    async getUnsurBarang(e) {
        let idLhpDetail = e.idLhpDetail;
        this.setState({fetching: true});
        fetch(`${REACT_APP_LHP}/get-detil-unsur-barang-lhp/${idLhpDetail}`, {
            headers: {
                accept: "application/json",
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_LHP}`,
            },
            "Access-Control-Allow-Origin": "*",
        })
            .then((response) => response.json())
            .then((body) => {
                if(body.listData.length === 0){
                    this.setState({
                        loading: false,
                        namaAsalBarang: "Data Kosong",
                        asalBarang : "Data Kosong",
                        namaNegara: "Data Kosong",
                        namaKondisiBarang: "Data Kosong",
                    });
                }else{
                    this.setState({
                        loading: false,
                        namaAsalBarang: body.listData[0].namaAsalBarang,
                        asalBarang : body.listData[0].asalBarang,
                        namaNegara: body.listData[0].namaNegara,
                        namaKondisiBarang: body.listData[0].namaKondisiBarang,
                    });
                }
                console.log('[debug] , foto', this.state.namaKapasitas);
                if (body.status === true) {
                    // this.previewFoto(e);
                }
            })
            .catch((err) => {
                console.log(err.message);
                // if(error.response.status === 404){
                //     return Notification('failed', "Data Tidak Ditemukan")
                // }
                this.setState({loading: false});
                GlobalVariable.openNotificationWithIcon("error");
            });
    }
    componentDidMount() {
        const idLhp = localStorage.getItem("idLhpHeader");
        if (localStorage.getItem("idLhpHeader") == null) {
            console.log("no doing");
        } else {
            console.log("Component Did Mount");
            this.setState({loading: true});
            this.getDokumen();
            this.setState({
                idLhp: idLhp,
            });
        }
        this.setState({
            hasil: [
                { kategori: "Kategori 1", uraianBarang: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
                { kategori: "Kategori 2", uraianBarang: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."},
            ],
        },()=> {
            console.log(this.state.hasil)
        });

    }

    componentDidUpdate(prevProps, prevState) {
        const data = localStorage.getItem("idLhpHeader");
        if (data != this.state.idLhp) {
            console.log("Component Did Update");
            this.setState({loading: true});
            this.getDokumen();
            this.setState({
                idLhp: data,
            });
        }
    }

    ambilSeqIzin(e) {
        console.log(e)
        this.setState({
            showing: true,
            //Detail Barang
            uraianBarang: e.uraianBarang,
            kodeJenisSatuan: e.kodeJenisSatuan,
            jumlahSatuan: e.jumlahSatuan,
            //Spesifikasi
            merk: e.merk,
            model: e.model,
            type: e.type,
            //Keterangan tambahan
            keteranganTambahan: e.keteranganTambahan,
            kesesuaianBarang: e.kesesuaianBarang,
        });
        // console.log(e.fotoBarangs.map((item, key) => item.urlFoto));
        //
        this.getFotoDetail(e)
        this.getKapasitas(e)
        this.getKemasan(e)
        this.getUnsurBarang(e)
    }

    tutupForm() {
        this.setState({
            showing: false,
        });
    }

    previewFoto(e) {
        const dataFotoCoy = [];
        this.setState({
            loadingFoto: true,
        });

        this.state.dataFoto.map((item, key) =>
            axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${item.urlFoto}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "beacukai-api-key": `${REACT_APP_SECRET_KEY_HDFS}`,
                },
                // 'Access-Control-Allow-Origin': '*',
                responseType: "blob", //Force to receive data in a Blob Format
            })
                .then((response) => {
                    //Create a Blob from the PDF Stream
                    const file = new Blob([response.data], {type: "jpg || jpeg"});
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    console.log(fileURL);
                    dataFotoCoy.push({url: fileURL, keterangan: item.keterangan});
                    this.setState({
                        fotonih: dataFotoCoy,
                        loadingFoto: false,
                    });
                    console.log(this.state.fotonih);
                })
                .catch((error) => {
                    console.log(error);
                })
        );
    }

    openslider() {
        this.setState({
            open: !this.state.open,
        });
    }

    opensliderutama() {
        this.setState({
            openutama: !this.state.openutama,
        });
    }

    closeslider() {
        this.setState({
            open: false,
        });
    }

    closesliderutama() {
        this.setState({
            openutama: false,
        });
    }

    render() {
        let noUrut = 1
        const columnsdetail = [
            {
                title: 'No',
                dataIndex: ++this.count,
                render: () => noUrut++,
                width: 70,
            },
            {
                title: "Kategori",
                dataIndex: "kategori",
                width: 200,
            },
            {
                title: "Uraian Barang Hasil Pemeriksaan",
                dataIndex: "uraianBarang",
                width: 400,
            },
            {
                title: "Jumlah",
                dataIndex: "jumlahSatuan",
                width: 160,
            },
            {
                title: "Satuan",
                dataIndex: "satuan",
                width: 160,
            },
            {
                title: "Sesuai",
                dataIndex: "kesesuaianBarang",
                key : "kesesuaianBarang",
                width: 160,
                render : (key, record) => {
                    if(key === '1'){
                        return 'Sesuai'
                    }else{
                        return 'Tidak Sesuai'
                    }
                }
            },
            {
                title: "Catatan Hasil Pemeriksaan",
                dataIndex: "keteranganTambahan",
                width: 250,
            },
            {
                title: "Aksi",
                dataIndex: "aksi",
                key: "aksi",
                fixed: "right",
                render: (key, record, e) => (
                    <Button
                        type="primary"
                        onClick={(evt) => this.ambilSeqIzin(record, evt)}
                    >
                        <Icon type="eye" />
                    </Button>
                ),
            },
        ];
        const {
            showing,
            //Detail Barang
            kodeJenisSatuan,
            uraianBarang,
            jumlahSatuan,
            //Kemasan
            jumlahKemasan,
            kodeJenisKemasan,
            ukuranKemasan,
            panjangKemasan,
            lebarKemasan,
            tinggiKemasan,
            namaKemasan,
            //Unsur Barang
            namaAsalBarang,
            namaKondisiBarang,
            namaNegara,
            asalBarang,
            //Spesifikasi
            merk,
            model,
            type,
            //Kapasitas
            kapasitas,
            namaKapasitas,
            //Keterangan Tambahan
            keteranganTambahan,
            kesesuaianBarang

        } = this.state;

        return (
            <div>
                <div className="kt-portlet">
                    <div className="kt-portlet__body">
                    <Card title="Pemeriksaan"> 
                            <Row gutter={8} style={{padding: "5px"}}>
                                <Col span={4}>
                                    <p style={{color: "black"}}>Waktu Mulai</p>
                                </Col>
                                <Col span={4}>
                                    <DatePicker
                                        // disabledDate={this.handleDisabledDatePicker}
                                        size={"medium"}
                                        placeholder="Pilih Tanggal"
                                        style={{ width: "100%" }}
                                        // showTime={{ format: 'HH:mm:ss' }}
                                        onChange={this.onChangeTglMuatAwal}
                                        format="DD-MM-YYYY"
                                        // value={this.state.tglMuatAwal}
                                    />
                                </Col>
                                <Col span={4}>
                                    <TimePicker
                                        // style={is_readonly && {color: 'black'}} disabled={is_readonly}
                                        // defaultValue={pengeluaran_kemasan_mulai}
                                        // style={{color: 'black'}}
                                        placeholder={'Waktu Mulai'}
                                        style={{ width: "100%" }}
                                        // onOk={(value)=>this.onChange('pengeluaran_kemasan_mulaij',value)}
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                        // value={this.state.tglMuatAwal}
                                        onChange={this.onChangeTimeMuatAwal}
                                    />
                                </Col>
                                <Col span={4}>
                                    <p style={{color: "black"}}>Waktu Selesai</p>
                                </Col>
                                <Col span={4}>
                                    <DatePicker
                                        // disabledDate={this.handleDisabledDatePicker}
                                        size={"medium"}
                                        placeholder="Pilih Tanggal"
                                        style={{ width: "100%" }}
                                        // showTime={{ format: 'HH:mm:ss' }}
                                        onChange={this.onChangeTglMuatAwal}
                                        format="DD-MM-YYYY"
                                        // value={this.state.tglMuatAwal}
                                    />
                                </Col>
                                <Col span={4}>
                                    <TimePicker
                                        // style={is_readonly && {color: 'black'}} disabled={is_readonly}
                                        // defaultValue={pengeluaran_kemasan_mulai}
                                        // style={{color: 'black'}}
                                        placeholder={'Waktu Mulai'}
                                        style={{ width: "100%" }}
                                        // onOk={(value)=>this.onChange('pengeluaran_kemasan_mulaij',value)}
                                        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                        // value={this.state.tglMuatAwal}
                                        onChange={this.onChangeTimeMuatAwal}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={8} style={{padding: "5px"}}>
                                <Col span={4}>
                                    <p style={{color: "black"}}>Lokasi Periksa</p>
                                </Col>
                                <Col span={8}>
                                    <Input
                                        name="no_dok"
                                        onChange={this.handleInputChange}
                                        value={
                                            this.state.noDaf === null
                                                ? "-"
                                                : this.state.noDaf
                                        }
                                    />
                                </Col>
                                <Col span={4}>
                                    <p style={{color: "black"}}>Pendamping Pemeriksaan</p>
                                </Col>
                                <Col span={8}>
                                    <Select
                                        placeholder="Pilih Pendamping"
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
                            </Row>
                        </Card>
                        <Card
                            title="Kesimpulan Hasil Pemeriksaan"
                            style={{minHeight: "200px", maxHeight: "200px"}}
                        >
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: 'start'}}>
                                    Kesimpulan
                                </Col>
                                <Col span={18}>
                                    <Radio.Group value={this.state.kesimpulanhasil}
                                                    onChange={this.onChangeKesimpulan}>
                                        <Radio value={'S'}>Sesuai</Radio>
                                        <Radio value={'T'}>Tidak Sesuai</Radio>
                                        <Radio value={'S'}>Selesai</Radio>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2" gutter={8}>
                                <Col span={6} style={{textAlign: 'start'}}>
                                    Keterangan Lain
                                </Col>
                                <Col span={18}>
                                    <TextArea
                                        value={this.state.Catatan}
                                        onChange={e => this.setState({Catatan: e.target.value})}
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <br></br>
                        <Table
                            dataSource={this.state.hasil}
                            rowKey={"id"}
                            size="small"
                            pagination={false}
                            columns={columnsdetail}
                            loading={this.state.loading}
                            bordered
                            scroll={{ x: 1500 }}
                        />
                    </div>
                </div>
                {showing ? (
                    <div className={"kt-portlet"}>
                        <Card size="small" title="Detail Barang">
                            <Form>
                                <Row gutter={8}>
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
                                </Row>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Uraian Barang</p>
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            rows={4}
                                            name="uraianBarang"
                                            value={this.state.uraianBarang}
                                            onChange={(e) =>
                                                this.setState({uraianBarang: e.target.value})
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={8}>
                                    <Col span={4}>
                                        <p>Jumlah Barang</p>
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
                                        <p>Nilai Barang</p>
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
                                <br></br>
                                <Row>
                                    <Col span={12}> 
                                        <Checkbox
                                            checked={this.state.checked}
                                            disabled={this.state.disabled}
                                            onChange={this.onChange}
                                        >
                                            Barang Tidak Datang Bersamaan
                                            {/* <p className={'text-red'}>Barang Tidak Datang Bersamaan</p> */}
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </Form>
                            {/*<Button onClick={this.KirimData}></Button>*/}
                        </Card>
                        <br/>
                        <Card size="small" title="Hasil Pemeriksaan PerBarang">
                            <Form>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Kesesuaian Barang</p>
                                    </Col>
                                    <Col span={18}>
                                        <Radio.Group
                                            name="kesiapanPeriksa"
                                            value={kesesuaianBarang}
                                        >
                                            <Radio value="1">Sesuai</Radio>
                                            <Radio value="0">Tidak Sesuai</Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                                <Row gutter={8} style={{margin: "5px"}}>
                                    <Col span={4}>
                                        <p>Keterangan Lain</p>
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            name="keteranganTambahan"
                                            rows={4}
                                            value={keteranganTambahan}
                                            style={{color: "black"}}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                        <br/>
                        <Card title="Foto LHP Barang">
                            <Spin
                                spinning={this.state.loadingFoto}
                                tip={"Sedang memuat gambar ..."}
                            >
                                {this.state.fotonih.map((item, key) => (
                                    <img
                                        // key={key}
                                        alt="example"
                                        src={item.url}
                                        style={{
                                            width: 200,
                                            display: "inline-block",
                                            marginRight: "20px",
                                        }}
                                        onClick={this.opensliderutama}
                                    />
                                ))}
                                <Col>
                                    {this.state.openutama ? (
                                        <AutoRotatingCarousel
                                            label="TUTUP"
                                            open={this.opensliderutama}
                                            onClose={this.closesliderutama.bind(this)}
                                            onStart={this.closesliderutama.bind(this)}
                                            style={{position: "absolute"}}
                                        >
                                            {this.state.fotonih.map((item, key) => (
                                                <Slide
                                                    // key={key}
                                                    media={<img src={item.url}/>}
                                                    mediaBackgroundStyle={{
                                                        backgroundColor: blue[400],
                                                    }}
                                                    style={{backgroundColor: blue[600]}}
                                                    // title={item.nama}
                                                    subtitle={item.keterangan}
                                                />
                                            ))}
                                        </AutoRotatingCarousel>
                                    ) : null}
                                </Col>
                            </Spin>
                        </Card>
                        <Button
                            type="danger"
                            onClick={this.tutupForm.bind(this)}
                            ghost
                            style={{width: 220}}
                        >
                            <i className="fa fa-times" style={{marginRight: 8}}/>
                            Tutup
                        </Button>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default DetailPemeriksaan;
