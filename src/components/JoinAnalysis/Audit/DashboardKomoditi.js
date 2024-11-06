import React, { Component } from "react";
import SubHeader from "../../header/SubHeader";

class DashboardKomoditi extends Component {
  render() {
    return (
      <div>
        <SubHeader
          subHeaderTitle="Audit"
          breadcrumbs="Dasboard Komoditi"
        />
        <div className="kt-portlet">
          <iframe
            title="Audit Dashboard"
            width="100%"
            height="720"
            src="https://app.powerbi.com/view?r=eyJrIjoiZmRmMTE5ZTAtMjExNS00ZWEwLTliNTUtZTNlMjg4ZjJhYmM2IiwidCI6IjYxYWMxNWExLTM3N2EtNDg4ZC1iYWM2LWIyZjE5NWIzOGU5YiIsImMiOjEwfQ%3D%3D"
            frameBorder="0"
            allowFullScreen="true"
          />
        </div>
      </div>
    );
  }
}

export default DashboardKomoditi;