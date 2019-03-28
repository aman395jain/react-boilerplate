import * as React from "react";
import {
  FormBuilder,
  Validators,
  /* ValidationErrors,
  ValidatorFn, */
  FieldGroup,
  FieldControl
} from "react-reactive-form";

//import styles from "./styles";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/* const asyncValidator = control => {
  return sleep(1000).then(() => {
    if (
      [
        "jon@reactive.com",
        "hodor@reactive.com",
        "mountain@reactive.com"
      ].includes(control.value)
    ) {
      return null;
    } else {
      throw { isExist: true };
    }
  });
}; */

/**
 * Group level validators to match the passwords.
 */
/* const checkIfMatchingPasswords = (passwordKey, passwordConfirmationKey) => {
  return group => {
    let passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      passwordConfirmationInput.setErrors({ notEquivalent: true });
    } else {
      passwordConfirmationInput.setErrors(null);
    }
    return null;
  };
}; */

class RegisterForm extends React.Component {
  // Create a group of form controls with default values.
  registerForm = FormBuilder.group(
    {
      /**
       * `username` control with `required` and `email` sync and one async validators.
       *`blur` property is to set the onBlur updates of control.
       */
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]], //asyncValidator
      PhoneNumber: ["", [Validators.required, Validators.minLength(10)]],
      /**
       * Nested address control
       */
      address: FormBuilder.group({
        city: ["Bangalore", Validators.required],
        country: ["india"],
        streetaddress: "",
        continent: ["", Validators.required],
        zipCode: "",
        state: ""
      }),
      gender: ["male"],
      terms: [false, Validators.requiredTrue]
    }
    //{ validators: checkIfMatchingPasswords("password", "confirm_password") }
  );

  handleSubmit(e) {
    e.preventDefault();
    alert(
      `You submitted \n ${JSON.stringify(this.registerForm.value, null, 2)}`
    );
  }

  handleReset() {
    this.registerForm.reset();
  }

  componentWillUnmount() {
    this.registerForm.reset();
  }

  render() {
    return (
      <FieldGroup
        control={this.registerForm}
        render={({ pristine, invalid, pending, value }) => (
          <div className="container">
            <h2>Registration Form</h2>
            <div
              className="form_container"
              style={{ border: "1px solid black" }}
            >
              <form
                className="register_form"
                onSubmit={e => this.handleSubmit(e)}
              >
                <div className="row">
                  <FieldControl
                    name="FirstName"
                    render={({ handler, pending, touched, hasError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>First Name:</label>
                          <input
                            {...handler()}
                            className="form-control"
                            placeholder="First Name"
                          />
                          {pending && <i className="fa fa-spinner fa-spin" />}
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  "First Name is required")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />

                  <FieldControl
                    name="LastName"
                    render={({ handler, getError, hasError, touched }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Last Name:</label>
                          <input className="form-control" {...handler()} />
                          <div>
                            <span>
                              {touched &&
                                ((hasError("required") &&
                                  "Last Name is required") ||
                                  (hasError("minLength") &&
                                    `Password Should Be greater than 
                                                                        ${
                                                                          getError(
                                                                            "minLength"
                                                                          )
                                                                            .requiredLength
                                                                        } character`))}
                            </span>
                          </div>
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
                          <div>
                            <span>
                              {touched &&
                                ((hasError("required") &&
                                  "Email is Required") ||
                                  (hasError("email") &&
                                    "Please enter a valid email"))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="PhoneNumber"
                    render={({ handler, touched, hasError, getError }) => (
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
                                ((hasError("required") &&
                                  "Phone Number is Required") ||
                                  (hasError("minLength") &&
                                    `Password Should Be greater than 
                                                                    ${
                                                                      getError(
                                                                        "minLength"
                                                                      )
                                                                        .requiredLength
                                                                    } character`))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="row">
                  <FieldControl
                    name="address.streetaddress"
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
                                (hasError("required") && "Address is Required")}
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
                                  "Continent is Required")}
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
                                  "Continent is Required")}
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
                                  "Continent is Required")}
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
                                (hasError("required") && "city is Required")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="zipCode"
                    render={({ handler, touched, hasError, getError }) => (
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            className="form-control"
                            placeholder=""
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                (hasError("required") &&
                                  "Zip Code is Required")}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="row">
                  <FieldControl
                    name="password"
                    render={({ handler, getError, hasError, touched }) => (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="........."
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                ((hasError("required") &&
                                  "Password is required") ||
                                  (hasError("minLength") &&
                                    `Password Should Be greater than 
                                                                    ${
                                                                      getError(
                                                                        "minLength"
                                                                      )
                                                                        .requiredLength
                                                                    } character`))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <FieldControl
                    name="confirm_password"
                    render={({ handler, touched, hasError }) => (
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="........."
                            {...handler()}
                          />
                          <div>
                            <span>
                              {touched &&
                                ((hasError("required") &&
                                  "Please confirm your password") ||
                                  (hasError("notEquivalent") &&
                                    "Password does not match."))}
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
                        onClick={() => this.handleReset()}
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

export default RegisterForm;
