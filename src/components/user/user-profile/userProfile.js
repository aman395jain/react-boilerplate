import React, { Component } from "react";
import {
  FormBuilder,
  FieldGroup,
  FieldControl,
  Validators
} from "react-reactive-form";
// import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import datas from "../../../data/profile";
import * as constant from "../../../assets/constants/constant.js";
import { userProfileAction } from "../../../actions/userProfileAction";

class UserProfile extends Component {
  // initialData = {};
  updateForm = FormBuilder.group({
    updateFirstName: ["", [Validators.required]],
    updateLastName: ["", [Validators.required]],
    updateEmail: ["", [Validators.required, Validators.email]],
    updatePhoneNumber: ["", [Validators.required, Validators.minLength(10)]],
    updatePassword: ["", [Validators.required, Validators.minLength(8)]]
  });

  submitForm(e) {
    e.preventDefault();
  }

  componentDidMount() {
    const uProfile = {};
    this.props.userProfileAction(uProfile);
  }

  render() {
    console.log(
      "props data",
      _.isEmpty(this.props.userProfile.userProfileData)
    );

    return (
      !_.isEmpty(this.props.userProfile.userProfileData) && (
        <div className="profile-background">
          <div className="container">
            <div className="profile-container col-8 col-sm-8 align-items-center">
              <div className="row profile-inner-header d-flex ">
                {/* <div className="col-5 col-sm-5"> */}
                <img
                  className="rounded-circle dropdown-toggle profile-image"
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Profile"
                />
                {/* </div> */}
                <div className="captureImage">
                  <i className="fas fa-image" />
                </div>
                <div className="col-6 col-sm-6 col-offset-2 profile-data">
                  <h2>Profile</h2>
                  <div className="profile-personal-data">
                    <h2>
                      {this.props.userProfile.userProfileData.firstName}{" "}
                      {this.props.userProfile.userProfileData.lastName}
                    </h2>
                    <p style={{ color: "#0099CC" }}>
                      {this.props.userProfile.userProfileData.userName}
                    </p>
                    <p>{datas.role}</p>
                  </div>
                </div>
              </div>

              <div className="update-form">
                <FieldGroup
                  control={this.updateForm}
                  render={() => (
                    <form onSubmit={() => this.handleSubmit}>
                      <div className="row">
                        <FieldControl
                          name="updateFirstName"
                          render={({ handler, touched, hasError }) => (
                            <div className="col-sm-6 form-group">
                              <label>First Name</label>

                              <input
                                className="form-control"
                                value={
                                  this.props.userProfile.userProfileData
                                    .firstName
                                }
                                placeholder={
                                  this.props.userProfile.userProfileData
                                    .firstName
                                }
                                {...handler()}
                              />
                              <span className="validation-info">
                                {touched &&
                                  (hasError("required") &&
                                    "First Name is required")}
                              </span>
                            </div>
                          )}
                        />

                        <FieldControl
                          name="updateLastName"
                          render={({
                            handler,
                            getError,
                            hasError,
                            touched
                          }) => (
                            <div className="col-sm-6 form-group">
                              <label>Last Name</label>
                              <input
                                className="form-control"
                                value={
                                  this.props.userProfile.userProfileData
                                    .lastName
                                }
                                placeholder={
                                  this.props.userProfile.userProfileData
                                    .lastName
                                }
                                {...handler()}
                              />
                              <span className="validation-info">
                                {touched &&
                                  ((hasError("required") &&
                                    "Last Name is required") ||
                                    (hasError("minLength") &&
                                      `Password Should Be greater than 
                                ${
                                  getError("minLength").requiredLength
                                } character`))}
                              </span>
                            </div>
                          )}
                        />
                        <FieldControl
                          name="updateEmail"
                          render={({ handler, hasError, touched }) => (
                            <div className="col-sm-6 form-group">
                              <label>Email Address</label>
                              <input
                                className="form-control"
                                value={
                                  this.props.userProfile.userProfileData
                                    .userName
                                }
                                placeholder={
                                  this.props.userProfile.userProfileData
                                    .userName
                                }
                                {...handler()}
                                disabled
                              />
                              <span className="validation-info">
                                {touched &&
                                  ((hasError("required") &&
                                    constant.email_Validations
                                      .email_Required) ||
                                    (hasError("email") &&
                                      constant.email_Validations.valid_Email))}
                              </span>
                            </div>
                          )}
                        />
                        <FieldControl
                          name="updatePhoneNumber"
                          render={({ handler, hasError, touched }) => (
                            <div className="col-sm-6 form-group">
                              <label>Phone Number</label>
                              <input
                                className="form-control"
                                value={
                                  this.props.userProfile.userProfileData
                                    .userContact.phoneNo
                                }
                                placeholder={
                                  this.props.userProfile.userProfileData
                                    .userContact.phoneNo
                                }
                                {...handler()}
                              />
                              <span className="validation-info">
                                {touched &&
                                  (hasError("required") &&
                                    "Phone Number is Required")}
                              </span>
                            </div>
                          )}
                        />

                        <FieldControl
                          name="updatePassword"
                          options={{ validators: Validators.required }}
                          render={({ handler, touched, hasError }) => (
                            <div className="col-sm-6 form-group">
                              <label>Password</label>
                              <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                {...handler()}
                              />
                              <span className="validation-info">
                                {touched &&
                                  ((hasError("required") &&
                                    constant.password_Validations
                                      .password_Required) ||
                                    (hasError("minLength") &&
                                      constant.password_Validations
                                        .valid_Password))}
                              </span>
                            </div>
                          )}
                        />
                        <div className="col-sm-6 form-group">
                          <p style={{ color: "#0099CC", marginTop: "5%" }}>
                            Change Password
                          </p>
                        </div>

                        <div className="col-4 mx-auto d-flex align-items-center justify-content-end">
                          <div className="col-6">
                            <span>Cancel</span>
                          </div>
                          <div className="col-6">
                            <button className="btn btn-primary">Update</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userProfile
  };
};
export default connect(
  mapStateToProps,
  { userProfileAction }
)(withRouter(UserProfile));
