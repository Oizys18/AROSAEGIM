import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'
import { Storage } from '../../../storage/Storage'


class SideMenu extends Component {

  render(){
    return(
      <>
      { 
        this.context.sideMenu && 
        <StOpacityBack onClick={this.context.toggleSideMenu}/> 
      }

      <Slide in={this.context.sideMenu} direction='right'>
        <StMenuCont>
          
          <StTopCont>
            <StLogo>대애충 로고</StLogo>
            <StCloseBtn onClick={this.context.toggleSideMenu}><Close/></StCloseBtn>
          </StTopCont>

          <StListCont>
            메뉴 리스트 들어갈 자리
          </StListCont>

        </StMenuCont>
      </Slide>
      </>
    )
  }
} SideMenu.contextType = Storage; 
export default SideMenu;

const StOpacityBack = styled.div`
  position: fixed;
  top:0;
  z-index: 2;

  width: 100%;
  height: 100%;

  background: black;
  opacity: 0.3;
`

const StMenuCont = styled.div`
  position: fixed;
  top:0;
  z-index: 3;

  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background: white;

  border: 3px solid black;
  box-sizing: border-box;
`;

const StTopCont = styled.div`
  height: 48px;

  display: flex;
  justify-content: space-between;

  border: 3px solid darkred;
  box-sizing: border-box;
`;

const StLogo = styled.div`
  display: flex;
  align-items: center;

  border: 3px solid darkblue;
  box-sizing: border-box;
`;

const StCloseBtn = styled(IconButton)`
  padding: 1vh;
  /* margin: 1vh; */
`;

const StListCont = styled.div`
  height: 100%;

  border: 3px solid darkgreen;
  box-sizing: border-box;
`;