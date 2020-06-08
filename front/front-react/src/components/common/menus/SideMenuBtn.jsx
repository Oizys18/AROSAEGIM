import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Storage } from '../../../storage/Storage'

class SideMenuBtn extends Component {

  handleClick = () => {
    if(this.props.link === 'logout'){
      this.context.handleLogout()
    }
    else{
      if(this.props.link === 'mypage'){
        this.props.history.replace(`/${this.props.link}`)
        this.context.toggleSideMenu()
      }
      else{
        this.props.history.push(`/${this.props.link}`)
      }
    }
  }

  render(){
    return(
      <StCont onClick={this.handleClick}>
        <StTxt>{this.props.txt}</StTxt>
        {this.props.icon}
      </StCont>
    )
  }
} export default withRouter(SideMenuBtn);
SideMenuBtn.contextType = Storage;

const StCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  *{
    color: gray;
  }
`;

const StTxt = styled.div`

`;