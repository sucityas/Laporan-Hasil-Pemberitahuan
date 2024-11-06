import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';

class IndikasiBorongan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Query: ""
        };
    }

    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs="Indikasi Borongan"/>
                <div className="kt-portlet__head">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <b>Daftar Importir Dengan Indikasi Borongan</b>
                            </div>
                        </div>
                        <div className="kt-portlet__body">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Dasar Indikasi</label>
                                        <select className="form-control">
                                            <option>Selisih PPN</option>
                                            <option>Perbandingan PPN, KAS dan Persediaan</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Tahun</label>
                                        <input type="email" className="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Filter dengan Selisih Pajak?</label>
                                        <select className="form-control">
                                            <option>Ya, dengan selisih pajak</option>
                                            <option>Tidak, tampilkan semua daftar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <button type="reset" className="btn btn-primary">Tampilkan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndikasiBorongan;
