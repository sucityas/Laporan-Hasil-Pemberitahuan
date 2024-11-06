import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HeaderMobile extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div
        style={{visibility: loading ? 'hidden' : 'visible'}}
        id="kt_header_mobile"
        className="kt-header-mobile  kt-header-mobile--fixed "
      >
        <div className="kt-header-mobile__logo">
          <Link to="/">
            <img alt="Logo" src="/assets/media/logos/ceisa.png" className="logo-mobile" />
          </Link>
        </div>
        <div className="kt-header-mobile__toolbar">
          <button
            className="kt-header-mobile__toggler kt-header-mobile__toggler--left"
            id="kt_aside_mobile_toggler"
          >
            <span></span>
          </button>
          <button
            className="kt-header-mobile__toggler"
            id="kt_header_mobile_toggler"
          >
            <span></span>
          </button>
          <button
            className="kt-header-mobile__topbar-toggler"
            id="kt_header_mobile_topbar_toggler"
          >
            <i className="flaticon-more"></i>
          </button>
        </div>
      </div>
    );
  }
}
