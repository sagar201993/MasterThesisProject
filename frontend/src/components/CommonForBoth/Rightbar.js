import React, { Component } from "react";
import {Label, Input } from "reactstrap";

import { connect } from "react-redux";
import {
  hideRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType, changePreloader,
  changeTopbarTheme,
  changeLayoutTheme
} from "../../store/actions";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Link } from "react-router-dom";

import "./rightbar.scss";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutType: this.props.layoutType,
      sidebarType: this.props.leftSideBarType,
      layoutWidth: this.props.layoutWidth,
      sidebarTheme: this.props.leftSideBarTheme,
      topbarTheme: this.props.topbarTheme,
      theme: this.props.theme,
    };
    this.hideRightbar = this.hideRightbar.bind(this);
    this.changeLayout = this.changeLayout.bind(this);
    this.changeLayoutWidth = this.changeLayoutWidth.bind(this);
    this.changeLeftSidebarTheme = this.changeLeftSidebarTheme.bind(this);
    this.changeLeftSidebarType = this.changeLeftSidebarType.bind(this);
    this.changeTopbarTheme = this.changeTopbarTheme.bind(this);
    this.changeLayoutTheme = this.changeLayoutTheme.bind(this);
    this.changeThemePreloader = this.changeThemePreloader.bind(this);
  }

  /**
    * Hides the right sidebar
    */
  hideRightbar(e) {
    e.preventDefault();
    this.props.hideRightSidebar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        layoutType: this.props.layoutType,
        sidebarType: this.props.leftSideBarType,
        layoutWidth: this.props.layoutWidth,
        sidebarTheme: this.props.leftSideBarTheme,
        topbarTheme: this.props.topbarTheme,
        theme: this.props.theme
      });
    }
  }

  changeThemePreloader = () => {
    this.props.changePreloader(!this.props.isPreloader);
  }
  /**
   * Change the layout
   * @param {*} e
   */
  changeLayout(e) {
    if (e.target.checked) {
      this.props.changeLayout(e.target.value);
    }
  }

  /**
   * Changes layout width
   * @param {*} e 
   */
  changeLayoutWidth(e) {
    if (e.target.checked) {
      this.props.changeLayoutWidth(e.target.value);
    }
  }

  // change left sidebar design
  changeLeftSidebarType(e) {
    if (e.target.checked) {
      this.props.changeSidebarType(e.target.value);
    }
  }

  // change left sidebar theme
  changeLeftSidebarTheme(e) {
    if (e.target.checked) {
      this.props.changeSidebarTheme(e.target.value);
    }
  }

  // change topbar theme
  changeTopbarTheme(e) {
    if (e.target.checked) {
      this.props.changeTopbarTheme(e.target.value);
    }
  }

  // change theme Mode
  changeLayoutTheme(e) {
    if (e.target.checked) {
      this.props.changeLayoutTheme(e.target.value);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="right-bar">

          <SimpleBar style={{ height: "900px" }}>
            <div data-simplebar className="h-100">
              <div className="rightbar-title px-3 py-4">
                <Link to="#" onClick={this.hideRightbar} className="right-bar-toggle float-end">
                  <i className="mdi mdi-close noti-icon"></i>
                </Link>
                <h5 className="m-0">Settings</h5>
              </div>

              <hr className="my-0" />

              <div className="p-4">
                <div className="radio-toolbar">
                  <span className="mb-2 d-block">Layouts</span>
                  <Input
                    type="radio"
                    id="radioVertical"
                    name="radioFruit"
                    value="vertical"
                    checked={this.state.layoutType === "vertical"}
                    onChange={this.changeLayout} />
                  <Label htmlFor="radioVertical">Vertical</Label>
                  {"   "}
                  <Input
                    type="radio"
                    id="radioHorizontal"
                    name="radioFruit"
                    value="horizontal"
                    checked={this.state.layoutType === "horizontal"}
                    onChange={this.changeLayout} />
                  <Label htmlFor="radioHorizontal">Horizontal</Label>
                </div>

                <hr className="mt-1" />

                <div className="radio-toolbar">
                  <span className="mb-2 d-block" id="radio-title">Layout Width</span>
                  <Input
                    type="radio"
                    id="radioFluid"
                    name="radioWidth"
                    value="fluid"
                    checked={this.state.layoutWidth !== "boxed"}
                    onChange={this.changeLayoutWidth} />
                  <Label htmlFor="radioFluid">Fluid</Label>
                  {"   "}
                  <Input
                    type="radio"
                    id="radioBoxed"
                    name="radioWidth"
                    value="boxed"
                    checked={this.state.layoutWidth === "boxed"}
                    onChange={this.changeLayoutWidth} />
                  <Label htmlFor="radioBoxed">Boxed</Label>
                </div>
                <hr className="mt-1" />

                <div className="radio-toolbar">
                  <span className="mb-2 d-block" id="radio-title">Topbar Theme</span>
                  <Input
                    type="radio"
                    id="radioThemeLight"
                    name="radioTheme"
                    value="light"
                    checked={this.state.topbarTheme === "light"}
                    onChange={this.changeTopbarTheme} />
                  <Label htmlFor="radioThemeLight">Light</Label>
                  {"   "}
                  <Input
                    type="radio"
                    id="radioThemeDark"
                    name="radioTheme"
                    value="dark"
                    checked={this.state.topbarTheme === "dark"}
                    onChange={this.changeTopbarTheme} />
                  <Label htmlFor="radioThemeDark">Dark</Label>
                  {"   "}

                </div>

                <div className="radio-toolbar">
                  <span className="mb-2 d-block" id="radio-title">Theme</span>
                  <Input
                    type="radio"
                    id="radioThemeLightMode"
                    name="radioThemeMode"
                    value="light"
                    checked={this.state.theme === "light"}
                    onClick={this.changeLayoutTheme}
                    onChange={this.changeLayoutTheme} />
                  <Label htmlFor="radioThemeLightMode">Light</Label>
                  {"   "}
                  <Input
                    type="radio"
                    id="radioThemeDarkMode"
                    name="radioThemeMode"
                    value="dark"
                    checked={this.state.theme === "dark"}
                    onClick={this.changeLayoutTheme}
                    onChange={this.changeLayoutTheme} />
                  <Label htmlFor="radioThemeDarkMode">Dark</Label>
                  {"   "}
                </div>


                {this.state.layoutType === "vertical" ? <React.Fragment>
                  <hr className="mt-1" />
                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">Left Sidebar Type</span>
                    <Input
                      type="radio"
                      id="sidebarDefault"
                      name="sidebarType"
                      value="default"
                      checked={this.state.sidebarType === "default"}
                      onChange={this.changeLeftSidebarType} />

                    <Label htmlFor="sidebarDefault">Default</Label>
                    {"   "}
                    <Input
                      type="radio"
                      id="sidebarCompact"
                      name="sidebarType"
                      value="compact"
                      checked={this.state.sidebarType === "compact"}
                      onChange={this.changeLeftSidebarType} />
                    <Label htmlFor="sidebarCompact">Compact</Label>
                    {"   "}
                    <Input
                      type="radio"
                      id="sidebarIcon"
                      name="sidebarType"
                      value="icon"
                      checked={this.state.sidebarType === "icon"}
                      onChange={this.changeLeftSidebarType}
                    />
                    <Label htmlFor="sidebarIcon">Icon</Label>

                  </div>

                  <hr className="mt-1" />

                  <div className="radio-toolbar">
                    <span className="mb-2 d-block" id="radio-title">Left Sidebar Color</span>
                    <Input
                      type="radio"
                      id="leftsidebarThemelight"
                      name="leftsidebarTheme"
                      value="light"
                      checked={this.state.sidebarTheme === "light"}
                      onChange={this.changeLeftSidebarTheme} />

                    <Label htmlFor="leftsidebarThemelight">Light</Label>
                    {"   "}
                    <Input
                      type="radio"
                      id="leftsidebarThemedark"
                      name="leftsidebarTheme"
                      value="dark"
                      checked={this.state.sidebarTheme === "dark"}
                      onChange={this.changeLeftSidebarTheme} />
                    <Label htmlFor="leftsidebarThemedark">Dark</Label>
                    {"   "}
                    <Input
                      type="radio"
                      id="leftsidebarThemecolored"
                      name="leftsidebarTheme"
                      value="colored"
                      checked={this.state.sidebarTheme === "colored"}
                      onChange={this.changeLeftSidebarTheme}
                    />
                    <Label htmlFor="leftsidebarThemecolored">Colored</Label>

                  </div>
                  <hr className="mt-1" />


                </React.Fragment> : null}

              </div>
            </div>
          </SimpleBar>
        </div>
        <div className="rightbar-overlay"></div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export default connect(mapStatetoProps, {
  hideRightSidebar,
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changeTopbarTheme,
  changeLayoutTheme,
  changePreloader
})(RightSidebar);
