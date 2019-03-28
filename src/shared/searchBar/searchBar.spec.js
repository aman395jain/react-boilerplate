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
    component.instance().searchWithDebounceTime(
      (events = {
        target: {
          value: "test"
        }
      })
    );
    expect(component.state().text).toBe("test");
  });
});
