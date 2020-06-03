import React, { Component } from "react";
import styled from "styled-components";
import { Storage } from "../../storage/Storage"
import { getCommentBySaegim, writeComment } from "../../apis/CommentAPI";
import SmallButton from "../common/buttons/SmallButton";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      contents: "",
      updateFlag: false,
      userInfo: {},
      ovfl: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getComments = async () => {
    const _comments = await getCommentBySaegim(this.props.id)
    await this.setState({
      comments: _comments
    })
  }

  handleInput = async (e) => {
    await this.setState({
      contents: e.target.value
    })
  }

  handleSubmit = async () => {
    const _saegimid = this.props.id
    const _data = {
      contents: this.state.contents,
    }
    const _userInfo = {
      id: this.state.userInfo.id,
      name: this.state.userInfo.name
    }
    const _res = await writeComment(_data, _saegimid, _userInfo)
    this.setState({
      updateFlag: true,
      contents: ""
    })
  }

  handleClick() {
    this.setState({
      ovfl: true,
      updateFlag: true
    })
  }

  async componentDidMount() {
    await this.getComments()
    await this.setState({
      userInfo: this.context.userInfo
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.updateFlag === true) {
      this.getComments()
      this.setState({
        updateFlag: false
      })
    }
  }

  render() {
    const PrintComment = this.state.comments.map((comment, i) => {
      return (
        <CommentItem user={comment.userName} contents={comment.contents} key={i} />
      )
    })
    return (
      <div>
        <StCommentList ovfl={this.state.ovfl}>
          {PrintComment}
        </StCommentList>
          { !this.state.ovfl &&
            this.state.comments.length > 5 &&
            <MoreView onClick={this.handleClick}>더보기</MoreView>
          }
          { this.state.comments.length < 1 &&
            <StDescription>첫 되새김을 남겨주세요.</StDescription>
          }
        <StCommentInput>
          <CommentInput value={this.state.contents} onChange={this.handleInput} />
          <SmallButton text='등록' onClick={this.handleSubmit}/>
        </StCommentInput>
      </div>
    );
  }
}

export default Comment;
Comment.contextType = Storage;

const StCommentList = styled.div`
  padding: 0 16px 0 16px;
  height: ${props => props.ovfl === false ? '12vh' : '15vh'};
  overflow: ${props => props.ovfl === false ? 'hidden' : 'auto'};
`;

const StCommentInput = styled.div`
  margin-top: 16px;
  padding: 0 16px 0 16px;
`;

const MoreView = styled.div`
  margin: 8px 0 0 16px;
  font-size: 0.9rem;
  color: #818181;
`;

const StDescription = styled.div`
  font-size: 0.9rem;
  color: #818181;
  margin-left: 16px;
`;