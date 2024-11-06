import React, { Component } from 'react';
import { Col, Row, Input, Checkbox } from 'antd'
import BlokirList from './BlokirList'
import DokumenReview from './DokumenReview'
import DataPemohon from "./DataPemohon";
class DetailPemohonan extends Component {
    constructor() {
        super();
        this.state={
            dataPemohon : '',
            isUpdate : 0
        }
    }
    dataTable = (dataTable) =>{
        this.props.dataTable(dataTable)
        this.setState({
            dataPemohon : dataTable[0],
        })
    }
    dataPemohon = (dataPemohon) =>{
        this.setState({
            dataPemohon : dataPemohon
        })
    }
    lampiranData = (lampiranData) =>{
        this.props.lampiranData(lampiranData)
        this.setState({
            lampiranData : lampiranData,
            isUpdate : this.state.isUpdate + 1
        })
    }
    render() {
        const data = this.props.data || []
        const role = this.props.role
        const {dataPemohon,lampiranData,isUpdate} = this.state
        return (
            <div>
                <b>Detail Blokir</b>
                <BlokirList
                    data={data}
                    role={role}
                    dataTable={this.dataTable.bind(this)}
                    dataPemohon={this.dataPemohon.bind(this)}
                    lampiranData={this.lampiranData.bind(this)}
                />
                <br/>
                <DataPemohon
                    data={data}
                    dataPemohon={dataPemohon}
                    lampiranData={lampiranData}
                    isUpdate={isUpdate}
                />
            </div>
        );
    }
}

export default DetailPemohonan;
