import React, { Component } from 'react';
import Hamburger from '../buttons/Hamburger'
import styled from 'styled-components';
import TopBarAnimation from "../animation/TopBarAnimation";

class TopBar extends Component {
  render(){
    return(
      <StTopCont>
        <Hamburger on={this.props.on} toggle={this.props.toggle}/>
        <TopBarAnimation/>
      </StTopCont>
    )
  }
} export default TopBar;

const StTopCont = styled.div`
  position: fixed;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 48px;
`;
