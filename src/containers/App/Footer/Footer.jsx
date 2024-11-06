import React, {Component} from "react";

export default class Footer extends Component {
    render() {
        return (
            <div style={{zIndex:'97'}}
                className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop"
                id="kt_footer"
            >
                <div className="kt-footer__copyright">
                    2019&nbsp;&copy;&nbsp;
                    <a
                        href="http://www.beacukai.go.id"
                        target="_blank"
                        className="kt-link"
                    >
                        Direktorat Jenderal Bea dan Cukai
                    </a>
                </div>
                <div className="kt-footer__menu">
                    <a
                        href="http://www.beacukai.go.id"
                        target="_blank"
                        className="kt-footer__menu-link kt-link"
                    >
                        Tim CEISA 4.0
                    </a>
                    <a
                        href="http://www.beacukai.go.id"
                        target="_blank"
                        className="kt-footer__menu-link kt-link"
                    >
                        Kontak
                    </a>
                </div>
            </div>
        );
    }
}
