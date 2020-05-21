import React, { Component } from "react";
import styled from "styled-components";
import StepperCom from "@material-ui/core/Stepper";
import StepCom from "@material-ui/core/Step";
import StepLabelCom from "@material-ui/core/StepLabel";

class Stepper extends Component {
  render() {
    return (
      <div>
        <StStepper>
          <StLabel></StLabel>
          <StStep></StStep>
        </StStepper>
      </div>
    );
  }
}
export default Stepper;

const StStepper = styled(StepperCom)``;
const StStep = styled(StepCom)``;
const StLabel = styled(StepLabelCom)``;
