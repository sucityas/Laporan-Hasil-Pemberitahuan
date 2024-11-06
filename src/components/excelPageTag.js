import React, { Component } from "react";
import { Table, Button, Popconfirm, Row, Col, Icon, Spin, Typography } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/editable";
import { apiUrl } from "../config/config";
import { RestData } from "../apis/RestData";
import { Notification } from "./NotificationSimple";
import { LogUser } from "./LogUser";
import swal from "sweetalert";
import moment from "moment";

const { Title, Text } = Typography;
export default class ExcelPage extends Component {
    constructor(props) {
        super(props);
        this.dataSourceTagihan = new RestData(`${apiUrl}/kka/inserttagihan`);
        this.getJsDateFromExcel = this.getJsDateFromExcel.bind(this);

        this.state = {
            cols: [],
            rows: [],
            errorMessage: null,
            loadingTable: false,
            columns: [
                {
                    title: "NOMOR DOKUMEN KKA",
                    dataIndex: "nomorDokumenKka",
                    editable: true
                },
                {
                    title: "TANGGAL DOKUMEN",
                    dataIndex: "tanggalDokumenKka",
                    editable: true
                },
                {
                    title: "KODE KANTOR DOKUMEN",
                    dataIndex: "kodeKantorDokumen",
                    editable: true
                },
                {
                    title: "SERI BARANG",
                    dataIndex: "seriBarang",
                    editable: true
                },
                {
                    title: "KODE FASILITAS",
                    dataIndex: "kodeFasilitas",
                    editable: true
                },
                {
                    title: "HS CODE",
                    dataIndex: "hsCode",
                    editable: true
                },
                {
                    title: "URAIAN BARANG",
                    dataIndex: "uraianBarang",
                    editable: true
                },
                {
                    title: "NETTO",
                    dataIndex: "netto",
                    editable: true
                },
                {
                    title: "JUMLAH SATUAN",
                    dataIndex: "jumlahSatuan",
                    editable: true
                },
                {
                    title: "KODE SATUAN",
                    dataIndex: "kodeSatuan",
                    editable: true
                },
                {
                    title: "CIF",
                    dataIndex: "cif",
                    editable: true
                },
                {
                    title: "TARIF BMBY",
                    dataIndex: "tarifBmby",
                    editable: true
                },
                {
                    title: "TARIF BMAD",
                    dataIndex: "tarifBmad",
                    editable: true
                },
                {
                    title: "TARIF BMTP",
                    dataIndex: "tarifBmtp",
                    editable: true
                },
                {
                    title: "CUKAI",
                    dataIndex: "cukai",
                    editable: true
                },
                {
                    title: "SATUAN TARIF",
                    dataIndex: "satuanTarif",
                    editable: true
                },
                {
                    title: "TARIF BK",
                    dataIndex: "tarifBk",
                    editable: true
                },
                {
                    title: "CUKAI HT",
                    dataIndex: "cukaiHt",
                    editable: true
                },
                {
                    title: "CUKAI EA",
                    dataIndex: "cukaiEa",
                    editable: true
                },
                {
                    title: "CUKAI MMEA",
                    dataIndex: "cukaiMmea",
                    editable: true
                },
                {
                    title: "PAJAK ROKOK",
                    dataIndex: "pajakRokok",
                    editable: true
                },
                {
                    title: "TARIF PPN",
                    dataIndex: "tarifPpn",
                    editable: true
                },
                {
                    title: "TARIF PPNBM",
                    dataIndex: "tarifPpnbm",
                    editable: true
                },
                {
                    title: "TARIF PPH",
                    dataIndex: "tarifPph",
                    editable: true
                },
                {
                    title: "HS CODE PENETAPAN",
                    dataIndex: "hsCodePenetapan",
                    editable: true
                },
                {
                    title: "URAIAN BARANG PENETAPAN",
                    dataIndex: "uraianBarangPenetapan",
                    editable: true
                },
                {
                    title: "JUMLAH SATUAN PENETAPAN",
                    dataIndex: "jumlahSatuanPenetapan",
                    editable: true
                },
                {
                    title: "KODE SATUAN PENETAPAN",
                    dataIndex: "kodeSatuanPenetapan",
                    editable: true
                },
                {
                    title: "NILAI PENETAPAN",
                    dataIndex: "nilaiPenetapan",
                    editable: true
                },
                {
                    title: "TARIF BMBY PENETAPAN",
                    dataIndex: "tarifBmbyPenetapan",
                    editable: true
                },
                {
                    title: "TARIF BMAD PENETAPAN",
                    dataIndex: "tarifBmadPenetapan",
                    editable: true
                },
                {
                    title: "TARIF BMTP PENETAPAN",
                    dataIndex: "tarifBmtpPenetapan",
                    editable: true
                },
                {
                    title: "CUKAI PENETAPAN",
                    dataIndex: "cukaiPenetapan",
                    editable: true
                },
                {
                    title: "SATUAN TARIF PENETAPAN",
                    dataIndex: "satuanTarifPenetapan",
                    editable: true
                },
                {
                    title: "TARIF PPN PENETAPAN",
                    dataIndex: "tarifPpnPenetapan",
                    editable: true
                },
                {
                    title: "TARIF PPNBM PENETAPAN",
                    dataIndex: "tarifPpnbmPenetapan",
                    editable: true
                },
                {
                    title: "TARIF PPH PENETAPAN",
                    dataIndex: "tarifPphPenetapan",
                    editable: true
                },
                {
                    title: "BK PENETAPAN",
                    dataIndex: "bkPenetapan",
                    editable: true
                },
                {
                    title: "CUKAI HT PENETAPAN",
                    dataIndex: "cukaiHtPenetapan",
                    editable: true
                },
                {
                    title: "CUKAI EA PENETAPAN",
                    dataIndex: "cukaiEaPenetapan",
                    editable: true
                },
                {
                    title: "CUKAI MMEA PENETAPAN",
                    dataIndex: "cukaiMmeaPenetapan",
                    editable: true
                },
                {
                    title: "PAJAK ROKOK PENETAPAN",
                    dataIndex: "pajakRokokPenetapan",
                    editable: true
                },
                {
                    title: "TAGIHAN BM",
                    dataIndex: "tagihanBm",
                    editable: true
                },
                {
                    title: "TAGIHAN BMAD",
                    dataIndex: "tagihanBmad",
                    editable: true
                },
                {
                    title: "TAGIHAN BMTP",
                    dataIndex: "tagihanBmtp",
                    editable: true
                },
                {
                    title: "TAGIHAN CUKAI",
                    dataIndex: "tagihanCukai",
                    editable: true
                },
                {
                    title: "TAGIHAN PPN",
                    dataIndex: "tagihanPpn",
                    editable: true
                },
                {
                    title: "TAGIHAN PPNBM",
                    dataIndex: "tagihanPpnbm",
                    editable: true
                },
                {
                    title: "TAGIHAN PPH",
                    dataIndex: "tagihanPph",
                    editable: true
                },
                {
                    title: "TAGIHAN DENDA PABEAN",
                    dataIndex: "tagihanDendaPabean",
                    editable: true
                },
                {
                    title: "TAGIHAN BK",
                    dataIndex: "tagihanBk",
                    editable: true
                },
                {
                    title: "TAGIHAN CUKAI HT",
                    dataIndex: "tagihanCukaiHt",
                    editable: true
                },
                {
                    title: "TAGIHAN CUKAI EA",
                    dataIndex: "tagihanCukaiEa",
                    editable: true
                },
                {
                    title: "TAGIHAN PAJAK ROKOK",
                    dataIndex: "tagihanPajakRokok",
                    editable: true
                },
                {
                    title: "TAGIHAN DENDA CUKAI",
                    dataIndex: "tagihanDendaCukai",
                    editable: true
                },
                {
                    title: "TAGIHAN BUNGA AWAL",
                    dataIndex: "tagihanBungaAwal",
                    editable: true
                },
                {
                    title: "TAGIHAN BUNGA PPN",
                    dataIndex: "tagihanBungaPpn",
                    editable: true
                },
                {
                    title: "TAGIHAN BUNGA PPH",
                    dataIndex: "tagihanBungaPph",
                    editable: true
                },
                {
                    title: "TAGIHAN PPH LAIN",
                    dataIndex: "tagihanPphLain",
                    editable: true
                },
                {
                    title: "TAGIHAN PPH DN",
                    dataIndex: "tagihanPphDn",
                    editable: true
                },
                {
                    title: "TAGIHAN PPH 22",
                    dataIndex: "tagihanPph22",
                    editable: true
                },
                {
                    title: "TAGIHAN PABEAN LAIN",
                    dataIndex: "tagihanPabeanLain",
                    editable: true
                },
                {
                    title: "TAGIHAN CUKAI LAIN",
                    dataIndex: "tagihanCukaiLain",
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
        console.log("id kka", this.props.dataKka.idKka)
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                let newRows = [];
                resp.rows.slice(1).map((row, index) => {
                    if (row && row !== "undefined" && row.length > 0) {
                        console.log("cek", row[1])
                        let tanggal = this.getJsDateFromExcel(row[1])
                        let tanggalFormatted = moment(tanggal).format('DD-MM-YYYY');
                        console.log("cari", tanggalFormatted)
                        newRows.push({
                            key: this.props.dataKka.idKka,
                            jenisDokumenKka: this.props.dataKka.kodeJenisKka,
                            nomorDokumenKka: row[0],
                            tanggalDokumenKka: tanggalFormatted,
                            kodeKantorDokumen: "" + row[2],
                            seriBarang: row[3],
                            kodeFasilitas: row[4],
                            hsCode: row[5],
                            uraianBarang: row[6],
                            netto: row[7],
                            jumlahSatuan: row[8],
                            kodeSatuan: row[9],
                            cif: row[10],
                            tarifBmby: row[11],
                            tarifBmad: row[12],
                            tarifBmtp: row[13],
                            cukai: row[14],
                            satuanTarif: row[15],
                            tarifBk: row[16],
                            cukaiHt: row[17],
                            cukaiEa: row[18],
                            cukaiMmea: row[19],
                            pajakRokok: row[20],
                            tarifPpn: row[21],
                            tarifPpnbm: row[22],
                            tarifPph: row[23],
                            hsCodePenetapan: row[24],
                            uraianBarangPenetapan: row[25],
                            jumlahSatuanPenetapan: row[26],
                            kodeSatuanPenetapan: row[27],
                            nilaiPenetapan: row[28],
                            tarifBmbyPenetapan: row[29],
                            tarifBmadPenetapan: row[30],
                            tarifBmtpPenetapan: row[31],
                            cukaiPenetapan: row[32],
                            satuanTarifPenetapan: row[33],
                            tarifPpnPenetapan: row[34],
                            tarifPpnbmPenetapan: row[35],
                            tarifPphPenetapan: row[36],
                            bkPenetapan: row[37],
                            cukaiHtPenetapan: row[38],
                            cukaiEaPenetapan: row[39],
                            cukaiMmeaPenetapan: row[40],
                            pajakRokokPenetapan: row[41],
                            tagihanBm: row[42],
                            tagihanBmad: row[43],
                            tagihanBmtp: row[44],
                            tagihanCukai: row[45],
                            tagihanPpn: row[46],
                            tagihanPpnbm: row[47],
                            tagihanPph: row[48],
                            tagihanDendaPabean: row[49],
                            tagihanBk: row[50],
                            tagihanCukaiHt: row[51],
                            tagihanCukaiEa: row[52],
                            tagihanPajakRokok: row[53],
                            tagihanDendaCukai: row[54],
                            tagihanBungaAwal: row[55],
                            tagihanBungaPpn: row[56],
                            tagihanBungaPph: row[57],
                            tagihanPphLain: row[58],
                            tagihanPphDn: row[59],
                            tagihanPph22: row[60],
                            tagihanPabeanLain: row[61],
                            tagihanCukaiLain: row[62],
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

                    this.dataSourceTagihan.Store(this.state.rows, res => {
                        console.log(res)
                        console.log(res.status)

                        if (res.status === "success") {
                            this.setState({
                                loadingTable: false,
                            });

                            swal({
                                title: "Done!",
                                text: "Data KKA Tagihan Tersimpan",
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
                                text: "Gagal Simpan KKA Tagihan",
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

    getJsDateFromExcel = excelDate => {
        return new Date((excelDate - (25567 + 2)) * 86400 * 1000).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    };


    handleDelete = key => {
        const rows = [...this.state.rows];
        this.setState({ rows: rows.filter(item => item.key !== key) });
    };
    handleAdd = () => {
        const { count, rows } = this.state;
        const newData = {
            key: count,
            jenisDokumen: "User's name",
            nomorDokumen: "22",
            tanggalDokumen: "Female",
            kodeKantorDokumen: "Female",
            seriBarang: "",
            kodeFasilitas: "",
            hsCode: "",
            uraianBarang: "",
            Netto: "",
            jumlahSatuan: "",
            kodeSatuan: "",
            Cif: "",
            tarifBmby: "",
            tarifBmad: "",
            tarifBmtp: "",
            Cukai: "",
            satuanTarif: "",
            tarifBk: "",
            cukaiHt: "",
            cukaiEa: "",
            cukaiMmea: "",
            pajakRokok: "",
            tarifPpn: "",
            tarifPpnbm: "",
            tarifPph: "",
            HsCodePenetapan: "",
            uraianBarangPenetapan: "",
            jumlahSatuanPenetapan: "",
            kodeSatuanPenetapan: "",
            nilaiPenetapan: "",
            tarifBmbyPenetapan: "",
            tarifBmadPenetapan: "",
            tarifBmtpPenetapan: "",
            CukaiPenetapan: "",
            satuanTarifPenetapan: "",
            tarifPpnPenetapan: "",
            tarifPpnbmPenetapan: "",
            tarifPphPenetapan: "",
            bkPenetapan: "",
            cukaiHtPenetapan: "",
            cukaiEaPenetapan: "",
            cukaiMmeaPenetapan: "",
            pajakRokokPenetapan: "",
            tagihanBm: "",
            tagihanBmad: "",
            tagihanBmtp: "",
            tagihanCukai: "",
            tagihanPpn: "",
            tagihanPpnbm: "",
            tagihanPph: "",
            tagihanDendaPabean: "",
            tagihanBk: "",
            tagihanCukaiHt: "",
            tagihanCukaiEa: "",
            tagihanPajakRokok: "",
            tagihanDendaCukai: "",
            tagihanBungaAwal: "",
            tagihanBungaPpn: "",
            tagihanBungaPph: "",
            tagihanPphLain: "",
            tagihanPphDn: "",
            tagihanPph22: "",
            tagihanPabeanLain: "",
            tagihanCukaiLain: ""
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
                <Row >
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
                            <div className="page-title"><h4>Upload KKA Tagihan</h4></div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <a
                            href="https://www.dropbox.com/s/3uee4082u1btzi6/dummy%20kka%20TAGIHAN_Tarif.xlsx?dl=0"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            Sample excel KKA Tagihan
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
                <Row>
                    <Text type="danger">*Untuk kolom kode_fasilitas, satuan_tarif, satuan_tarif_penetapan mohon diisi dengan strip seperti template / dikosongkan saja jika data memang kosong/tidak ada</Text>
                </Row>
                <Row>
                    <Text type="danger">*Untuk kolom lainnya, jika data memang kosong bisa dikosongkan saja isi data nya</Text>
                </Row>
                <div>
                    {/* {<Upload
                        name="file"
                        beforeUpload={this.fileHandler}
                        onRemove={() => this.setState({ rows: [] })}
                        multiple={false}
                    >
                        <Button>
                            <Icon type="upload" /> Click to Upload Excel File
                        </Button>
                    </Upload>} */}
                    <input className="file-uploader" type="file" accept=".xlsx, .xls" onChange={this.onImportExcel} />
                </div>
                <div>
                    <Row style={{ marginTop: 20 }}>
                        <Spin tip="Loading" spinning={this.state.loadingTable} size="large" >
                            <Table
                                components={components}
                                rowClassName={() => "editable-row"}
                                dataSource={this.state.rows}
                                scroll={{ x: 10000, y: 1000 }}
                                columns={columns}
                                bordered
                            />
                        </Spin>
                    </Row>
                </div>
            </>
        );
    }
}
