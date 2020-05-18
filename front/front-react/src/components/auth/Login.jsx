import React, { Component } from 'react';
import UserInput from '../common/inputs/UserInput'
import DefaultButton from '../common/buttons/DefaultButton'
import {Storage} from '../../storage/Storage'
import styled from 'styled-components';
import { Slide, Zoom } from '@material-ui/core';
import { Email, Lock, CheckCircle, Warning } from '@material-ui/icons';

const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,15}$/,
  // nickname: /^[A-Za-z0-9가-힣_]{2,10}$/,
};


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
      let _emailLabel = '이메일'
      let _emailValid = 'init'

      if(this.state.email !== '') {
        if (regExp.email.test(this.state.email)) {
          _emailValid = 'valid'
        }
        else {
          _emailLabel = '이메일 양식을 지켜주세요'
          _emailValid = 'invalid'
        }
      }
      this.setState({
        emailLabel: _emailLabel,
        emailValid: _emailValid,
      })
    }
    else {
      await this.setStateAsync({ pw: e.currentTarget.value })
      let _pwLabel = '비밀번호'
      let _pwValid = 'init'
      
      if(this.state.pw !== '') {
        if (regExp.pw.test(this.state.pw)) {
          _pwValid = 'valid'
        }
        else {
          _pwLabel = '영문, 숫자 조합 6~15자'
          _pwValid = 'invalid'
        }
      }
      this.setState({
        pwLabel: _pwLabel,
        pwValid: _pwValid
      })
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
      <Slide in={true} direction="left">
        <StFormCont height={this.context.appHeight}>


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

          <StBtn text="로그인" onClick={this.handleSubmit}/>
          <StBtn text="취소" onClick={this.handleCancel}/>

        </StFormCont>
      </Slide>
    )
  }
} export default Login;
Login.contextType = Storage;



const StFormCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #ffffcc 0%, #ff9999 100%);
  height: ${props => props.height}px;
`;

const StBtn = styled(DefaultButton)`

`