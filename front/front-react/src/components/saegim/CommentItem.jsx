import React, { Component } from "react";
import { Storage } from "../../storage/Storage"
import styled from "styled-components";
import { delComment } from "../../apis/CommentAPI";
import CloseIcon from "@material-ui/icons/Close"

class CommentItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userid: this.context.userInfo.id
    }
  }

  handleClick = () => {
    this.context.popModal('댓글을 삭제하시겠습니까?', 'delComment', 'confirm')
    this.context.setDelComment([this.props.saegimid, this.props.id])
  }

  render() {
    return (
      <Wrapper>
        <StComment>
          <StUser>{this.props.user}</StUser>
          <div>{this.props.contents}</div>
        </StComment>
        {this.state.userid === this.props.userid &&
          <div onClick={this.handleClick}>
            <CloseIcon/>
          </div>
        }
      </Wrapper>
    )
  }
}

export default CommentItem;
CommentItem.contextType = Storage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StComment = styled.div`
  margin-bottom: 4px;
  display: flex;
`;

const StUser = styled.div`
  margin-right: 8px;
  font-weight: bold;
`;