import React, { Component } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

class TabPanel extends Component {
  render() {
    const PrintList = this.props.data.map((saegim, i) => {
      return (
        <SaegimItem>
          <StLink to={`list/${saegim.id}`}>
            <div>{saegim.w3w}</div>
            <div>{saegim.content}</div>
          </StLink>
        </SaegimItem>
      )
    });

    return (
      <div
        hidden={this.props.value !== this.props.index}
      >
        {PrintList}
        {/*<StLink to={`list/${this.props.saegim.id}`}>*/}
        {/*  <div>{this.props.saegim.w3w}</div>*/}
        {/*  <div>{this.props.saegim.content}</div>*/}
        {/*</StLink>*/}
      </div>
    )
  }
}

export default TabPanel;

const SaegimItem = styled.div`
  margin: 16px;
  text-decoration: none;
`;

const StLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:focus, &:hover, &:active {
    opacity: 60%;
  }
  align-self: right;
`;