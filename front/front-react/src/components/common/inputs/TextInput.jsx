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
      <div>
          <CustomInput
            id="saegim-text"
            placeholder="당신의 추억을 새겨주세요"
            multiline
            rows={5}
            rowsMax={6}
            margin="dense"
            variant="outlined"
            value={value}
            onChange={this.handleChange}
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
