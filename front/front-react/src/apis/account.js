import axios from 'axios'

export const login = async (email, pw) => {
  const resData = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/user/login`,
    data: {
      email: email,
      password: pw,
    }
  })

  console.log(JSON.stringify(resData, 2, null))

  return resData;
}

export const signup = async (_email, _pw, _name) => {
  const _res = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/user/`,
    data: {
      email: _email,
      password: _pw,
      name: _name
    }
  })
  console.log(JSON.stringify(_res, null, 2))
}