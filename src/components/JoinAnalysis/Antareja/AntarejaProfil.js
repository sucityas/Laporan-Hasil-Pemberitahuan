import React, {Component} from 'react';
import SubHeader from '../../header/SubHeader';
import {Spin} from 'antd'
import TableauReport from 'tableau-react';
import axios from "axios";

class AntarejaProfil extends Component {
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
                const filters = {
                    kd_kantor: ['040300']
                };
                const urlTableau  = 'https://analytics2.customs.go.id/views/DSAB/DProfil?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link';
                this.setState({
                    iframeTableau: <TableauReport
                        url={urlTableau}
                        token={res.data.token}
                        filter={filters}
                        options={options}
                        query="?:embed=yes&:comments=no&:toolbar=no&:refresh=yes"
                    />
                });
            });
    }
    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="JOINT ANALYSIS" breadcrumbs="SAT Profil"/>
                <div className="kt-portlet">
                    {this.state.iframeTableau}
                </div>
            </div>
        );
    }
}

export default AntarejaProfil;
