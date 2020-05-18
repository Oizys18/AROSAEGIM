import React, { Component } from "react";
import styled from "styled-components";

const DefaultBtn = styled.button`
  color: black;
  padding: 4px 8px 4px 8px;
  border-radius: 0.4em;
  font-size: 16px;
  border-radius: 0.5em;
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

class DefaultButton extends Component {
  render() {
    return (
      <DefaultBtn onClick={this.props.onClick}>{this.props.text}</DefaultBtn>
    );
  }
}
export default DefaultButton;
