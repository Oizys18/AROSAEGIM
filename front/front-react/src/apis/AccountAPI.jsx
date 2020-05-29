import axios from 'axios'

export const login = async (state) => {

  const {email, pw} = state

  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/users/login`,
    data: {
      email: email,
      password: pw,
    }
  })
  console.log(_res.data)

  if(_res.data.data === 'login fail'){
    return false;
  }
  else{
    return true;
  }
}

export const signup = async (state) => {

  const {email, pw, nickName} = state;
  let _profile = ''
  if(state.cropedImgBase64 !== ''){
    _profile = state.cropedImgBase64
  }

  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/users`,
    data: {
      email: email,
      password: pw,
      name: nickName,
      profileImage: _profile,
    },
  })
  return _res.data;
}

export const getUserByEmail = async (email) => {
  const _res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/users/email?email=${email}`
  })
  if(_res.data.state === 'success'){
    return _res.data;
  }
  else {
    return null;
  }
}

export const getUserByNickname = async (nick) => {
  const _res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/users/name?name=${nick}`
  })

  if(_res.data.state === 'success'){
    return true;
  }
  else {
    return false;
  }
}

