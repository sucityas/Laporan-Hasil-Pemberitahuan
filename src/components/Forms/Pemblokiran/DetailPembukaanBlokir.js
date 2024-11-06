import { Col, DatePicker, Input, Row, Skeleton } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';

const { TextArea } = Input;

class DetailPembukaanBlokir extends Component {
    constructor(props) {
        super(props);
        //     this.state={
        //         nomorSkepBlokir: this.props.data ? this.props.data.nomorSkep : null ,
        //         tanggalBlokir: this.props.data ? moment(this.props.data.tanggalBlokir, 'YYYY-MM-DD').format("DD-MM-YYYY")  : "",
        //         unitPemblokiran: this.props.data ? this.props.data.kantorBlokir : null ,
        //         kategoriBlokir: this.props.data ? this.props.data.kategoriBlokir : null ,
        //         catatan: this.props.data ? this.props.data.catatanPemblokiran : null
        //     }
    }


    render() {
        const
            nomorSkepBlokir = this.props.data ? this.props.data.nomorSkep : null,
            tanggalBlokir = this.props.data ? moment(this.props.data.tanggalBlokir, 'YYYY-MM-DD').format("DD-MM-YYYY") : "",
            unitPemblokiran = this.props.data ? this.props.data.kantorBlokir : null,
            kategoriBlokir = this.props.data ? this.props.data.kategoriBlokir : null,
            catatan = this.props.data ? this.props.data.catatanPemblokiran : null;
        const { loading } = this.props
        return (
            <div>
                {
                    loading ?
                        <Skeleton active paragraph={{ rows: 8 }} />
                        :
                        <>
                            <hr />
                            <Row gutter={10}>
                                <Col span={4}>
                                    Kategori Blokir
                                </Col>
                                <Col span={16}>
                                    <Input
                                        width={"100%"}
                                        value={kategoriBlokir}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={4}>
                                    Unit Pemblokiran
                                </Col>
                                <Col span={16}>
                                    <Input
                                        value={unitPemblokiran}
                                        disabled={this.props.disabled}
                                        style={{ width: "100%" }}
                                    />
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={12}>
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            No. Skep Pemblokiran
                                        </Col>
                                        <Col span={12}>
                                            <Input
                                                value={nomorSkepBlokir}
                                                disabled={this.props.disabled}

                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row gutter={10}>
                                        <Col span={8} >
                                            Tgl. Skep Pemblokiran
                                        </Col>
                                        <Col span={16}>
                                            <DatePicker
                                                value={moment(tanggalBlokir, "DD-MM-YYYY")}
                                                style={{ width: '100%' }}
                                                format={"DD-MM-YYYY"}
                                                disabled={this.props.disabled}

                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br />

                            <Row gutter={10}>
                                <Col span={4}>
                                    Catatan Pemblokiran
                                </Col>
                                <Col span={16}>
                                    <TextArea
                                        value={catatan}
                                        rows={4}
                                        disabled={this.props.disabled}
                                    />
                                </Col>
                            </Row>
                        </>
                }
            </div>
        );
    }
}

export default DetailPembukaanBlokir;
