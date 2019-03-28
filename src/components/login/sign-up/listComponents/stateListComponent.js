import React, { Component } from "react";
import { connect } from "react-redux";

import signUpService from "../../../../services/signUp_service";

class StateList extends Component {
  state = { stateListByCountryId: [] };

  componentWillReceiveProps = nextprops => {
    // get the state data against country
    signUpService.getStateAgainstCountry(nextprops.stateInCountry).then(res => {
      this.setState({ stateListByCountryId: res.data });
    });
  };

  renderState = states => {
    // console.log("in the state component", states);
    if (states.length > 0) {
      return states.map(stateValue => {
        return (
          <option value={stateValue.name} key={stateValue.stateId}>
            {stateValue.name}
          </option>
        );
      });
    }
  };

  changeState = e => {
    this.props.onStateChange(e.target.value);
    if (this.state.stateListByCountryId.length > 0) {
      this.state.stateListByCountryId.map(statesFromData => {
        if (statesFromData.name === e.target.value) {
          this.props.dispatch({
            type: "SET_REGISTER_STATE",
            payload: statesFromData.stateId
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
        onClick={this.changeState}
      >
        <option value="-1" key="-1">
          Select State
        </option>
        {this.renderState(this.state.stateListByCountryId)}
      </select>
    );
  }
}

function mapStateToProps(state) {
  // console.log("in mapStateToProps", state.regCountry.regCountryData);
  return {
    stateInCountry: state.regCountry.regCountryData
  };
}

export default connect(mapStateToProps)(StateList);
