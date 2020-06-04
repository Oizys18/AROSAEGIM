import React, { Component } from "react";
import styled, {keyframes} from "styled-components";

class Card extends Component {
  render() {
    return <StCard color={this.props.color}>{this.props.children}</StCard>;
  }
}

export default Card;

// const color_change = keyframes`
//   from { background-color: ${props => props.preColor} }
//   to { background-color: ${props => props.color} }
// `;

const StCard = styled.div`
  border-radius: 16px;
  background: ${props => props.color};
  box-shadow: 15px 15px 70px rgba(130, 130, 130, 0.5), -15px -15px 70px rgba(130, 130, 130, 0.5);
  padding: 16px 24px 24px 16px;
  margin: 0px 16px 0px 16px;
  // animation: {color_change} 3s ease alternate;
`;





