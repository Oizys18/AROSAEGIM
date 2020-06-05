import React, { Component } from 'react';

import styled from 'styled-components';
import { Slide, Collapse, Zoom, Switch, IconButton, Divider } from '@material-ui/core';
import { Close, Refresh, Check, VpnKey, AssignmentInd, Face, ExitToApp, Timelapse, Today } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex'
import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";

import UserInfo from './UserInfo';
import SideMenuBtn from './SideMenuBtn';
import FilterMenuBtn from './FilterMenuBtn';

class SideMenu extends Component {
  constructor(props){
    super(props)
    this.state = {
      mine: false,
      startTime: '',
      endTime: '',
    }
  }

  handleInit = () => {
    this.setState({
      startTime: '',
      endTime: '',
    })
  }
  handleMine = () => {
    this.setState({
      mine: !this.state.mine
    })
  }
  handleTime = () => {

  }

  renderFilter = () => {
    return(
      <>
      <StTopCont>
        <StTopMsg>새김 필터 설정</StTopMsg>
      </StTopCont>
      
      <StListCont>
      {
        this.props.isLogin && 
        <>
        <StMineCont>
          내 새김만 보기
          <Switch
            id='mine'
            color='primary'
            checked={this.state.mine}
            onChange={this.handleMine}
          />
        </StMineCont>
        <Divider />
        </>
      }
        <FilterMenuBtn id='simple' txt='간편 시간 설정' icon={<Timelapse/>} handleTime={this.handleTime}/>
        <Divider />
        <FilterMenuBtn id='detail' txt='상세 시간 설정' icon={<Today/>} handleTime={this.handleTime}/>
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
      
      {
        this.props.isLogin && 
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
      </Slide>
      </>
    )
  }

  render(){
    return(
      <>
      { 
        this.props.on && 
        <>
        {
          this.props.filter ?
          <StOpacityBack/>
          :
          <StOpacityBack onClick={this.props.toggle}/>
        }
        </>
      }

      {
        this.props.filter && 
        <>
        {/* <Collapse in={this.props.on} direction='up' mountOnEnter unmountOnExit> */}
        {/* <StFilterBtnSet hidden={!this.props.on}> */}
          <Zoom in={this.props.on} timeout={400} mountOnEnter unmountOnExit>
            <StBtnCont className="btnClose"><IconButton onClick={this.props.toggle}><Close/></IconButton></StBtnCont>
          </Zoom>
          <Zoom in={this.props.on} timeout={300} mountOnEnter unmountOnExit>
            <StBtnCont className="btnRefresh"><IconButton onClick={this.handleInit}><Refresh/></IconButton></StBtnCont>
          </Zoom>
          <Zoom in={this.props.on} timeout={200} mountOnEnter unmountOnExit>
            <StBtnCont className="btnCheck"><IconButton onClick={this.handSubmit}><Check/></IconButton></StBtnCont>
          </Zoom>
        {/* </StFilterBtnSet> */}
        {/* </Collapse> */}
        </>
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
  align-items: center;

  border: 3px solid darkred;
  box-sizing: border-box;
`;

const StLogo = styled(FlexRow)`
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
`;

const StTopMsg = styled(FlexRow)`
  width: 100%;
  font-weight: bold;
  /* font-size: 110%; */
  color: gray;
`;

const StMineCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 12px;

  color: gray;
`;

// const StFilterBtnSet = styled(FlexColumn)`
//   position: fixed;
//   z-index: 120;
//   bottom: 24px;
//   right: 24px; 
// `;

const StBtnCont = styled(FlexRow)`
  position: fixed;
  z-index: 120;
  &.btnClose{
    right: 24px;
    bottom: 132px;
  }
  &.btnRefresh{
    right: 24px;
    bottom: 78px;
  }
  &.btnCheck{
    right: 24px;
    bottom: 24px;
  }

  /* margin-top: 8px; */

  border: 2px solid gray;
  border-radius: 50%;
  background: #e6e6e6;

  .MuiButtonBase-root{
    padding: 6px;
  }

  svg{
    color: black;
    width: 30px;
    height: 30px;
  }
`