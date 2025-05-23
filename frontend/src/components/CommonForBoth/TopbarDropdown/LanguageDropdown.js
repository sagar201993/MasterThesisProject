import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//i18n
import i18n from '../../../i18n';
import { withNamespaces } from 'react-i18next';

// falgs
import usFlag from "../../../assets/images/flags/us.jpg";
import germany from "../../../assets/images/flags/germany.jpg";

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng: "English",
      flag: usFlag
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  changeLanguageAction = (lng) => {

    //set the selected language to i18n
    i18n.changeLanguage(lng);

    if (lng === "gr")
      this.setState({ lng: "German", flag: germany });
    else if (lng === "eng")
      this.setState({ lng: "English", flag: usFlag });
  }

  render() {

    return (
      <React.Fragment>
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-none d-sm-inline-block">
          <DropdownToggle tag="button" className="btn header-item waves-effect">
            <img className="" src={this.state.flag} alt="Header Language" height="16" />
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu-end">

            <DropdownItem active={this.state.lng === "English" ? true : false} href="" onClick={() => this.changeLanguageAction('eng')} className="notify-item">
              <img src={usFlag} alt="user" className="me-1" height="12" /> <span className="align-middle">English</span>
            </DropdownItem>

            <DropdownItem href="" active={this.state.lng === "German" ? true : false} onClick={() => this.changeLanguageAction('gr')} className=" notify-item">
              <img src={germany} alt="user" className="me-1" height="12" /> <span className="align-middle">German</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(LanguageDropdown);
