import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class DataTargetting extends Component {
  render() {
    return (
      <div>
        <SubHeader
          subHeaderTitle="JOIN ANALYSIS"
          breadcrumbs="Data Targetting"
        />
        <div className="kt-portlet">
          <iframe
            title="Audit Dashboard"
            width="100%"
            height="720"
            src="https://app.powerbi.com/view?r=eyJrIjoiN2QzMzczNzYtMzFiYi00ZTFhLWIyMTQtYTQ1YmJlZmZhOWVlIiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D&pageName=ReportSection27bfb1c0b573ee742e28"
            frameBorder="0"
            allowFullScreen="true"
          />
        </div>
      </div>
    );
  }
}

export default DataTargetting;