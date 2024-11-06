import React, { Component, Fragment } from "react";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    Table,
    Tooltip, Drawer,
    Icon,
    Spin

} from 'antd';
import axios from "axios";
import swal from "sweetalert";
import RekamBarang from "./RekamBarang";
import Highlighter from 'react-highlight-words';
import moment from "moment";
import Swal from 'sweetalert2';
import { getUser } from "../../../../utils/DataUser";

const { REACT_APP_FORM_TIGAD, REACT_APP_API_FORM_TIGAD_KEY, REACT_APP_API_BARANG_PENUMPANG, REACT_APP_API_BARANG_PENUMPANG_KEY } = process.env;
const { Option } = Select;
const { Column, ColumnGroup } = Table;
var getSeqIzin = localStorage.getItem('seqIzin');


class DataBarang extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataBarang: [],
            readOnly: true,
            ubahDataBarang: false,
            prevDataBarang: {},
            page: 0,
            deleteBarang: [],
            id: 0,
            firstIndexPage: 0
        };
        // this.handleRekam = this.handleRekam.bind(this);
        this.onClose = this.onClose.bind(this);
        // this.validasi = this.validasi.bind(this);

        this.editRow = this.editRow.bind(this);
        this.showRow = this.showRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.editData = this.editData.bind(this);
        this.editDataSimpan = this.editDataSimpan.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editDataBatal = this.editDataBatal.bind(this);
        this.rekamBarang = React.createRef();
    }

    state = {
        penerimaSubkontrak: [],
        loading: false,
        visible: false,
        dataRow: undefined,
        dataRekam: [],
    };

    handleRekam(record) {
        this.setState({
            visible: true,
            placement: 'bottom',
            dataRow: record
        });
    }

    handleDataRekam = (data) => {
        // console.log('data barang edit:', data)
        // console.log('data barang ALL :', this.state.dataBarang)
        var index = 0;
        let dataUpdate = {}
        dataUpdate = this.state.dataBarang
        if (data.idDetail === null || data.idDetail === undefined) {
            index = this.state.dataBarang.findIndex(x => x.id === data.id);
            // console.log("index barang : ", index)
            if (index === 0) {
                data.id = this.state.id
                dataUpdate.push(data);
            } else {
                dataUpdate[index] = data
            }
        } else {
            index = this.state.dataBarang.findIndex(x => x.idDetail === data.idDetail);
            dataUpdate[index] = data
        }

        this.setState({
            dataBarang: dataUpdate,
            id: this.state.id + 1
        })
        this.onClose();
        // this.props.handleDataRekam(data);
    }

    handleClear = () => {
        this.setState({
            clear: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
            });
        }

        // console.log("MASUK UPDATE DATA BARANG DETAIL")
        if (prevProps.data !== this.props.data) {
            // this.setState({
            //     uraianBarang: this.props.uraian,
            //     jumlahSatuan: this.props.jumlahSatuan,
            //     kodeSatuanBarang: this.props.kodeSatuanBarang

            // })
            // console.log("Data Barang Detail Update: ", this.props.data)
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    dataBarang: this.props.data.barang,
                    dataDokumen: this.props.data,
                    showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
                }, () => {
                    // if (this.state.dataDokumen !== null) {
                    //     this.props.form.setFieldsValue({
                    //         nama: this.state.dataDokumen.header.nama,
                    //         paspor: this.state.dataDokumen.header.paspor,
                    //         nik: this.state.dataDokumen.header.nik,
                    //         statusPembawa: this.state.dataDokumen.header.statusPembawa,
                    //         nomorTelepon1: this.state.dataDokumen.header.nomorTelepon1,
                    //         nomorTelepon2: this.state.dataDokumen.header.nomorTelepon2,
                    //         email: this.state.dataDokumen.header.email,
                    //         kodePekerjaan: this.state.dataDokumen.header.kodePekerjaan,
                    //         tempatBekerja: this.state.dataDokumen.header.tempatBekerja,
                    //         tanggalLahir: moment(this.state.dataDokumen.header.tanggalLahir, 'DD-MM-YYYY'),
                    //         kodeNegara: this.state.dataDokumen.header.kodeNegara,
                    //         alamat: this.state.dataDokumen.header.domisiliJalan,

                    //         kodeDokumen: this.state.dataDokumen.header.kodeDokumen,
                    //         nomorDokumen: this.state.dataDokumen.header.nomorDokumen,
                    //         tanggalDokumen: moment(this.state.dataDokumen.header.tanggalDokumen, 'DD-MM-YYYY'),
                    //         qrCode: this.state.dataDokumen.header.qrCode,
                    //         kodeKantorBerangkat: this.state.dataDokumen.header.kodeKantorBerangkat,
                    //         kodeKantorTiba: this.state.dataDokumen.header.kodeKantorTiba,
                    //         lokasiKeberangkatan: this.state.dataDokumen.header.lokasiKeberangkatan,
                    //         lokasiKedatangan: this.state.dataDokumen.header.lokasiKedatangan,
                    //         kodeNegaraAsal: this.state.dataDokumen.header.kodeNegaraAsal,
                    //         kodeNegaraTujuan: this.state.dataDokumen.header.kodeNegaraTujuan,
                    //         tujuanPerjalanan: this.state.dataDokumen.header.tujuanPerjalanan,
                    //         namaPengangkut: this.state.dataDokumen.header.namaPengangkut,
                    //         nomorPengangkut: this.state.dataDokumen.header.nomorPengangkut,
                    //         kodeCaraAngkut: this.state.dataDokumen.header.kodeCaraAngkut,
                    //         tanggalBerangkat: moment(this.state.dataDokumen.header.tanggalBerangkat, 'DD-MM-YYYY HH:mm:ss'),
                    //     })
                    // }                    
                })
            }
        }
    }

    editDataSimpan = e => {
        // console.log("Edit Data Simpan: ")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(values);
                Swal.fire({
                    title: 'Apakah Anda Sudah Yakin?',
                    text: 'Pastikan Data Anda Sudah Benar',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya!',
                    cancelButtonText: 'Tidak!',
                }).then((result) => {
                    if (result.value) {

                        if (this.state.deleteBarang.length !== 0) {
                            // console.log("Masuk delete barang")
                            // console.log("length : ", this.state.deleteBarang.length)
                            for (let i = 0; i < this.state.deleteBarang.length; i++) {

                                // console.log("id : ", this.state.deleteBarang[i].idDetail)
                                axios.delete(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/table/detail/delete/${this.state.deleteBarang[i].idDetail}`, {
                                    headers: {
                                        'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                                    }
                                })
                                    .then((body => {
                                        // console.log(body)
                                        if (body.data.status == "success") {
                                        } else {
                                            Swal.fire(
                                                'Gagal Menyimpan data Barang',
                                                'Terdapat pengisian form yang salah.',
                                                'error'
                                            );
                                            this.setState({ iconLoading: false });
                                        }
                                    }))
                            }
                        }

                        // console.log("getUser Log: ", getUser().nip)

                        axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen-barang/update?idHeader=${localStorage.getItem("idHeader")}&nip=${getUser().nip}&statusAwal=&statusAkhir=`, this.state.dataBarang, {
                            headers: {
                                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            }
                        })
                            .then((body => {
                                // console.log(body)
                                if (body.data.status == true) {
                                    Swal.fire(
                                        'Berhasil!',
                                        'Data Barang Berhasil Disimpan.',
                                        'success'
                                    )
                                    // setTimeout(SimpanData, 500);
                                    // localStorage.clear();
                                    this.setState({ ubahDataBarang: false, dataBarang: body.data.data, hasil: body.data.data })

                                } else {
                                    Swal.fire(
                                        'Gagal Menyimpan data Barang',
                                        'Terdapat pengisian form yang salah.',
                                        'error'
                                    );
                                    this.setState({ iconLoading: false });
                                }
                            }))

                    }
                })
            }
        });
    }

    componentDidMount() {
        // console.log("Data Barang Detail Mount: ", this.props.data)
        if (!(this.props.data === null || this.props.data === undefined)) {
            this.setState({
                dataBarang: this.props.data.barang,
                dataDokumen: this.props.data,
                readOnly: this.props.readOnly,
                showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
            }, () => {
                // if (this.state.dataDokumen !== null) {
                //     this.props.form.setFieldsValue({
                //         nama: this.state.dataDokumen.header.nama,
                //         paspor: this.state.dataDokumen.header.paspor,
                //         nik: this.state.dataDokumen.header.nik,
                //         statusPembawa: this.state.dataDokumen.header.statusPembawa,
                //         nomorTelepon1: this.state.dataDokumen.header.nomorTelepon1,
                //         nomorTelepon2: this.state.dataDokumen.header.nomorTelepon2,
                //         email: this.state.dataDokumen.header.email,
                //         kodePekerjaan: this.state.dataDokumen.header.kodePekerjaan,
                //         tempatBekerja: this.state.dataDokumen.header.tempatBekerja,
                //         tanggalLahir: moment(this.state.dataDokumen.header.tanggalLahir, 'DD-MM-YYYY'),
                //         kodeNegara: this.state.dataDokumen.header.kodeNegara,
                //         alamat: this.state.dataDokumen.header.domisiliJalan,

                //         kodeDokumen: this.state.dataDokumen.header.kodeDokumen,
                //         nomorDokumen: this.state.dataDokumen.header.nomorDokumen,
                //         tanggalDokumen: moment(this.state.dataDokumen.header.tanggalDokumen, 'DD-MM-YYYY'),
                //         qrCode: this.state.dataDokumen.header.qrCode,
                //         kodeKantorBerangkat: this.state.dataDokumen.header.kodeKantorBerangkat,
                //         kodeKantorTiba: this.state.dataDokumen.header.kodeKantorTiba,
                //         lokasiKeberangkatan: this.state.dataDokumen.header.lokasiKeberangkatan,
                //         lokasiKedatangan: this.state.dataDokumen.header.lokasiKedatangan,
                //         kodeNegaraAsal: this.state.dataDokumen.header.kodeNegaraAsal,
                //         kodeNegaraTujuan: this.state.dataDokumen.header.kodeNegaraTujuan,
                //         tujuanPerjalanan: this.state.dataDokumen.header.tujuanPerjalanan,
                //         namaPengangkut: this.state.dataDokumen.header.namaPengangkut,
                //         nomorPengangkut: this.state.dataDokumen.header.nomorPengangkut,
                //         kodeCaraAngkut: this.state.dataDokumen.header.kodeCaraAngkut,
                //         tanggalBerangkat: moment(this.state.dataDokumen.header.tanggalBerangkat, 'DD-MM-YYYY HH:mm:ss'),
                //     })
                // }
            })
        }
        // this.getReferensi()
    }


    onClose() {
        this.setState({ visible: false, updateData: null });
    };


    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    validasi() {
        this.props.validasi();
    }

    handleLoading = () => {
        this.setState({
            loading: true
        })
    }

    editRow(record) {
        // console.log(record)
        this.setState({
            updateData: record,
            visible: true,
            readOnly: false
        })
        // this.props.history.push('/sce/cm/intelijen/rekam-nhi/' + data.row.data.idNhi);
    }

    showRow(record) {
        // console.log(record)
        this.setState({
            updateData: record,
            visible: true,
            readOnly: true
        })
        // this.props.history.push('/sce/cm/intelijen/rekam-nhi/' + data.row.data.idNhi);
    }

    addRow() {
        // console.log(record)
        this.setState({
            updateData: null,
            visible: true,
            readOnly: false,
            clear: true
        })
        // this.props.history.push('/sce/cm/intelijen/rekam-nhi/' + data.row.data.idNhi);
        // this.rekamBarang.handleClear()
    }

    deleteRow(record) {
        Swal.fire({
            title: "Apakah Anda Yakin Ingin Menghapus Barang Ini ?",
            // text: "Pastikan Data Anda Sudah Benar!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Tidak!",
            confirmButtonText: "Ya!",
            reverseButtons: true,
        })
            .then((result) => {
                if (result.value) {

                    let dataBarangDelete = [...this.state.deleteBarang];
                    dataBarangDelete.push(record)

                    let filteredArray = this.state.dataBarang.filter(item => item !== record)

                    this.setState({
                        dataBarang: filteredArray,
                        deleteBarang: dataBarangDelete
                    })
                }
            });
    }

    editData() {
        // console.log("Edit Data: ")
        this.setState({
            ubahDataBarang: !this.state.ubahDataBarang,
            prevDataBarang: this.props.data.barang
        })
    }

    editDataBatal() {
        // console.log("Edit Data: ")
        this.setState({
            ubahDataBarang: !this.state.ubahDataBarang,
            dataBarang: this.state.prevDataBarang
        })
    }

    render() {
        return (

            <div>
                <div class="kt-portlet__head">
                    <div class="kt-portlet__head-label">
                        <h3 class="kt-portlet__head-title">
                            Data Barang
                        </h3>

                    </div>
                    {/* {this.state.ubahDataBarang ?
                        <div className="kt-portlet__head-label">
                            <button className="btn btn-success" onClick={this.editDataSimpan}>
                                <i className="fa fa-save" /> &nbsp; Simpan
                            </button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={this.editDataBatal}>
                                <i className="fa fa-times" /> &nbsp; Batal
                            </button>
                        </div> :
                        <div className="kt-portlet__head-label">
                            <button className="btn btn-primary" onClick={this.editData}>
                                <i className="fa fa-edit" /> &nbsp; Ubah Data Barang
                            </button>
                        </div>
                    } */}
                </div>

                {this.state.ubahDataBarang ?
                    <div className="kt-portlet__head-label">
                        <br />
                        <button className="btn btn-success" onClick={this.addRow.bind(this)}>
                            <i className="fa fa-plus" /> &nbsp; Tambah
                        </button>
                        <br />
                        <br />
                    </div> :
                    null
                }
                <Table
                    dataSource={this.state.dataBarang}
                    pagination={{
                        pageSize: 10, total: this.state.dataBarang.length,
                        current: this.state.current,
                        onChange: (page, pageSize) => {
                            this.setState({
                                current: page,
                                page: (page - 1) * 10
                            })
                        }
                    }}

                >
                    <Column title="No." dataIndex="nomor" key="nomor" render={(value, item, index) => (this.state.page + index) + 1} />
                    <Column title="Uraian" dataIndex="uraian" key="uraian" />
                    <Column title="Jumlah" dataIndex="jumlahSatuan" key="jumlahSatuan" />
                    <Column title="Satuan" dataIndex="kodeSatuanBarang" key="kodeSatuanBarang" />
                    <Column title="Jumlah Harga" dataIndex="jumlahHarga" key="jumlahHarga" />
                    <Column
                        title="Aksi"
                        key="status"
                        render={(record) => (
                            <span>
                                {/* <button type="button" className="btn btn-bold btn-sm btn-label-danger" onClick={this.deleteRow}>
                                        <span className="kt-hidden-mobile">Delete</span>
                                    </button>
                                    &nbsp; */}
                                <button type="button" className="btn btn-bold btn-sm btn-label-primary" onClick={this.showRow.bind(this, record)}>
                                    <span className="kt-hidden-mobile">Lihat</span>
                                </button>
                                &nbsp;
                                {this.state.ubahDataBarang ?
                                    <Fragment>
                                        <button type="button" className="btn btn-bold btn-sm btn-label-success" onClick={this.editRow.bind(this, record)}>
                                            <span className="kt-hidden-mobile">Ubah</span>
                                        </button>
                                        &nbsp;
                                        <button type="button" className="btn btn-bold btn-sm btn-label-danger" onClick={this.deleteRow.bind(this, record)}>
                                            <span className="kt-hidden-mobile">Hapus</span>
                                        </button>
                                    </Fragment> : null}
                            </span>
                        )}
                    />
                </Table>


                <Drawer
                    title="Data Barang"
                    width={'70%'}
                    onClose={this.onClose}
                    placement="right"
                    visible={this.state.visible}
                >
                    <RekamBarang
                        handleClear={this.handleClear} handleDataRekam={this.handleDataRekam} data={this.state.updateData} readOnly={true} clear={this.state.clear}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button type="danger" onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                    </div>
                </Drawer>

            </div>
        );
    }

}

const WrappedDataBarang = Form.create()(DataBarang);
export default WrappedDataBarang;