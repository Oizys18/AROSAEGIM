import React, { Component } from "react";
import styled from "styled-components";
import { Storage } from "../../storage/Storage";
import { getCommentBySaegim, writeComment } from "../../apis/CommentAPI";
import SmallButton from "../common/buttons/SmallButton";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { FlexRow } from "../../styles/DispFlex";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      contents: "",
      updateFlag: false,
      userInfo: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getComments = async () => {
    const _comments = await getCommentBySaegim(this.props.id);
    await this.setState({
      comments: _comments,
    });
  };

  handleInput = async (e) => {
    await this.setState({
      contents: e.target.value,
    });
  };

  handleSubmit = async () => {
    const _saegimid = this.props.id;
    const _data = {
      contents: this.state.contents,
    };
    const _userInfo = {
      id: this.state.userInfo.id,
      name: this.state.userInfo.name,
    };
    await writeComment(_data, _saegimid, _userInfo);
    this.setState({
      updateFlag: true,
      contents: "",
    });
  };

  handleClick() {
    this.setState({
      updateFlag: true,
    });
  }

  async componentDidMount() {
    await this.getComments();
    await this.setState({
      userInfo: this.context.userInfo,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.updateFlag === true) {
      this.getComments();
      this.setState({
        updateFlag: false,
      });
    } else if (this.context.updateFlag === 2) {
      this.getComments();
      this.context.setUpdateFlag(0);
    }
  }

  render() {
    const PrintComment = this.state.comments.map((comment, i) => {
      return (
        <CommentItem
          user={comment.userName}
          contents={comment.contents}
          saegimid={this.props.id}
          userid={comment.userId}
          id={comment.id}
          key={i}
        />
      );
    });
    return (
      <div>
        <StCommentList>
          {PrintComment}
          {this.state.comments.length < 1 && (
            <StDescription>첫 되새김을 남겨주세요.</StDescription>
          )}
        </StCommentList>
        <StCommentInput>
          <CommentInput
            value={this.state.contents}
            onChange={this.handleInput}
          />
          <StSmallButton>
            <SmallButton text="등록" onClick={this.handleSubmit} />
          </StSmallButton>
        </StCommentInput>
      </div>
    );
  }
}

export default Comment;
Comment.contextType = Storage;

const StCommentList = styled.div`
  padding: 0 16px 0px 16px;
  overflow: scroll;
  max-height: 25vh;
  /* @media (max-height: 850px) {
    max-height: 25vh;
  }
  @media (max-height: 700px) {
    max-height: 23vh;
  }
  @media (max-height: 600px) {
    max-height: 15vh;
  } */
`;

const StCommentInput = styled(FlexRow)`
  z-index: 10;
  position: fixed;
  bottom: 1%;
  width: 100%;
  /* margin-top: 16px; */
  padding: 4px 8px 0 8px;
  /* padding: 0 16px 0 16px; */
  border-top: 1px solid rgba(30, 30, 30, 0.2);
`;

const StDescription = styled.div`
  font-size: 0.9rem;
  color: #818181;
  margin-left: 16px;
  height: 19px;
`;

const StSmallButton = styled.div`
  margin-left: 2vw;
  .MuiButton-contained {
    background-color: #f4c6ba;
  }
`;
