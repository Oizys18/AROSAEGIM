import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: black;
  border-radius: 0.4em;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  box-shadow: 2px 2px 4px grey;
  height: 30px;
`;
const TxtBtn = styled.button`
  border: none;
  outline: none;
  background: white;
  padding: 0px 8px 0px 8px;
  width: 50%;
  height: 100%;
  border-radius: 0.5em;
  &:hover {
    background-color: ghostwhite;
  }
  &:active {
    background-color: grey;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: relative;
  color: black;
  padding: 16px;
  border-radius: 2em;
  width: 32px;
  display: flex;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: ghostwhite;
  z-index: 1;
  border: 8px solid white;
  box-shadow: 1px 1px 2px grey;
  &:hover {
    background-color: lightgrey;
  }
  &:active {
    background-color: grey;
  }
  &:focus {
    outline: none;
  }
  & span {
  }
`;

class Navbar extends Component {
  render() {
    return (
      <Wrapper>
        <TxtBtn onClick={this.props.onClick}>돌아가기</TxtBtn>

        <Button onClick={this.props.onClick}>✔</Button>

        <TxtBtn onClick={this.props.onClick}>버튼</TxtBtn>
      </Wrapper>
    );
  }
}
export default Navbar;
