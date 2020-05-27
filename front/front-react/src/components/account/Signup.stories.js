import React, { Component } from 'react';
import { Slide, Zoom, } from '@material-ui/core';
import { Email, Lock, EnhancedEncryption, Face, CheckCircle, Warning, ArrowBack } from '@material-ui/icons';

import { StylesProvider } from '@material-ui/core/styles';
import UserInput from '../common/inputs/UserInput';
import * as AM from './AccountMethod';
import * as AS from '../../styles/account/AccountStyles';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      emailLabel: '이메일',
      emailValid: 'init',

      pw: '',
      pwLabel: '비밀번호',
      pwValid: 'init',
      
      pwCheck: '',
      pwCheckLabel: '비밀번호 확인',
      pwCheckValid: 'init',

      nickName: '',
      nickNameLabel: '닉네임',
      nickNameValid: 'init',
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
    else if(e.currentTarget.id === 'pw') {
      await this.setStateAsync({ pw: e.currentTarget.value })
      this.setState( AM.checkPW(this.state.pw) )
    }
    else if(e.currentTarget.id === 'pwCheck') {
      await this.setStateAsync({ pwCheck: e.currentTarget.value })
      this.setState( AM.checkPWCheck(this.state.pw, this.state.pwCheck) )
    }
    else if(e.currentTarget.id === 'nickName') {
      await this.setStateAsync({ nickName: e.currentTarget.value })
      this.setState( AM.checkNickName(this.state.nickName) )
    }
  }

  changeIcon = (flag) => {
    if(flag === 'email') {
      return (
        <>
          <Face style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.emailValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><Email/></Zoom>
          <Zoom in={this.state.emailValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.emailValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
        </>
      )
    }
    else if(flag === 'pw') {
      return (
        <>
          <Face style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.pwValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><Lock/></Zoom>
          <Zoom in={this.state.pwValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.pwValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
        </>
      )
    }
    else if(flag === 'pwCheck') {
      return (
        <>
          <Face style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.pwCheckValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><EnhancedEncryption/></Zoom>
          <Zoom in={this.state.pwCheckValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.pwCheckValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
        </>
      )
    }
    else if(flag === 'nickName') {
      return (
        <>
          <Face style={{visibility: 'hidden'}}/>
          <Zoom in={this.state.nickNameValid === 'init'} style={{position: 'absolute', zIndex: 1, left: 0}}><Face/></Zoom>
          <Zoom in={this.state.nickNameValid === 'invalid'} style={{position: 'absolute', zIndex: 2, left: 0}}><Warning/></Zoom>
          <Zoom in={this.state.nickNameValid === 'valid'}  style={{position: 'absolute', zIndex: 3, left: 0}}><CheckCircle/></Zoom>
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
      <Slide in={true} direction="left">
        <AS.StFormCont height={this.context.appHeight}>
          
          <AS.StBackBtn onClick={this.handleCancel}>
            <ArrowBack/>
          </AS.StBackBtn>

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

          <UserInput 
            id='pwCheck' 
            value={this.state.pwCheck} 
            label={this.state.pwCheckLabel} 
            valid={this.state.pwCheckValid}
            onChange={this.handleInput}
            icon={this.changeIcon('pwCheck')} 
          />

          <UserInput 
            id='nickName' 
            value={this.state.nickName} 
            label={this.state.nickNameLabel} 
            valid={this.state.nickNameValid}
            onChange={this.handleInput}
            icon={this.changeIcon('nickName')} 
          />
          
          <AS.StBtnCont>
            <AS.StBtn text="가입" onClick={this.handleSubmit}/>
          </AS.StBtnCont>

          <AS.StLinkCont>
            <a href='/login'>
              로그인
            </a>
          </AS.StLinkCont>

        </AS.StFormCont>
      </Slide>
    )
  }
}

export default {
  component: Signup,
  title: "Account",
};
export const signup = () => <StylesProvider injectFirst><Signup/></StylesProvider>;
