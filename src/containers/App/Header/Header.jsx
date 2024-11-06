import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import setKeycloak from "../../../appRedux/actionCreators/login";
import Axios from "axios";
import {Icon, notification, Pagination, Spin, Tabs, Button} from "antd";
import firebase from "firebase/app";
import "firebase/firestore";
import { getUser } from "../../../utils/DataUser"
import './Header.css'
import moment from "moment";
import HttpRequest from '../../../utils/HttpRequest'
const { REACT_APP_AMWS } = process.env;

// const config = {
//   apiKey: "AIzaSyCmU1fwNoR3QssG_MxhbV0a2iMKoTjhx9s",
//   authDomain: "fir-server-258009.firebaseapp.com",
//   databaseURL: "https://fir-server-258009.firebaseio.com",
//   projectId: "firebase-server-258009",
//   storageBucket: "firebase-server-258009.appspot.com",
//   messagingSenderId: "155924955049",
//   appId: "1:155924955049:web:3d044491883c3591a48eb8",
//   measurementId: "G-M2NDCZ0S7L",
// };

// firebase.initializeApp(null);

// export const db = firebase.firestore();
const {REACT_APP_NOTIFIKASI} = process.env
const {TabPane} = Tabs
function NotifItem({item, updateNotif}) {
    const waktuTerima = moment(item.waktuTerima)
    const timelapse = waktuTerima.isValid() ? waktuTerima.fromNow() : ''
    const [tabKey, setTabKey] = useState('1')
    const [isRead, setIsRead] = useState(item.waktuBaca)
    useEffect(()=> {
        if(tabKey === '2' && !isRead) {
            setIsRead(true)
            updateNotif(item.idInboxNotificationUser)
        }
    }, [tabKey, isRead])
    return (
        <Tabs className="notif-header" activeKey={tabKey} tabBarStyle={{display: 'none'}}>
            <TabPane tab="Title" key="1">
                <a className="kt-notification__item" onClick={()=> setTabKey('2')}>
                    <div className="kt-notification__item-icon">
                        {isRead ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px"
                                 height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <rect id="bound" x="0" y="0" width="24" height="24"/>
                                    <path
                                        d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z"
                                        id="Combined-Shape" fill="#000000" opacity="0.3"/>
                                    <path
                                        d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z"
                                        id="Combined-Shape" fill="#000000"/>
                                </g>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px"
                                 height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <rect id="bound" x="0" y="0" width="24" height="24"/>
                                    <path
                                        d="M5,6 L19,6 C20.1045695,6 21,6.8954305 21,8 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,8 C3,6.8954305 3.8954305,6 5,6 Z M18.1444251,7.83964668 L12,11.1481833 L5.85557487,7.83964668 C5.4908718,7.6432681 5.03602525,7.77972206 4.83964668,8.14442513 C4.6432681,8.5091282 4.77972206,8.96397475 5.14442513,9.16035332 L11.6444251,12.6603533 C11.8664074,12.7798822 12.1335926,12.7798822 12.3555749,12.6603533 L18.8555749,9.16035332 C19.2202779,8.96397475 19.3567319,8.5091282 19.1603533,8.14442513 C18.9639747,7.77972206 18.5091282,7.6432681 18.1444251,7.83964668 Z"
                                        id="Combined-Shape" fill="#000000"/>
                                </g>
                            </svg>
                        )}
                    </div>
                    <div className="kt-notification__item-details">
                        <div className={`kt-notification__item-title ${!isRead ? 'unread-notif' : ''}`}>
                            {item.title || ''}
                        </div>
                        <div className="kt-notification__item-time">
                            {timelapse}
                        </div>
                    </div>
                </a>
            </TabPane>
            <TabPane tab="Detail" key="2">
                <div className="kt-notification__item kt-notification__item_detail">
                    <div className="kt-notification__item-icon">
                        <Icon type="arrow-left" onClick={()=> setTabKey('1')} style={{zIndex: 101, cursor: 'pointer'}} />
                    </div>
                    <div className="kt-notification__item-details">
                        <div className="kt-notification__item-title">
                            {item.detail || <i>this notification has no content</i>}
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    )
}
class Header extends Component {
    state = {
        fullName: "",
        fName: "",
        lName: "",
        initialName: "",
        logoutAllDevicesLoading: false,
        userData: {},
        notifUnread: 0,
        notifList: [],
        notifLoading: true,
        currentPage: 0,
        pageSizze: 10,
        totalNotif: 0,
        isFailedGetlistNotif: false
    };

    commonLogout = () => {
        // === punya manifes ===
        const dataUser = getUser()
        if (dataUser && (dataUser.paths || []).includes('/manifest')) {
            Axios({
                method: 'POST',
                url: 'https://apidev.beacukai.go.id/ManifesSchema/v1/DataDasarSurat/LogOut',
                headers: { "Beacukai-Api-Key": process.env.REACT_APP_SECRET_KEY_MANIFEST },
                data: {
                    nipRekam: dataUser.nip
                }
            })
                .then(({ data }) => { console.log(data) })
                .catch(err => console.log(err, "<<< error manifest lampiran redress set null isActive"))
        }
        // =========
        this.props.setKeycloak('', '');
        this.props.handleLogout(true);
    };

    async getNotifUnread(identitas) {
        try {
            const {data: {data}} = await HttpRequest.get({url: `${REACT_APP_NOTIFIKASI}/v1/notification/unread-notification?idUser=${identitas}`})
            this.setState({
                notifUnread: data || 0
            })
        } catch (e) {

        }
    }

    async getNotifList(identitas) {
        const {currentPage, pageSizze} = this.state
        this.setState({notifLoading: true, isFailedGetlistNotif: false})
        try {
            const {data: {data, total}} = await HttpRequest.get({url: `${REACT_APP_NOTIFIKASI}/v1/notification/browse-notification-by-user?idUser=${identitas}&page=${currentPage}&size=${pageSizze}`})
            this.setState({
                notifList: data || [],
                totalNotif: total,
                notifLoading: false
            })
            const myDiv = document.getElementById('containerDiv');
            myDiv.scrollTop = 0;
        } catch (e) {
            this.setState({notifLoading: false, isFailedGetlistNotif: true})
        }
    }

    async updateNotifWkBaca(idInboxNotificationUser) {
        try {
            await HttpRequest.post({url: `${REACT_APP_NOTIFIKASI}/v1/notification/update-waktu-baca?idInboxNotificationUser=${idInboxNotificationUser}`})
            await this.getNotifUnread(this.state.identitas)
        } catch (e) {
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.userData !== this.props.userData &&
            prevState.userData !== this.props.userData
        ) {
            const { userData } = this.props;
            let initialName = "";
            const {nip: identitas} = userData
            this.getNotifUnread(identitas).then()
            this.getNotifList(identitas).then()
            if (userData && userData.namaPegawai) {
                initialName = userData.namaPegawai.match(/\b\w/g) || [];
                initialName = (
                    (initialName.shift() || "") + (initialName.pop() || "")
                ).toUpperCase();
                this.setState({ initialName, identitas });
                this.handleNotification(userData.nip);
            }
        }
    }

    handleLogoutAllDevice = async () => {
        this.setState({ logoutAllDevicesLoading: true });
        const path = "/v1/user/revoke-token";
        Axios({
            url: REACT_APP_AMWS + path,
            method: "POST",
            headers: {
                // "Beacukai-Api-Key": REACT_APP_SECRET_KEY_AMWS,
                Authorization: this.props.keycloak,
                accept: "application/json",
            },
        })
            .then((result) => {
                if (result.data && result.data.status === "success") {
                    this.setState({ logoutAllDevicesLoading: false });
                    this.commonLogout();
                } else {
                    this.setState({ logoutAllDevicesLoading: false });
                    this.notifError();
                }
            })
            .catch(() => {
                this.setState({ logoutAllDevicesLoading: false });
                this.notifError();
            });
    };

    notifError() {
        notification.error({
            message: "Terjadi Kesalahan",
            description: "Mohon refresh browser anda atau coba kembali.",
        });
    }

    handleNotification(nip) {
        try {
            // console.log("subscribe for notification:", nip);
            // const doc = db.collection("notification").doc(nip);
            const doc = null;
            const observer = doc.onSnapshot(
                (docSnapshot) => {
                    console.log("typeof(docSnapshot)", typeof docSnapshot.data());

                    if (typeof docSnapshot.data() != "undefined") {
                        if (!docSnapshot.data().is_read) {
                            notification.info({
                                message: docSnapshot.data().title,
                                description: docSnapshot.data().body,
                            });
                            this.getNotifUnread(this.state.identitas)
                            doc.set({
                                title: docSnapshot.data().title,
                                body: docSnapshot.data().body,
                                is_read: true,
                            });
                        }
                    }
                },
                (err) => {
                    console.log(`Encountered error: ${err}`);
                }
            );
        } catch (e) {
            console.log(`Encountered error2: ${e}`);
        }
    }

    render() {
        const { userData } = this.props;
        const { logoutAllDevicesLoading } = this.state;
        const {isFailedGetlistNotif, initialName, notifUnread, notifList, totalNotif, currentPage, identitas, notifLoading} = this.state;

        return (
            <div
                id="kt_header"
                className="kt-header kt-grid__item  kt-header--fixed "
            >
                <button
                    className="kt-header-menu-wrapper-close"
                    id="kt_header_menu_mobile_close_btn"
                >
                    <i className="la la-close"></i>
                </button>
                <div className="kt-header-menu-wrapper" id="kt_header_menu_wrapper">
                    <div
                        id="kt_header_menu"
                        className="kt-header-menu kt-header-menu-mobile  kt-header-menu--layout-default "
                    ></div>
                </div>
                <div className="kt-header__topbar">
                    <div
                        className="kt-header__topbar-item kt-header__topbar-item--search dropdown"
                        id="kt_quick_search_toggle"
                    >
                        {/*<div*/}
                        {/*  className="kt-header__topbar-wrapper"*/}
                        {/*  data-toggle="dropdown"*/}
                        {/*  data-offset="10px,0px"*/}
                        {/*>*/}
                        {/*  <span className="kt-header__topbar-icon">*/}
                        {/*    <svg*/}
                        {/*      xmlns="http://www.w3.org/2000/svg"*/}
                        {/*      width="24px"*/}
                        {/*      height="24px"*/}
                        {/*      viewBox="0 0 24 24"*/}
                        {/*      version="1.1"*/}
                        {/*      className="kt-svg-icon"*/}
                        {/*    >*/}
                        {/*      <g*/}
                        {/*        stroke="none"*/}
                        {/*        strokeWidth="1"*/}
                        {/*        fill="none"*/}
                        {/*        fillRule="evenodd"*/}
                        {/*      >*/}
                        {/*        <rect id="bound" x="0" y="0" width="24" height="24" />*/}
                        {/*        <path*/}
                        {/*          d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"*/}
                        {/*          id="Path-2"*/}
                        {/*          fill="#000000"*/}
                        {/*          fillRule="nonzero"*/}
                        {/*          opacity="0.3"*/}
                        {/*        />*/}
                        {/*        <path*/}
                        {/*          d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"*/}
                        {/*          id="Path"*/}
                        {/*          fill="#000000"*/}
                        {/*          fillRule="nonzero"*/}
                        {/*        />*/}
                        {/*      </g>*/}
                        {/*    </svg>{" "}*/}
                        {/*  </span>*/}
                        {/*</div>*/}
                    </div>
                    <div className="kt-header__topbar-item dropdown">
                        <div
                            className="kt-header__topbar-wrapper"
                            data-toggle="dropdown"
                            data-offset="30px,0px"
                            aria-expanded="true"
                        >
              <span className="kt-header__topbar-icon kt-pulse kt-pulse--brand">
                {notifUnread > 0 ? <div className={'notif-header-badge'} /> : null}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      className="kt-svg-icon"
                  >
                  <g
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                  >
                    <rect id="bound" x="0" y="0" width="24" height="24" />
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
                </svg>{" "}
                  <span className="kt-pulse__ring"></span>
              </span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
                            <form>
                                <div
                                    className="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
                                    style={{
                                        backgroundImage: "url(/assets/media/misc/bg-1.jpg)",
                                    }}
                                >
                                    <h3 className="kt-head__title">
                                        Notifikasi User &nbsp;
                                        <span className="btn btn-success btn-sm btn-bold btn-font-md">
                      {notifUnread} new
                    </span>
                                    </h3>
                                    <ul className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-success kt-notification-item-padding-x"
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
                                                Notifikasi
                                            </a>
                                        </li>
                                        {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#topbar_notifications_logs"
                        role="tab"
                        aria-selected="false"
                      >
                        Logs
                      </a>
                    </li> */}
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div
                                        className="tab-pane active show"
                                        id="topbar_notifications_notifications"
                                        role="tabpanel"
                                    >
                                        <div
                                            id="containerDiv"
                                            className="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll"
                                            data-scroll="true"
                                            data-height="300"
                                            data-mobile-height="200"
                                            style={{height: 300, overflowY: 'scroll'}}
                                        >
                                            {isFailedGetlistNotif ? (
                                                <div
                                                    className="kt-grid kt-grid--ver"
                                                    style={{ minHeight: "200px" }}
                                                >
                                                    <div className="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">
                                                        <div className="kt-grid__item kt-grid__item--middle kt-align-center">
                                                            Gagal mengambil notifikasi <span onClick={()=> this.getNotifList(this.state.identitas)} size={'small'} style={{color: '#5d78ff', cursor: 'pointer'}}>Coba Lagi?</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {!isFailedGetlistNotif && !notifLoading && notifList.length === 0 ? (
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
                                            ) : null}
                                            <Spin spinning={notifLoading} style={{ minHeight: "240px" }}>
                                                {notifList.map(item => <NotifItem key={item.idInboxNotification + item.idInboxNotificationUser} item={item} updateNotif={this.updateNotifWkBaca.bind(this)} />)}
                                            </Spin>
                                        </div>
                                        {totalNotif > 10 ? (
                                            <div style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 15}}>
                                                <Pagination className="custom-pagination" current={currentPage + 1} size="small" total={totalNotif} onChange={(e) => this.setState({currentPage: e - 1}, ()=> this.getNotifList(identitas))} />
                                            </div>
                                        ) : null}
                                    </div>
                                    {/*<div*/}
                                    {/*  className="tab-pane"*/}
                                    {/*  id="topbar_notifications_logs"*/}
                                    {/*  role="tabpanel"*/}
                                    {/*>*/}
                                    {/*  <div*/}
                                    {/*    className="kt-grid kt-grid--ver"*/}
                                    {/*    style={{ minHeight: "200px" }}*/}
                                    {/*  >*/}
                                    {/*    <div className="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">*/}
                                    {/*      <div className="kt-grid__item kt-grid__item--middle kt-align-center">*/}
                                    {/*        All caught up!*/}
                                    {/*        <br />*/}
                                    {/*        No new notifications.*/}
                                    {/*      </div>*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}
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
                  Hi,
                </span>
                                <img
                                    className="kt-hidden"
                                    alt="Pic"
                                    src="/assets/media/users/300_25.jpg"
                                />
                                {logoutAllDevicesLoading ? (
                                    <Spin className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold" />
                                ) : (
                                    <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                    {initialName}
                  </span>
                                )}
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
                                    <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                    {initialName}
                  </span>
                                </div>
                                <div className="kt-user-card__name">{userData.namaPegawai}</div>
                            </div>
                            <div className="kt-notification">
                                <a className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-calendar-3 kt-font-success"></i>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title kt-font-bold">
                                            My Profile
                                        </div>
                                        <div className="kt-notification__item-time">
                                            Account settings and more
                                        </div>
                                    </div>
                                </a>
                                <a className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-mail kt-font-warning"></i>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title kt-font-bold">
                                            My Messages
                                        </div>
                                        <div className="kt-notification__item-time">
                                            Inbox and tasks
                                        </div>
                                    </div>
                                </a>
                                <a className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-rocket-1 kt-font-danger"></i>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title kt-font-bold">
                                            My Activities
                                        </div>
                                        <div className="kt-notification__item-time">
                                            Logs and notifications
                                        </div>
                                    </div>
                                </a>
                                <a className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-hourglass kt-font-brand"></i>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title kt-font-bold">
                                            My Tasks
                                        </div>
                                        <div className="kt-notification__item-time">
                                            latest tasks and projects
                                        </div>
                                    </div>
                                </a>
                                <a className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-cardiogram kt-font-warning"></i>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title kt-font-bold">
                                            Billing
                                        </div>
                                        <div className="kt-notification__item-time">
                                            billing & statements{" "}
                                            <span className="kt-badge kt-badge--danger kt-badge--inline kt-badge--pill kt-badge--rounded">
                        2 pending
                      </span>
                                        </div>
                                    </div>
                                </a>
                                <div className="kt-notification__custom kt-space-between">
                                    <button
                                        onClick={() => {
                                            this.commonLogout();
                                        }}
                                        className="btn btn-label btn-label-brand btn-sm btn-bold"
                                    >
                                        Log Out
                                    </button>
                                    <button
                                        onClick={() => {
                                            this.handleLogoutAllDevice();
                                        }}
                                        className="btn btn-label btn-label-brand btn-sm btn-bold"
                                    >
                                        Log Out All Device
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

function actionToProps(dispatch) {
    return bindActionCreators({ setKeycloak }, dispatch);
}

function stateToProps(state) {
    return {
        keycloak: state.rkc,
    };
}

export default connect(stateToProps, actionToProps)(Header);
