import React, { Component } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

class CommentInput extends Component{
  constructor(props) {
    super(props);
  }
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
  max-width: 50vw;

  .MuiInput-underline:after {
    border-bottom: 1.5px solid #616161; 
  }
`;