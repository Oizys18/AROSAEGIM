import React, { Component } from "react";
import styled from "styled-components";
import saegimRowImg from "../../../assets/saegimRow/saegim-row-85.png"

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
        rows="10"
        rowsMax="10"
        maxLength="200"
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
export default TextInput;

const CustomInput = styled.textarea`
  background: url(${saegimRowImg}) repeat-y;
  width: auto;
  height: auto;
  line-height: 25px;
  padding: 2px 0px;
  padding-left: 35px;
  border: solid 2px #ddd;
  border-radius: 16px;
  font-family: "Noto Serif KR", serif;
  font-size: 15px;

  & > div {
    font-family: "Noto Serif KR", serif;
  }

  & > div:before {
    border-bottom: none;
  }

  & > div:after {
    border-bottom: none;
  }

  & > div:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
`;
