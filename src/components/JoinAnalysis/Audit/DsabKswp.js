import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class DsabKswp extends Component {
    render() {
        return (
            <div>
                <SubHeader
                    subHeaderTitle="JOIN ANALYSIS"
                    breadcrumbs="DSAB KSWP"
                />
                <div className="kt-portlet">
                    <iframe
                        title="Audit Dashboard"
                        width="100%"
                        height="720"
                        src="https://app.powerbi.com/view?r=eyJrIjoiOTNlODIwNmUtY2YwNi00NGQzLWI4NTAtNjg3ZjM4ZTc4M2QxIiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D"
                        frameBorder="0"
                        allowFullScreen="true"
                    />
                </div>
            </div>
        );
    }
}

export default DsabKswp;