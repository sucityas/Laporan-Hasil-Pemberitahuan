import React from 'react';
import 'whatwg-fetch';
import MaterialTable from 'material-table';
import DevExpressCustom from '../DevExpressCustom/DevExpressCustom';
import {Column} from 'devextreme-react/data-grid';
import {apiUrl, apiUrl2, apiUrl4} from '../../../apis/ApiData';
import {Button, Col, Input, Modal, Row, DatePicker, Icon, InputNumber} from 'antd';
import QuickSearch from '../CustomQuickSearch/QuickSearch';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import moment from 'moment';
import Notification from "../../Notification";

// const idHeader = window.localStorage.getItem('idHeader')
const dataDummy = []
const LC = localStorage

const dataStore = new ArrayStore({
    key: 'idKemasan',
    data: dataDummy
});

const {confirm} = Modal

const dataSource = new DataSource({
    store: dataStore,
    reshapeOnPush: true
});


class DataKemasan extends React.Component {
    idHeader = localStorage.getItem('idHeader');
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
            jumlahKemasan: 0,
            dataDetail: [],
            detailShow: false,
            idHeader: ''
        }
        this.idHeader = localStorage.getItem('idHeader');
        this.getKodeJenis = this.getKodeJenis.bind(this)
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
        this.setDataHeader = this.setDataHeader.bind(this)
        if (this.idHeader) {
            this.getDataTable();
        }


        this.kodeJenisKey = React.createRef();
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
            onClick: (e) => this.deleteTable(e.row.data.idKemasan)
        }];


    setDataHeader(val) {
        this.setState({idHeader: val})
    }

    editForm(e) {
        
        let val = LC.getItem('idHeader')
        let data = e.row.data;
        console.log(data);
        this.setState({
            visible: true,
            idHeader: val,
            idKemasan: data.idKemasan,
            kodeJenisKemasan: data.kodeJenisKemasan,
            namaJenisKemasan: data.namaKemasan,
            jumlahKemasan: data.jumlahKemasan,
            merkKemasan: data.merkKemasan,
            edit: true
        })
        this.kodeJenisKey.current.renewKeyword(`${this.state.namaJenisKemasan} - ${this.state.namaJenisKemasan}`)
    }

    addTableData(item) {
        dataStore.push([{type: 'insert', key: item["idKemasan"], data: item}])

    }

    editTableData(item) {
        dataStore.push([{type: 'update', key: item["idKemasan"], data: item}])
    }

    async getDataTable() {
        let val = LC.getItem('idHeader')
        await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKemasan/kemasan/${val}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then(response => response.json())
            .then(res => {
                if (res.status == "OK") {
                    res.data.map(item => this.addTableData(item))
                }
            })
            .catch(e => console.log(e))
        await this.setState({idHeader: val})
        console.log(this.state.idHeader, val);
    }

    async handleOk() {
        
        let val = LC.getItem('idHeader')
        this.setState({sendingDataKemasan: true})
        let body = JSON.stringify({
            idHeader: val,
            kodeJenisKemasan: this.state.kodeKemasan,
            jumlahKemasan: this.state.jumlahKemasan,
            merkKemasan: this.state.merkKemasan
        })


        let that = this;
        let res = await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKemasan${that.state.edit ? '/update/' + that.state.idKemasan : ''}`, {
            method: that.state.edit ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        })
            .then(response => response.json())
            .then(res => that.state.edit ? that.editTableData(res.item) : that.addTableData(res.data))

        this.setState({sendingDataKemasan: false})

        this.setState({
            visible: false,
            namaKemasan: '',
            jumlahKemasan: 0,
            merkKemasan: '',
        });
        this.kodeJenisKey.current.renewKeyword('')
    };

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
            namaKemasan: '',
            jumlahKemasan: 0,
            merkKemasan: '',
            edit: false
        })

        this.kodeJenisKey.current.renewKeyword('')
    }


    async getKodeJenis(e) {
        this.setState({fetching: true})
        let pelData = await fetch(`${apiUrl}/v1/kemasan/by_Id/${e}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        return pelData
    }

    async getkodeFasilitas(e) {
        this.setState({fetching: true})
        console.log(e);
        let pelData = await fetch(`${apiUrl}/v1/fasilitas/by_Id/${e}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        return pelData
    }

    async getkodeIjin(e) {
        this.setState({fetching: true})
        let pelData = await fetch(`${apiUrl}/v1/ukuran-kontainer/getByparams/${e}`, {
            header: {'accept': 'application/json', 'Access-Control-Allow-Origin': '*'},
        })
            .then(response => response.json())
            .then(body => body.data);
        return pelData
    }

    handleQc(e) {
        this.setState({
            kodeKemasan: e.kodeKemasan,
            namaKemasan: e.namaKemasan
        })
    }

    handleQc2(e) {
        this.setState({
            kodeUkuranKontainer: e.kodeUkuranKontainer,
        })
    }

    handleQc3(e) {
        this.setState({
            kodeIjin: e.kodeIjin,
        })
    }


    onUpload(e) {
        if (e.target.files[0].size < 20000000) {
            let name = e.target.files[0].name;
            let file = e.target.files[0];
            let reader = new FileReader();
            let that = this

            reader.onloadend = () => that.setState({
                lampiranName: name,
                lampiranBase65: reader.result
            })

            reader.readAsDataURL(file);
        } else {
            alert('Data terlalu besar')
        }
    }

    onDateChange(date, dateString) {
        this.setState({
            tanggalDokumen: dateString,

        })
    }

    async deleteTable(id) {
        let that = this
        confirm({
            title: 'Apakah anda yakin menghapus data ini ?',
            okText: 'Iya',
            okType: 'danger',
            cancelText: 'Tidak',
            async onOk() {
                await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKemasan/delete/${id}`, {
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

    render() {
        return (
            <div>
                <Modal
                    title="Tambah Data Kemasan"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.sendingDataKemasan}
                    onCancel={this.handleCancel}
                    width={750}
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Row gutter={10}>
                                <Col span={8}><label>Kode Jenis : </label></Col>
                                <Col span={14}>
                                    <QuickSearch
                                        ref={this.kodeJenisKey}
                                        clickHandler={this.handleQc}
                                        def={this.state.kodeJenisKemasan}
                                        pointer={'kodeKemasan'} pointer2={'namaKemasan'}
                                        isFetching={this.fetching}
                                        data={this.getKodeJenis}/>
                                </Col>
                            </Row><br/>
                            <Row gutter={10}>
                                <Col span={8}><label>Jumlah Kemasan : </label></Col>
                                <Col span={14}>
                                    <InputNumber value={this.state.jumlahKemasan}
                                           onChange={(e) => this.setState({jumlahKemasan: e})}/>
                                </Col>
                            </Row><br/>
                            <Row gutter={10}>
                                <Col span={8}><label>Merk Kemasan : </label></Col>
                                <Col span={14}>
                                    <Input value={this.state.merkKemasan}
                                           onChange={(e) => this.setState({merkKemasan: e.target.value.toUpperCase()})}></Input>
                                </Col>
                            </Row><br/>
                        </Col>
                        <Col span={12}>

                        </Col>
                    </Row>
                </Modal>
                <Row gutter={10}>
                    <Col>
                    <Button style={{display: 'inline-block', textAlign: 'right'}} type="primary"
                            onClick={() => this.setState({visible: true})}><i className="fas fa-plus"></i>&nbsp; Tambah Kemasan</Button>
                    </Col>
                </Row>
                <DevExpressCustom data={dataSource} isEdit={false} isAdd={false} isDelete={false}
                                  button={this.buttonData}>
                    {/*data di bawah sini children value yang merepretasikan data header*/}
                    <Column dataField={'namaKemasan'} caption={'Jenis Kemasan'}/>
                    <Column dataField={'jumlahKemasan'} caption={'Jumal Kemasan'}/>
                    <Column dataField={'merkKemasan'} caption={'Nama Kemasan'}/>
                </DevExpressCustom>
            </div>
        );
    }
}

export default DataKemasan;
