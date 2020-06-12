import React, { Component } from "react";
import styled from "styled-components";
import ChipComponent from "@material-ui/core/Chip";

class MapChip extends Component {
  constructor(){
    super();
    this.state = {
      status: false,
    }
  }

  handleClick = () => {
    this.setState({status: !this.state.status})
  }
  render() {
    return (
      <StChipCont>
        <StChip
          {...this.props}
          label={this.props.text}
          onClick={this.handleClick}
        />
        {this.state.status && 
          <StButtonContainer>
            <ChipComponent label={'바로가기'}/>
            <ChipComponent label={'삭제'}/>
          </StButtonContainer>
        }
      </StChipCont>
    );
  }
}
export default MapChip;

const StChipCont = styled.div`
  position: relative;
`;

const StChip = styled(ChipComponent)``;

const StButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  z-index: 16;
`;