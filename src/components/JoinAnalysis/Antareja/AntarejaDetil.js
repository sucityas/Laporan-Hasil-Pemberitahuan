import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';
import {Table} from 'react-bootstrap';

class AnalyzingTargeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Query: ""
        };
    }

    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs={`DSAB ${this.props.match.params.npwp} Tahun ${this.props.match.params.tahun}`}/>
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <b>A. Resume Pelaporan</b>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="row">
                            <div className="col">
                                Resume Kegiatan Importasi dan Pelaporan PPN Impor (B1) Periode {this.props.match.params.npwp} Tahun {this.props.match.params.tahun}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Jan</th>
                                        <th>Feb</th>
                                        <th>Mar</th>
                                        <th>Apr</th>
                                        <th>May</th>
                                        <th>Jun</th>
                                        <th>Jul</th>
                                        <th>Aug</th>
                                        <th>Sep</th>
                                        <th>Oct</th>
                                        <th>Nov</th>
                                        <th>Dec</th>
                                        <th>Tanggal Terakhir</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Impor (PIB)</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>PPN (B1)</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <b>B. Profil</b>
                        </div>
                    </div>
                    <div className="kt-portlet__body">
                        <div className="row">
                            <div className="col">
                                <div className="kt-portlet kt-portlet--skin-solid kt-bg-brand">
                                    <div className="kt-portlet__head ">
                                        <div className="kt-portlet__head-label">
                                            <h3 className="kt-portlet__head-title">
                                                Profil Perpajakan
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="kt-portlet__body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="kt-portlet">
                                                    <div className="kt-portlet__body">
                                                        <Table hover>
                                                            <tbody>
                                                            <tr>
                                                                <td><b>Nama</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Alamat</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Pengurus</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Tanggal PKP</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Tanggal Daftar</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>KLU</b></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td><b>Kategori</b></td>
                                                                <td></td>
                                                            </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="kt-portlet kt-portlet--skin-solid kt-bg-danger">
                                    <div className="kt-portlet__head ">
                                        <div className="kt-portlet__head-label">
                                            <h3 className="kt-portlet__head-title">
                                                Registrasi Kepabeanan
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="kt-portlet__body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="kt-portlet">
                                                    <div className="kt-portlet__body">
                                                        <Table hover>
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Nama</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Alamat</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Pengurus</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Tanggal Registrasi</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Tanggal Impor Pertama</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Jenis Kegiatan</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>KLU Registrasi</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Jenis Usaha API</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Status Wajib Pajak</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Bentuk Usaha</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Jenis Impor</b></td>
                                                                    <td></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Komoditas</b></td>
                                                                    <td></td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="kt-portlet">
                                    <div className="kt-portlet__head">
                                        <div className="kt-portlet__head-label">
                                            <b>Komposisi Indentor</b>
                                        </div>
                                    </div>
                                    <div className="kt-portlet__body">
                                        <b>Importir = Indentor</b>
                                        <b>Importir != Indentor</b>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="kt-portlet">
                                    <div className="kt-portlet__head">
                                        <div className="kt-portlet__head-label">
                                            <b>Laporan Keuangan </b>
                                        </div>
                                    </div>
                                    <div className="kt-portlet__body">
                                        Pivot Grid DevEx
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="kt-portlet">
                                    <div className="kt-portlet__head">
                                        <div className="kt-portlet__head-label">
                                            <b>Selisih </b>
                                        </div>
                                    </div>
                                    <div className="kt-portlet__body">
                                        Pivot Grid DevEx
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnalyzingTargeting;
