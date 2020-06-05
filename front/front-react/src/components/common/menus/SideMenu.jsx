import React, { Component } from 'react';

import styled from 'styled-components';
import { Slide, Collapse, Zoom, Switch, IconButton, Divider } from '@material-ui/core';
import { Close, Refresh, Check, VpnKey, AssignmentInd, Face, ExitToApp, Timelapse, Today, Build } from '@material-ui/icons';
import { CustomSwitch } from '../../../styles/MuiStyles';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';
import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";

import UserInfo from './UserInfo';
import SideMenuBtn from './SideMenuBtn';
import Filters from './Filters';

import HelpIcon from '@material-ui/icons/Help'; 

class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      onSimple: false,
      onDetail: false,
    }
  }

  tgleMenu = (e) => {
    const _id = e.currentTarget.id
    if(_id === 'simple'){
      this.setState({ onSimple: !this.state.onSimple })
      if(this.state.onDetail){
        this.setState({ onDetail: !this.state.onDetail })
        this.props.handleFilter.handleInit()
      }
    }
    else if(_id === 'detail'){
      this.setState({ onDetail: !this.state.onDetail })
      if(this.state.onSimple){
        this.setState({ onSimple: !this.state.onSimple })
        this.props.handleFilter.handleInit()
      }
    }
  }

  renderFilter = () => {
    const _handleFilter = this.props.handleFilter
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
          <CustomSwitch
            id='mine'
            color='primary'
            checked={this.props.filterVal.mine}
            onChange={_handleFilter.handleMine}
          />
        </StMineCont>
        <Divider />
        </>
      }
        <Filters 
          id='simple' 
          txt='간편 시간 설정' 
          icon={<Timelapse/>} 
          on={this.state.onSimple}
          tgleMenu={this.tgleMenu}
          filterVal={this.props.filterVal}
          handleFilter={_handleFilter}
        />
        <Divider />
        <Filters 
          id='detail' 
          txt='상세 시간 설정' 
          icon={<Today/>} 
          on={this.state.onDetail}
          tgleMenu={this.tgleMenu}
          filterVal={this.props.filterVal}
          handleFilter={_handleFilter}
        />
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
        <IconButton onClick={this.props.toggle}><Close/></IconButton>
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
        <Zoom in={this.props.on} timeout={400} mountOnEnter unmountOnExit>
          <StBtnCont className="btnClose"><IconButton onClick={this.props.toggle}><Close/></IconButton></StBtnCont>
        </Zoom>
        <Zoom in={this.props.on} timeout={300} mountOnEnter unmountOnExit>
          <StBtnCont className="btnRefresh"><IconButton onClick={this.props.handleFilter.handleInit}><Refresh/></IconButton></StBtnCont>
        </Zoom>
        <Zoom in={this.props.on} timeout={200} mountOnEnter unmountOnExit>
          <StBtnCont className="btnCheck"><IconButton onClick={this.props.handleFilter.handleApply}><Check/></IconButton></StBtnCont>
        </Zoom>
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

  hr{
    background: linear-gradient(to bottom right, #FBF2EE 0%, #F4BDB0 100%);
  }
  /* border: 3px solid gray;
  box-sizing: border-box; */
`;

const StTopCont = styled.div`
  height: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(to bottom right, #FBF2EE 0%, #F4BDB0 100%);

  border: 3px solid white;
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
  color: white;
  text-shadow: 0 0 5px gray;
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

  border: 3px solid #F8DCD4;
  border-radius: 50%;
  background: white;

  .MuiButtonBase-root{
    padding: 6px;
  }

  svg{
    color: gray;
    width: 30px;
    height: 30px;
  }
`