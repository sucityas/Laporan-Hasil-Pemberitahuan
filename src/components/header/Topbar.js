import React, {Component} from 'react';
import TopbarSearch from "./Search";
import TopbarNotifications from "./Notifications";
import TopbarQuickActions from "./QuickActions";
import TopbarCart from "./Cart";
import TopbarQuickPanel from "./QuickPanel";
import TopbarLanguageBar from "./LanguageBar";
import TopbarUserBar from "./UserBar";

export default class Topbar extends Component {
    render(){
        return (
            <div class="kt-header__topbar">
                <TopbarSearch/>
                <TopbarNotifications/>
                <TopbarQuickActions/>
                <TopbarCart/>
                <TopbarQuickPanel/>
                <TopbarLanguageBar/>
                <TopbarUserBar/>
            </div>
        )
    }
}