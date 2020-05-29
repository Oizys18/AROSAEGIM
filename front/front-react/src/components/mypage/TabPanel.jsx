import React, { Component } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyVal: ['작성한', '덧새긴', '되새긴']
    }
  }

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

    const EmptyList =
        <SaegimItem>
            <div>{this.state.emptyVal[this.props.value]} 글이 없습니다.</div>
        </SaegimItem>

    return (
      <div
        hidden={this.props.value !== this.props.index}
      >
        {this.props.data.length > 1 ? PrintList : EmptyList}
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