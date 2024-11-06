import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class AuditDashboard extends Component {
  render() {
    return (
      <div>
        <SubHeader
          subHeaderTitle="JOIN ANALYSIS"
          breadcrumbs="AUDIT Dashboard"
        />
        <div className="kt-portlet">
          <iframe
            title="Audit Dashboard"
            width="100%"
            height="720"
            src="https://app.powerbi.com/view?r=eyJrIjoiOTFkNTMyOGQtM2M3My00MzdmLWI2ZDYtYWE4ZWFlOGU1MmZiIiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D"
            frameBorder="0"
            allowFullScreen="true"
          />
        </div>
      </div>
    );
  }
}

export default AuditDashboard;
