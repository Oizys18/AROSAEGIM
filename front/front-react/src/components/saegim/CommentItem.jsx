import React, { Component } from "react";
import styled from "styled-components";

class CommentItem extends Component {
  render() {
    return (
      <Wrapper>
        <StComment>
        <StUser>{this.props.user}</StUser>
        <StContents>{this.props.contents}</StContents>
        </StComment>
      </Wrapper>
    )
  }
}

export default CommentItem;

const Wrapper = styled.div`
  display: flex;
  text-align: center;
`;

const StComment = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const StUser = styled.div`
  margin-right: 8px;
  font-weight: bold;
`;

const StContents = styled.div`
  
`;