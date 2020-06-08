import React, { Component } from "react";
// import styled from "styled-components";
// import StSwitch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CustomSwitch } from '../../../styles/MuiStyles'

class Switch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = () => {
    this.props.changeSwitch();
  };
  render() {
    return (
      <FormGroup>
        <FormControlLabel
          label={this.props.labelText}
          labelPlacement={this.props.labelPlacement}
          control={
            <CustomSwitch
              checked={this.props.checked}
              onChange={this.handleChange}
              size={this.props.size}
              color={this.props.color}
            />
          }
        />
      </FormGroup>
    );
  }
}
export default Switch;

// const CustomSwitch = styled(StSwitch)``;
