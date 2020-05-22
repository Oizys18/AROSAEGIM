import axios from 'axios'

export const login = async (email, pw) => {
  const resData = await axios({
    method: 'post',
    url: `${process.env.REACT_APP_URL}/user/login`,
    data: {
      email: email,
      password: pw,
    }
  })

  console.log(JSON.stringify(resData, 2, null))

  return resData;
}