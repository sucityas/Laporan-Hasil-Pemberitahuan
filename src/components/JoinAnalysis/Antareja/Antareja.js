import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';

class Antareja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Query: ""
        };
    }

    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs="ANTAREJA"/>
                <div className="kt-portlet__head">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <b>ANTAREJA</b>
                            </div>
                        </div>
                        <div className="kt-portlet__body">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>NPWP</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Tahun</label>
                                        <input type="email" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <button type="reset" className="btn btn-primary">Cari</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Antareja;
