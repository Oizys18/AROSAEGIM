import React, { Component } from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

class CommentInput extends Component{
  render() {
    return (
        <StInput
          type='text'
          placeholder='추억을 함께 되새기세요.'
          value={this.props.value}
          onChange={this.props.onChange}
        />
    )
  }
}

export default CommentInput;

const StInput = styled(TextField)`
  width:70%;

  .MuiInput-underline:after {
    border-bottom: 1.5px solid #616161; 
  }
`;