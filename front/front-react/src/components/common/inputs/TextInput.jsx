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
        rows={9}
        rowsMax={9}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
export default TextInput;

const CustomInput = styled(TextField)`
  width: 90%;
  border-radius: 20px;
  padding: 16px;
  margin: 12px 0;
  
  text-align: center;
  background-color: #ffffff;
  
  .MuiInputBase-root-78 {
    font-family: 'Noto Serif KR', serif;
  }
  
  .MuiInput-underline-69:before {
    border-bottom: none;
  }
  
  .MuiInput-underline-69:after {
    border-bottom: none;
  }
  
  .MuiInput-underline-69:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
`;
