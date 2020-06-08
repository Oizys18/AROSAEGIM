import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const getCommentBySaegim = async (id) => {
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/comments`,
    params: {
      saegimid: id
    }
  })
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}

export const writeComment = async (data, id, userInfo) => {
  const saegimId = id
  const _data = {
    contents: data.contents,
    regDate: new Date(),
    saegimId: saegimId,
    userId: userInfo.id,
    userName: userInfo.name
  }
  const _res = await axios({
    method: 'post',
    url: `${BASE_URL}/saegims/${saegimId}/comments`,
    data: _data,
    saegimId: saegimId
  })
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}

export const delComment = async (saegimId, commentId) => {
  const _params = {
    commentid: commentId,
    saegimid: saegimId
  }
  const _res = await axios({
    method: 'delete',
    url: `${BASE_URL}/saegims/${saegimId}/comments/${commentId}`,
    _params: _params
  })
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}