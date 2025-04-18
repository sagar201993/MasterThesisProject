import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from '../../../assets/images/users/sagar.png'


class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    /**
     * Toggles the sidebar
     */
    toggleRightbar() {
        this.props.toggleRightSidebar();
    }

    render() {

        let username = "Admin";
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"));
            const uNm = obj.user.email.split("@")[0];
            username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
        }

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                    <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                        <img className="rounded-circle header-profile-user me-1" src={avatar2} alt="Header Avatar" />
                        <span className="d-none d-xl-inline-block ms-1 text-transform">{username}</span>
                        <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">                       
                        <DropdownItem href="/lock-screen"><i className="ri-lock-unlock-line align-middle me-1"></i> {this.props.t('Lock screen')}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem href="/reset-password"><i className="ri-lock-unlock-line align-middle me-1"></i> {this.props.t('Reset Password')}</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-danger" href="/logout"><i className="ri-shut-down-line align-middle me-1 text-danger"></i> {this.props.t('Logout')}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(ProfileMenu);
