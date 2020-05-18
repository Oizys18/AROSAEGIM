import React, { Component } from 'react';
import UserInput from '../common/inputs/UserInput'
import {Storage} from '../../storage/Storage'
import styled from 'styled-components';
import { Zoom } from '@material-ui/core';
import { Email, Lock, CheckCircle, Error } from '@material-ui/icons';

const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,15}$/,
  // name: /^[A-Za-z가-힣]{2,}$/,
  // nickname: /^[A-Za-z0-9가-힣_]{2,10}$/,
  // channelname: /^[A-Za-z0-9가-힣_]{2,}$/
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
          _emailLabel = '이메일 양식을 맞춰 주세요'
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

  render(){
    return(
      <StFormCont height={this.context.appHeight}>
        <UserInput 
          id='email' 
          value={this.state.email}
          label={this.state.emailLabel} 
          valid={this.state.emailValid}
          onChange={this.handleInput}
          icon={<Email/>} 
        />

        <UserInput 
          id='pw' 
          value={this.state.pw} 
          label={this.state.pwLabel} 
          valid={this.state.pwValid}
          onChange={this.handleInput}
          icon={<Lock/>} 
        />
      </StFormCont>
    )
  }
} Login.contextType = Storage;
export default Login;

const StFormCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #ffffcc 0%, #ff9999 100%);
  height: ${props => props.height}px;
`;