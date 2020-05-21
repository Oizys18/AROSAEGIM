import React, { Component } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

class HugeButton extends Component {
  render() {
    return (
      <Button
        variant="contained"
        color="default"
        size="large"
        onClick={this.props.onClick}
      >
        <BtnTxt>{this.props.text}</BtnTxt>
      </Button>
    );
  }
}
export default HugeButton;

const BtnTxt = styled.div`
  font-size: 16px;
`;
