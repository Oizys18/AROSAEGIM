import React, { Component } from "react";
import styled from 'styled-components';
import Button from "@material-ui/core/Button";

class SmallButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        variant="contained"
        color="default"
        size="small"
      >
        <BtnTxt>{this.props.text}</BtnTxt>
      </Button>
    );
  }
}
export default SmallButton;

const BtnTxt = styled.div`
  /* font-size:8px; */
`