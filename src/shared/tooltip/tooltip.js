import React, { Component } from "react";
import ReactDOM from "react-dom";
import { node, string, oneOfType } from "prop-types";

import "../../styles/_tooltip.scss";

class Tooltip extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  componentWillMount() {
    this.domNode = document.createElement("div");
    document.body.appendChild(this.domNode);

    this.sourceRef = React.createRef();
  }

  renderToolTip() {
    const { render } = this.props;
    if (this.state.active) {
      const {
        top,
        left,
        width
      } = this.sourceRef.current.getBoundingClientRect();

      return ReactDOM.createPortal(
        <div
          style={{
            position: "absolute",
            bottom: window.innerHeight - top - window.scrollY + 8,
            left: left + width / 2 + window.scrollX
          }}
        >
          <div className="tooltip-bubble tooltip-message">
            {render}
            <span className="tooltip-top-arrow" />
          </div>
        </div>,
        this.domNode
      );
    }
    return null;
  }
  showTooltip = () => {
    this.setState({
      active: true
    });
  };
  hideTooltip = () => {
    this.setState({
      active: false
    });
  };

  render() {
    const { children } = this.props;
    const source = (
      <span
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
        onFocus={this.showTooltip}
        onBlur={this.hideTooltip}
        tabIndex="0"
        key={this.props.keys}
        ref={this.sourceRef}
      >
        {children}
      </span>
    );
    return [source, this.renderToolTip()];
  }
}
Tooltip.propTypes = {
  children: node.isRequired,
  render: oneOfType([node, string]).isRequired
};

export default Tooltip;
