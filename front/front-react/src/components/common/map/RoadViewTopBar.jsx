import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton, Slide } from '@material-ui/core';
import { Close } from '@material-ui/icons';

class RoadViewTopBar extends Component {
  render(){
    return(
      <Slide in={this.props.on} direction="down">
        <StTopCont>
          <StCloseBtn onClick={this.props.tglView}><Close/></StCloseBtn>
          <StAddrCont>{this.props.addr}</StAddrCont>
          <StCloseBtn style={{visibility: 'hidden'}}><Close/></StCloseBtn>
        </StTopCont>
      </Slide>
    )
  }
} export default RoadViewTopBar;

const StTopCont = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgba(255, 255, 255, 0.9);
  
  width: 100%;
  height: 40px;
`;

const StCloseBtn = styled(IconButton)`

`;

const StAddrCont = styled.div`
  display: flex;
`;