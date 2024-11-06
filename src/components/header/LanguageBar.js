import React, {Component} from 'react';

export default class QuickActions extends Component {
    render(){
        return (
            <div class="kt-header__topbar-item kt-header__topbar-item--langs">
                            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                                <span class="kt-header__topbar-icon">
                                    <img class="" src="./media/flags/020-flag.svg" alt="" />
                                </span>
                            </div>
                            <div
                                class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
                                <ul class="kt-nav kt-margin-t-10 kt-margin-b-10">
                                    <li class="kt-nav__item kt-nav__item--active">
                                        <a href="/#a" class="kt-nav__link">
                                            <span class="kt-nav__link-icon"><img src="./media/flags/020-flag.svg"
                                                    alt="" /></span>
                                            <span class="kt-nav__link-text">English</span>
                                        </a>
                                    </li>
                                    <li class="kt-nav__item">
                                        <a href="/#a" class="kt-nav__link">
                                            <span class="kt-nav__link-icon"><img
                                                    src="./media/flags/016-spain.svg" alt="" /></span>
                                            <span class="kt-nav__link-text">Spanish</span>
                                        </a>
                                    </li>
                                    <li class="kt-nav__item">
                                        <a href="/#a" class="kt-nav__link">
                                            <span class="kt-nav__link-icon"><img
                                                    src="./media/flags/017-germany.svg" alt="" /></span>
                                            <span class="kt-nav__link-text">German</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
        )
    }
}
