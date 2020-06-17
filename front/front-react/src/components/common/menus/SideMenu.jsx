import React, { Component } from 'react';

import styled from 'styled-components';
import { Slide, Zoom, IconButton, Divider } from '@material-ui/core';
import { Close, Refresh, Check, VpnKey, AssignmentInd, Face, 
  ExitToApp, Timelapse, Today, Build, MenuBook, Help } from '@material-ui/icons';
import { CustomSwitch } from '../../../styles/MuiStyles';
import { FlexRow, } from '../../../styles/DispFlex';
// import inlineLogo from "../../../assets/logo/inline-logo-black@2x.png";
import UserInfo from './UserInfo';
import SideMenuBtn from './SideMenuBtn';
import Filters from './Filters';

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

  handleRefresh = () => {
    this.props.popModal(`앱을 새로고침\n하시겠습니까?`, 'user refresh', 'confirm')
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
        <StBtnCont>
          <Zoom in={this.props.on} timeout={600} mountOnEnter unmountOnExit>
            <StBtn><IconButton onClick={this.props.handleFilter.handleInit}><Refresh/></IconButton></StBtn>
          </Zoom>
          <Zoom in={this.props.on} timeout={400} mountOnEnter unmountOnExit>
            <StBtn><IconButton onClick={this.props.toggle}><Check/></IconButton></StBtn>
          </Zoom>
        </StBtnCont>
      </StListCont>
      </>
    )
  }

  
  renderStandard = () => {
    return (
      <>
      <StTopCont>
        {/* <StLogo/> */}
        <StTopMsg>아로새김</StTopMsg>
        <StTopBtn>
          {
            !this.props.isLogin &&
            <IconButton onClick={this.handleRefresh}><Refresh/></IconButton>
          }
          <IconButton onClick={this.props.toggle}><Close/></IconButton>
        </StTopBtn>
      </StTopCont>
      
      <Slide in={this.props.on} direction='right' timeout={700}>
        <StListCont>
        {
          this.props.isLogin ? 
          <>
            <UserInfo on={this.props.on}/>
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
        <SideMenuBtn link="guideline" txt={"커뮤니티 가이드라인"} icon={<MenuBook />} />
        <SideMenuBtn link="tutorial" txt={"튜토리얼"} icon={<Help />} />
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
  max-width: 400px;

  display: flex;
  flex-direction: column;

  background: white;

  hr{
    background: linear-gradient(to bottom right, #FBF2EE 0%, #F4BDB0 100%);
  }
`;

const StTopCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(to bottom right, #FBF2EE 0%, #F4BDB0 100%);

  border: 3px solid white;
  box-sizing: border-box;
  height: 64px;

  svg{
    color: white;
  }
`;

// const StLogo = styled(FlexRow)`
// `;

const StTopMsg = styled(FlexRow)`
  margin-left: 16px;
  padding-top: 3px;
  font-family: 'BMEULJIRO';
  font-size: 24px;
  color: white;
  text-shadow: 0 0 3px gray;
`;

const StTopBtn = styled(FlexRow)`
`;

const StListCont = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
`;

const StMineCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 12px;

  color: gray;
`;

const StBtnCont = styled(FlexRow)`
  margin: 16px;
  margin-top: 32px;
  justify-content: space-around;
`;

const StBtn = styled(FlexRow)`
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