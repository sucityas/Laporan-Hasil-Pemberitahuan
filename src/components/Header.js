import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getUser} from "../utils/DataUser";

export default class Header extends Component {
  state = {
    initials: null,
    firstName: null,
    lastName: null,
    name: null,
  };

  logout = () => {
    localStorage.clear();
    const { logout } = this.props.keycloak;
    return logout();
  };

  getDataUser = () => {
    // Get dataUser from LocalStorage
    const { firstName = '', lastName = '' } = getUser(),
      fName = firstName || "",
      lName = lastName || "",
      name = fName + lName;
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return this.setState({ initials, fName, lName, name });
  };

  componentDidMount() {
    this.getDataUser();
  }

  render() {
    const { firstName, name, initials } = this.state
    return (
      <div
        id="kt_header"
        className="kt-header kt-grid__item  kt-header--fixed "
      >
        <button
          className="kt-header-menu-wrapper-close"
          id="kt_header_menu_mobile_close_btn"
        >
          <i className="la la-close" />
        </button>
        <div className="kt-header-menu-wrapper" id="kt_header_menu_wrapper" />
        <div className="kt-header__topbar">
          <div
            className="kt-header__topbar-item kt-header__topbar-item--search dropdown"
            id="kt_quick_search_toggle"
          >
            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg">
              <div
                className="kt-quick-search kt-quick-search--inline"
                id="kt_quick_search_inline"
              >
                <form method="get" className="kt-quick-search__form">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="flaticon2-search-1" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control kt-quick-search__input"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="la la-close kt-quick-search__close" />
                      </span>
                    </div>
                  </div>
                </form>
                <div
                  className="kt-quick-search__wrapper kt-scroll"
                  data-scroll="true"
                  data-height={300}
                  data-mobile-height={200}
                ></div>
              </div>
            </div>
          </div>
          <div className="kt-header__topbar-item dropdown">
            <div
              className="kt-header__topbar-wrapper"
              data-toggle="dropdown"
              data-offset="30px,0px"
              aria-expanded="true"
            >
              <span className="kt-header__topbar-icon kt-pulse kt-pulse--brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  className="kt-svg-icon"
                >
                  <g
                    stroke="none"
                    strokeWidth={1}
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect id="bound" x={0} y={0} width={24} height={24} />
                    <path
                      d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z"
                      id="Combined-Shape"
                      fill="#000000"
                      opacity="0.3"
                    />
                    <path
                      d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z"
                      id="Combined-Shape"
                      fill="#000000"
                    />
                  </g>
                </svg>
                <span className="kt-pulse__ring" />
              </span>
            </div>
            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
              <form>
                <div
                  className="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
                  style={{
                    backgroundImage: "url(/assets/media/misc/bg-1.jpg)"
                  }}
                >
                  <h3 className="kt-head__title">
                    User Notifications &nbsp;
                    <span className="btn btn-success btn-sm btn-bold btn-font-md">
                      23 new
                    </span>
                  </h3>
                  <ul
                    className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active show"
                        data-toggle="tab"
                        href="#topbar_notifications_notifications"
                        role="tab"
                        aria-selected="true"
                      >
                        Alerts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#topbar_notifications_events"
                        role="tab"
                        aria-selected="false"
                      >
                        Events
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#topbar_notifications_logs"
                        role="tab"
                        aria-selected="false"
                      >
                        Logs
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content">
                  <div
                    className="tab-pane active show"
                    id="topbar_notifications_notifications"
                    role="tabpanel"
                  >
                    <div
                      className="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                      data-scroll="true"
                      data-height={300}
                      data-mobile-height={200}
                    >
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-line-chart kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New order has been received
                          </div>
                          <div className="kt-notification__item-time">
                            2 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-box-1 kt-font-brand" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer is registered
                          </div>
                          <div className="kt-notification__item-time">
                            3 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-chart2 kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Application has been approved
                          </div>
                          <div className="kt-notification__item-time">
                            3 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-image-file kt-font-warning" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New file has been uploaded
                          </div>
                          <div className="kt-notification__item-time">
                            5 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-bar-chart kt-font-info" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New user feedback received
                          </div>
                          <div className="kt-notification__item-time">
                            8 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-pie-chart-2 kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            System reboot has been successfully completed
                          </div>
                          <div className="kt-notification__item-time">
                            12 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-favourite kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New order has been placed
                          </div>
                          <div className="kt-notification__item-time">
                            15 hrs ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="kt-notification__item kt-notification__item--read"
                      >
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-safe kt-font-primary" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Company meeting canceled
                          </div>
                          <div className="kt-notification__item-time">
                            19 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-psd kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New report has been received
                          </div>
                          <div className="kt-notification__item-time">
                            23 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon-download-1 kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Finance report has been generated
                          </div>
                          <div className="kt-notification__item-time">
                            25 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon-security kt-font-warning" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer comment recieved
                          </div>
                          <div className="kt-notification__item-time">
                            2 days ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-pie-chart kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer is registered
                          </div>
                          <div className="kt-notification__item-time">
                            3 days ago
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="topbar_notifications_events"
                    role="tabpanel"
                  >
                    <div
                      className="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                      data-scroll="true"
                      data-height={300}
                      data-mobile-height={200}
                    >
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-psd kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New report has been received
                          </div>
                          <div className="kt-notification__item-time">
                            23 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon-download-1 kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Finance report has been generated
                          </div>
                          <div className="kt-notification__item-time">
                            25 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-line-chart kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New order has been received
                          </div>
                          <div className="kt-notification__item-time">
                            2 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-box-1 kt-font-brand" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer is registered
                          </div>
                          <div className="kt-notification__item-time">
                            3 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-chart2 kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Application has been approved
                          </div>
                          <div className="kt-notification__item-time">
                            3 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-image-file kt-font-warning" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New file has been uploaded
                          </div>
                          <div className="kt-notification__item-time">
                            5 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-bar-chart kt-font-info" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New user feedback received
                          </div>
                          <div className="kt-notification__item-time">
                            8 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-pie-chart-2 kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            System reboot has been successfully completed
                          </div>
                          <div className="kt-notification__item-time">
                            12 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-favourite kt-font-brand" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New order has been placed
                          </div>
                          <div className="kt-notification__item-time">
                            15 hrs ago
                          </div>
                        </div>
                      </a>
                      <a
                        href="#!"
                        className="kt-notification__item kt-notification__item--read"
                      >
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-safe kt-font-primary" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Company meeting canceled
                          </div>
                          <div className="kt-notification__item-time">
                            19 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-psd kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New report has been received
                          </div>
                          <div className="kt-notification__item-time">
                            23 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon-download-1 kt-font-danger" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            Finance report has been generated
                          </div>
                          <div className="kt-notification__item-time">
                            25 hrs ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon-security kt-font-warning" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer comment recieved
                          </div>
                          <div className="kt-notification__item-time">
                            2 days ago
                          </div>
                        </div>
                      </a>
                      <a href="#!" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                          <i className="flaticon2-pie-chart kt-font-success" />
                        </div>
                        <div className="kt-notification__item-details">
                          <div className="kt-notification__item-title">
                            New customer is registered
                          </div>
                          <div className="kt-notification__item-time">
                            3 days ago
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="topbar_notifications_logs"
                    role="tabpanel"
                  >
                    <div
                      className="kt-grid kt-grid--ver"
                      style={{ minHeight: "200px" }}
                    >
                      <div className="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">
                        <div className="kt-grid__item kt-grid__item--middle kt-align-center">
                          All caught up!
                          <br />
                          No new notifications.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="kt-header__topbar-item kt-header__topbar-item--user">
            <div
              className="kt-header__topbar-wrapper"
              data-toggle="dropdown"
              data-offset="0px,0px"
            >
              <div className="kt-header__topbar-user">
                <span className="kt-header__topbar-welcome kt-hidden-mobile">
                  HAI!{" "}
                </span>
                <span className="kt-header__topbar-username kt-hidden-mobile">
                  {firstName}
                </span>
                <img
                  className="kt-hidden"
                  alt="Pic"
                  src="/assets/media/users/300_25.jpg"
                />
                <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                  {initials}
                </span>
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
              <div
                className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                style={{ backgroundImage: "url(/assets/media/misc/bg-1.jpg)" }}
              >
                <div className="kt-user-card__avatar">
                  <img
                    className="kt-hidden"
                    alt="Pic"
                    src="/assets/media/users/300_25.jpg"
                  />
                  <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                    {initials}
                  </span>
                </div>
                <div className="kt-user-card__name">{name}</div>
              </div>
              <div className="kt-notification">
                <Link to="/profile" className="kt-notification__item">
                  <div className="kt-notification__item-icon">
                    <i className="flaticon2-cardiogram kt-font-warning" />
                  </div>
                  <div className="kt-notification__item-details">
                    <div className="kt-notification__item-title kt-font-bold">
                      Profil Pengguna
                    </div>
                    <div className="kt-notification__item-time">
                      Detail Halaman Profil Pengguna
                    </div>
                  </div>
                </Link>
                <div className="kt-notification__custom kt-space-between">
                  <button
                    onClick={() => this.logout()}
                    className="btn btn-label btn-label-brand btn-sm btn-bold"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
