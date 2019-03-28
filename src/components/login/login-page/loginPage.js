import React, { Component } from "react";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators
} from "react-reactive-form";
import { NavLink } from "react-router-dom";
import { userAuthActions } from "../../../actions/authAcions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./_loginPage.scss";
import * as constant from "../../../assets/constants/constant";
import carImage from "../../../assets/images/car_Detail_view_Login.png";
import trilliumLogo from "../../../assets/images/_footer_Logo.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "password",
      submitted: false
    };

    // reset login status
    this.props.dispatch(userAuthActions.logout());

    // this.showHide = this.showHide.bind(this);
  }

  showHide = e => {
    this.setState({
      type: this.state.type === "password" ? "text" : "password"
    });
    e.preventDefault();
    e.stopPropagation();
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log("submit form >>", this.loginForm);
    this.setState({ submitted: true });
    //const { username, password } = this.state;
    const { dispatch } = this.props;
    if (this.loginForm.value) {
      dispatch(
        userAuthActions.login(
          this.loginForm.value.loginEmail,
          this.loginForm.value.loginPassword
        )
      );
    }
  }

  loginForm = FormBuilder.group({
    loginEmail: ["", [Validators.required, Validators.email]],
    loginPassword: ["", [Validators.required, Validators.minLength(8)]]
  });
  render() {
    console.log("this.state.type", this.state.type);
    return (
      <div className="login-bg ">
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row login-main">
            <div className="col-lg-4" />
            <div className="col-lg-4 car-image">
              <img src={carImage} alt="Trillium car" />
            </div>

            <div className="form_container login-form col-lg-4 col-sm-8 col-10">
              <div className="login-inner-header ">
                <h2>Log in</h2>
                <div className="justify-content-between align-items-center Dont-have-an-accoun">
                  <span>Don't have an account?</span>
                  <NavLink to="/signup" className="login-form-inner-links">
                    Sign Up
                  </NavLink>
                </div>
              </div>
              <div>
                <FieldGroup
                  control={this.loginForm}
                  render={({ invalid }) => (
                    <form onSubmit={e => this.handleSubmit(e)}>
                      <FieldControl
                        name="loginEmail"
                        options={{ validators: Validators.required }}
                        render={({ handler, touched, hasError }) => (
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
                          >
                            <label>Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="email address"
                              {...handler()}
                            />
                            <p className="validation-info">
                              {touched &&
                                ((hasError("required") &&
                                  constant.email_Validations.email_Required) ||
                                  (hasError("email") &&
                                    constant.email_Validations.valid_Email))}
                            </p>
                          </div>
                        )}
                      />
                      <FieldControl
                        name="loginPassword"
                        options={{ validators: Validators.required }}
                        render={({ handler, touched, hasError }) => (
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
                          >
                            <label>Password</label>
                            <input
                              type={this.state.type}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="********"
                              {...handler()}
                            />
                            <span
                              className="fas fa-eye field-icon"
                              onClick={this.showHide}
                            />
                            <p className="validation-info">
                              {touched &&
                                ((hasError("required") &&
                                  constant.password_Validations
                                    .password_Required) ||
                                  (hasError("minLength") &&
                                    constant.password_Validations
                                      .valid_Password))}
                            </p>
                          </div>
                        )}
                      />
                      <div className="justify-content-between align-items-center logged-In">
                        <FieldControl
                          name="keepLogIn"
                          className="checkbox-logIn"
                          render={() => <input type="checkbox" />}
                        />
                        <span className="keep-log">Keep me logged in</span>
                        <NavLink
                          to="/resetPassword"
                          className="login-form-forget-links float-right"
                        >
                          {constant.login_Form.forget_Password}
                        </NavLink>
                      </div>

                      <div className="login-button">
                        <button
                          type="submit"
                          disabled={invalid}
                          className="btn btn-danger btn-block"
                        >
                          <span className="Sign-in">Sign in</span>
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row footer-row">
          <img src={trilliumLogo} alt="" />
        </div>
      </div>
    );
  }
}

/**
 * will implement proptypes here
 *
 */

//export default loginPage;

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(withRouter(LoginPage));
export { connectedLoginPage as LoginPage };
