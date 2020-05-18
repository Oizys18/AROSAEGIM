import React, { Component } from 'react';
import Hamburger from '../buttons/Hamburger'
import styled from 'styled-components';
import { Slide } from '@material-ui/core';

class TopBar extends Component {
  render(){
    return(
      <Slide in={true} direction="down">
        <StTopCont>
          <Hamburger on={this.props.on} toggle={this.props.toggle}/>
          <StLogo>로고</StLogo>
        </StTopCont>
      </Slide>
    )
  }
} export default TopBar;

const StTopCont = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  background: gray;
  width: 100%;
  height: 48px;
`

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  
  background: #f2f2f2;
  border: 3px solid gray;
  box-sizing: border-box;
`