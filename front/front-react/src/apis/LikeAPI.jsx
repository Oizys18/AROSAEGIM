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
  console.log(_res)
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
  console.log(_res)
  return _res.data.data
}

