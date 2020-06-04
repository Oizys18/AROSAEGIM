import React, { Component } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { getTimeDeltaString } from "../common/time/TimeFunctinon"

class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyVal: ['작성한', '덧새긴', '되새긴'],
    }
  }

  render() {
    const PrintList = this.props.data.map((saegim, i) => {
      if (this.props.value === 0) {
      return (
        <SaegimItem key={i}>
          <StLink to={`list/${saegim.id}`}>
            <StW3W>
              {saegim.w3w}
              <StTime>
                <StAccessTimeIcon />
                <div>{getTimeDeltaString(saegim.regDate)}</div>
              </StTime>
            </StW3W>
            <StContents>{saegim.contents}</StContents>
          </StLink>
        </SaegimItem>
      )} else if (this.props.value === 1) {
        return (
          <SaegimItem key={i}>
            <StLink to={`list/${saegim.id}`}>
              <StW3W>
              {saegim.w3w}
              <StTime>
                <StAccessTimeIcon />
                <div>{getTimeDeltaString(saegim.regDate)}</div>
              </StTime>
              </StW3W>
            <StContents>{saegim.contents}</StContents>
            </StLink>
          </SaegimItem>
        )
      } else if (this.props.value === 2) {
        return (
          <SaegimItem key={i}>
            <StLink to={`list/${saegim.saegimId}`}>
              <StW3W>
              <StContents>{saegim.contents}</StContents>
              <StTime>
                <StAccessTimeIcon />
                <div>{getTimeDeltaString(saegim.regDate)}</div>
              </StTime>
              </StW3W>
            </StLink>
          </SaegimItem>
        )
      }
    });

    const EmptyList =
        <SaegimItem>
            <div>{this.state.emptyVal[this.props.value]} 글이 없습니다.</div>
        </SaegimItem>

    return (
      <div
        hidden={this.props.value !== this.props.index}
      >
        {this.props.data.length > 0 ? PrintList : EmptyList}
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

const StTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StW3W = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StContents = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StAccessTimeIcon = styled(AccessTimeIcon)`
  margin-right: 4px;
`;