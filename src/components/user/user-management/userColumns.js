import React, { Component } from "react";

class UserColumns extends Component {
  state = { colData: [] };
  checkBoxHandler = event => {
    let colData = [...this.state.colData];
    colData.map(col => {
      if (col.id === event.target.id) {
        col.show = event.target.checked;
      }
    });
    this.setState({ colData: [...colData] });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ colData: [...nextProps.colData] });
  }

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onUserColumnsSubmit(this.state.colData);
  };
  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {this.state.colData.map((col, index) => {
                  if (index > 0) {
                    return (
                      <div className="col-md-12" key={index}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={col.id}
                          checked={col.show}
                          onChange={this.checkBoxHandler}
                        />
                        <label className="form-check-label" htmlFor={col.id}>
                          {col.label}
                        </label>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserColumns;
