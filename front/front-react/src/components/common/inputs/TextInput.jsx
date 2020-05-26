import React, { Component } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    this.props.onTextChange(e.target.value);
  };

  render() {
    const value = this.props.value;
    return (
      <CustomInput
        id="saegim-text"
        placeholder={this.props.placeholder}
        multiline
        fullWidth
        rows={7}
        rowsMax={7}
        margin="dense"
        variant="outlined"
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
export default TextInput;

const CustomInput = styled(TextField)`
  width: 100%;
  text-align: center;
  background-color: transparent;
`;
