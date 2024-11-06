import React, {Component} from 'react';
import SubHeader from '../header/SubHeader';
import TableauReport from 'tableau-react';
import axios from "axios";

class BC20 extends Component {
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
                const filters = {
                    kd_kantor: ['040300']
                };
                const urlTableau  = 'https://analytics2.customs.go.id/views/DashboardBC20/DASHBOARDBC20/Aplikasi/a8d1054f-5cb5-4dcf-8b6c-87d62b50477c';
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
                <SubHeader subHeaderTitle="Dashboard Nasional" breadcrumbs="Dashboard BC 2.0"/>
                <div className="kt-portlet">
                    {this.state.iframeTableau}
                </div>
            </div>
        );
    }
}

export default BC20;
