import React, {Component} from 'react';
import SubHeader from '../header/SubHeader';
import TableauReport from 'tableau-react';
import axios from "axios";

class BC30Cleansing extends Component {
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
                    width: '100%',
                    height: 1000,
                    hideTabs: true
                };
                const urlTableau  = 'https://analytics2.customs.go.id/views/DashboardBC30CLEANSING/DASHBOARDBC30CLEANSING';
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
                <SubHeader subHeaderTitle="Dashboard Nasional" breadcrumbs="Dashboard BC 3.0 - Cleansing"/>
                <div className="kt-portlet">
                    {this.state.iframeTableau}
                </div>
            </div>
        );
    }
}

export default BC30Cleansing;
