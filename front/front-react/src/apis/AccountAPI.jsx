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

  const {imgBase64, cropedImgBase64, email, pw, name} = data;

  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/user/`,
    data: {
      image: imgBase64,
      preview: cropedImgBase64,
      email: email,
      password: pw,
      name: name
    }
  })

  return _res.data;
}

export const getUserByNickname = async (nick) => {
  const _res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/user/nickname/${nick}`
  })

  if(_res.data.status === 'success'){
    return true;
  }
  else {
    return false;
  }
}

export const getUserByEmail = async (email) => {
  const _res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_BASE_URL}/user/email/${email}`
  })

  if(_res.data.status === 'success'){
    return _res.data;
  }
  else {
    return null;
  }
}