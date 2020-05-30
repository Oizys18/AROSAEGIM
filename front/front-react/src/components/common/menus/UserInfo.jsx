import React, { Component } from 'react';
import { withRouter, } from 'react-router-dom';

import styled from 'styled-components';
import { IconButton, Avatar, Slide } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex'

import { Storage } from '../../../storage/Storage'
 
class UserInfo extends Component{

  render(){
    return(
      <Slide in={this.props.on} direction="right" timeout={500}>
        <StCont>
          <StAvatar src={this.context.userInfo.profileImage}/>
          <StNick>{this.context.userInfo.name}</StNick>
          {/* <StLogout onClick={this.context.handleLogout}><ExitToApp/></StLogout> */}
        </StCont>
      </Slide>
    )
  }

} export default withRouter(UserInfo);
UserInfo.contextType = Storage;

const StCont = styled(FlexRow)`
  justify-content: space-between;
  padding: 8px 8px 0 8px;
  margin: 8px 8px 0 8px;
`;

const StAvatar = styled(Avatar)`
  width: 30%;
  height: auto;
`;

const StNick = styled.div`
  font-size: 120%;
  word-break: break-all;
  width: 100%;
  margin: 0 16px 0 16px;
`;

const StLogout = styled(IconButton)`
  padding: 0;
`;