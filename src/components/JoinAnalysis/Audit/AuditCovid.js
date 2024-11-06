import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class AuditCovid extends Component {
    render() {
        return (
            <div>
                <SubHeader
                    subHeaderTitle="COVID-19"
                    breadcrumbs="Dashboard"
                />
                <div className="kt-portlet">
                    <iframe
                        title="Dashboard Covid-19"
                        width="100%"
                        height="720"
                        src="https://app.powerbi.com/view?r=eyJrIjoiNTZiMTFhOTQtNDAyNy00OWRlLTg1OTYtMDliMmE4NWI5NWFlIiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D&pageName=ReportSection"
                        frameBorder="0"
                        allowFullScreen="true"
                    />
                </div>
            </div>
        );
    }
}

export default AuditCovid;