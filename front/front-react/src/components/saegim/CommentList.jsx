import React, { Component } from "react";
import getCommentBySaegim from "../../apis/tempAPI";

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
    return (
      <div>

      </div>
    );
  }
}