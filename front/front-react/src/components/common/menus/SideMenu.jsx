import React, { Component } from 'react';

import styled from 'styled-components';
import { Slide, Switch, IconButton, Divider } from '@material-ui/core';
import { Close, VpnKey, AssignmentInd, Face, ExitToApp, Timelapse, Today, Build } from '@material-ui/icons';
import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";

import UserInfo from './UserInfo';
import SideMenuBtn from './SideMenuBtn';
import FilterMenuBtn from './FilterMenuBtn';

import HelpIcon from '@material-ui/icons/Help'; 
class SideMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      mine: false,
      startTime: '',
      endTime: '',
    }
  }


  renderFilter = () => {
    return(
      <>
      <StTopCont>
        <div>새김 필터 설정</div>
        <StCloseBtn size="small" onClick={this.props.toggle}><Close/></StCloseBtn>
        <StCloseBtn size="small" onClick={this.props.toggle}><Close/></StCloseBtn>
        <StCloseBtn size="small" onClick={this.props.toggle}><Close/></StCloseBtn>
      </StTopCont>
      {
        this.props.isLogin && 
        <StMineCont id='my' txt='내 새김만 보기'>
          내 새김만 보기
          <Switch
            checked={this.state.mine}
            onChange={this.handle}
          />
        </StMineCont>
      }
      <StListCont>
        <Divider />
        <FilterMenuBtn id='simple' txt='간편 시간 설정' icon={<Timelapse/>} handleFilter={this.props.handleFilter}/>
        <Divider />
        <FilterMenuBtn id='detail' txt='상세 시간 설정' icon={<Today/>} handleFilter={this.props.handleFilter}/>
        <Divider />
      </StListCont>
      </>
    )
  }

  
  renderStandard = () => {
    return (
      <>
      <StTopCont>
        <StLogo/>
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
            <Divider />
            <SideMenuBtn link='mypage' txt={'마이페이지'} icon={<Face/>}/>
            <SideMenuBtn link='logout' txt={'로그아웃'} icon={<ExitToApp/>}/>
            <Divider />
          </>
          :
          <>
            <SideMenuBtn link='login' txt={'로그인'} icon={<VpnKey/>}/>
            <SideMenuBtn link='signup' txt={'회원가입'} icon={<AssignmentInd/>}/>
            <Divider />
          </>
        }
        hello
        <SideMenuBtn link="help" txt={"도움말"} icon={<HelpIcon />} />
        <SideMenuBtn link="contact" txt={"개발자와 연락"} icon={<Build />} />
        </StListCont>
      </Slide>
      </>
    )
  }

  render(){
    return(
      <>
      { 
        this.props.on && 
        <StOpacityBack onClick={this.props.toggle}/>
      }

      <Slide in={this.props.on} direction='right'>
        <StMenuCont>
          {
            this.props.filter ? 
            <>
              { this.renderFilter() }
            </>
            :
            <>
              { this.renderStandard() }
            </>
          }
          {/* <StTopCont>
            <StLogo/>
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
                <Divider />
                <SideMenuBtn link='mypage' txt={'마이페이지'} icon={<Face/>}/>
                <SideMenuBtn link='logout' txt={'로그아웃'} icon={<ExitToApp/>}/>
                <Divider />
              </>
              :
              <>
                <SideMenuBtn link='login' txt={'로그인'} icon={<VpnKey/>}/>
                <SideMenuBtn link='signup' txt={'회원가입'} icon={<AssignmentInd/>}/>
                <Divider />
              </>
            }
            </StListCont>
          </Slide> */}

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

  /* border: 3px solid gray;
  box-sizing: border-box; */
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
  padding: 8px;
  /* padding: 8px 0 8px 0; */

  /* border: 3px solid darkgreen;
  box-sizing: border-box; */
`;


const StMineCont = styled.div`

`