import React, { Component } from "react";
import ReactTable from "react-table";

class Table extends Component {
  render() {
    return (
      <ReactTable
        className="user-list-table table-striped mt-3"
        data={[...this.props.tableBody]}
        columns={[...this.props.tableColumns]}
        defaultPageSize={this.props.defaultPageSize}
        id={this.props.id}
      >
        {/* {(state, filterData) => {
                    this.reactTable = state.pageRows.map(row => row._original);
                    return (
                      <div>
                        {filterData()}
                        <ExportToExcel
                          headerData={[
                            "Name",
                            "User ID",
                            "Email ID",
                            "Role",
                            "Status"
                          ]}
                          rows={this.reactTable}
                        />
                      </div>
                    );
                  }} */}
      </ReactTable>
    );
  }
}
export default Table;
