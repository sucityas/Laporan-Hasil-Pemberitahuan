import React, { Component } from 'react';
import { Table, Popconfirm } from 'antd';
// import DevExpressCustom from "../../pages/singlecore/rekam_detail_dokumen_pib/DevExpressCustom";

const columns = [
    {
        title: 'Nama Ahli Kepabeanan',
        dataIndex: 'nama',
        key: 'nama',
    },
    {
        title: 'Jabatan',
        dataIndex: 'uraianJabatan',
        key: 'uraianJabatan',
    },
    {
        title: 'No. Seri Sertifikat',
        dataIndex: 'noSeri',
        key: 'noSeri',
    },
    {
        title: 'Nomor Sertifikat',
        dataIndex: 'nomorSertifikat',
        key: 'nomorSertifikat',
    },
    {
        title: 'Tanggal Sertifikat',
        dataIndex: 'tanggalSertifikat',
        key: 'tanggalSertifikat',
    },
    {
        title: 'Aksi',
        key: 'action',

    },
];

class DataTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            items : []
        };
    }

  deleteItem = id => {
    let confirmDelete = window.confirm('Anda yakin delete data ini?');
    if(confirmDelete){
      this.props.deleteItemFromState(id)
    }
  };

  dataButton(){
      console.log('click');
  }

  render() {
    return (
        <Table dataSource={this.props.items} columns={columns}/>
    )
  }
}

export default DataTable
