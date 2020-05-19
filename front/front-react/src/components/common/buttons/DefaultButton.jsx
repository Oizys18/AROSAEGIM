import React, { Component } from "react";
import styled from 'styled-components';
import Button from "@material-ui/core/Button";

class DefaultButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        variant="contained"
        color="default"
        size="middle"
      >
        <BtnTxt>{this.props.text}</BtnTxt>
      </Button>
    );
  }
}
export default DefaultButton;

const BtnTxt = styled.div`
  /* font-size:px; */
`