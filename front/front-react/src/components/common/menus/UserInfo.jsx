import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom';

import styled from 'styled-components';
import { IconButton, Avatar, Slide } from '@material-ui/core';
import { Refresh } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex'

import { Storage } from '../../../storage/Storage'
 
class UserInfo extends Component{

  handleRefresh = () => {
    this.context.popModal(`앱을 새로고침\n하시겠습니까?`, 'user refresh', 'confirm')
  }

  render(){
    return(
      <Slide in={this.props.on} direction="right" timeout={500}>
        <StCont>
          <StAvatar src={this.context.userInfo.profileImage}/>
          <StNick>{this.context.userInfo.name}</StNick>
          <StBtnCont><IconButton onClick={this.handleRefresh}><Refresh/></IconButton></StBtnCont>
        </StCont>
      </Slide>
    )
  }

} export default withRouter(UserInfo);
UserInfo.contextType = Storage;

const StCont = styled(FlexRow)`
  justify-content: space-between;
  /* margin: 8px; */
  padding: 8px;
  margin-bottom: 8px;
  /* margin: 8px 8px 0 8px; */
  /* padding: 8px 8px 0 8px; */
`;

const StAvatar = styled(Avatar)`
  width: 30%;
  height: auto;

  .MuiAvatar-fallback{
    width: 100%;
    height: 100%;
  }
`;

const StNick = styled.div`
  font-size: 120%;
  word-break: break-all;
  width: 100%;
  margin: 0 16px 0 16px;
`;

const StBtnCont = styled(FlexRow)`
  /* margin-top: 8px; */

  /* border: 3px solid #F8DCD4; */
  border-radius: 50%;
  background: #F4BDB0;
  /* background: linear-gradient(to bottom right, #FBF2EE 0%, #F4BDB0 100%); */

  .MuiButtonBase-root{
    padding: 6px;
  }

  svg{
    color: white;
  }
`