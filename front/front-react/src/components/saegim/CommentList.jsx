import React, { Component } from "react";
import styled from "styled-components";
import { getCommentBySaegim, writeComment } from "../../apis/CommentAPI";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

class CommentList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      contents: "",
      updateFlag: false
    }
    this.handleInput = this.handleInput.bind(this);
  }

  getComments = async () => {
    const _comments = await getCommentBySaegim(this.props.id)
    await this.setState({
      comments: _comments
    })
    console.log(this.state.comments)
  }

  handleInput = async (e) => {
    await this.setState({
      contents: e.target.value
    })
    console.log(this.state.contents)
  }

  handleSubmit = async () => {
    const _saegimid = this.props.id
    const _data = {
      contents: this.state.contents,
    }
    const _res = await writeComment(_data, _saegimid)
    console.log(_res)
    this.setState({
      updateFlag: true,
      contents: ""
    })
  }

  async componentDidMount() {
    console.log(this.props.id)
    await this.getComments()
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
        <Comment user={comment.userName} contents={comment.contents} key={i} />
      )
    })
    return (
      <div>
        {PrintComment}
        <CommentInput value={this.state.contents} onChange={this.handleInput} />
        <button onClick={this.handleSubmit}/>
      </div>
    );
  }
}

export default CommentList;