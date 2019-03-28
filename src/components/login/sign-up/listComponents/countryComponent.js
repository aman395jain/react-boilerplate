import React, { Component } from "react";
import { connect } from "react-redux";

import signUpService from "../../../../services/signUp_service";

/* 
    Shared Component for list of countries
*/
class Country extends Component {
  state = {
    countryList: []
  };

  async componentWillMount() {
    const res = await signUpService.getCountry();
    this.setState({
      countryList: res.data.map(data => {
        return data;
      })
    });
  }

  renderCountries(countries) {
    if (countries.length > 0) {
      return countries.map((countryValue, i) => {
        return (
          <option value={countryValue.name} key={i}>
            {countryValue.name}
          </option>
        );
      });
    }
  }

  // Dispatch the country ID to reducer.

  changeCountry = e => {
    this.props.onCountryChange(e.target.value);
    if (this.state.countryList.length > 0) {
      this.state.countryList.map(country => {
        if (country.name === e.target.value) {
          this.props.dispatch({
            type: "SET_REGISTER_COUNTRY",
            payload: country.countryId
          });
        }
      });
    }
  };

  render() {
    return (
      <select
        placeholder="select"
        className="form-control"
        onClick={this.changeCountry}
      >
        <option value="-1" key="-1">
          Select Country
        </option>
        {this.renderCountries(this.state.countryList)}
      </select>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     countryState: state.regCountry
//   };
// }

export default connect()(Country);
