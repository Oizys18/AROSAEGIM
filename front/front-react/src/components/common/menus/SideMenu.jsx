import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";




class SideMenu extends Component {

  render(){
    return(
      <>
      { 
        this.props.on && 
        <StOpacityBack onClick={this.props.toggle}/> 
      }

      <Slide in={this.props.on} direction='right' >
        <StMenuCont>
          
          <StTopCont>
            <StLogo></StLogo>
            <StCloseBtn size="small" onClick={this.props.toggle}><Close/></StCloseBtn>
          </StTopCont>

          {
            this.props.isLogin ? 
            <>
              <div>로그인 시 유저 정보</div>
              <img src={this.props.userInfo.profileImage} alt='alt'/>
              <Link to={`mypage`}>마이페이지</Link>
            </>
            :
            <>
              <Link to='login'>로그인</Link>
              <Link to='signup'>회원가입</Link>

            </>
          }

          <StListCont>
            메뉴 리스트 들어갈 자리
          </StListCont>

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
  opacity: 0.3;
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
  height: 100%;

  border: 3px solid darkgreen;
  box-sizing: border-box;
`;