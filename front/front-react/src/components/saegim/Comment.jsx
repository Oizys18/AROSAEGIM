import React, { Component } from "react";
import styled from "styled-components";

class Comment extends Component {
  render() {
    return (
      <div>
        <span>{this.props.user}</span>
        <span>{this.props.contents}</span>
      </div>
    )
  }
}

export default Comment;