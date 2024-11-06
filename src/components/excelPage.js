import React, {Component} from "react";
import {Table, Button, Popconfirm, Row, Col, Icon, Upload} from "antd";
import Notification from "../pages/perijinan/Notifikasi"
import {ExcelRenderer} from "react-excel-renderer";
import {EditableFormRow, EditableCell} from "../utils/editable";
import {apiUrl10} from "../apis/ApiData";

export default class ExcelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cols: [],
            rows: [],
            errorMessage: null,
            columns: [
                {
                    title: "NO SERTIFIKAT",
                    dataIndex: "noSertifikat",
                    editable: true
                },
                {
                    title: "TANGGAL SERTIFIKAT",
                    dataIndex: "tanggalSertifikat",
                    editable: true
                },
                {
                    title: "ASAL",
                    dataIndex: "asal",
                    editable: true
                },
                {
                    title: "HASIL",
                    dataIndex: "hasil",
                    editable: true
                },
                {
                    title: "JAM LATIHAN",
                    dataIndex: "jamLatihan",
                    editable: true
                },
                {
                    title: "KETERANGAN",
                    dataIndex: "keterangan",
                    editable: true
                },
                {
                    title: "LOKASI",
                    dataIndex: "lokasi",
                    editable: true
                },
                {
                    title: "NAMA",
                    dataIndex: "nama",
                    editable: true
                },
                {
                    title: "NO SERI",
                    dataIndex: "noSeri",
                    editable: true
                },
                {
                    title: "NPP",
                    dataIndex: "npp",
                    editable: true
                },
                {
                    title: "TAHUN",
                    dataIndex: "tahun",
                    editable: true
                },
                {
                    title: "TANGGAL LAHIR",
                    dataIndex: "tanggalLahir",
                    editable: true
                },
                {
                    title: "TANGGAL MULAI",
                    dataIndex: "tanggalMulai",
                    editable: true
                },
                {
                    title: "TANGGAL SELESAI",
                    dataIndex: "tanggalSelesai",
                    editable: true
                },
                {
                    title: "TEMPAT LAHIR",
                    dataIndex: "tempatLahir",
                    editable: true
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    fixed: 'right',
                    render: (text, record) =>
                        this.state.rows.length >= 1 ? (
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.key)}
                            >
                                <Icon
                                    type="delete"
                                    theme="filled"
                                    style={{color: "red", fontSize: "20px"}}
                                />
                            </Popconfirm>
                        ) : null
                }
            ]
        };
    }

    handleSave = row => {
        const newData = [...this.state.rows];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row
        });
        this.setState({rows: newData});
    };

    checkFile(file) {
        let errorMessage = "";
        if (!file || !file[0]) {
            return;
        }
        const isExcel =
            file[0].type === "application/vnd.ms-excel" ||
            file[0].type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isExcel) {
            errorMessage = "You can only upload Excel file!";
        }
        console.log("file", file[0].type);
        const isLt2M = file[0].size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorMessage = "File must be smaller than 2MB!";
        }
        console.log("errorMessage", errorMessage);
        return errorMessage;
    }

    fileHandler = fileList => {
        console.log("fileList", fileList);
        let fileObj = fileList;
        if (!fileObj) {
            this.setState({
                errorMessage: "No file uploaded!"
            });
            return false;
        }
        console.log("fileObj.type:", fileObj.type);
        if (
            !(
                fileObj.type === "application/vnd.ms-excel" ||
                fileObj.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
        ) {
            this.setState({
                errorMessage: "Unknown file format. Only Excel files are uploaded!",
            });
            return false;
        }
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined") {
                        newRows.push({
                            key: index,
                            asal: row[2],
                            hasil: row[3],
                            jamLatihan: row[4],
                            keterangan: row[5],
                            lokasi: row[6],
                            nama: row[7],
                            noSeri: row[8],
                            noSertifikat: row[0],
                            npp: row[9],
                            tahun: row[10],
                            tanggalLahir: row[11],
                            tanggalMulai: row[12],
                            tanggalSelesai: row[13],
                            tanggalSertifikat: row[1],
                            tempatLahir: row[14]
                        });
                    }
                });
                if (newRows.length === 0) {
                    this.setState({
                        errorMessage: "No data found in file!"
                    });
                    return false;
                } else {
                    this.setState({
                        cols: resp.cols,
                        rows: newRows,
                        errorMessage: null
                    });
                }
            }
        });
        return false;
    };

    handleSubmit = async () => {
        console.log("submitting: ", this.state.rows);

        fetch(`${apiUrl10}/ref-ahli-pabean/multiple`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cache
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(this.state.rows)// body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(body => {
                if (body.status === "true") {
                    Notification('success', body.message);
                    setTimeout(function () {
                        window.location.href = '/datapabean'; //will redirect to your blog page (an ex: blog.html)
                    }, 5000);//window.location.href = '/rekamizin';
                } else if (body.status === "false") {
                    Notification('warning', body.message)
                } else {
                    Notification('failed', body.message)
                    // Notification('success', body.message)
                }
            })
            .catch(e => console.log(e));

    };

    handleDelete = key => {
        const rows = [...this.state.rows];
        this.setState({rows: rows.filter(item => item.key !== key)});
        console.log(key)
    };

    handleAdd = () => {
        const {count, rows} = this.state;
        const newData = {
            key: count,
            noSertifikat: "9875799",
            tanggalSertifikat: "2019-09-01",
            asal: "Jawa Barat"
        };
        this.setState({
            rows: [newData, ...rows],
            count: count + 1
        });
    };

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });
        return (
            <>
                <h5>Upload File Excel</h5>
                <Row gutter={16}>
                    <Col
                        span={8}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "5%"
                        }}
                    >
                    </Col>
                    <Col
                        span={8}
                        align="right"
                        style={{display: "flex", justifyContent: "space-between"}}
                    >
                        {this.state.rows.length > 0 && (
                            <>
                                <Button
                                    onClick={this.handleAdd}
                                    size="large"
                                    type="info"
                                    style={{marginBottom: 16}}
                                >
                                    <Icon type="plus"/>
                                    TAMBAH
                                </Button>{" "}
                                <Button
                                    onClick={this.handleSubmit}
                                    size="large"
                                    type="primary"
                                    style={{marginBottom: 16, marginLeft: 10}}
                                >
                                    <i className="fas fa-paper-plane"/>&nbsp; KIRIM
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <Upload
                            name="file"
                            beforeUpload={this.fileHandler.bind(this)}
                            onRemove={() => this.setState({rows: []})}
                            multiple={false}
                        >
                            <Button type={'primary'}>
                                <i className="fas fa-file-upload"/>&nbsp; UPLOAD
                            </Button>
                        </Upload>
                    </Col>
                    <Col span={4} style={{marginLeft:'-30px'}}>
                        <Button
                            type={'link'}
                            href="https://drive.google.com/open?id=1MpctfX_FHGVtfT-kADCIpLnyWiW9nlmF"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-cloud-download-alt"/>&nbsp; SAMPLE
                        </Button>
                    </Col>
                </Row>
                <div style={{marginTop: 20}}>
                    <Table
                        components={components}
                        rowClassName={() => "editable-row"}
                        dataSource={this.state.rows}
                        columns={columns}
                        scroll={{x: 1800}}
                    />
                </div>
                <br/>
                <br/>
            </>

        );
    }
}
