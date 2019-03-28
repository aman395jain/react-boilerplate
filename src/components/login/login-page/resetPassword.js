import React, { Component } from "react";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators
} from "react-reactive-form";
import { NavLink } from "react-router-dom";

import ReactCaptchaGenerator from "./resetCaptcha";
import Cross_Logo from "./../../../assets/images/_cross.jpg";
import * as constant from "../../../assets/constants/constant.js";

class ResetPassword extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      captcha: ""
    };
    this.result = this.result.bind(this);
  }
  result(text) {
    this.setState({
      captcha: text
    });
  }
  resetPasswordForm = FormBuilder.group({
    resetEmail: ["", [Validators.required, Validators.email]],
    resetCaptcha: ["", Validators.required]
  });

  submitForm(e) {
    e.preventDefault();
    this.check();
  }

  check() {
    console.log(
      this.state.captcha,
      this.captchaEnter.value,
      this.state.captcha === this.captchaEnter.value
    );
  }

  renderErrorDom(error) {
    if (error) {
      return <p className="validation-info">{constant.captcha_Validation}</p>;
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="login-bg">
        <div className="container">
          <div className="form_container login-container col-8 ">
            <div className="reset-inner-header d-flex justify-content-between align-items-center">
              <h2>{constant.reset_Password_Form.reset_Password}</h2>
              <NavLink to="/">
                <img src={Cross_Logo} alt="cross" className="cross-image" />
              </NavLink>
            </div>
            <div className="reset-inner-header d-flex justify-content-between align-items-center">
              <span className="reset-password-text">
                {constant.reset_Password_Form.reset_Password_text}
              </span>
            </div>

            <div>
              <FieldGroup
                control={this.resetPasswordForm}
                render={({ invalid }) => (
                  <form onSubmit={e => this.submitForm(e)}>
                    <FieldControl
                      name="resetEmail"
                      options={{ validators: Validators.required }}
                      render={({ handler, touched, hasError }) => (
                        <div
                          className="form-group"
                          style={{ position: "relative" }}
                        >
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email address"
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
                      name="resetCaptcha"
                      options={{ validators: Validators.required }}
                      render={({ handler, touched, hasError }) => (
                        <div
                          className="form-group row d-flex justify-content-between align-items-top"
                          style={{ position: "relative" }}
                        >
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              id="examplecaptcha"
                              placeholder="Enter the character you see"
                              ref={ref => (this.captchaEnter = ref)}
                              {...handler()}
                            />
                            {this.renderErrorDom(
                              touched && hasError("required")
                            )}
                          </div>
                          <div className="col-sm-4 forgetPassword">
                            <ReactCaptchaGenerator
                              textColor="#009900"
                              height="45"
                              width="100"
                              result={this.result}
                            />
                          </div>
                        </div>
                      )}
                    />
                    <button
                      type="submit"
                      disabled={invalid}
                      className="btn btn-primary btn-block"
                    >
                      {constant.reset_Password_Form.reset_Password}
                    </button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
