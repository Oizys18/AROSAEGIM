import React, { Component } from "react";
import "./HugeButton.css";
class HugeButton extends Component {
  render() {
    return (
      <div>
        <button className="hugeBtn"> {this.props.text}</button>
      </div>
    );
  }
}
export default HugeButton;
