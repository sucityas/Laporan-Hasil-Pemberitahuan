import React, {Component} from "react";
import axios from 'axios'
import {Checkbox, Col, Input, Row} from "antd";
import DokumenReview from "./DokumenReview";


class DataPemohon extends Component{
    constructor() {
        super();
        this.state={
            lampiranData : [],
        }
    }

    componentDidMount() {
        this.setState({
            lampiranData : this.props.lampiranData
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.isUpdate !== this.props.isUpdate){
            this.setState({
                lampiranData : this.props.lampiranData
            })
        }
    }

    render() {
        const dataPemohon = this.props.dataPemohon == undefined ? [] : this.props.dataPemohon
        const {lampiranData} = this.state
        return(
            <div>
                <b>
                    Data Pemohonan
                </b>
                <hr/>
                <Row>
                    <Col span={4}>
                        Nama Pemohon
                    </Col>
                    <Col span={16}>
                        <Input
                            value={dataPemohon.namaPemohon}
                            disabled={true}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={4}>
                        Jabatan Pemohon
                    </Col>
                    <Col span={16}>
                        <Input
                            value={dataPemohon.jabatanPemohon}
                            disabled={true}
                        />
                    </Col>
                </Row>
                <br/>
                <DokumenReview
                    data={lampiranData}
                />
                <br/>
                <Row gutter={10}>
                    <Col span={4}>
                        Peryataan Elektronik
                    </Col>
                    <Col span={20}>
                        <Checkbox
                            checked={true}
                            disabled={true}
                        >
                            Dengan ini saya menyatakan bahwa seluruh informasi dan dokumen yang dilampirkan adalah benar dan dapat dipertanggungjawabkan
                        </Checkbox>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default DataPemohon