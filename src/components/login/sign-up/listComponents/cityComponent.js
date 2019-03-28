import React, { Component } from "react";
import { connect } from "react-redux";

import signUpService from "../../../../services/signUp_service";

class CityList extends Component {
  state = { cityListByStateId: [] };

  componentWillReceiveProps = nextprops => {
    // get the state data against country
    signUpService.getCityAgainstState(nextprops.cityInState).then(res => {
      this.setState({ cityListByStateId: res.data });
    });
  };

  renderCity = cities => {
    // console.log("in the state component", states);
    if (cities.length > 0) {
      return cities.map(cityValue => {
        return (
          <option value={cityValue.name} key={cityValue.cityId}>
            {cityValue.name}
          </option>
        );
      });
    }
  };

  changeCity = e => {
    this.props.onCityChange(e.target.value);
  };

  render() {
    return (
      <select
        placeholder="select"
        className="form-control"
        onClick={this.changeCity}
      >
        <option value="-1" key="-1">
          Select City
        </option>
        {this.renderCity(this.state.cityListByStateId)}
      </select>
    );
  }
}
function mapStateToProps(state) {
  // console.log("in mapStateToProps for city", state);
  return {
    cityInState: state.regState.regStateData
  };
}
export default connect(mapStateToProps)(CityList);
