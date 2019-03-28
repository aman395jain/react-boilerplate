import React, { Component } from "react";
import {
  FormBuilder,
  Validators,
  FieldGroup,
  FieldControl
} from "react-reactive-form";
import _ from "lodash";
import { connect } from "react-redux";

import checkValidations from "../../../shared/validations/validations";
import signUpService from "../../../services/signUp_service";
import CountryList from "./listComponents/countryComponent";
import StateList from "./listComponents/stateListComponent";
import CityList from "./listComponents/cityComponent";
import { registerUser } from "../../../actions/regAction";

/* 
    User sign-up/ Registration Page.
*/

class signUp extends Component {
  state = {
    selectedCountry: "",
    selectedState: "",
    selectedCity: ""
  };
  registerFormNew = FormBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    Email: ["", [Validators.required, Validators.email]],
    PhoneNumber: ["", [Validators.required, Validators.minLength(10)]],
    address: FormBuilder.group({
      streetAddress: ["", Validators.required],
      continent: ["", Validators.required],
      country: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      zipCode: ["", Validators.required]
    }),
    empId: ["", [Validators.required]],
    organization: "BMW"
  });

  onSubmit(e) {
    this.registerFormNew.value.address.country = this.state.selectedCountry;
    this.registerFormNew.value.address.state = this.state.selectedState;
    this.registerFormNew.value.address.city = this.state.selectedCity;

    e.preventDefault();
    // console.log("in the form", this.props);
    // this.props.dispatch({
    //   type: "SET_REGISTER",
    //   payload: this.registerFormNew.value
    // });
    this.props.saveRegUser(this.registerFormNew.value);
    signUpService
      .postSignUp(this.registerFormNew.value)
      .then(res => {
        console.log("success of form submission", res.status);
      })
      .catch(err => {
        console.log(err.status);
      });
  }

  getCountry = countryNameFromCountryComp => {
    this.setState({
      selectedCountry: countryNameFromCountryComp
    });
  };

  getState = stateNameFromStateComp => {
    this.setState({
      selectedState: stateNameFromStateComp
    });
  };

  getCity = cityNameFromCityComp => {
    this.setState({
      selectedCity: cityNameFromCityComp
    });
  };

  render() {
    return (
      <FieldGroup
        control={this.registerFormNew}
        render={() => (
          <div className="container">
            <h2>Registration Form</h2>
            <div
              className="form_container"
              style={{ border: "1px solid black" }}
            >
              <form className="register_form" onSubmit={e => this.onSubmit(e)}>
                <div className="row">
                  <FieldControl
                    name="firstName"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>First Name:</label>
                          <input
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            {...handler()}
                          />
                          {touched && hasError("required")
                            ? checkValidations("First Name")
                            : null}
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="lastName"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Last Name:</label>
                          <input
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            {...handler()}
                          />
                          {touched && hasError("required")
                            ? checkValidations("Last Name")
                            : null}
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="Email"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            className="form-control"
                            placeholder="123@xyz.com"
                            {...handler()}
                          />
                          {touched && hasError("required")
                            ? checkValidations("Email")
                            : null ||
                              (hasError("email") &&
                                checkValidations("Email", {
                                  isInvalidEmail: hasError("email")
                                }))}
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="PhoneNumber"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            className="form-control"
                            placeholder="+1(650) 567-9876"
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                (touched && hasError("required")
                                  ? checkValidations("Phone Number")
                                  : null ||
                                    (hasError("minLength") &&
                                      checkValidations("Phone Number", {
                                        isInvalidPhoneNo: hasError("minLength")
                                      })))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="address.streetAddress"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            className="form-control"
                            placeholder="Street Address"
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Address"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="address.continent"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Continent</label>
                          <select className="form-control" {...handler()}>
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="us">US</option>
                            <option value="uk">UK</option>
                            <option value="india">India</option>
                            <option value="china">China</option>
                          </select>
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Continent"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="address.country"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Country</label>
                          <CountryList
                            onCountryChange={this.getCountry}
                            {...handler()}
                          />

                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Country"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="address.state"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>State</label>

                          <StateList onStateChange={this.getState} />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("State"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="address.city"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>city</label>

                          <CityList onCityChange={this.getCity} />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("City"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <FieldControl
                    name="address.zipCode"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Zip Code</label>
                          <input
                            className="form-control"
                            placeholder=""
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Zip Code"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <FieldControl
                    name="organization"
                    render={() => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Organization:</label>
                          <input
                            name="organization"
                            className="form-control"
                            placeholder="BMW"
                            readOnly={true}
                          />
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="empId"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Employee Id</label>
                          <input
                            className="form-control"
                            placeholder=""
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  checkValidations("Employee Id"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-outline-secondary mr-1"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button className="btn btn-danger ml-1" disabled="">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

const matchDispatchToProps = dispatch => {
  return {
    saveRegUser: regData => {
      // registerUser.registration();
      dispatch(registerUser.register(regData));
      // dispatch({
      //   type: "SET_REGISTER",
      //   payload: regData
      // });
    }
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(signUp);
