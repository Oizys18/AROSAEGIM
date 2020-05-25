import React, { Component } from "react";
import styled from "styled-components";

class Card extends Component {
  render() {
    return <StCard>{this.props.children}</StCard>;
  }
}

export default Card;

const StCard = styled.div`
  border-radius: 16px;
  background: #f5f5f5;
  box-shadow: 35px 35px 70px #c4c4c4, -35px -35px 70px #ffffff;
  padding: 16px 24px 24px 16px;
  margin: 0px 16px 0px 16px;
`;
