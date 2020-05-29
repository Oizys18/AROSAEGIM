import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';

import styled from 'styled-components';
import { IconButton, Avatar, Slide } from '@material-ui/core';
import {  } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex'

import { Storage } from '../../../storage/Storage'
 
class UserInfo extends Component{

  render(){
    return(
      <Slide in={this.props.on} direction="right" timeout={500}>
        <StCont>
          <StAvatar src={this.context.userInfo.profileImage}/>
          <StNick>{this.context.userInfo.name}</StNick>
        </StCont>
      </Slide>
    )
  }

} export default withRouter(UserInfo);
UserInfo.contextType = Storage;

const StCont = styled(FlexRow)`
  justify-content: flex-start	;
  padding: 8px;
`;

const StAvatar = styled(Avatar)`
  width: 20%;
  height: auto;
`;

const StNick = styled.div`
  margin-left: 16px;
  /* width: 70%; */
  /* text-align: center; */
  font-size: 120%;
`;