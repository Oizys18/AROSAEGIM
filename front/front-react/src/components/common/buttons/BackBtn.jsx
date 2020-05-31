import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

class BackBtn extends Component {
  render(){
    return(
      <Zoom in={true} timeout={400}>
        <StBackBtn onClick={this.props.handleBack}>
          <ArrowBack/>
        </StBackBtn>
      </Zoom>
    )
  }
} export default BackBtn;

export const StBackBtn = styled(IconButton)`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  color: white;
`;