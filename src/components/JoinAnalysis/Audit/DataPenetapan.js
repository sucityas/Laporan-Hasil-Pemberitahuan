import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class AuditDashboard extends Component {
  render() {
    return (
      <div>
        <SubHeader
          subHeaderTitle="JOIN ANALYSIS"
          breadcrumbs="Data Penetapan"
        />
        <div className="kt-portlet">
          <iframe
            title="Audit Dashboard"
            width="100%"
            height="720"
            src="https://app.powerbi.com/view?r=eyJrIjoiOGU2ZjY5OTAtNmMzMi00ZTZkLTk2MGQtZmNmNGQ5NWMzM2ZjIiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D"
            frameBorder="0"
            allowFullScreen="true"
          />
        </div>
      </div>
    );
  }
}

export default AuditDashboard;
