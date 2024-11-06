import React from 'react'
import Async from 'react-async'
import {
  AutoComplete,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Result,
  Select,
  InputNumber,
} from 'antd'
import { Column } from 'devextreme-react/data-grid'
import DevExpressCustom from '../../../pages/singlecore/rekam_detail_dokumen_pib/DevExpressCustom';
// import '../index.css'
import { apiUrl, apiUrl2, apiUrl4 } from '../../../apis/ApiData'
// import QuickSearch from '../../KomponenDokumen/CustomQuickSearch/QuickSearch'
import ArrayStore from 'devextreme/data/array_store'
import DataSource from 'devextreme/data/data_source'
import LoadingContent from '../../LoadingContent'
import Notification from '../../Notification'

import axios from 'axios'
import NPWP15 from './NPWP15';

const dataDummy = []

const dataStore = new ArrayStore({
  key: 'idPemilik',
  data: dataDummy,
})

const dataSource = new DataSource({
  store: dataStore,
  reshapeOnPush: true,
})

//SELECT
const { TextArea } = Input
const { Option, OptGroup } = AutoComplete
const LC = localStorage
const { confirm } = Modal

class DataIdentitas extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idHeader: '',
      dataExisting: false,
      kodeJenisIdentitas: 5,
      namaJenisIdentitas: '',
      kodeNegara: '',
      namaNegara: '',
    }

    this.pipHandle = this.pipHandle.bind(this)
    // this.sendDataIdentitas = this.sendDataIdentitas.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.pemilikIDHandler = this.pemilikIDHandler.bind(this)
    this.editForm = this.editForm.bind(this)
    this.getDataPemilik = this.getDataPemilik.bind(this)
    this.getJenis = this.getJenis.bind(this)

    this.dataButon = [
      {
        hint: 'Edit',
        icon: 'edit',
        visible: true,
        onClick: this.editForm,
      },
      {
        hint: 'Delete',
        icon: 'remove',
        visible: true,
        onClick: e => this.deleteTable(e.row.data.idPemilik),
      },
    ]
  }

  componentDidMount() {
    this.getDataPemilik()
    this.getJenis();
  }

  editForm(e) {
    let data = e.row.data
    this.setState({
      visible: true,
      kodeJenisIdentitas: data.kodeIdentitasPemilik,
      namaJenisIdentitas: data.namaJenisIdentitas,
      alamatPemilik: data.alamatPemilik,
      namaPemilik: data.namaPemilik,
      noIdetitas: data.identitasPemilik,
      idPemilik: data.idPemilik,
      edit: true,
    })
  }

  addTableData(item) {
    dataStore.push([{ type: 'insert', key: item['idPemilik'], data: item }])
  }

  editTableData(item) {
    dataStore.push([{ type: 'update', key: item['idPemilik'], data: item }])
  }

  async deleteTable(id) {
    let that = this
    confirm({
      title: 'Apakah anda yakin menghapus data ini ?',
      okText: 'Iya',
      okType: 'danger',
      cancelText: 'Tidak',
      async onOk() {
        await fetch(`${apiUrl4}/SingleCoreSchema/v1/TtPemilik/delete/${id}`, {
          header: {
            accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(async body => {
            dataStore.clear()
            dataSource.reload()
            that.getDataPemilik()
            Notification('success', 'Data Berhasil Di Hapus')
          })
          .catch(e => Notification('failed', e))
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  pipHandle(value) {
    this.setState({ pipData: value })
  }

  pemilikIDHandler(e) {
    this.setState({
      kodeJenisIdentitas: e.kodeJenisIdentitas,
      namaJenisIdentitas: e.namaJenisIdentitas,
    })
  }

  async handleOk() {
    this.setState({ sendingDataPemilik: true })
    let body = JSON.stringify({
      alamatPemilik: this.state.alamatPemilik,
      idHeader: this.state.idHeader,
      identitasPemilik: this.state.noIdetitas,
      kodeIdentitasPemilik: this.state.kodeJenisIdentitas,
      namaPemilik: this.state.namaPemilik,
    })

    await fetch(
      `${apiUrl4}/SingleCoreSchema/v1/TtPemilik/${
        this.state.edit ? 'update/' + this.state.idPemilik : ''
      }`,
      {
        method: this.state.edit ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      }
    )
      .then(response =>
        response.status === 200 || response.status === 201
          ? response.json()
          : null
      )
      .then(res =>
        this.state.edit
          ? this.editTableData(res.item)
          : this.addTableData(res.data)
      )
      .catch(e => Notification('failed', 'Terjadi kesalahan silakan coba lagi'))

    this.setState({ sendingDataPemilik: false })
    this.setState({
      visible: false,
      kodeJenisIdentitas: '',
      namaJenisIdentitas: '',
      alamatPemilik: '',
      namaPemilik: '', // this.setState({
      identitasPemilik: '',
      idPemilik: '',
      noIdetitas: '',
      edit: false
    })
  }

  handleCancel() {
    this.setState({
      visible: false,
      kodeJenisIdentitas: '',
      namaJenisIdentitas: '',
      alamatPemilik: '',
      namaPemilik: '',
      identitasPemilik: '',
      idPemilik: '',
      noIdetitas: '',
      edit: false,
    })
  }

  async getJenis() {
    let pelData = await fetch(`${apiUrl}/v1/jenis-identitas/all`, {
      mode: 'cors',
      header: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(body => {
        return body.data
      })
    let option = pelData.map(e => (
      <Option value={parseInt(e.kodeJenisIdentitas)} key={e.kodeJenisIdentitas}>
        {e.namaJenisIdentitas}
      </Option>
    ))

    this.setState({ listJenisIdentitas: option })
  }

  async getDataPemilik() {
    let idHeader = LC.getItem('idHeader')
    console.log('masuk getDataIdentitas')
    if (idHeader) {
      try {
        console.log('fetching pemilik')
        const dataPemilik = await axios.get(
          `${apiUrl4}/SingleCoreSchema/v1/TtPemilik/pemilik/${idHeader}`
        )
        console.log(dataPemilik)
        if (dataPemilik.data.data.length > 0) {
          dataPemilik.data.data.map(item => this.addTableData(item))
        }
      } catch (error) {
        console.log(error)
      }
    }
    this.setState({ idHeader: idHeader })
  }

  render() {
    const { Search } = Input
    return (
      <Async promiseFn={this.getDataPemilik}>
        <Async.Loading>
          <LoadingContent />
        </Async.Loading>
        <Async.Resolved>
          <div className="row">
            <Modal
              title={!this.state.edit ? "Tambah Data Pemilik" : "Edit Data Pemilik" }
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={750}
              confirmLoading={this.state.sendingDataPemilik}
            >
              <Row gutter={10}>
                <Col span={12}>
                  <Row gutter={10}>
                    <Col span={8}>
                      <label>Jenis Identitas : </label>
                    </Col>
                    <Col span={11}>
                      <Select
                        style={{width: '100%'}}
                        onChange={e =>
                          this.setState({
                            kodeJenisIdentitas: e,
                          })
                        }
                        value={this.state.kodeJenisIdentitas}
                      >
                        {this.state.listJenisIdentitas}
                      </Select>
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={10}>
                    <Col span={8}>
                      <label>Nama : </label>
                    </Col>
                    <Col span={14}>
                      <Input
                        value={this.state.namaPemilik}
                        onChange={e =>
                          this.setState({
                            namaPemilik: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row gutter={10}>
                    <Col span={8}>
                      <label>No Identitas : </label>
                    </Col>
                    <Col span={14}>
                    {this.state.kodeJenisIdentitas === 5 ? <NPWP15 value={this.state.noIdetitas}  onChange={(e) => this.setState({noIdetitas: e.target.value.replace(/\./gi, "").replace("-","")})} /> : (
                                            <Input value={this.state.noIdetitas}
                                                   onChange={(e) => this.setState({noIdetitas: e.target.value.toUpperCase()})}/>
                                        )}
                    </Col>
                  </Row>
                  <br />
                  <Row gutter={10}>
                    <Col span={8}>
                      <label>Alamat : </label>
                    </Col>
                    <Col span={14}>
                      <Input.TextArea
                        value={this.state.alamatPemilik}
                        onChange={e =>
                          this.setState({
                            alamatPemilik: e.target.value.toUpperCase(),
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>
            <div className="col-12">
              <h5>Pemilik Barang </h5>
              <br />
              {dataSource._store._array.length >= 1 ? null : (
                <Button
                  style={{ display: 'inline-bloc', textAlign: 'right' }}
                  type="primary"
                  onClick={() => this.setState({ visible: true, edit: false })}
                >
                  <i className="fas fa-plus"></i>&nbsp; Tambah
                </Button>
              )}
              {/*rows value berisi data row*/}
              {/*isEdit,isAdd,isDelete value berisii boleean data editing */}
              {/*button adalah callback untuk button value*/}
              <DevExpressCustom
                data={dataSource}
                isEdit={false}
                isAdd={false}
                isDelete={false}
                button={this.dataButon}
              >
                {/*data di bawah sini children value yang merepretasikan data header*/}
                <Column
                  dataField={'namaJenisIdentitas'}
                  caption={'Nama Jenis Identitas'}
                />
                <Column dataField={'alamatPemilik'} caption={'Alamat'} />
                <Column dataField={'namaPemilik'} caption={'Nama'} />
                <Column
                  dataField={'identitasPemilik'}
                  caption={'Identitas Pemilik'}
                />
              </DevExpressCustom>
            </div>
          </div>
        </Async.Resolved>
        <Async.Rejected>
          {' '}
          <Result
            status="500"
            title="500"
            subTitle="Terjadi Kesalahan Pada Server Silakan Reload Halaman Atau Kembali Nanti"
          />
        </Async.Rejected>
      </Async>
    )
  }
}

export default DataIdentitas
