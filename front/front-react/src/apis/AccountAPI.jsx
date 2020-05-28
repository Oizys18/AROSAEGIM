import axios from 'axios'

export const login = async (data) => {

  const {email, pw} = data

  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/user/login`,
    data: {
      email: email,
      password: pw,
    }
  })

  return _res.data;
}

export const signup = async (data) => {

  const {imgBase64, cropedImgBase64, email, pw, nickName} = data;


  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/users/`,
    data: {
      // image: imgBase64,
      // preview: cropedImgBase64,
      email: email,
      password: pw,
      name: nickName,
      // email: 'sj@sj.com',
      // password: 'a123123',
      // name: '_SJ_'
    }
  })

  return _res.data;
}

export const getUserByEmail = async (email) => {
  const _res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/user/email?email=${email}`
  })

  if(_res.data.status === 'success'){
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

