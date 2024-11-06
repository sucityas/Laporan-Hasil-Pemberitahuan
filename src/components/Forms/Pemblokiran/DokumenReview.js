import { Button, Modal, Table, Typography, Skeleton } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';

const { Text } = Typography;

const {
    REACT_APP_HDFS,
    REACT_APP_SECRET_KEY_HDFS,
} = process.env


class DokumenReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data ? this.props.data : []
        }

        console.log(this.state.data, 'data dokumen review')
    }

    componentDidMount() {
        const { data } = this.props.data;
        console.log(data, 'data dokumen')
    }

    error() {
        Modal.error({
            title: 'Gagal membuka file',
            content: 'Kemungkinan Jaringan tidak stabil atau ada kesalahan teknis',
        });
    }

    getPreviewFile = e => {
        const url = e;
        axios(`${REACT_APP_HDFS}/v1/hdfs/download?path=${url}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'beacukai-api-key': `${REACT_APP_SECRET_KEY_HDFS}`,
            },
            // 'Access-Control-Allow-Origin': '*',
            responseType: 'blob', //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob([response.data], { type: 'application/pdf' })
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file)
                //Open the URL on new Window
                window.open(fileURL)
            })
            .catch(error => {
                this.error()
            })
    }

    render() {
        const lampiranData = this.props.data == undefined ? [] : this.props.data
        const columns = [
            {
                title: 'Jenis Lampiran',
                dataIndex: 'jenisDokumen',
                key: '1',
                width: 100,
                align: "center"
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                key: '2',
                width: 100,
                align: "center"
            },
            {
                title: 'Nama Lampiran',
                dataIndex: 'urlFile',
                key: '5',
                width: 150,
                align: "center",
                render: (e) => {
                    return (
                        <>

                            <Text ellipsis={true} style={{ width: 140 }}>
                                {/*{e.substring(40)}*/}
                                {e}
                            </Text>
                        </>
                    )
                }
            },
            {
                title: 'Action',
                dataIndex: 'urlFile',
                key: '6',
                width: 100,
                render: (e) => {
                    return (
                        <>
                            <Button
                                type="link"
                                onClick={() => this.getPreviewFile(e)}
                            >
                                View
                            </Button>
                        </>
                    )
                }
            }
        ];

        const data = this.props.data || [];

        const { loading } = this.props

        return (
            <div>
                {
                    loading ?
                        <Skeleton active paragraph={{ rows: 8 }} />
                        :
                        <Table columns={columns} dataSource={lampiranData} scroll={{ x: 1500, y: 300 }} />
                }
            </div>
        );
    }
}

export default DokumenReview;
