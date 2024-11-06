import React, {Component} from 'react';

export default class HeaderMobile extends Component{
    render() {
        return (
            <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
                <div className="kt-header-mobile__logo">
                    <a href="demo1/index.html">
                        <img alt="Logo" src="./assets/media/logos/logo-light.png"/>
                    </a>
                </div>
                <div className="kt-header-mobile__toolbar">
                    <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left"
                            id="kt_aside_mobile_toggler"><span></span></button>
                    <button className="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span></span></button>
                    <button className="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i
                        className="flaticon-more"></i></button>
                </div>
            </div>
        )
    }
}