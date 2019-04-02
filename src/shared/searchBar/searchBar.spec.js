import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SearchBox from "./searchBar";

configure({ adapter: new Adapter() });
let props, events;
beforeEach(() => {
  props = {
    event: {
      keyCode: 27
    }
  };
});

jest.mock("../../services/searchBarService.js");

describe("SearchBox", () => {
  const component = shallow(<SearchBox debug />);

  it('should render correctly in "debug" mode', () => {
    expect(component).toMatchSnapshot();
    expect(component.find(".input-without-text")).toBeDefined();
    expect(component.find("input")).toBeDefined();
  });

  it("should test the handle escape key to be true", () => {
    // component.find("input").simulate("onKeyDown", props.event);
    component.instance().handleKeyEsc(props.event);
    expect(component.state().escapeFlag).toBeTruthy;
  });

  it("should test the handle escape key to be false", () => {
    component.instance().handleKeyEsc({ keyCode: "01" });
    expect(component.state().escapeFlag).toBeFalsy;
  });

  it("should test the search With Debounce Time", () => {
    component.instance().autocompleteSearchDebounced = jest.fn();
    component.instance().searchWithDebounceTime(
      (events = {
        target: {
          value: "test"
        }
      })
    );
    expect(component.state().text).toBe("test");
    expect(
      component.instance().autocompleteSearchDebounced
    ).toHaveBeenCalledWith(component.state().text);
  });

  it("should test the search Text", () => {
    let searchData = [],
      employeeNameInSearchBar = [];
    // console.log("in the search text", component.instance().searchDataFromAPI);
    component.instance().value = component.state().text;
    component.instance().searchText();
    expect(component.state().text).toHaveLength(4);
    component.instance().searchDataFromAPI.forEach(empName => {
      employeeNameInSearchBar.push(empName.employee_name);

      //   component
      //     .instance()
      //     .searchText.employeeNameInSearchBar.push(empName.employee_name);
    });

    const regex = new RegExp(`^${component.instance().value}`, "i");
    searchData = employeeNameInSearchBar.sort().filter(v => regex.test(v));
    console.log("in the search text", component.state().searchData);
  });
});
