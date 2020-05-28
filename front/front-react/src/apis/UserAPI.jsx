import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getCreatedSaegim = async (id) => {
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/userid/${id}`,
    params: {
      userid: id
    }
  })
  console.log(_res)
  return _res.data.data;
}

export const getCommentedSaegim = async (id) => {
  const _res = await  axios({
    method: 'get',
    url: `${BASE_URL}/users/${id}/comments`,
    params: {
      userid: id
    }
  })
  return _res.data;
}

export const getLikedSaegim = async (id) => {
  const _res = await  axios({
    method: 'get',
    url: `${BASE_URL}/users/${id}/likes`,
    params: {
      userid: id
    }
  })
  return _res.data;
}