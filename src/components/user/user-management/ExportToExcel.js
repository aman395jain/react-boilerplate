import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class ExportToExcel extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Export"
        />
        <table id="table-to-xls" hidden={true}>
          <thead>
            <tr>
              {this.props.headerData.map((header, i) => {
                return <th key={i}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((data, i) => {
              return (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.userId}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>{data.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExportToExcel;
