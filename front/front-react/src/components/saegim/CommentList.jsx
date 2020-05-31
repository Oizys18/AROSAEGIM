import React, { Component } from "react";
import styled from "styled-components";
import getCommentBySaegim from "../../apis/tempAPI";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

class CommentList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }

  getComments = async () => {
    const _comments = await getCommentBySaegim(this.props.params.id)
    await this.setState({
      comments: _comments
    })
  }

  componentDidMount() {
    this.getComments()
  }

  render() {
    const PrintComment = this.state.comments.map((comment, i) => {
      return (
        <Comment key={i} />
      )
    })
    return (
      <div>
        {PrintComment}
      </div>
    );
  }
}

export default CommentList;