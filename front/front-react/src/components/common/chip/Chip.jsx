import React, { Component } from "react";
import styled from "styled-components";
import ChipComponent from "@material-ui/core/Chip";

class Chip extends Component {
  render() {
    return (
      <StChip
        size={this.props.size}
        label={this.props.text}
        onClick={this.props.onClick}
        color={this.props.color}
        variant={this.props.variant}
      />
    );
  }
}
export default Chip;

const StChip = styled(ChipComponent)`
`;
