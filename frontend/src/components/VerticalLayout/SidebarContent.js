import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

import { connect } from "react-redux";
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
    changePreloader
} from "../../store/actions";

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {

            if (this.props.type !== prevProps.type) {
                this.initMenu();
            }

        }
    }

    initMenu() {
        new MetisMenu("#side-menu");

        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div id="sidebar-menu">

                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title">{this.props.t('Menu')}</li>

                        <li>
                            <Link to="/dashboard" className="waves-effect">
                                <i className="ri-dashboard-line"></i>
                                <span className="ms-1">{this.props.t('Dashboard')}</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/upload-data" className="waves-effect">
                                <i className="ri-upload-2-fill"></i>
                                <span className="ms-1">{this.props.t('Upload Data')}</span>
                            </Link>
                        </li> */}

                        {/* <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-bar-chart-line"></i>
                                <span className="ms-1">{this.props.t('Charts')}</span>
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="/apex-charts">{this.props.t("Apex Charts")}</Link></li>
                                <li><Link to="/chartjs">{this.props.t('Chartjs Charts')}</Link></li>
                                <li><Link to="/charts-knob">{this.props.t('Jquery Knob Charts')}</Link></li>
                                <li><Link to="/charts-sparkline">{this.props.t('Sparkline Charts')}</Link></li>
                            </ul>
                        </li> */}

                        <li className="menu-title">{this.props.t('Data Visualizations')}</li>

                        <li>
                            <Link to="/#" className="has-arrow waves-effect">
                                <i className="ri-pie-chart-fill"></i>
                                <span className="ms-1">{this.props.t('Topics')}</span>
                            </Link>
                            <ul className="sub-menu">

                                <li><Link to="/topic/android">{this.props.t('Android')}</Link></li>
                                <li><Link to="/topic/apple">{this.props.t('Apple')}</Link></li>
                                <li><Link to="/topic/cooling">{this.props.t('Cooling')}</Link></li>
                                <li><Link to="/topic/cpu">{this.props.t('Cpu')}</Link></li>
                                <li><Link to="/topic/desktop-review">{this.props.t('Desktop Review')}</Link></li>
                                <li><Link to="/topic/gpus">{this.props.t('Gpus')}</Link></li>
                                <li><Link to="/topic/htc">{this.props.t('Htc')}</Link></li>
                                <li><Link to="/topic/huawei">{this.props.t('Huawei')}</Link></li>
                                <li><Link to="/topic/mac-review">{this.props.t('Mac Review')}</Link></li>
                                <li><Link to="/topic/memory">{this.props.t('Memory')}</Link></li>
                                <li><Link to="/topic/microsoft">{this.props.t('Microsoft')}</Link></li>
                                <li><Link to="/topic/motheboard">{this.props.t('Motheboard')}</Link></li>
                                <li><Link to="/topic/nas">{this.props.t('Nas')}</Link></li>
                                <li><Link to="/topic/notebook review">{this.props.t('Notebook Review')}</Link></li>
                                <li><Link to="/topic/samsung">{this.props.t('Samsung')}</Link></li>
                                <li><Link to="/topic/smartphones">{this.props.t('Smartphones')}</Link></li>
                                <li><Link to="/topic/ssd">{this.props.t('Ssd')}</Link></li>
                                <li><Link to="/topic/storage">{this.props.t('Storage')}</Link></li>
                                <li><Link to="/topic/tablets">{this.props.t('Tablets')}</Link></li>
                                <li><Link to="/topic/ultrabook-review">{this.props.t('Ultrabook Review')}</Link></li>
                            </ul>
                        </li>


                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    return { ...state.Layout };
};

export default withRouter(connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader
})(withNamespaces()(SidebarContent)));
