import React from 'react';
import Async from "react-async";
import 'whatwg-fetch';
import DevExpressCustom from "../DevExpressCustom/DevExpressCustom";
import {Column} from "devextreme-react/data-grid";
import {apiUrl, apiUrl2, apiUrl4} from '../../../apis/ApiData';
import {Button, Col, Input, Modal, Row, DatePicker, Icon, InputNumber, message} from "antd";
import QuicSearch from "../CustomQuickSearch/QuickSearch";
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import moment from "moment";
import LoadingContent from "../../LoadingContent";
import Notification from "../../Notification";

const idHeader = window.localStorage.getItem('idHeader')
const dataDummy = []

const { confirm } = Modal;


const dataStore = new ArrayStore({
    key: 'idDokumen',
    data: dataDummy
});


const dataSource = new DataSource({
    store: dataStore,
    reshapeOnPush: true
});

class DataDokumen extends React.Component {
    sendDetail(e) {
        this.setState({
            detailShow: true,
            dataDetail: [e.row.data]
        });
    }

    constructor(props) {
        super(props);
        this.sendDetail = this.sendDetail.bind(this);
        this.state = {
            dataDetail: [],
            detailShow: false,
            idHeader: ''
        }

        this.getKodeDokumen = this.getKodeDokumen.bind(this)
        this.handleQc = this.handleQc.bind(this)
        this.getkodeFasilitas = this.getkodeFasilitas.bind(this)
        this.handleQc2 = this.handleQc2.bind(this)
        this.getkodeIjin = this.getkodeIjin.bind(this)
        this.handleQc3 = this.handleQc3.bind(this)
        this.onUpload = this.onUpload.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.getDataTable = this.getDataTable.bind(this)
        this.editForm = this.editForm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.setDataHeader = this.setDataHeader.bind(this);


        this.quicksearch = React.createRef();
        this.quicksearch2 = React.createRef();
        this.quicksearch3 = React.createRef();
        this.getDataTable();
    }

    buttonData =
        [{
            hint: 'Edit',
            icon: 'edit',
            visible: true,
            onClick: (e) => this.editForm(e)
        }, {
            hint: 'Delete',
            icon: 'remove',
            visible: true,
            onClick: (e) => this.deleteTable(e.row.data.idDokumen)
        }];

    setDataHeader(val) {

        this.setState({idHeader: val})
        console.log(this.state.idHeader)
    }

    editForm(e) {
        let data = e.row.data;
        console.log(data);
        this.setState({
            visible: true,
            kodeDokumen: data.kodeDokumen,
            kodeFasilitas: data.kodeFasilitas,
            kodeIjin: data.kodeIjin,
            noDokumen: data.nomorDokumen,
            seriBarang: data.seriBarang,
            tanggalDokumen: data.tanggalDokumen,
            namaDokumen: data.namaDokumen,
            namaFasilitas: data.namaFasilitas,
            namaIjin: data.namaIjin,
            urlDokumen: data.urlDokumen ? data.urlDokumen : null,
            idDokumen: data.idDokumen,
            edit: true
        })

        this.quicksearch.current.renewKeyword(`${data.namaDokumen} - ${data.kodeDokumen}`)
        this.quicksearch2.current.renewKeyword(`${data.namaFasilitas} - ${data.namaFasilitas}`)
        this.quicksearch3.current.renewKeyword(`${data.namaIjin} - ${data.kodeIjin}`)
    }


    addTableData(item) {
        if (item["kodeDokumen"]) {
            item.docName = `${item["kodeDokumen"]} - ${item["namaDokumen"]}`;
            item.docFas = `${item["kodeFasilitas"]} - ${item["namaFasilitas"]}`;
            dataStore.push([{type: 'insert', key: item["idDokumen"], data: item}])
        } else {
            Notification('failed', 'Terjadi Kesalahan Pada Proses Penyimpanan')
        }
    }

    editTableData(item) {
        if (item["kodeDokumen"]) {
            item.docName = `${item["kodeDokumen"]} - ${item["namaDokumen"]}`;
            item.docFas = `${item["kodeFasilitas"]} - ${item["namaFasilitas"]}`;
            dataStore.push([{type: 'update', key: item["idDokumen"], data: item}])
        } else {
            Notification('failed', 'Terjadi Kesalahan Pada Proses Penyimpanan')
        }

    }

    async deleteTable(id) {
        let that = this
        confirm({
            title: 'Apakah anda yakin menghapus data ini ?',
            okText: 'Iya',
            okType: 'danger',
            cancelText: 'Tidak',
            async onOk() {
                await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtDokumen/delete/${id}`, {
                    header: {'accept': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(async body => {
                        dataStore.clear()
                        dataSource.reload()
                        that.getDataTable()
                        Notification('success', 'Data Berhasil Di Hapus')
                    })
                    .catch(e => Notification('failed', e))
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



    async getDataTable() {
        let that = this;
        await this.setState({idHeader: localStorage.getItem('idHeader')})
        await fetch(`${apiUrl4}/SingleCoreSchema/v1/Validasi/data_dokumen/${this.state.idHeader}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => response.json())
            .then(res => {
                if (res.status == "OK") {
                    res.dataDokumen.map(item => this.addTableData(item))
                }
            })
            .catch(e => console.log(e))
    }

    async handleOk() {
        this.setState({sendingData: true})
        let body = JSON.stringify({
            "idHeader": this.state.idHeader,
            "kodeDokumen": this.state.kodeDokumen,
            "kodeFasilitas": this.state.kodeFasilitas,
            "kodeIjin": this.state.kodeIjin,
            "nomorDokumen": this.state.noDokumen,
            "seriBarang": this.state.seriBarang,
            "tanggalDokumen": this.state.tanggalDokumen,
            "urlDokumen": this.state.lampiranBase65 ? this.state.lampiranBase65.split(',').pop() : null,
            "fileType": this.state.lampiranBase65 ? this.state.lampiranName.split('.').pop() : null
        })
        console.log(body);
        let that = this
        await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtDokumen/${that.state.edit ? 'update/' + that.state.idDokumen : ''}`, {
            method: that.state.edit ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        })
            .then(response => response.status === 500 ? Notification('500', '') : response.json())
            .then(res => that.state.edit ? that.editTableData(res.item) : that.addTableData(res.data))
        this.setState({sendingData: false})

        this.setState({
            visible: false,
            kodeDokumen: '',
            kodeFasilitas: '',
            kodeIjin: '',
            noDokumen: '',
            seriBarang: '',
            tanggalDokumen: '',
            lampiranName: '',
            lampiranBase65: '',
            urlDokumen: null,
        });
        this.quicksearch.current.renewKeyword('')
        this.quicksearch2.current.renewKeyword('')
        this.quicksearch3.current.renewKeyword('')
    };

    handleCancel() {
        this.setState({
            visible: false,
            kodeDokumen: '',
            kodeFasilitas: '',
            kodeIjin: '',
            noDokumen: '',
            seriBarang: '',
            tanggalDokumen: '',
            namaDokumen: '',
            namaFasilitas: '',
            namaIjin: '',
            urlDokumen: null,
            idDokumen: '',
            edit: false
        })
        this.quicksearch.current.renewKeyword('')
        this.quicksearch2.current.renewKeyword('')
        this.quicksearch3.current.renewKeyword('')
    }


    async getKodeDokumen(e) {
        this.setState({fetchingDokumen: true})
        let pelData = await fetch(`${apiUrl}/v1/dokumen/getByparams/${e.toUpperCase()}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingDokumen: false})
        return pelData
    }

    async getkodeFasilitas(e) {
        this.setState({fetchingKodeFasilitas: true})
        console.log(e);
        let pelData = await fetch(`${apiUrl}/v1/fasilitas/by_Id/${e}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingKodeFasilitas: false})
        return pelData
    }

    async getkodeIjin(e) {
        this.setState({fetchingKodeIjin: true})
        let pelData = await fetch(`${apiUrl}/v1/ijin-kl/by_Id/${e}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingKodeIjin: false})
        return pelData
    }

    handleQc(e) {
        this.setState({
            kodeDokumen: e.kodeDokumen,
        })
    }

    handleQc2(e) {
        this.setState({
            kodeFasilitas: e.kodeFasilitas,
        })
    }

    handleQc3(e) {
        this.setState({
            kodeIjin: e.kodeIjin,
        })
    }


    onUpload(e) {
        if (e.target.files[0]) {
            let type = e.target.files[0].type.split('/')[1];
            if (type === "pdf") {
                if (e.target.files[0].size < 20000000) {
                    let name = e.target.files[0].name;
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    let that = this
                    reader.onloadend = () => that.setState({
                        lampiranName: name,
                        lampiranBase65: reader.result,
                    })
                    reader.readAsDataURL(file);
                } else {
                    message.error('File Yang Di Upload Terlalu Besar')
                }
            } else {
                message.error('File Yang Dapat Diupload Hanya PDF')
            }
        }
    }

    onDateChange(date, dateString) {
        this.setState({
            tanggalDokumen: dateString,

        })
    }

    disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }


    render() {
        return (
            <Async promiseFn={this.getDataTable}>
                <Async.Loading> <LoadingContent/> </Async.Loading>
                <Async.Resolved>
                    <div>
                        <Modal
                            title="Tambah Data Dokumen"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            confirmLoading={this.state.sendingData}
                            width={750}
                        >
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Row gutter={10}>
                                        <Col span={8}><label>Kode Dokumen : </label></Col>
                                        <Col span={14}>
                                            <QuicSearch
                                                ref={this.quicksearch}
                                                clickHandler={this.handleQc}
                                                loading={this.state.fetchingDokumen}
                                                def={this.state.kodeDokumen}
                                                pointer={'kodeDokumen'} pointer2={'namaDokumen'}
                                                isFetching={this.fetching}
                                                data={this.getKodeDokumen}/>
                                        </Col>
                                    </Row><br/>
                                    <Row gutter={10}>
                                        <Col span={8}><label>Kode fasilitas : </label></Col>
                                        <Col span={14}>
                                            <QuicSearch
                                                ref={this.quicksearch2}
                                                def={this.state.kodeFasilitas}
                                                loading={this.state.fetchingKodeFasilitas}
                                                clickHandler={this.handleQc2}
                                                pointer={'kodeFasilitas'} pointer2={'namaFasilitas'}
                                                isFetching={this.fetching}
                                                data={this.getkodeFasilitas}/>
                                        </Col>
                                    </Row><br/>
                                    <Row gutter={10}>
                                        <Col span={8}><label>Kode Ijin : </label></Col>
                                        <Col span={14}>
                                            <QuicSearch
                                                ref={this.quicksearch3}
                                                def={this.state.kodeIjin}
                                                clickHandler={this.handleQc3}
                                                loading={this.state.fetchingKodeIjin}
                                                pointer={'kodeIjin'} pointer2={'namaIjin'} isFetching={this.fetching}
                                                data={this.getkodeIjin}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row gutter={10}>
                                        <Col span={8}><label>NO Dokumen : </label></Col>
                                        <Col span={14}>
                                            <Input value={this.state.noDokumen}
                                                   onChange={(e) => this.setState({noDokumen: e.target.value})}/>
                                        </Col>
                                    </Row><br/>
                                    <Row gutter={10}>
                                        <Col span={8}><label>Seri Barang : </label></Col>
                                        <Col span={14}>
                                            <InputNumber value={this.state.seriBarang}
                                                         onChange={(e) => this.setState({seriBarang: e})}></InputNumber>
                                        </Col>
                                    </Row><br/>
                                    <Row gutter={10}>
                                        <Col span={8}><label>Tanggal Dokumen : </label></Col>
                                        <Col span={14}>
                                            <DatePicker
                                                disabledDate={this.disabledDate}
                                                value={this.state.tanggalDokumen ? moment(this.state.tanggalDokumen, 'YYYY-MM-DD') : null}
                                                onChange={this.onDateChange}></DatePicker>
                                        </Col>
                                    </Row><br/>
                                    <Row gutter={10}>
                                        <Col span={8}><label>File Lampiran</label></Col>
                                        <Col span={14}>
                                            <Button onClick={() => document.getElementById('ktpUpload').click()}><Icon
                                                type="upload"/> {this.state.lampiranName ? this.state.lampiranName : ' Upload file lampiran'}
                                            </Button><br/>
                                            {this.state.urlDokumen ?
                                                <small>Anda sudah mengupload file sebelumnya lewatkan field upload jika
                                                    tidak ada perubahan</small> : null}
                                            <Input style={{display: 'none'}} id='ktpUpload' type="file" name="ktpUpload"
                                                   onChange={this.onUpload}/>
                                        </Col>
                                    </Row><br/>
                                </Col>
                            </Row>
                        </Modal>
                        <Row gutter={10}>
                            <Col>
                            <Button style={{display: 'inline-block', textAlign: 'right'}} type="primary"
                                    onClick={() => this.setState({visible: true})}><i className="fas fa-plus"></i>&nbsp; Tambah</Button>
                            </Col>
                        </Row>
                        <DevExpressCustom data={dataSource} isEdit={false} isAdd={false} isDelete={false}
                                          button={this.buttonData}>
                            {/*data di bawah sini children value yang merepretasikan data header*/}
                            <Column dataField={'docName'} caption={'Kode Dokumen'}/>
                            <Column dataField={'namaDokumen'} caption={'Nama Dokumen'}/>
                            <Column dataField={'nomorDokumen'} caption={'Nomor Dokumen'}/>
                            <Column dataField={'docFas'} caption={'Fasilitas'}/>
                            <Column dataField={'kodeIjin'} caption={'Kode Ijin'}/>
                            <Column dataField={'seriBarang'} caption={'Seri Barang'}/>
                            <Column dataField={'tanggalDokumen'} caption={'Tanggal Dokumen'} dataType={'date'}/>
                        </DevExpressCustom>
                    </div>
                </Async.Resolved>
                <Async.Rejected>{error => `Something went wrong: ${error.message}`}</Async.Rejected>
            </Async>
        );
    }
}

export default DataDokumen;
