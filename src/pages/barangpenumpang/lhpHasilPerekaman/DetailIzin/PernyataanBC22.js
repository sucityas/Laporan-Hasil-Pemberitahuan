import React, { Component, Fragment } from "react";
import { Input, Spin, Form, DatePicker, Radio, Checkbox, Select, Row, Col, Tooltip, Button, Popover, InputNumber, Card, Table, Modal, Switch } from 'antd';
import PemuatanBentukCurah from './PemuatanBentukCurahDetail'
import { Link } from "react-router-dom";
import PFP from './PFPdetail'
import axios from "axios";
import moment from "moment";
import { getUser } from "../../../../utils/DataUser";
import Swal from "sweetalert2";
import { sortedUniq } from "lodash";
import RekamKeluarga from "./RekamKeluarga";

// import Select from 'react-select'

// const { REACT_APP_SECRET_KEY_REFERENSI, REACT_APP_REFERENSI, REACT_APP_API_SCE_WS, REACT_APP_API_SCE_WS_KEY} = process.env;
// var getSeqIzin = localStorage.getItem('seqIzin');
const divStyle = {
    color: 'blue',
    border: 1
};

const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const {

    REACT_APP_LHP,
    REACT_APP_SECRET_KEY_LHP,
    REACT_APP_HDFS,
   REACT_APP_SECRET_KEY_HDFS,
    REACT_APP_API_SCE_WS,
    REACT_APP_API_SCE_WS_KEY,
    REACT_APP_API_BARANG_PENUMPANG,
    REACT_APP_API_BARANG_PENUMPANG_KEY
} = process.env;
const { Column, ColumnGroup } = Table;

class PernyataanBC22 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pemuatanBentukCurah: false,
            pfp: false,
            dataKantor: [],
            lokasi: null,
            kodeKantor: null,
            readOnly: true,
            prevData: {},
            dataDokumen: null,
            initialLokasiKedatangan: "AAA",
            domisiliKodeProvinsi: null,
            domisiliKodeKelurahan: null,
            domisiliKodeKecamatan: null,
            domisiliKodeKabupaten: null,
            nikMatch: false,
            pasporMatch: false,
            loadingPaspor: false,
            loadingNik: false,
            page: 0,
            dataKeluarga: [],
            ubahDataKeluarga: false,
            id: 0,
            dataReferensiKeluarga: null,
            dataReferensiNegara: null,
            readOnlyModal: false,
            deleteKeluarga: [],
            dataReferensiKategori: [],
            q1: false,
            q2: false,
            q3: false,
            q4: false,
            q5: false,
            q6: false,
            q7: false,
            q8: false,
            q9: false,

        };

        this.editData = this.editData.bind(this);
        this.editDataBatal = this.editDataBatal.bind(this);
    }

    editData() {
        // console.log("Edit Data: ")
        this.setState({
            readOnly: false,
            prevData: this.props.data,
        })
    }

    getDataDokumen(e) {
        let idHeader = localStorage.getItem("idHeader");

        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen/${idHeader}`, {
            headers: {
                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
            }
        })
            .then(res => {
                this.setState({
                    dataDokumen: res.data,
                });
            })
        // .catch((err) => {
        //     swalWithBootstrapButtons.fire(
        //         "Oops!",
        //         `${err.message}`,
        //         "error"
        //     );
        //     this.setState({ loading: false });
        //     GlobalVariable.openNotificationWithIcon("error");
        // });
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
                        let idHeader = localStorage.getItem("idHeader");

                        axios.get(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen/${idHeader}`, {
                            headers: {
                                'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                            }
                        })
                            .then(res => {
                                this.setState({
                                    dataDokumen: res.data,
                                }, () => {
                                    let tdHeader = this.state.dataDokumen !== null && this.state.dataDokumen !== undefined ? this.state.dataDokumen.header : null;
                                    tdHeader.q1 = this.state.q1 ? 'Y' : 'N'
                                    tdHeader.q2 = this.state.q2 ? 'Y' : 'N'
                                    tdHeader.q3 = this.state.q3 ? 'Y' : 'N'
                                    tdHeader.q4 = this.state.q4 ? 'Y' : 'N'
                                    tdHeader.q5 = this.state.q5 ? 'Y' : 'N'
                                    tdHeader.q6 = this.state.q6 ? 'Y' : 'N'
                                    tdHeader.q7 = this.state.q7 ? 'Y' : 'N'
                                    tdHeader.q8 = this.state.q8 ? 'Y' : 'N'
                                    tdHeader.q9 = this.state.q9 ? 'Y' : 'N'
                                    tdHeader.nipUpdate = getUser().nip

                                    let dokumenHeader = {}
                                    dokumenHeader.tdHeader = tdHeader

                                    axios.post(`https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/header/dokumen-header/update`, dokumenHeader, {
                                        headers: {
                                            'beacukai-API-Key': `2f1313cf-e4e6-4172-926b-6ee720182f7a`,
                                        }
                                    })
                                        .then((body => {
                                            if (body.data.status == true) {
                                                this.setState({ readOnly: true })
                                                Swal.fire(
                                                    'Berhasil!',
                                                    'Data Berhasil Disimpan.',
                                                    'success'
                                                )
                                            } else {
                                                Swal.fire(
                                                    'Gagal Menyimpan data Header',
                                                    'Terdapat pengisian form yang salah.',
                                                    'error'
                                                );
                                                this.setState({ iconLoading: false });
                                            }
                                        }))
                                });
                            })
                    }
                })
            }
        });
    }

    editDataBatal() {
        this.setState({
            readOnly: !this.state.readOnly,
            q1: this.state.dataDokumen.header.q1 === 'Y' ? true : false,
            q2: this.state.dataDokumen.header.q2 === 'Y' ? true : false,
            q3: this.state.dataDokumen.header.q3 === 'Y' ? true : false,
            q4: this.state.dataDokumen.header.q4 === 'Y' ? true : false,
            q5: this.state.dataDokumen.header.q5 === 'Y' ? true : false,
            q6: this.state.dataDokumen.header.q6 === 'Y' ? true : false,
            q7: this.state.dataDokumen.header.q7 === 'Y' ? true : false,
            q8: this.state.dataDokumen.header.q8 === 'Y' ? true : false,
            q9: this.state.dataDokumen.header.q9 === 'Y' ? true : false,
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.readOnly !== this.props.readOnly) {
            this.setState({
                readOnly: this.props.readOnly,
            });
        }

        if (prevProps.data !== this.props.data) {

            // console.log("Detail Izin Update: ", this.props.data)
            if (!(this.props.data === null || this.props.data === undefined)) {
                this.setState({
                    hasil: this.props.data.barang,
                    dataDokumen: this.props.data,
                    dataKeluarga: this.props.data.keluarga,
                    showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
                }, () => {
                    if (this.state.dataDokumen !== null) {
                        this.fetchReferensiKategori()

                        this.setState({
                            q1: this.state.dataDokumen.header.q1 === 'Y' ? true : false,
                            q2: this.state.dataDokumen.header.q2 === 'Y' ? true : false,
                            q3: this.state.dataDokumen.header.q3 === 'Y' ? true : false,
                            q4: this.state.dataDokumen.header.q4 === 'Y' ? true : false,
                            q5: this.state.dataDokumen.header.q5 === 'Y' ? true : false,
                            q6: this.state.dataDokumen.header.q6 === 'Y' ? true : false,
                            q7: this.state.dataDokumen.header.q7 === 'Y' ? true : false,
                            q8: this.state.dataDokumen.header.q8 === 'Y' ? true : false,
                            q9: this.state.dataDokumen.header.q9 === 'Y' ? true : false,
                        });
                    }
                })
            }
        }
    }

    componentDidMount() {
        // console.log("Detail Izin Mount: ", this.props.data)
        if (!(this.props.data === null || this.props.data === undefined)) {
            this.setState({
                dataDokumen: this.props.data,
                dataKeluarga: this.props.data.keluarga,
                readOnly: this.props.readOnly,
                showBarangTidakBersamaan: this.props.data.header.kodeDokumen === '22' ? true : false,
            }, () => {
                if (this.state.dataDokumen !== null) {
                    this.fetchReferensiKategori()

                    this.setState({
                        q1: this.state.dataDokumen.header.q1 === 'Y' ? true : false,
                        q2: this.state.dataDokumen.header.q2 === 'Y' ? true : false,
                        q3: this.state.dataDokumen.header.q3 === 'Y' ? true : false,
                        q4: this.state.dataDokumen.header.q4 === 'Y' ? true : false,
                        q5: this.state.dataDokumen.header.q5 === 'Y' ? true : false,
                        q6: this.state.dataDokumen.header.q6 === 'Y' ? true : false,
                        q7: this.state.dataDokumen.header.q7 === 'Y' ? true : false,
                        q8: this.state.dataDokumen.header.q8 === 'Y' ? true : false,
                        q9: this.state.dataDokumen.header.q9 === 'Y' ? true : false,
                    });
                }
            })
        }


        // this.getReferensi()
    }

    fetchReferensiKategori = () => {
        // this.setState({ dataKodeJenisPungutan: [ {value : "string", text : "coba string"} ]});
        const isLocalhost =
            window.location.host == "ceisa40.customs.go.id-prod";
        const res = axios.get(
            `https://apisdev-gw.beacukai.go.id/v3/barang-penumpang/cd/pernyataan-barang/list`,
            {
                headers: {
                    [!isLocalhost
                        ? "beacukai-api-key"
                        : "customs-api-key"]: `2f1313cf-e4e6-4172-926b-6ee720182f7a`,

                }
            }
        )
            .then(res => {
                this.setState({ dataReferensiKategori: res.data.data, fetchingReferensiKategori: false });
            })
            .catch(error => {
                console.log(error)
            });
    };


    handleClear = () => {
        this.setState({
            clear: false,
        })
    }

    onChangeQ1(checked) {
        this.setState({ q1: checked });
    }

    onChangeQ2(checked) {
        this.setState({ q2: checked });
    }

    onChangeQ3(checked) {
        this.setState({ q3: checked });
    }

    onChangeQ4(checked) {
        this.setState({ q4: checked });
    }

    onChangeQ5(checked) {
        this.setState({ q5: checked });
    }

    onChangeQ6(checked) {
        this.setState({ q6: checked });
    }

    onChangeQ7(checked) {
        this.setState({ q7: checked });
    }

    onChangeQ8(checked) {
        this.setState({ q8: checked });
    }

    onChangeQ9(checked) {
        this.setState({ q9: checked });
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 12 },
        };

        return (
            <Fragment>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit}>
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h5 className="kt-portlet__head-title kt-font-bolder">
                                Daftar Kategori Barang
                            </h5>
                        </div>
                        {!this.state.readOnly ?
                            <div className="kt-portlet__head-label">
                                <button className="btn btn-success" onClick={this.editDataSimpan}>
                                    <i className="fa fa-save" /> &nbsp; Simpan
                                </button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={this.editDataBatal}>
                                    <i className="fa fa-times" /> &nbsp; Batal
                                </button>
                            </div> :
                            // <div className="kt-portlet__head-label">
                            //     <button className="btn btn-primary" onClick={this.editData}>
                            //         <i className="fa fa-edit" /> &nbsp; Ubah Pernyataan
                            //     </button>
                            // </div>
                            null
                        }
                    </div>
                    <div className="kt-portlet__body">
                        <div className="kt-section kt-section--first">
                            <div className="kt-section__body">
                                <Table
                                    dataSource={this.state.dataReferensiKategori}
                                    loading={this.state.fetching}
                                    rowKey={"nomor"}
                                    size="small"
                                    bordered
                                    // scroll={{ x: 1000 }}
                                    pagination={{
                                        pageSize: 10, total: this.state.dataReferensiKategori.length,
                                        current: this.state.current,
                                        onChange: (page, pageSize) => {
                                            this.setState({
                                                current: page,
                                                page: (page - 1) * 10
                                            })
                                        },
                                        showSizeChanger: true, pageSizeOptions: ['5', '10', '20']
                                    }}

                                >
                                    <Column title="No." dataIndex="nomor" key="nomor" render={(value, item, index) => (this.state.page + index) + 1} />
                                    <Column title="Uraian" dataIndex="uraian" key="uraian" />
                                    <Column title="Membawa?" dataIndex="kodePernyataan" key="kodePernyataan" align='center'
                                        render={(value, item, index) => {
                                            switch (value) {
                                                case '1':
                                                    return (<Switch defaultChecked checked={this.state.q1} onChange={this.onChangeQ1.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '2':
                                                    return (<Switch defaultChecked checked={this.state.q2} onChange={this.onChangeQ2.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '3':
                                                    return (<Switch defaultChecked checked={this.state.q3} onChange={this.onChangeQ3.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '4':
                                                    return (<Switch defaultChecked checked={this.state.q4} onChange={this.onChangeQ4.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '5':
                                                    return (<Switch defaultChecked checked={this.state.q5} onChange={this.onChangeQ5.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '6':
                                                    return (<Switch defaultChecked checked={this.state.q6} onChange={this.onChangeQ6.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '7':
                                                    return (<Switch defaultChecked checked={this.state.q7} onChange={this.onChangeQ7.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '8':
                                                    return (<Switch defaultChecked checked={this.state.q8} onChange={this.onChangeQ8.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                                case '9':
                                                    return (<Switch defaultChecked checked={this.state.q9} onChange={this.onChangeQ9.bind(this)} readOnly={this.state.readOnly} disabled={this.state.readOnly} />)
                                                    break;
                                            }
                                        }}
                                    />
                                </Table>
                            </div>
                        </div>
                    </div>
                </Form>
            </Fragment>
        );
    }
}
const WrappedDataIzin = Form.create()(PernyataanBC22);
export default WrappedDataIzin;