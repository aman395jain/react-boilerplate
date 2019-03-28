import React, { Component } from "react";
import { debounce } from "throttle-debounce";

import "./searchBar.scss";
import serachBarService from "../../services/searchBarService";

class SearchBox extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.searchDataFromAPI = [];
    this.state = {
      searchData: [],
      text: "",
      escapeFlag: false
    };
    this.autocompleteSearchDebounced = debounce(500, this.searchText);
  }

  async componentDidMount() {
    this.searchDataFromAPI = await serachBarService.getSearchData();
  }

  searchWithDebounceTime = e => {
    this.setState({ text: e.target.value });
    this.autocompleteSearchDebounced(this.state.text);
  };

  searchText = () => {
    const value = this.state.text;
    let searchData = [],
      employeeNameInSearchBar = [];

    if (value.length > 2 && this.searchDataFromAPI.data) {
      this.searchDataFromAPI.data.map(employeeName => {
        employeeNameInSearchBar.push(employeeName.employee_name);
      });
      const regex = new RegExp(`^${value}`, "i");
      searchData = employeeNameInSearchBar.sort().filter(v => regex.test(v));
    }

    // console.log("in the searchText", searchData);
    this.setState(() => ({ searchData, text: value }));
  };

  handleKeyEsc = e => {
    if (e.keyCode === 27) {
      this.setState({
        escapeFlag: true
      });
    } else {
      this.setState({
        escapeFlag: false
      });
    }
  };

  renderText = () => {
    const { searchData, text } = this.state;
    if (text.length > 0 && searchData.length === 0 && !this.state.escapeFlag) {
      return (
        <ul className="searchBar-dropdown">
          <li>No result</li>
        </ul>
      );
    } else if (searchData.length === 0 && this.state.escapeFlag) {
      return null;
    } else {
      return !this.state.escapeFlag ? (
        <ul className="searchBar-dropdown">
          {searchData.map((items, i) => (
            <li key={i}>{items}</li>
          ))}
        </ul>
      ) : null;
    }
  };

  render() {
    return (
      <div className="seachBar">
        <div
          className={
            "search-" +
            (this.state.searchData.length === 0
              ? "input-without-text"
              : "input")
          }
        >
          <input
            value={this.state.text}
            onChange={this.searchWithDebounceTime}
            type="text"
            placeholder="Search text"
            onKeyDown={this.handleKeyEsc}
          />
        </div>
        {this.renderText()}
      </div>
    );
  }
}

export default SearchBox;
