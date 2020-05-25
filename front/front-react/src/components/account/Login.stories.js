import React, { Component } from 'react';
import { Slide, Zoom, } from '@material-ui/core';
import { Email, Lock, CheckCircle, Warning, ArrowBack } from '@material-ui/icons';

import { StylesProvider } from '@material-ui/core/styles';
import LogoAnimation from '../common/logo/LogoAnimation'
import UserInput from '../common/inputs/UserInput'
import * as AM from './AccountMethod'
import * as AS from '../../styles/account/AccountStyles'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      emailLabel: '이메일',
      emailValid: 'init',

      pw: '',
      pwLabel: '비밀번호',
      pwValid: 'init',
    }
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  handleInput = async (e) => {
    if(e.currentTarget.id === 'email'){
      await this.setStateAsync({ email: e.currentTarget.value })
      this.setState( AM.checkEmail(this.state.email) )
    }
    else {
      await this.setStateAsync({ pw: e.currentTarget.value })
      this.setState( AM.checkPW(this.state.pw) )
    }
  }

  changeIcon = (flag) => {
    if(flag === 'email') {
      return (
        <>
          <Email style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.emailValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><Email/></Zoom>
          <Zoom in={this.state.emailValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.emailValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
        </>
      )
    }
    else{
      return (
        <>
          <Lock style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.pwValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><Lock/></Zoom>
          <Zoom in={this.state.pwValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.pwValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
        </>
      )
    }
  }

  handleSubmit = () => {

  }
  
  handleCancel = () => {
    this.props.history.goBack()
  }

  render(){
    return(
      <StylesProvider injectFirst>
      <Slide in={true} direction="left">
        <AS.StFormCont height="100%">
          
          <AS.StBackBtn>
            <ArrowBack/>
          </AS.StBackBtn>

          <LogoAnimation/>

          <UserInput 
            id='email' 
            value={this.state.email}
            label={this.state.emailLabel} 
            valid={this.state.emailValid}
            onChange={this.handleInput}
            icon={this.changeIcon('email')} 
          />

          <UserInput 
            id='pw' 
            value={this.state.pw} 
            label={this.state.pwLabel} 
            valid={this.state.pwValid}
            onChange={this.handleInput}
            icon={this.changeIcon('pw')} 
          />
          
          <AS.StBtnCont>
            <AS.StBtn text="로그인" onClick={this.handleSubmit}/>
          </AS.StBtnCont>

          <AS.StLinkCont>
            <a href='/signup'>
              가입하기
            </a>
          </AS.StLinkCont>

        </AS.StFormCont>
      </Slide>
      </StylesProvider>
    )
  }
} 

export default {
  component: Login,
  title: "Account",
};
export const login = () => <Login/>;