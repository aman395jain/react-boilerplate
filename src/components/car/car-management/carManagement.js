import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";

import tableData from "../../../data/carData.json";
import Header from "../../../shared/header/header.js";

class UserManagement extends Component {
  state = { selected: {}, selectAll: 0, data: tableData, openModal: false };

  componentDidMount() {}

  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  // Select all table row checkout box
  toggleSelectAll(object) {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(row => {
        newSelected[row.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  openUserForm(e) {
    //this.setState({openModal : true})
    e.preventDefault();
    this.refs.addUserModal.handleModalOpen();
  }

  userListColumn() {
    const columns = [
      {
        Header: "Incident No.",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <div className="d-flex align-items-center">
              <Link
                to={{
                  pathname: "/carDetails/" + original.incident_no,
                  param1: "Par1"
                }}
                className="car-name"
              >
                {original.incident_no}
              </Link>
            </div>
          );
        }
      },
      {
        Header: "Date",
        accessor: "Date"
      },
      {
        Header: "VIN",
        accessor: "VIN"
      },
      {
        Header: "Car Model",
        accessor: "car_model"
      },
      {
        Header: "Status",
        Cell: ({ original }) => {
          return (
            <div
              className={
                original.status.toLocaleLowerCase() === "inactive"
                  ? "inactive"
                  : ""
              }
            >
              {original.status}
            </div>
          );
        },
        width: 100
      }
    ];
    return columns;
  }

  renderTableRowActions() {
    if (this.state.selectAll > 0) {
      return (
        <div className="table-actions">
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-pen" />
          </button>
          <button className="btn btn-outline-secondary small ml-2 mr-2">
            <i className="far fa-check-circle" />
          </button>
          <button className="btn btn-outline-secondary small">
            <i className="fas fa-times" />
          </button>
        </div>
      );
    }
    return <div className="pt-2">Showing 10 of 150</div>;
  }
  render() {
    return (
      <div className="container">
        <Header isAuthorized={this.state.isLogin} />
        <div className="user-list">
          <h1>Car Information List</h1>
          <div className="row">
            <div className="col-sm-5">{this.renderTableRowActions()}</div>
          </div>
          <div className="row">
            <div className="col-12">
              <ReactTable
                className="user-list-table table-striped mt-3"
                data={this.state.data}
                columns={this.userListColumn()}
                defaultPageSize={5}
                id="table-to-xls"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserManagement;
