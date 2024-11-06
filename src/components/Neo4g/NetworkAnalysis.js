import React, {Component} from 'react';
import SubHeader from '../header/SubHeader';

class NetworkAnalysis extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{marginTop : "50px"}}>
                <div className="kt-portlet">
                    <iframe src={"/neo4g/network_analysis.html?npwp="+this.props.npwp} width="100%" height="890" style={{border: 0}}></iframe>
                </div>
            </div>
        );
    }
}

export default NetworkAnalysis;
