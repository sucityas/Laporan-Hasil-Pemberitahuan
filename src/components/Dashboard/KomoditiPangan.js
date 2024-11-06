import React, {Component} from 'react';
import SubHeader from '../header/SubHeader';
import TableauReport from 'tableau-react';
import axios from "axios";

class KomoditiPangan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iframeTableau: ""
        };
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_SCE_WS + `/tableau/get-token`, {headers: {
                'customs-api-key': process.env.REACT_APP_SECRET_KEY_SCE_WS
            }})
            .then(res => {
                const options = {
                    hideTabs: true,
                    width: '100%',
                    height: 1000,
                };
                const urlTableau  = 'https://analytics2.customs.go.id/views/DashboardImporKomoditiPangan/DASHBOARDKOMODITIPANGAN/c59bf35a-9c39-4331-abf4-8eb693cb650a/664e2397-bdae-4f11-be0e-aea193f53629';
                this.setState({
                    iframeTableau: <TableauReport
                        url={urlTableau}
                        token={res.data.token}
                        options={options}
                        query="?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link&:showShareOptions=false&:customViews=no"
                    />
                });
            });
    }
    render() {
        return (
            <div>
                <SubHeader subHeaderTitle="Dashboard Nasional" breadcrumbs="Dashboard Komoditi Pangan"/>
                <div className="kt-portlet">
                    {this.state.iframeTableau}
                </div>
            </div>
        );
    }
}

export default KomoditiPangan;
