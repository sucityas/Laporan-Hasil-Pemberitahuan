import React from 'react';
import DevExpressCustom from "../DevExpressCustom/DevExpressCustom";
import {Column} from "devextreme-react/data-grid";
import {apiUrl, apiUrl2, apiUrl4} from '../../../apis/ApiData';
import {Button, Col, Input, Modal, Row, DatePicker, Alert} from "antd";
import QuickSearch from "../CustomQuickSearch/QuickSearch";
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import Notification from "../../Notification";

const LC = localStorage
const dataDummy = []

const dataStore = new ArrayStore({
    key: 'idKontainer',
    data: dataDummy
});

const {confirm} = Modal
const dataSource = new DataSource({
    store: dataStore,
    reshapeOnPush: true
});

class DataKontainer extends React.Component {
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
        }
        this.getKodeTipeKontainer = this.getKodeTipeKontainer.bind(this)
        this.handleQc = this.handleQc.bind(this)
        this.getKodeUkuran = this.getKodeUkuran.bind(this)
        this.handleQc2 = this.handleQc2.bind(this)
        this.getKodeJenisKontainer = this.getKodeJenisKontainer.bind(this)
        this.handleQc3 = this.handleQc3.bind(this)
        this.onUpload = this.onUpload.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.getDataTable = this.getDataTable.bind(this)
        this.editForm = this.editForm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.setDataHeader = this.setDataHeader.bind(this);
        this.formatNumber = this.formatNumber.bind(this)
        this.validateContainerNumber = this.validateContainerNumber.bind(this)
        if (LC.getItem('idHeader')) {
            this.getDataTable();
        }

        this.tipeKontainerKey = React.createRef();
        this.ukuranKontainerKey = React.createRef();
        this.jenisKontainerKey = React.createRef();
    }

    buttonData =
        [, {
            hint: 'Edit',
            icon: 'edit',
            visible: true,
            onClick: (e) => this.editForm(e)
        }, {
            hint: 'Delete',
            icon: 'remove',
            visible: true,
            onClick: (e) => this.deleteTable(e.row.data.idKontainer)
        }];


    setDataHeader(val) {
        this.setState({idHeader: val})
    }

    editForm(e) {
        let data = e.row.data;
        this.setState({
            visible: true,
            edit: true,
            idKontainer: data.idKontainer,
            kodeJenisKontainer: data.kodeJenisKontainer,
            kodeTipeKontainer: data.kodeTipeKontainer,
            kodeUkuranKontainer: data.kodeUkuranKontainer,
            nomorKontainer: `${data.nomorKontainer.slice(0, 4)}-${data.nomorKontainer.slice(4, 11)}`,
            namaUkuranKontainer: data.namaUkuranKontainer,
            namaTipeKontainer: data.namaTipeKontainer,
            namJenisKontainer: data.namJenisKontainer
        })
        this.jenisKontainerKey.current.renewKeyword(`${data.namJenisKontainer} - ${data.kodeJenisKontainer}`)
        this.tipeKontainerKey.current.renewKeyword(`${data.namaTipeKontainer} - ${data.kodeTipeKontainer}`)
        this.ukuranKontainerKey.current.renewKeyword(`${data.namaUkuranKontainer} - ${data.kodeUkuranKontainer}`)
    }

    addTableData(item) {
        item.formatNoKontainer = `${item.nomorKontainer.slice(0, 4)}-${item.nomorKontainer.slice(4, 11)}`
        dataStore.push([{type: 'insert', key: item["idKontainer"], data: item}])
    }

    editTableData(item) {
        item.formatNoKontainer = `${item.nomorKontainer.slice(0, 4)}-${item.nomorKontainer.slice(4, 11)}`
        dataStore.push([{type: 'update', key: item["idKontainer"], data: item}])
    }

    async getDataTable() {
        let val = LC.getItem('idHeader')
        await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKontainer/kontainer/${val}`, {
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
    }

    async handleOk() {
        this.setState({sendingDataKontainer: true})
        let body = JSON.stringify({
            "idHeader": this.state.idHeader,
            "kodeJenisKontainer": this.state.kodeJenisKontainer,
            "kodeTipeKontainer": this.state.kodeTipeKontainer,
            "kodeUkuranKontainer": this.state.kodeUkuranKontainer,
            "nomorKontainer": this.state.nomorKontainer.replace(/-|\s/g, ''),
            "idKontainer": this.state.idKontainer
        });

        console.log(body)

        let res = await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKontainer${this.state.edit ? '/update/' + this.state.idKontainer : ''}`, {
            method: this.state.edit ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body
        })
            .then(response => response.json())
            .then(res => this.state.edit ? this.editTableData(res.item) : this.addTableData(res.data))
        // this.setState({})
        this.setState({
            sendingDataKontainer: false,
            visible: false,
            kodeJenisKontainer: '',
            kodeTipeKontainer: '',
            kodeUkuranKontainer: '',
            nomorKontainer: '',
            namaUkuranKontainer: '',
            namaTipeKontainer: '',
            namJenisKontainer: '',
            edit: false
        })
        this.jenisKontainerKey.current.renewKeyword('')
        this.tipeKontainerKey.current.renewKeyword('')
        this.ukuranKontainerKey.current.renewKeyword('')
    };

    validateContainerNumber() {
        const containerValidator = require('container-validator')
        let validator = new containerValidator()
        console.log(this.state.nomorKontainer.replace(/-|\s/g, ''));
        let isValidate = validator.isValid(this.state.nomorKontainer.replace(/-|\s/g, ''));
        this.setState({
            isContainerNumberValid: isValidate
        })
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false,
            kodeJenisKontainer: '',
            kodeTipeKontainer: '',
            kodeUkuranKontainer: '',
            nomorKontainer: '',
            namaUkuranKontainer: '',
            namaTipeKontainer: '',
            namJenisKontainer: '',
            edit: false
        })

        this.jenisKontainerKey.current.renewKeyword('')
        this.tipeKontainerKey.current.renewKeyword('')
        this.ukuranKontainerKey.current.renewKeyword('')
    }


    async getKodeTipeKontainer(e) {
        this.setState({fetchingTipeKontainer: true})
        let pelData = await fetch(`${apiUrl}/v1/tipe-kontainer/getByparams/${e.toUpperCase()}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingTipeKontainer: false})
        return pelData
    }

    async getKodeUkuran(e) {
        this.setState({fetchingUkuranKontainer: true})
        console.log(e);
        let pelData = await fetch(`${apiUrl}/v1/ukuran-kontainer/getByparams/${e.toUpperCase()}`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingUkuranKontainer: false})
        return pelData
    }

    async getKodeJenisKontainer(e) {
        this.setState({fetchingJenisKontainer: true})
        let pelData = await fetch(`${apiUrl}/v1/jenis-kontainer/`, {
            header: {'accept': 'application/json'},
            'Access-Control-Allow-Origin': '*'
        })
            .then(response => response.json())
            .then(body => body.data);
        this.setState({fetchingJenisKontainer: false})
        return pelData
    }

    handleQc(e) {
        this.setState({
            kodeTipeKontainer: e.kodeTipeKontainer,
        })
    }

    handleQc2(e) {
        this.setState({
            kodeUkuranKontainer: e.kodeUkuranKontainer,
        })
    }

    handleQc3(e) {
        this.setState({
            kodeJenisKontainer: e.kodeJenisKontainer,
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
                await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtKontainer/delete/${id}`, {
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

    async formatNumber(e) {
        let number = e.target.value;

        if (number && number.length == 4) {
            number += '-'
        } else if (number && number.length < 4) {
            let pos1 = ''
            number.split('').map(e => !parseInt(e) ? pos1 += e.toUpperCase() : null)

            number = pos1
        }

        if (number && (number.length > 5) && (number.length <= 12)) {
            let sentence = number.split('-')
            number = `${sentence[0].toUpperCase()}-`
            sentence[1].split('').map(e => parseInt(e) || e == 0 ? number += e : null)
        }
        await this.setState({
            nomorKontainer: number
        })

        if(this.state.nomorKontainer &&  this.state.nomorKontainer.length > 4){
            this.validateContainerNumber()
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title="Tambah Data Kontainer"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.sendingDataKontainer}
                    width={750}
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Row gutter={10}>
                                <Col span={8}><label>Tipe Kontainer :</label></Col>
                                <Col span={14}>
                                    <QuickSearch
                                        ref={this.tipeKontainerKey}
                                        loading={this.state.fetchingTipeKontainer}
                                        clickHandler={this.handleQc}
                                        def={this.state.edit ? this.state.namaTipeKontainer : false }
                                        pointer={'kodeTipeKontainer'} pointer2={'namaTipeKontainer'}
                                        isFetching={this.fetching}
                                        data={this.getKodeTipeKontainer}/>
                                </Col>
                            </Row><br/>
                            <Row gutter={10}>
                                <Col span={8}><label>Ukuran Kontainer : </label></Col>
                                <Col span={14}>
                                    <QuickSearch
                                        ref={this.ukuranKontainerKey}
                                        def={this.state.edit ? this.state.namaUkuranKontainer : false }
                                        loading={this.state.fetchingUkuranKontainer}
                                        clickHandler={this.handleQc2}
                                        pointer={'kodeUkuranKontainer'} pointer2={'namaUkuranKontainer'}
                                        isFetching={this.fetching}
                                        data={this.getKodeUkuran}/>
                                </Col>
                            </Row><br/>
                            <Row gutter={10}>
                                <Col span={8}><label>Jenis Kontainer : </label></Col>
                                <Col span={14}>
                                    <QuickSearch
                                        loading={this.state.fetchingJenisKontainer}
                                        ref={this.jenisKontainerKey}
                                        def={this.state.edit ? this.state.namJenisKontainer: false }
                                        clickHandler={this.handleQc3}
                                        pointer={'kodeJenisKontainer'} pointer2={'namaJenisKontainer'}
                                        isFetching={this.fetching}
                                        data={this.getKodeJenisKontainer}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row gutter={10}>
                                <Col span={8}><label>NO Kontainer : </label></Col>
                                <Col span={14}>
                                    <Row>
                                        <Input maxLength={12} allowClear
                                               value={this.state.nomorKontainer}
                                               onChange={this.formatNumber}/>
                                    </Row>
                                    <Row>
                                        {this.state.nomorKontainer && !this.state.isContainerNumberValid ? <Alert message="Nomor kontainer anda tidak valid"
                                                                                    type="error"/> : null}
                                    </Row>
                                </Col>
                            </Row><br/>
                            {
                                this.props.dokumenBc30 && (
                                    <>
                                        <Row gutter={10}>
                                            <Col span={8}><label>Part Of : </label></Col>
                                            <Col span={14}>
                                                <Input></Input>
                                            </Col>
                                        </Row><br/>
                                    </>
                                )
                            }
                        </Col>
                    </Row>
                </Modal>
                <Row gutter={10}>
                    <Col>
                    <Button style={{display: 'inline-block', textAlign: 'right'}} type="primary"
                            onClick={() => this.setState({visible: true, edit: false})}><i className="fas fa-plus"></i>&nbsp; Tambah Kontainer</Button>
                    </Col>
                </Row>
                <DevExpressCustom data={dataSource} isEdit={false} isAdd={false} isDelete={false}
                                  button={this.buttonData}>
                    {/*data di bawah sini children value yang merepretasikan data header*/}
                    <Column dataField={'formatNoKontainer'} caption={'No Kontainer'}/>
                    <Column dataField={'namaUkuranKontainer'} caption={'Ukuran Kontainer'}/>
                    <Column dataField={'namaTipeKontainer'} caption={'Tipe Kontainer'}/>
                    <Column dataField={'namJenisKontainer'} caption={'Jenis Kontainer'}/>
                </DevExpressCustom>
            </div>
        );
    }
}

export default DataKontainer;
