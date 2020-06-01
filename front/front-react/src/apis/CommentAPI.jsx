import axios from "axios";
import { getUserByEmail } from "./AccountAPI";

const BASE_URL =  process.env.REACT_APP_BASE_URL
const userEmail = localStorage.getItem('ARSG email')

const getUserInfo = async (email) => {
  const _res = await getUserByEmail(email)
  const _user = {
    userId: _res.id,
    userName: _res.name
  };
  return _user
}


export const getCommentBySaegim = async (id) => {
  console.log(id)
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/comments`,
    params: {
      saegimid: id
    }
  })
  console.log(_res.data)
  return _res.data.data;
}

export const writeComment = async (data, id) => {
  const saegimId = id
  const userInfo = await getUserByEmail(userEmail)
  console.log(userInfo)
  const _data = {
    contents: data.contents,
    regDate: new Date(),
    saegimId: saegimId,
    userId: userInfo.data.id,
    userName: userInfo.data.name
  }
  console.log(_data)
  const _res = await axios({
    method: 'post',
    url: `${BASE_URL}/saegims/${saegimId}/comments`,
    data: _data,
    saegimId: saegimId
  })
  console.log(_res)
  return _res.data.data;
}

