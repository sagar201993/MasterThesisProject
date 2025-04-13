import React, { Component } from "react";
import { Collapse, Container } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { withNamespaces } from "react-i18next";

import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({});
        }
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
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
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                <div className="topnav">
                    <Container fluid>
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">

                            <Collapse isOpen={this.props.menuOpen} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                            <i className="ri-dashboard-line me-2"></i> {this.props.t('Dashboard')}
                                        </Link>
                                    </li>


                                    <li className="nav-item dropdown">
                                        <Link onClick={e => { e.preventDefault(); this.setState({ topicState: !this.state.topicState }); }} className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-topics" role="button">
                                            <i className="ri-apps-2-line me-2"></i>{this.props.t('Topics')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu dropdown-menu-end", { show: this.state.topicState })} aria-labelledby="topnav-topics">

                                            <Link className="dropdown-item" to="/topic/android">{this.props.t('Android')}</Link>
                                            <Link className="dropdown-item" to="/topic/apple">{this.props.t('Apple')}</Link>
                                            <Link className="dropdown-item" to="/topic/cooling">{this.props.t('Cooling')}</Link>
                                            <Link className="dropdown-item" to="/topic/cpu">{this.props.t('Cpu')}</Link>
                                            <Link className="dropdown-item" to="/topic/desktop-review">{this.props.t('Desktop Review')}</Link>
                                            <Link className="dropdown-item" to="/topic/gpus">{this.props.t('Gpus')}</Link>
                                            <Link className="dropdown-item" to="/topic/htc">{this.props.t('Htc')}</Link>
                                            <Link className="dropdown-item" to="/topic/huawei">{this.props.t('Huawei')}</Link>
                                            <Link className="dropdown-item" to="/topic/mac-review">{this.props.t('Mac Review')}</Link>
                                            <Link className="dropdown-item" to="/topic/memory">{this.props.t('Memory')}</Link>
                                            <Link className="dropdown-item" to="/topic/microsoft">{this.props.t('Microsoft')}</Link>
                                            <Link className="dropdown-item" to="/topic/motheboard">{this.props.t('Motheboard')}</Link>
                                            <Link className="dropdown-item" to="/topic/nas">{this.props.t('Nas')}</Link>
                                            <Link className="dropdown-item" to="/topic/notebook review">{this.props.t('Notebook Review')}</Link>
                                            <Link className="dropdown-item" to="/topic/samsung">{this.props.t('Samsung')}</Link>
                                            <Link className="dropdown-item" to="/topic/smartphones">{this.props.t('Smartphones')}</Link>
                                            <Link className="dropdown-item" to="/topic/ssd">{this.props.t('Ssd')}</Link>
                                            <Link className="dropdown-item" to="/topic/storage">{this.props.t('Storage')}</Link>
                                            <Link className="dropdown-item" to="/topic/tablets">{this.props.t('Tablets')}</Link>
                                            <Link className="dropdown-item" to="/topic/ultrabook-review">{this.props.t('Ultrabook Review')}</Link>
                                        </div>
                                    </li>
{/* 
                                    <li className="nav-item dropdown">
                                        <Link onClick={e => { e.preventDefault(); this.setState({ chartState: !this.state.chartState }); }} className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-charts" role="button">
                                            <i className="ri-apps-2-line me-2"></i>{this.props.t('Charts')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu dropdown-menu-end", { show: this.state.chartState })} aria-labelledby="topnav-charts">

                                            <Link to="/apex-charts" className="dropdown-item">{this.props.t("Apex Charts")}</Link>
                                            <Link to="/chartjs" className="dropdown-item">{this.props.t('Chartjs')}</Link>
                                            <Link to="/charts-knob" className="dropdown-item">{this.props.t('Jquery Knob Chart')}</Link>
                                            <Link to="/charts-sparkline" className="dropdown-item">{this.props.t('Sparkline Chart')}</Link>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link onClick={e => { e.preventDefault(); this.setState({ tableState: !this.state.tableState }); }} className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-table" role="button">
                                            <i className="ri-apps-2-line me-2"></i>{this.props.t('Tables')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu dropdown-menu-end", { show: this.state.tableState })} aria-labelledby="topnav-table">

                                            <Link to="/basic-tables" className="dropdown-item">{this.props.t('Basic Tables')}</Link>
                                            <Link to="/datatable-table" className="dropdown-item">{this.props.t('Data Tables')}</Link>
                                            <Link to="/responsive-table" className="dropdown-item">{this.props.t('Responsive Table')}</Link>
                                            <Link to="/editable-table" className="dropdown-item">{this.props.t('Editable Table')}</Link>
                                        </div>
                                    </li> */}






                                    <li className="nav-item dropdown">
                                        <Link onClick={e => {
                                            e.preventDefault();
                                            this.setState({ extraState: !this.state.extraState });
                                        }} className="nav-link dropdown-toggle arrow-none" to="/#" id="topnav-more" role="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="ri-file-copy-2-line me-2"></i>{this.props.t('Pages')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: this.state.extraState })} aria-labelledby="topnav-more">
                                            <div className="dropdown">
                                                <Link onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({ authState: !this.state.authState });
                                                }} className="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-auth"
                                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {this.props.t('Authentication')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: this.state.authState })} aria-labelledby="topnav-auth">
                                                    <Link to="/auth-login" className="dropdown-item">{this.props.t('Login')}</Link>
                                                    <Link to="/auth-register" className="dropdown-item">{this.props.t('Register')}</Link>
                                                    <Link to="/auth-recoverpw" className="dropdown-item">{this.props.t('Recover Password')}</Link>
                                                    <Link to="/lock-screen" className="dropdown-item">{this.props.t('Lock Screen')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({ utilityState: !this.state.utilityState });
                                                }} className="dropdown-item dropdown-toggle arrow-none" to="/#" id="topnav-utility"
                                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {this.props.t('Utility')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: this.state.utilityState })} aria-labelledby="topnav-utility">
                                                    <Link to="/404" className="dropdown-item">{this.props.t('Error 404')}</Link>
                                                    <Link to="/500" className="dropdown-item">{this.props.t('Error 500')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </Collapse>
                        </nav>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { leftSideBarType, leftSideBarTheme } = state.Layout;
    return { leftSideBarType, leftSideBarTheme };
}

export default withRouter(connect(mapStatetoProps, {})(withNamespaces()(Navbar)));
