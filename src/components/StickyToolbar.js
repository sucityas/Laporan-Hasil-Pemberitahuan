import React, {Component} from 'react';

export default class StickyToolbar extends Component{

    render() {
        return (
            <ul className="kt-sticky-toolbar" style={{marginTop: '30px'}}>
                <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--success" id="kt_demo_panel_toggle" data-toggle="kt-tooltip" title="Check out more demos" data-placement="right">
                    <a href="/#a"><i className="flaticon2-drop" /></a>
                </li>
                <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand" data-toggle="kt-tooltip" title="Layout Builder" data-placement="left">
                    <a href="https://keenthemes.com/metronic/preview/demo1/builder.html" target="_blank" rel="noopener noreferrer"><i className="flaticon2-gear" /></a>
                </li>
                <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--warning" data-toggle="kt-tooltip" title="Documentation" data-placement="left">
                    <a href="https://keenthemes.com/metronic/?page=docs" target="_blank" rel="noopener noreferrer"><i className="flaticon2-telegram-logo" /></a>
                </li>
                <li className="kt-sticky-toolbar__item kt-sticky-toolbar__item--danger" id="kt_sticky_toolbar_chat_toggler" data-toggle="kt-tooltip" title="Chat Example" data-placement="left">
                    <a href="/#a" data-toggle="modal" data-target="#kt_chat_modal"><i className="flaticon2-chat-1" /></a>
                </li>
            </ul>
        )
    }

}
