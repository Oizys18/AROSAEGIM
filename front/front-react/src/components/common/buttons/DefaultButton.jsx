import React, { Component } from "react";
import "./DefaultButton.css"
class DefaultButton extends Component {
  render() {
    return (
      <div>
        <button className="defaultBtn"> {this.props.text}</button>
      </div>
    );
  }
}
export default DefaultButton;
