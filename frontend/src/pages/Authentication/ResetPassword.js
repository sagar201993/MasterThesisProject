
import React, { Component } from "react";
import { Row, Col, Alert, Button, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { resetPwdUser } from '../../store/actions';

// import images
import logodark from "../../assets/images/logo-dark.png";

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // handleValidSubmit
        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    // handleValidSubmit
    handleValidSubmit(event, values) {
        this.props.resetPwdUser(values, this.props.history);
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Container fluid className="p-0">
                        <Row className="g-0">
                            <Col lg={4}>
                                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                    <div className="w-100">
                                        <Row className="justify-content-center">
                                            <Col lg={9}>
                                                <div>
                                                    <div className="text-center">
                                                        <div>
                                                            <Link to="/" className="logo"><img src={logodark} height="20" alt="logo" /></Link>
                                                        </div>

                                                        <h4 className="font-size-18 mt-4">Reset Password</h4>
                                                        <p className="text-muted">Reset your password.</p>
                                                    </div>

                                                    <div className="p-2 mt-5">
                                                        {this.props.forgetError && this.props.forgetError ?
                                                            <Alert color="danger" className="mb-4">{this.props.forgetError}</Alert> : null}
                                                        {
                                                            this.props.message ?
                                                                <Alert color="success" className="mb-4">{this.props.message}</Alert> : null
                                                        }
                                                        <AvForm className="form-horizontal" onValidSubmit={this.handleValidSubmit}>

                                                            {/* <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="useremail">Email</Label>
                                                                <AvField name="useremail" value={this.state.username} type="email" validate={{ email: true, required: true }} className="form-control" id="useremail" placeholder="Enter email" />
                                                            </div> */}

                                                            <div className="auth-form-group-custom mb-4">
                                                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                                <Label htmlFor="userpassword">Password</Label>
                                                                <AvField name="password" value={this.state.password} type="password" validate={{ required: true }} className="form-control" id="userpassword" placeholder="Enter password" />
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit">{this.props.loading ? "Loading..." : "Reset"}</Button>
                                                            </div>
                                                        </AvForm>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p>Don't have an account ? <Link to="/login" className="fw-medium text-primary"> Log in </Link> </p>
                                                    </div>
                                                </div>

                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                                <div className="authentication-bg">
                                    <div className="bg-overlay"></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { message, forgetError, loading } = state.Forget;
    return { message, forgetError, loading };
}

export default withRouter(
    connect(mapStatetoProps, { resetPwdUser })(ResetPasswordPage)
);
