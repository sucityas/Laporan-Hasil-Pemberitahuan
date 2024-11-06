import React, { Component } from 'react';
import DetailPerusahaan from './DetailPerusahaan'
import Akses from './AksesCabut'
import DokumenReview from './DokumenReview'
import { Row, Col, Input, Checkbox, Skeleton } from 'antd';
import { getUser } from "../../../utils/DataUser";
import axios from "axios";
import SweetAlert from 'sweetalert2';

const { TextArea } = Input
const { REACT_APP_PERIJINAN, REACT_APP_SECRET_KEY_PERIJINAN } = process.env;

class DetailPencabutan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAksesCabut: [],
            dataCabut: "",
            loadingCabut: true,
        }
    }

    getAkses = () => {
        const idPerusahaanBlokir = this.props.data.data ? this.props.data.data.idPerusahaanBlokir : ""
        axios.get(`${REACT_APP_PERIJINAN}/pemblokiran/detail-cabut/${idPerusahaanBlokir}`, {
            headers: {
                'accept': 'application/json',
                "beacukai-api-key": `${REACT_APP_SECRET_KEY_PERIJINAN}`,
                'Access-Control-Allow-Origin': '*'
            },
        }).then(data => {
            if (data.data.status) {
                this.setState({
                    dataCabut: data.data.data,
                    loadingCabut: false,
                })
            } else {
                this.setState({
                    loadingCabut: false,
                })
                SweetAlert.fire({
                    title: 'Oops...',
                    text: 'Data tidak tersedia!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
            .catch(err => {
                if (err) {
                    this.setState({
                        loadingCabut: false,
                    })
                    SweetAlert.fire({
                        title: 'Oops...',
                        text: 'Data tidak tersedia!',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
    }

    componentDidMount() {
        this.getAkses()
    }

    render() {
        const data = this.state.dataCabut
        return (
            <div>
                <b>Data Pemohonan Pencabutan Akses</b>
                <hr />
                {this.state.loadingCabut ? <Skeleton active /> : (
                    <DetailPerusahaan
                        disabled={true}
                        dataPerusahaan={data}
                        dataPerusahaanDetail={this.props.data.data ? this.props.data.data : undefined}
                    />
                )}
                <br />
                <Row>
                    <Col span={24} push={2}>
                        Akses Kepabeanan yang Diajukan Pencabutan
                    </Col>
                    <Col span={24} push={4}>
                        <Akses
                            disabled={true}
                            data={data}
                            ref={this.refAksesBlokir}
                        />
                    </Col>
                </Row>
                <br />
                {this.state.loadingCabut ? <Skeleton active /> : (
                    <>
                        <Row>
                            <Col span={4}>
                                Catatan Pencabutan
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    value={data.catatanCabut || ""}
                                    disabled={true}
                                    rows={4}
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col span={4}>
                                Nama Pemohon
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={data.namaPemohon}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={4}>
                                Jabatan Pemohon
                            </Col>
                            <Col span={16}>
                                <Input
                                    value={data.jabatanPemohon}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                        <br />
                        <DokumenReview
                            data={data.dokumenCabutList}
                        />
                        <br />
                    </>
                )}
                <Row gutter={10}>
                    <Col span={4}>
                        Peryataan Elektronik
                    </Col>
                    <Col span={20}>
                        <Checkbox
                            checked={true}
                            disabled={true}
                        >
                            Dengan ini saya menyatakan bahwa seluruh informasi dan dokumen yang dilampirkan adalah benar
                            dan dapat dipertanggungjawabkan
                        </Checkbox>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DetailPencabutan;
