import React, { Component } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
class TextInput extends Component {
  render() {
    return (
      <div>
        <CustomInput
          placeholder="당신의 추억을 새겨주세요"
          multiline
          rows={5}
          rowsMax={6}
          margin="dense"
          variant="outlined"
          // color="warning"
        />
      </div>
    );
  }
}
export default TextInput;

const CustomInput = styled(TextField)`
  width: 100%;
  background-color: transparent;
`;
