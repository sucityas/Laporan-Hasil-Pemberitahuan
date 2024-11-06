import {Component} from "react";
import React from "react";

class SubHeader extends Component {
    render() {
        return (
            <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                <div className="kt-subheader__main">
                    <h3 className="kt-subheader__title">{this.props.subHeaderTitle}</h3>
                    <span className="kt-subheader__separator kt-hidden" />
                    <div className="kt-subheader__breadcrumbs">
                        <span className="kt-subheader__breadcrumbs-separator" />
                        {this.props.breadcrumbs}
                    </div>
                </div>
                <div className="kt-subheader__toolbar">
                    {this.props.toolbar}
                </div>
            </div>
        )
    }
}

export default SubHeader;
