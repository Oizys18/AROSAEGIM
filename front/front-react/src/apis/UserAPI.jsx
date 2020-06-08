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
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}

export const getCommentedSaegim = async (id) => {
  const _res = await  axios({
    method: 'get',
    url: `${BASE_URL}/users/${id}/comments`,
    params: {
      userid: id
    }
  })
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}

export const getLikedSaegim = async (id) => {
  const _res = await  axios({
    method: 'get',
    url: `${BASE_URL}/users/${id}/likes`,
    params: {
      userid: id
    }
  })
  if (_res.data.state === 'success') {
    return _res.data.data
  } else {
    return [];
  }
}

export const getUserByID = async (id) => {
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/users/${id}`,
    params: {
      name: id
    }
  })
  if(_res.data.state === 'success'){
    return _res.data.data;
  }
  else {
    return false;
  }
}