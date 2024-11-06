import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';
import {Spin} from 'antd'
import TableauReport from 'tableau-react';
import axios from "axios";

class AntarejaDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iframeTableau: <div><Spin/></div>
        };
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_SCE_WS + `/tableau/get-token`, {headers: {
                'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
            }})
            .then(res => {
                const options = {
                    hideTabs: true
                };
                const urlTableau  = 'https://analytics2.customs.go.id/views/DSAB/DImportirpakeygini?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link';
                this.setState({
                    iframeTableau: <TableauReport
                        url={urlTableau}
                        token={res.data.token}
                        options={options}
                        query="?:embed=no&:comments=no&:toolbar=yes&:refresh=no&:tabs=no&:original_view:no"
                    />
                });
            });
    }
    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs="SAT Dashboard"/>
                <div className="kt-portlet">
                    {this.state.iframeTableau}
                </div>
            </div>
        );
    }
}

export default AntarejaDashboard;
