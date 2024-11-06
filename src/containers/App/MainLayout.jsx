import React, { Component, Fragment } from "react";

// Import Component
import Header from "./Header/Header";
import HeaderMobile from "./Header/HeaderMobile";
import SubHeader from "./Header/SubHeader";
import Sidebar from "./Sidebar/Sidebar";
import Content from "../../pages";
import Footer from "./Footer/Footer";
import LoadingWrapperSkelton from "../../components/LoadingWrapperSkeleton";


export default class MainLayout extends Component {
  render() {
    const { loading, userData, keycloak, authenticated, handleLogout} = this.props;
    return (
      <Fragment>
        <HeaderMobile />
        <div className="kt-grid kt-grid--hor kt-grid--root">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
            <Sidebar {...this.props} loading={loading} />
            <div
              className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
              id="kt_wrapper">
              <Header {...this.props}
                keycloak={keycloak}
                authenticated={authenticated}
                handleLogout={handleLogout}
                userData={userData}
              />
              <SubHeader />
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid"
                id="kt_content"
              >
                {authenticated && keycloak ? (
                  <Content {...this.props} />
                ) : <LoadingWrapperSkelton />}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
