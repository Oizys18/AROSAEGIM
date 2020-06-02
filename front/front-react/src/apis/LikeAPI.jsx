import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const addLike = async (saegimid, userid) => {
  const _res = await axios({
    method: 'post',
    url: `${BASE_URL}/saegims/${saegimid}/likes/${userid}`,
    params: {
      saegimid: saegimid,
      userid: userid
    }
  })
  // console.log('addLike: ', _res)
  return _res.data.data
}

export const delLike = async (saegimid, userid) => {
  const _res = await axios({
    method: 'delete',
    url: `${BASE_URL}/saegims/${saegimid}/likes/${userid}`,
    params: {
      saegimid: saegimid,
      userid: userid
    }
  })
  // console.log('delLike: ', _res)
  return _res.data.data
}

export const getLike = async (saegimid) => {
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/${saegimid}/likes`,
    params: {
      saegimid: saegimid
    }
  })
  // console.log('getLike: ', _res)
  return _res.data.data
}