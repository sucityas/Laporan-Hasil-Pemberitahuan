import React from "react";
import axios from "axios";
import { apiUrl, apiKey } from "../../config/config";
import { Table, List } from "antd";
import moment from "moment";
import swal from "sweetalert";

const { REACT_APP_SECRET_KEY_SIMAUDI } = process.env;

const { Column } = Table;

class StTable extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        dataSt: [],
        loading: false
    }

    componentDidMount() {
        if (this.props.data) {
            console.log("data Npa : ", this.props.data)
            this.fetch();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data) {
            if (this.props.data !== prevProps.data) {
                this.fetch();
            }
        }
    }

    fetch = () => {
        this.setState({ loading: true })
        // axios.get("http://10.102.104.173:8095/audit/st/listByNpa/" + this.props.data)
        axios.get(`${apiUrl}/st/listByNpa/` + this.props.data, {
                headers: apiKey
            })
            .then(res => {
                if (res.data.status == "success") {
                    console.log("res : ", res.data.item)
                    this.setState({
                        dataSt: res.data.item,
                        loading: false
                    })

                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false, dataSt: [] })
                swal({
                    title: "Failed!",
                    text: "Gagal Mengambil Data ST",
                    icon: "error",
                    timer: 3000
                })
            });
    }

    render() {
        return (
            <div>
                <div className="m-3">
                    <Table
                        dataSource={this.state.dataSt}
                        loading={this.state.loading}
                        pagination={5}
                        scroll={{ x: 1350, y: 500 }}
                        bordered
                    >
                        <Column
                            title='NOMOR ST'
                            key='nomorSt'
                            render={(text, record) => (
                                <div>
                                    {record.nomorSt != null ? record.nomorSt : "-"}
                                </div>
                            )}
                        />
                        <Column
                            title='TANGGAL ST'
                            key='tanggalNotaDinas'
                            align="center"
                            render={(text, record) => (
                                <div>
                                    {record.tanggalSt != null ? <li>
                                        {
                                            moment(record.tanggalSt).format("DD-MM-YYYY")
                                        }
                                    </li> : "-"}
                                </div>
                            )}
                        />
                        <Column
                            title='PERIODE AWAL - AKHIR'
                            key='kantorPengusul'
                            render={(text, record) => (
                                <div>
                                    {record.periodeAwal != null && record.periodeAwal.length <= 10 ?
                                        <li>{record.periodeAwal} - {record.periodeAkhir}</li>
                                        : record.periodeAwal != null && record.periodeAwal.length >= 10 ?
                                            <li>{moment(record.periodeAwal).format("DD-MM-YYYY")} - {moment(record.periodeAkhir).format("DD-MM-YYYY")}</li>
                                            : "-"}
                                </div>
                            )}
                        />
                        <Column
                            title='ANGGOTA TIM'
                            key='nomorSuratPengantar'
                            render={(text, record) => (
                                <div>
                                    <List>
                                        {
                                            record.tdStAnggota != null ?
                                                record.tdStAnggota.map(res => (
                                                    <List.Item>{res.trPegawaiAudit.nip} - {res.trPegawaiAudit.nama}</List.Item>
                                                ))
                                                : "-"
                                        }
                                    </List>
                                </div>
                            )}
                        />
                    </Table>
                </div>
            </div>
        )
    }
}

export default StTable;