import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Slide, Zoom, Checkbox, FormControlLabel } from '@material-ui/core';
import { Email, Lock, CheckCircle, Warning, } from '@material-ui/icons';

import { Storage } from '../../storage/Storage';
import BackBtn from  '../common/buttons/BackBtn';
import LogoAnimation from '../common/animation/LogoAnimation';
import UserInput from '../common/inputs/UserInput';
import * as AM from './AccountMethod';
import * as AS from '../../styles/account/AccountStyles';
import * as AA from '../../apis/AccountAPI';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideIn: true,

      alertModal: false,
      modalMsg: '',

      email: '',
      emailLabel: '이메일',
      emailValid: 'init',

      pw: '',
      pwLabel: '비밀번호',
      pwValid: 'init',

      autoLogin: true,
    }
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  componentDidMount(){
    document.addEventListener('keypress', this.pressEnter)
  }
  componentWillUnmount(){
    document.removeEventListener('keypress', this.pressEnter)
  }
  pressEnter = (e) => {
    if(e.keyCode === 13){
      this.handleSubmit()
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

  handleInput = async (e) => {
    if(e.currentTarget.id === 'email'){
      await this.setStateAsync({ email: e.currentTarget.value })
      this.setState( await AM.checkLoginEmail(this.state.email) )
    }
    else {
      await this.setStateAsync({ pw: e.currentTarget.value })
      this.setState( AM.checkPW(this.state.pw) )
    }
  }

  handleAutoLogin = (e) => {
    this.setState({ autoLogin: !this.state.autoLogin })
  }

  handleSubmit = async () => {
    if(AM.checkAllValid('login', this.state)){
      const _resData = await AA.login(this.state)
      // console.log(_resData)
      if(_resData.state === 'success'){
        localStorage.setItem('ARSG autoLogin', this.state.autoLogin)
        if(this.state.autoLogin){
          localStorage.setItem('ARSG email', this.state.email)
          localStorage.setItem('ARSG userId', _resData.data.id)
        }
        else {
          localStorage.removeItem('ARSG email')
          sessionStorage.setItem('ARSG email', this.state.email)
          sessionStorage.setItem('ARSG userId', _resData.data.id)
        }
        this.context.handleLogin('login')
        this.props.history.goBack()
      }
      else {
        this.context.popModal(`비밀번호를\n확인해주세요!`, 'login', 'alert')
      }
    }
    else{
      this.context.popModal(`입력이\n올바르지 않습니다!`, 'login','alert')
    }
  }
  
  handleBack = async () => {
    await this.setStateAsync({ slideIn: false })
    this.props.history.goBack()
  }

  render(){
    return(
      <AS.StWraper height={this.context.appHeight}> 
        <BackBtn handleBack={this.handleBack}/>

        <Slide in={this.state.slideIn} direction="left">
          <AS.StFormCont>
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

            <StCheckBox
              control={<Checkbox 
                        color="default"
                        checked={this.state.autoLogin} 
                        onChange={this.handleAutoLogin}/>}
              label="자동 로그인"
            />
            
            <AS.StBtnCont>
              <AS.StBtn text="로그인" onClick={this.handleSubmit}/>
            </AS.StBtnCont>

            <AS.StLinkCont>
              <Link to='/signup' replace>가입하기</Link>
            </AS.StLinkCont>

          </AS.StFormCont>
        </Slide>
      </AS.StWraper>
    )
  }
} export default Login;
Login.contextType = Storage;

const StCheckBox = styled(FormControlLabel)`
  & .Mui-checked{
    color: #F3B3A6;
  }
  .MuiTypography-root{
    color: gray;
  }
`;