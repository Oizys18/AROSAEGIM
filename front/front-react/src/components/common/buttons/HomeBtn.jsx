import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton, Zoom } from '@material-ui/core';
import { Home } from '@material-ui/icons';

class HomeBtn extends Component {
  render(){
    return(
      <Zoom in={true} timeout={400}>
        <StHomeBtn onClick={this.props.handleHome}>
          <Home/>
        </StHomeBtn>
      </Zoom>
    )
  }
} export default HomeBtn;

export const StHomeBtn = styled(IconButton)`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  color: white;
`;