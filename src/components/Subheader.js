import React, { Component } from "react";

export default class Subheader extends Component {
  render() {
    return (
      <div className="kt-subheader kt-grid__item" id="kt_subheader">
        <div className="kt-subheader__main">
          <h3 className="kt-subheader__title">Empty Page </h3>
          <span className="kt-subheader__separator kt-hidden" />
          <div className="kt-subheader__breadcrumbs">
            <a href="/#a" className="kt-subheader__breadcrumbs-home">
              <i className="flaticon2-shelter" />
            </a>
            <span className="kt-subheader__breadcrumbs-separator" />
            <a className="kt-subheader__breadcrumbs-link">General </a>
            <span className="kt-subheader__breadcrumbs-separator" />
            <a className="kt-subheader__breadcrumbs-link">Empty Page </a>
          </div>
        </div>
        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper">
            <a href="/#a" className="btn kt-subheader__btn-primary">
              Actions &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                className="kt-svg-icon kt-svg-icon--sm"
              >
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <rect id="bound" x={0} y={0} width={24} height={24} />
                  <rect
                    id="Rectangle-8"
                    fill="#000000"
                    x={4}
                    y={5}
                    width={16}
                    height={3}
                    rx="1.5"
                  />
                  <path
                    d="M7.5,11 L16.5,11 C17.3284271,11 18,11.6715729 18,12.5 C18,13.3284271 17.3284271,14 16.5,14 L7.5,14 C6.67157288,14 6,13.3284271 6,12.5 C6,11.6715729 6.67157288,11 7.5,11 Z M10.5,17 L13.5,17 C14.3284271,17 15,17.6715729 15,18.5 C15,19.3284271 14.3284271,20 13.5,20 L10.5,20 C9.67157288,20 9,19.3284271 9,18.5 C9,17.6715729 9.67157288,17 10.5,17 Z"
                    id="Combined-Shape"
                    fill="#000000"
                    opacity="0.3"
                  />
                </g>
              </svg>{" "}
            </a>
            <div
              className="dropdown dropdown-inline"
              data-toggle="kt-tooltip"
              title="Quick actions"
              data-placement="left"
            >
              <a
                href="/#a"
                className="btn btn-icon"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  className="kt-svg-icon kt-svg-icon--success kt-svg-icon--md"
                >
                  <g
                    stroke="none"
                    strokeWidth={1}
                    fill="none"
                    fillRule="evenodd"
                  >
                    <polygon id="Shape" points="0 0 24 0 24 24 0 24" />
                    <path
                      d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
                      id="Combined-Shape"
                      fill="#000000"
                      fillRule="nonzero"
                      opacity="0.3"
                    />
                    <path
                      d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
                      id="Combined-Shape"
                      fill="#000000"
                    />
                  </g>
                </svg>
              </a>
              <div className="dropdown-menu dropdown-menu-fit dropdown-menu-md dropdown-menu-right">
                <ul className="kt-nav">
                  <li className="kt-nav__head">
                    Add anything or jump to:
                    <i
                      className="flaticon2-information"
                      data-toggle="kt-tooltip"
                      data-placement="right"
                      title="Click to learn more..."
                    />
                  </li>
                  <li className="kt-nav__separator" />
                  <li className="kt-nav__item">
                    <a href="/#a" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-drop" />
                      <span className="kt-nav__link-text">Order</span>
                    </a>
                  </li>
                  <li className="kt-nav__item">
                    <a href="/#a" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-calendar-8" />
                      <span className="kt-nav__link-text">Ticket</span>
                    </a>
                  </li>
                  <li className="kt-nav__item">
                    <a href="/#a" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-link" />
                      <span className="kt-nav__link-text">Goal</span>
                    </a>
                  </li>
                  <li className="kt-nav__item">
                    <a href="/#a" className="kt-nav__link">
                      <i className="kt-nav__link-icon flaticon2-new-email" />
                      <span className="kt-nav__link-text">Support Case</span>
                      <span className="kt-nav__link-badge">
                        <span className="kt-badge kt-badge--success">5</span>
                      </span>
                    </a>
                  </li>
                  <li className="kt-nav__separator" />
                  <li className="kt-nav__foot">
                    <a
                      className="btn btn-label-brand btn-bold btn-sm"
                      href="/#a"
                    >
                      Upgrade plan
                    </a>
                    <a
                      className="btn btn-clean btn-bold btn-sm"
                      href="/#a"
                      data-toggle="kt-tooltip"
                      data-placement="right"
                      title="Click to learn more..."
                    >
                      Learn more
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
