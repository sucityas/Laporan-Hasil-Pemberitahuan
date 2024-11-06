import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Form, Upload, Row, Col, Button, message, Table, Tooltip, List, Divider } from 'antd';
import { LogUser } from "../LogUser";
import { PreviewFile } from "../PreviewFile";
import { apiUrl, apiKey } from "../../config/config";
import { UploadFile } from "../Upload";

const { REACT_APP_HDFS, REACT_APP_SECRET_KEY_HDFS, REACT_APP_SECRET_KEY_SIMAUDI } = process.env;

const { Column } = Table;
export class DokumenPendukungTable extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        uploading: false,
        fileList: []
    };

    componentDidMount() {
        if (this.props.idDokumenPendukung) {
            this.fetch();
            console.log(this.props.idDokumenPendukung)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.idDokumenPendukung) {
            if (this.props.idDokumenPendukung !== prevProps.idDokumenPendukung) {
                this.fetch();
                console.log(this.props.idDokumenPendukung)
            }
        }
    }

    fetch() {
        this.setState({ loading: true });

        axios.get(`${apiUrl}/dokpendukung/` + this.props.idDokumenPendukung, {
            // axios.get("http://10.102.104.53:8095/audit/dokpendukung/" + this.props.idDokumenPendukung, {
            headers: apiKey
        })
            .then(res => {
                console.log("data : ", res.data.item)
                this.setState({
                    loading: false,
                    data: res.data.item
                });
            });
    }

    deleteUpload = (res) => {
        var path = res.idPathDokPendukung
        console.log("res : ", path)
        swal({
            title: "Apakah Anda Sudah Yakin?",
            text: "Data Yang Terhapus Tidak Dapat Dikembalikan",
            icon: "warning",
            buttons: ["Cancel!", "Yes!"]
        })
            .then(Yes => {
                if (Yes) {
                    axios.delete(`${apiUrl}/dokpendukung/` + res.sesKey, { headers: apiKey })
                        .then(res => {

                            axios.delete(`${REACT_APP_HDFS}/v1/hdfs/delete?path=` + path, { headers: { 'beacukai-api-key': REACT_APP_SECRET_KEY_HDFS } });

                            this.fetch();

                            swal({
                                title: "Done!",
                                text: "Dokumen Upload Berhasil Di Delete",
                                icon: "success",
                                timer: 3000,
                                button:
                                    false
                            })
                        })
                }
            });
    }

    onRemove = (file) => {
        console.log("file : ", file)
        if (file.response.status == "success") {
            axios.delete(`${REACT_APP_HDFS}/v1/hdfs/delete?path=` + file.response.item, { headers: { 'beacukai-api-key': REACT_APP_SECRET_KEY_HDFS } })
                .then(res => {
                    if (res.data.status == 'success') {
                        message.success(`${file.name} File Deleted Successfully.`);
                    } else {
                        message.error(`${file.name} File Deleted Failed.`);
                    }
                })
        }

        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            return {
                fileList: newFileList
            }
        })
    }

    onChange = (info) => {
        console.log("info : ", info)
        let { fileList } = info;

        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        } else if (info.file.status == 'uploading') {
            this.setState({
                uploading: true,
            });
        }

        if (info.file.status === 'done') {
            this.setState({
                uploading: false,
            });
            message.success(`${info.file.name} File Uploaded Successfully`);
        } else if (info.file.status === 'error') {
            this.setState({
                uploading: false,
            });
            message.error(`${info.file.name} File Upload Failed.`);
        }

        this.setState({ fileList: [...fileList] });
    }

    handleSubmit = () => {
        console.log("file List : ", this.state.fileList)
        for (var i = 0; i < this.state.fileList.length; i++) {
            if (this.state.fileList[i].status == "error") {
                this.state.fileList.splice(i, 1)
                console.log("b : ", this.state.fileList)
            }
        }
        swal({
            title: "Apakah Anda Sudah Yakin?",
            text: "Pastikan Data Anda Sudah Benar",
            icon: "warning",
            buttons: ["Cancel!", "Yes!"]
        })
            .then(Yes => {
                if (Yes) {
                    const data = {}
                    data.idDokumenPendukung = this.props.idDokumenPendukung;
                    data.fileUpload = this.state.fileList;
                    console.log("data upload : ", data)

                    axios.post(`${apiUrl}/dokpendukung`, data, { headers: apiKey })
                        .then(res => {
                            if (res.data.status === "success") {
                                this.setState({
                                    fileList: []
                                })
                                this.fetch();

                                swal({
                                    title: "Done!",
                                    text: "Data Tersimpan",
                                    icon: "success",
                                    timer: 3000,
                                    button:
                                        false
                                })
                            }
                        }).catch(error => {
                            console.log(error)
                            swal({
                                title: "Failed!",
                                text: "Data Gagal Tersimpan",
                                icon: "error",
                                timer: 3000
                            })
                        });
                }
            })
    }

    render() {
        const { fileList } = this.state;
        const formItemLayout1 = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };
        return (
            <div>
                <Form hidden={this.props.disabled == true ? false : true} {...formItemLayout1} onSubmit={this.handleSubmit} labelAlign="left" layout="vertical">
                    <Form.Item label="Upload Dokumen">
                        <Upload
                            {...UploadFile}
                            fileList={this.state.fileList}
                            onChange={this.onChange}
                            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                            disabled={this.state.uploading == true ? true : false}
                        >
                            <Tooltip placement="topLeft" title={"Size Maksimal 10 MB/file"}>
                                <Button loading={this.state.uploading}>
                                    <i className="fa fa-upload"></i>
                                            &nbsp;
                                            {this.state.uploading == true ? 'Uploading' : 'Click to Upload'}
                                </Button>
                            </Tooltip>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="" style={{ marginLeft: 180, marginTop: -15 }}>
                        <div>
                            <List>
                                {fileList.map(file => (
                                    <div>
                                        <Form>
                                            <Row gutter={19}>
                                                <Col span={18}>
                                                    <div>
                                                        {
                                                            file.status == "done" ? <span>{file.name}</span> : ""
                                                        }
                                                    </div>
                                                </Col>
                                                <Col span={1}>
                                                    <Tooltip placement="top" title={"Remove"}>
                                                        <button hidden={file.status == "done" ? false : true} style={{ marginLeft: 70 }} type="button" onClick={() => this.onRemove(file)} className="btn btn-outline-hover-danger btn-sm">
                                                            <i className="fa fa-window-close"></i>
                                                        </button>
                                                    </Tooltip>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                ))}
                            </List>
                        </div>
                    </Form.Item>
                    <Button style={{ marginBottom: 10 }} type="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                <Table
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    rowKey={record => record.idSt}
                    bordered
                >
                    <Column title="Nama File" dataIndex="fileName" key="fileName"
                    />

                    <Column
                        title="Action"
                        key="action"
                        fixed="right"
                        width={200}
                        render={(text, record) => (
                            <span>

                                <Tooltip placement="top" title={"Download"}>
                                    <Button
                                        onClick={() => PreviewFile(record.idPathDokPendukung, record.fileName)} >
                                        <i className="fas fa-eye" style={{ lineHeight: "1" }} />
                                    </Button>
                                </Tooltip>
                                <Divider type="vertical" />
                                <Tooltip placement="top" title={"Delete"}>
                                    <Button size="small" onClick={this.deleteUpload.bind(this, record)}>
                                        <i className="fa fa-trash-alt"></i>
                                    </Button>
                                </Tooltip>
                                <Divider type="vertical" />
                            </span>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

export default DokumenPendukungTable;