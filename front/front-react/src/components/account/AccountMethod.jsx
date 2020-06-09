import * as AA from '../../apis/AccountAPI'

const regExp = {
  email: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  pw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,15}$/,
  nickName: /^[A-Za-z0-9_]{4,16}$/,
};

export const checkLoginEmail = async (curStr) => {
  let emailLabel = '이메일'
  let emailValid = 'init'

  if(curStr !== '') {
    if (regExp.email.test(curStr)) {
      emailValid = 'valid'
      if(await AA.getUserByEmail(curStr) === null){
        emailLabel = "없는 계정입니다!"
        emailValid = 'invalid'
      }
    }
    else {
      emailLabel = '이메일 양식을 지켜주세요.'
      emailValid = 'invalid'
    }
  }
  return { emailLabel, emailValid }
}

export const checkSignupEmail = async (curStr) => {
  let emailLabel = '이메일'
  let emailValid = 'init'

  if(curStr !== '') {
    if (regExp.email.test(curStr)) {
      emailValid = 'valid'
      if(await AA.getUserByEmail(curStr)){
        emailLabel = "이미 계정이 존재합니다!"
        emailValid = 'invalid'
      }
    }
    else {
      emailLabel = '이메일 양식을 지켜주세요.'
      emailValid = 'invalid'
    }
  }
  return { emailLabel, emailValid }
}

export const checkPW = (curStr) => {
  let pwLabel = '비밀번호'
  let pwValid = 'init'

  if(curStr !== '') {
    if (regExp.pw.test(curStr)) {
      pwValid = 'valid'
    }
    else {
      pwLabel = '영문, 숫자 조합 6~15자'
      pwValid = 'invalid'
    }
  }
  return { pwLabel, pwValid }
}

export const checkPWCheck = (curPW, curStr) => {
  let pwCheckLabel = '비밀번호 확인'
  let pwCheckValid = 'init'

  if(curStr !== '') {
    if (curPW === curStr) {
      pwCheckValid = 'valid'
    }
    else {
      pwCheckLabel = '비밀번호가 일치하지 않습니다.'
      pwCheckValid = 'invalid'
    }
  }
  return { pwCheckLabel, pwCheckValid }
}

export const checkNickName = async (curStr) => {
  let nickNameLabel = '닉네임'
  let nickNameValid = 'init'

  if(curStr !== '') {
    if (regExp.nickName.test(curStr)) {
      nickNameValid = 'valid'
      if(await AA.getUserByNickname(curStr)){
        nickNameLabel = "닉네임이 중복됩니다!"
        nickNameValid = 'invalid'
      }
    }
    else {
      nickNameLabel = "영문, 숫자, '_' 포함 4~16자"
      nickNameValid = 'invalid'
    }
  }
  return { nickNameLabel, nickNameValid }
}

export const checkAllValid = (page, data) => {
  if(page === 'login'){
    if (
      data.emailValid === "valid" &&
      data.pwValid === "valid"
    ) return true
    else return false
  }
  else{
    if (
      data.emailValid === "valid" &&
      data.pwValid === "valid" &&
      data.pwCheckValid === "valid" &&
      data.nickNameValid === "valid"
    ) return true
    else return false
  }
  
}