import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Slide, Zoom, } from '@material-ui/core';
import { Email, Lock, EnhancedEncryption, Face, CheckCircle, Warning, } from '@material-ui/icons';

import { Storage } from '../../storage/Storage';
import BackBtn from  '../common/buttons/BackBtn';
import ImgUp from '../common/image/ImgUp';
import ImgCrop from '../common/image/ImgCrop';
import UserInput from '../common/inputs/UserInput';
import * as AM from './AccountMethod';
import * as AS from '../../styles/account/AccountStyles';
import * as AA from '../../apis/AccountAPI';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      slideIn: true,

      alertModal: false,

      imgFile: '',
      imgBase64: '',
      imgW: 0,
      imgH: 0,
      
      cropMode: false,
      cropedImg: '',
      cropedImgBase64: '',


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

  imgUpload = async (e) => {
    e.preventDefault();
    const _reader = new FileReader();
    const _imgFile = e.target.files[0];
    
    _reader.readAsDataURL(_imgFile);
    _reader.onloadend = () => {
      this.setState({
        imgFile: _imgFile,
        imgBase64: _reader.result,
      })
      const _img = new window.Image()
      _img.src = _reader.result
      _img.onload = () => {
        this.setState({
          imgW: _img.width,
          imgH: _img.height,
          cropMode: true,
        })
      }
    }
  }

  imgCrop = (croped) => {
    this.setState({
      cropMode: false,
      cropedImgBase64: croped,
    })
  }
  cancelCrop = () => {
    this.setState({ 
      imgFile: '', 
      imgBase64: '', 
      cropMode: false, 
    })
  }

  handleInput = async (e) => {
    if(e.currentTarget.id === 'email'){
      await this.setStateAsync({ email: e.currentTarget.value })
      this.setState( await AM.checkSignupEmail(this.state.email) )
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
      this.setState( await AM.checkNickName(this.state.nickName) )
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

  handleSubmit = async () => { 
    if(AM.checkAllValid('signup', this.state)){
      const _resData = await AA.signup(this.state)
      if(_resData.state === 'success'){
        this.context.popModal( `성공적으로\n가입 되었습니다!\n\n로그인 해주세요!!`, 'signup', 'alert')
        this.props.history.replace('/login')
      }
      else{
        this.context.popModal( `가입에 실패하였습니다... ㅠㅠ`, 'signup', 'alert')
      }
    }
    else{
      // this.setState({ alertModal: true })
      this.context.popModal( `입력이\n올바르지 않습니다!`, 'signup', 'alert')
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

            <ImgUp signup 
              imgBase64={this.state.imgBase64}
              imgUpload={this.imgUpload}
              cropedImgBase64={this.state.cropedImgBase64}
            />

            {
              this.state.cropMode &&
              <ImgCrop 
                imgFile={this.state.imgFile} 
                imgBase64={this.state.imgBase64}
                imgW={this.state.imgW}
                imgH={this.state.imgH}
                mode={"profile"}
                apply={this.imgCrop}
                cancel={this.cancelCrop}
              />
            }

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
              <Link to='/login' replace>로그인</Link>
            </AS.StLinkCont>

          </AS.StFormCont>
        </Slide>
      </AS.StWraper>
    )
  }
} export default Signup;
Signup.contextType = Storage;

