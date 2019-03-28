import React, { Component } from "react";
import "./carDetail.scss";

class CarDetail extends Component {
  state = {};

  render() {
    console.log(this.props.match.params.incidentId);
    return (
      <div className="car-details">
        <div className="container">
          <div className="row ">
            <div className="col-12 d-flex">
              <div className="car-image" />
              <div className="car-video">
                <div className="car-id">
                  {this.props.match.params.incidentId}
                </div>
                <div className=""> video</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarDetail;
