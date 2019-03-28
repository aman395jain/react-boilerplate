import React, { Component } from "react";
// import ReactTable from "react-table";

import Table from "../../../shared/reactTable/reactTable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllUsers } from "../../../actions/userAction";
// import ExportToExcel from "./ExportToExcel";
import ModalComponent from "../../../shared/modal/modal";
import RegisterForm from "../user-registration/register";
import UserColumns from "../user-management/userColumns";

class UserManagement extends Component {
  state = {
    selected: {},
    selectAll: 0,
    openModal: false,
    userColModalFlag: false
  };
  tableColumns = [];
  tableBody = [];
  headerKeyMap = {
    firstName: "First Name",
    lastName: "Last Name",
    emailId: "Email",
    phoneNo: "Phone Number",
    address: "Address",
    city: "City",
    state: "State",
    continent: "Continent",
    country: "Country",
    zip: "Zip Code",
    organization: "Organization",
    employeeId: "Employee Id",
    role: "Role",
    status: "Status",
    userId: "User Id"
  };
  componentDidMount() {
    this.setState({
      tableHeader: ""
    });
    this.props.getAllUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userDashboard.usersData) {
      this.createTable(nextProps.userDashboard.usersData);
    }
  }
  createTable(tableData) {
    this.tableColumns.push({
      Header: x => {
        return (
          <div className="custom-control custom-checkbox ml-1 mr-1">
            <input
              type="checkbox"
              className="custom-control-input"
              id="select_all"
              checked={this.state.selectAll === 1}
              ref={input => {
                if (input) {
                  input.indeterminate = this.state.selectAll === 2;
                }
              }}
              onChange={() => this.toggleSelectAll()}
            />
            <label className="custom-control-label" htmlFor="select_all" />
          </div>
        );
      },
      id: "checkbox",
      accessor: "",
      Cell: ({ original }) => {
        return (
          <div className="custom-control custom-checkbox ml-1 mr-1">
            <input
              type="checkbox"
              id={original.id}
              className="checkbox custom-control-input"
              checked={this.state.selected[original.name] === true}
              onChange={() => this.toggleRow(original.name)}
            />
            <label className="custom-control-label" htmlFor={original.id} />
          </div>
        );
      },
      sortable: false,
      width: 60,
      filterable: false,
      show: true
    });
    this.manipulateTableHeader(tableData[0]);
    this.manipulateTableBody(tableData);
  }
  manipulateTableHeader(tableObj) {
    tableObj = { ...tableObj };
    Object.keys(tableObj).map(key => {
      switch (key) {
        case "userContact":
        case "userOrganization":
          this.manipulateTableHeader(tableObj[key]);
          break;
        default:
          if (this.headerKeyMap[key]) {
            this.createTableHeader(key);
          }
          break;
      }
    });
  }
  manipulateTableBody(tableData) {
    const reactTableRow = {};
    tableData.forEach(row => {
      this.manipulateTableRow(reactTableRow, row);
      this.tableBody.push({ ...reactTableRow });
    });
  }

  manipulateTableRow(reactTableRow, row) {
    row = { ...row };
    Object.keys(row).map(key => {
      // debugger;
      switch (key) {
        case "userContact":
        case "userOrganization":
          this.manipulateTableRow(reactTableRow, row[key]);
          break;
        default:
          this.createTableBody(row, key, reactTableRow);
          break;
      }
    });
  }

  updateColumns = tableColumns => {
    console.warn("user dashboard event updateColumns", tableColumns);
    this.setState({ userColModalFlag: !this.state.userColModalFlag });
    this.tableColumns = [...tableColumns];
  };
  createTableHeader(key) {
    let showFlag = Math.floor(Math.random() * 10) + 1 > 8 ? true : false;
    this.tableColumns.push({
      Header: this.headerKeyMap[key],
      accessor: key,
      show: showFlag,
      id: key,
      label: this.headerKeyMap[key]
    });
  }
  createTableBody(row, key, reactTableRow) {
    reactTableRow[key] = row[key];
  }

  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  // Select all table row checkout box
  toggleSelectAll() {
    let newSelected = {};

    if (this.props.userDashboard.selectAll === 0) {
      this.props.userDashboard.usersData.forEach(row => {
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

  renderTableRowActions() {
    if (this.props.userDashboard.selectAll > 0) {
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
    const modalActive = false;
    if (this.props.userDashboard.usersData) {
      return (
        <div className="container">
          <div className="user-list">
            <h1>List of Users </h1>
            <div className="row">
              <div className="col-sm-5">{this.renderTableRowActions()}</div>

              <div className="col-sm-7">
                <form className="d-flex form-inline justify-content-end">
                  <div className="search-section">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Search"
                    />
                    <i className="search-item fas fa-search" />
                  </div>

                  <button
                    className="btn btn-danger small ml-2 mr-2"
                    onClick={this.openUserForm.bind(this)}
                  >
                    <i className="fas fa-user-plus" />
                  </button>

                  <button
                    className="btn btn-light small ml-2 mr-2 icon-add-column"
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i className="fas fa-plus" />
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary small"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </button>
                    <div className="dropdown-menu">
                      <i className="fas fa-caret-up" />
                      <span className="dropdown-item">Import User</span>
                      <span className="dropdown-item">Export to Excel</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Table
                  tableBody={this.tableBody}
                  tableColumns={this.tableColumns}
                  defaultPageSize={5}
                  id="user-table-to-xls"
                />
                <ModalComponent
                  ref="addUserModal"
                  Form_modal={RegisterForm}
                  isModalOpen={modalActive}
                />
                <UserColumns
                  ref="addUserColumns"
                  isModalOpen={this.state.userColModalFlag}
                  colData={this.tableColumns}
                  onUserColumnsSubmit={this.updateColumns}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    userDashboard: state.userDashboard
  };
};
export default connect(
  mapStateToProps,
  { getAllUsers }
)(withRouter(UserManagement));
