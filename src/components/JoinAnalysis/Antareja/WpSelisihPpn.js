import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';

class WpSelisihPpn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Query: ""
        };
    }

    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs="WP Selisih PPN"/>
                <div className="kt-portlet__head">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <b>Daftar WP dengan Selisih PPN Impor </b>
                            </div>
                        </div>
                        <div className="kt-portlet__body">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Tahun</label>
                                        <input type="email" className="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Range Selisih</label>
                                        <select className="form-control">
                                            <option>0 - 50 Juta</option>
                                            <option>50 Juta - 100 Juta</option>
                                            <option>100 Juta - 500 Juta</option>
                                            <option>500 Juta - 1M</option>
                                            <option>0 Juta - 50 Juta</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Kelompok Selisih</label>
                                        <select className="form-control">
                                            <option>Lebih</option>
                                            <option>Kurang</option>
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

export default WpSelisihPpn;
