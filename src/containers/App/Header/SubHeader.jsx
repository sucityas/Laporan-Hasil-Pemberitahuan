import React, { Component } from "react";
import {connect} from "react-redux";

class SubHeader extends Component {
  render() {
    return this.props.isLoadMicro ? (
      <div className="kt-subheader   kt-grid__item" id="kt_subheader">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">{'Mohon Tunggu ...'}</h3>
        </div>
      </div>
    ) : (
      <div className="kt-subheader   kt-grid__item" id="kt_subheader">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">CEISA 4.0</h3>
          <span className="kt-subheader__separator kt-subheader__separator--v"></span>
          <span className="kt-subheader__desc"></span>
          {/* <button className="btn btn-label-warning btn-bold btn-sm btn-icon-h kt-margin-l-10">
            Add New
          </button> */}
          <div className="kt-input-icon kt-input-icon--right kt-subheader__search kt-hidden">
            <input
              type="text"
              className="form-control"
              placeholder="Search order..."
              id="generalSearch"
            />
            <span className="kt-input-icon__icon kt-input-icon__icon--right">
              <span>
                <i className="flaticon2-search-1"></i>
              </span>
            </span>
          </div>
        </div>
        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper">
            {/*<button className="btn kt-subheader__btn-secondary">Today</button>*/}
            {/*<button className="btn kt-subheader__btn-secondary">Month</button>*/}
            {/*<button className="btn kt-subheader__btn-secondary">Year</button>*/}
            {/*<button className="btn kt-subheader__btn-primary">*/}
            {/*  Actions &nbsp;*/}
            {/*  <svg*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*    width="24px"*/}
            {/*    height="24px"*/}
            {/*    viewBox="0 0 24 24"*/}
            {/*    version="1.1"*/}
            {/*    className="kt-svg-icon kt-svg-icon--sm"*/}
            {/*  >*/}
            {/*    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">*/}
            {/*      <rect id="bound" x="0" y="0" width="24" height="24" />*/}
            {/*      <rect*/}
            {/*        id="Rectangle-8"*/}
            {/*        fill="#000000"*/}
            {/*        x="4"*/}
            {/*        y="5"*/}
            {/*        width="16"*/}
            {/*        height="3"*/}
            {/*        rx="1.5"*/}
            {/*      />*/}
            {/*      <path*/}
            {/*        d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z"*/}
            {/*        id="Combined-Shape"*/}
            {/*        fill="#000000"*/}
            {/*        opacity="0.3"*/}
            {/*      />*/}
            {/*    </g>*/}
            {/*  </svg>{" "}*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    isLoadMicro: state.headerIsLoading
  }
}

export default connect(stateToProps, null)(SubHeader)
