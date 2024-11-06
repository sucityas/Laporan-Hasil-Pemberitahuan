import React, { Component } from "react";
import MainLayout from "./MainLayout";
// Styling Theme (Load When Authentication Success)
import "typeface-poppins";
import "antd/dist/antd.css";
import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.material.blue.light.compact.css"; // conflict
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import "../../assets/vendors/general/perfect-scrollbar/css/perfect-scrollbar.css";
import "../../assets/vendors/general/tether/dist/css/tether.css";
import "../../assets/vendors/general/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css";
import "../../assets/vendors/general/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css";
// import "../../assets/vendors/general/bootstrap-timepicker/css/bootstrap-timepicker.css";
import "../../assets/vendors/general/bootstrap-daterangepicker/daterangepicker.css";
// import "../../assets/vendors/general/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css";
// import "../../assets/vendors/general/bootstrap-select/dist/css/bootstrap-select.css";
// import "../../assets/vendors/general/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css";
import "../../assets/vendors/general/select2/dist/css/select2.css";
import "../../assets/vendors/general/ion-rangeslider/css/ion.rangeSlider.css";
import "../../assets/vendors/general/nouislider/distribute/nouislider.css";
import "../../assets/vendors/general/owl.carousel/dist/assets/owl.carousel.css";
import "../../assets/vendors/general/owl.carousel/dist/assets/owl.theme.default.css";
import "../../assets/vendors/general/dropzone/dist/dropzone.css";
import "../../assets/vendors/general/summernote/dist/summernote.css";
import "../../assets/vendors/general/bootstrap-markdown/css/bootstrap-markdown.min.css";
import "../../assets/vendors/general/animate.css/animate.css";
import "../../assets/vendors/general/toastr/build/toastr.css";
import "../../assets/vendors/general/morris.js/morris.css";
import "../../assets/vendors/general/sweetalert2/dist/sweetalert2.css";
import "../../assets/vendors/general/socicon/css/socicon.css";
import "../../assets/vendors/custom/vendors/line-awesome/css/line-awesome.css";
import "../../assets/vendors/custom/vendors/flaticon/flaticon.css";
import "../../assets/vendors/custom/vendors/flaticon2/flaticon.css";
import "../../assets/vendors/general/@fortawesome/fontawesome-free/css/all.min.css";
import "../../assets/css/style.bundle.min.css";
import "../../assets/css/skins/header/base/light.css";
import "../../assets/css/skins/header/menu/light.css";
import "../../assets/css/skins/brand/dark.css";
import "../../assets/css/skins/aside/dark.css";
import "../../assets/css/customs.style.css";

class MainApp extends Component {
  render() {
    const { match, location, keycloak, authenticated, loading, handleLogout, userData, menu} = this.props;
    return (
      <MainLayout
        {...this.props}
        userData={userData}
        menu={menu}
        keycloak={keycloak}
        authenticated={authenticated}
        match={match}
        path={location.pathname}
        loading={loading}
        handleLogout={handleLogout}
      />
    );
  }
}

export default MainApp
