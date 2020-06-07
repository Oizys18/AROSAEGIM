import React, { Component } from "react";
import styled from "styled-components";
import ChipComponent from "@material-ui/core/Chip";

class Chip extends Component {
  render() {
    return (
      <StChip
        {...this.props}
        label={this.props.text}
      />
    );
  }
}
export default Chip;

const StChip = styled(ChipComponent)``;
