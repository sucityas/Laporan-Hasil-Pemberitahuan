import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Spin } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/editable";
import { apiUrl } from "../config/config";
import { RestData } from "../apis/RestData";
import { Notification } from "./NotificationSimple";
import { LogUser } from "./LogUser";
import swal from "sweetalert";
import moment from "moment";

export default class ExcelPageAudit extends Component {
    constructor(props) {
        super(props);
        this.dataSourcePopulasi = new RestData(`${apiUrl}/kka/insertpopulasi`);

        this.getJsDateFromExcel = this.getJsDateFromExcel.bind(this);

        this.state = {
            cols: [],
            rows: [],
            errorMessage: null,
            loadingTable: false,
            columns: [
                {

                    title: "JENIS DOKUMEN KKA",
                    dataIndex: "jenisDokumenKka",
                    editable: true
                },
                {
                    title: "NOMOR DOKUMEN KKA",
                    dataIndex: "nomorDokumenKka",
                    editable: true
                },
                {
                    title: "TANGGAL DOKUMEN",
                    dataIndex: "tanggalDokumen",
                    editable: true
                },
                {
                    title: "KODE KANTOR DOKUMEN",
                    dataIndex: "kodeKantorDokumen",
                    editable: true
                },
                {
                    title: "Action",
                    dataIndex: "action",
                    render: (text, record) =>
                        this.state.rows.length >= 1 ? (
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.nomorDokumen)}
                            >
                                <Icon
                                    type="delete"
                                    theme="filled"
                                    style={{ color: "red", fontSize: "20px" }}
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
        this.setState({ rows: newData });
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

    fileHandler = fileObj => {

        const fileReader = new FileReader();
        fileReader.readAsBinaryString(fileObj);
        console.log("data kka", this.props.dataKka)
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined" && row.length > 0) {
                        // console.log("row", row)
                        let tanggal = this.getJsDateFromExcel(row[2])
                        let tanggalFormatted = moment(tanggal).format('DD-MM-YYYY');
                        newRows.push({
                            key: this.props.dataKka.idKka,
                            jenisDokumenKka: row[0],
                            nomorDokumenKka: row[1],
                            tanggalDokumen: tanggalFormatted,
                            kodeKantorDokumen: ""+row[3],
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
        console.log("submitting: ", this.props.dataKka.idKka);

        swal({
            title: "Apakah Anda Sudah Yakin?",
            text: "Pastikan Data Sudah Benar",
            icon: "warning",
            buttons: ["Cancel!", "Yes!"]
        })
            .then(Yes => {
                if (Yes) {

                    this.setState({
                        loadingTable: true,
                    });

                    this.dataSourcePopulasi.Store(this.state.rows, res => {
                        console.log(res)
                        console.log(res.status)

                        if (res.status === "success") {
                            this.setState({
                                loadingTable: false,
                            });
                            swal({
                                title: "Done!",
                                text: "Data KKA Populasi Tersimpan",
                                icon: "success",
                                timer: 3000,
                                button: false
                            })
                            this.props.reset();
                            this.props.fetch();
                        } else {
                            this.setState({
                                loadingTable: false,
                            });
                            swal({
                                title: "Failed!",
                                text: "Gagal Simpan KKA Populasi",
                                icon: "error",
                                timer: 3000
                            })
                        }
                    });
                }
            });
        //submit to API
        //if successful, banigate and clear the data
        //this.setState({ rows: [] })
    };

    handleDelete = nomorDokumen => {
        console.log(nomorDokumen);
        const rows = [...this.state.rows];
        this.setState({ rows: rows.filter(item => item.nomorDokumen !== nomorDokumen) });
    };

    handleAdd = () => {
        const { count, rows } = this.state;
        const newData = {
            key: count,
            jenisDokumenKka: "BC 20",
            nomorDokumenKka: "003533",
            tanggalDokumen: "01/11/2017",
            kodeKantorDokumen: "040400"
        };
        this.setState({
            rows: [newData, ...rows],
            count: count + 1
        });
    };

    onImportExcel = event => {
        const { files } = event.target;
        if (files.length === 1) {
            // Process a file if we have exactly one
            this.fileHandler(
                files[0],
                // Not sure what you want to do with the data, so let's just log it
                // (sku, description, quantity, cost) => console.log(sku, description, quantity, cost),
            );
        }

        this.setState({ rows: [] });
    };

    getJsDateFromExcel = excelDate => {
        return new Date((excelDate - (25567 + 2)) * 86400 * 1000).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
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
                {/*<h1>Importing Excel Component</h1>*/}
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div className="page-title"><h4>Upload KKA Populasi</h4></div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <a
                            href="https://www.dropbox.com/s/h3pponpgtl6meyv/dummy%20kka%20POPULASI.xlsx?dl=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Sample excel sheet
                        </a>
                    </Col>
                    <Col
                        span={8}
                        align="right"
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        {this.state.rows.length > 0 && (
                            <>
                                <Button
                                    onClick={this.handleAdd}
                                    size="large"
                                    type="info"
                                    style={{ marginBottom: 16 }}
                                >
                                    <Icon type="plus" />
                                    Add a row
                                </Button>{" "}
                                <Button
                                    onClick={this.handleSubmit}
                                    size="large"
                                    type="primary"
                                    style={{ marginBottom: 16, marginLeft: 10 }}
                                >
                                    Submit Data
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
                <div>
                    {/* <Upload
                        name="file"
                        beforeUpload={this.fileHandler}
                        onRemove={() => this.setState({ rows: [] })}
                        multiple={false}
                    >
                        <Button>
                            <Icon type="upload" /> Click to Upload Excel File
                        </Button>
                    </Upload> */}
                    <input className="file-uploader" type="file" accept=".xlsx, .xls" onChange={this.onImportExcel} />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Spin tip="Loading" spinning={this.state.loadingTable} size="large" >
                        <Table
                            components={components}
                            rowClassName={() => "editable-row"}
                            dataSource={this.state.rows}
                            columns={columns}
                            bordered
                        />
                    </Spin>
                </div>
            </>
        );
    }
}
