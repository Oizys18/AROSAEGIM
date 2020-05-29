import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";

import UserInfo from './UserInfo';

class SideMenu extends Component {
  render(){
    return(
      <>
      { 
        this.props.on && 
        <StOpacityBack onClick={this.props.toggle}/> 
      }

      <Slide in={this.props.on} direction='right'>
        <StMenuCont>
          
          <StTopCont>
            <StLogo></StLogo>
            <StCloseBtn size="small" onClick={this.props.toggle}><Close/></StCloseBtn>
          </StTopCont>

          {this.props.isLogin &&  
            <UserInfo on={this.props.on}/>
          }
          
          <Slide in={this.props.on} direction='right' timeout={700}>
          <StListCont>
          {
            this.props.isLogin ? 
            <>
            <Link to={`mypage`}>마이페이지</Link>
            <div onClick={this.props.logout}>로그아웃</div>
            </>
            :
            <>
              <Link to='login'>로그인</Link>
              <Link to='signup'>회원가입</Link>
            </>
          }
          </StListCont>
          </Slide>

        </StMenuCont>
      </Slide>
      </>
    )
  }
} export default SideMenu;

const StOpacityBack = styled.div`
  position: fixed;
  top: 0;
  z-index: 110;

  width: 100%;
  height: 100%;

  background: black;
  opacity: 0.5;
`;

const StMenuCont = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;

  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;

  background: white;

  border: 3px solid gray;
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
  justify-content: center;
  align-items: center;

  width: 168px;
  height: 100%;
  
  /* background: #f2f2f2; */
  background-image: url(${inlineLogo});
  background-size: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
`;

const StCloseBtn = styled(IconButton)`
  /* padding: 1vh; */
  /* margin: 1vh; */
`;

const StListCont = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  margin: 8px;

  /* border: 3px solid darkgreen;
  box-sizing: border-box; */
`;