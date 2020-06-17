import React, { Component } from "react";
import styled from "styled-components";

class Card extends Component {
  render() {
    return <StCard color={this.props.color}>{this.props.children}</StCard>;
  }
}

export default Card;

const StCard = styled.div`
  border-radius: 16px;
  background: ${props => props.color};
  box-shadow: 16px 16px 32px rgba(77,77,77,0.5), -16px -16px 32px rgba(89,89,89,0.5);
  padding: 16px 24px 16px 24px;
  margin: 0px 16px 0px 16px;
  word-break: keep-all;
`;





