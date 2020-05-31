import axios from "axios";
import { getUserByEmail } from "./AccountAPI";

const BASE_URL =  process.env.REACT_APP_BASE_URL
const userEmail = localStorage.getItem('ARSG email')
const getUserInfo = async (email) => {
  const _res = await getUserByEmail(email)
  const _userInfo = {
    userId: _res.id,
    userName: _res.name
  }
  return _userInfo
}


export const getCommentBySaegim = async (id) => {
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/comments`,
    params: {
      saegimid: id
    }
  })
  return _res.data.data;
}

export const createComment = async (data, id) => {
  const saegimId = id
  const userInfo = await getUserInfo(userEmail)
  const _data = {
    contents: data.contents,
    regDate: new Date.now(),
    saegimId: saegimId,
    userId: userInfo.userId,
    userName: userInfo.userName
  }

  const _res = await axios({
    method: 'post',
    url: `${BASE_URL}/saegims/${saegimId}/comments`
    commentFormDto: _data,
    saegimId: saegimId
  })
  return _res.data.data;
}

