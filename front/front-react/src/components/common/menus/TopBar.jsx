import React, { Component } from 'react';
import Hamburger from '../buttons/Hamburger'
import styled from 'styled-components';
import inlineLogo from "../../../assets/logo/inline-logo-white@2x.png";

class TopBar extends Component {
  render(){
    return(
      <StTopCont>
        <Hamburger on={this.props.on} toggle={this.props.toggle}/>
        <StLogo></StLogo>
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

  background: gray;
  width: 100%;
  height: 48px;
  padding-top: 2px;
`;

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 168px;
  height: 100%;
  
  /* background: #f2f2f2; */
  background-image: url(${inlineLogo});
  background-size: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  border: 3px solid gray;
  box-sizing: border-box;
`;