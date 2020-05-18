import React, { Component } from "react";
import styled from "styled-components";

const HugeBtn = styled.button`
  color: black;
  padding: 8px 16px 8px 16px;
  border-radius: 0.4em;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 2px 2px 4px grey;
  background-color: ${(props) => props.color || "ghostwhite"};
  &:hover {
    background-color: lightgrey;
  }
  &:active {
    background-color: grey;
  }
  &:focus {
    outline: none;
  }
`;

class HugeButton extends Component {
  render() {
    return <HugeBtn onClick={this.props.onClick}>{this.props.text}</HugeBtn>;
  }
}
export default HugeButton;
