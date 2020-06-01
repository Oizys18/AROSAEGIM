import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

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

export const writeComment = async (data, id, userInfo) => {
  const saegimId = id
  // const userInfo = await getUserByEmail(userEmail)
  console.log(userInfo)
  const _data = {
    contents: data.contents,
    regDate: new Date(),
    saegimId: saegimId,
    userId: userInfo.id,
    userName: userInfo.name
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

