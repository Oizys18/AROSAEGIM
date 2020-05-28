import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const getSaegimListByLocation = async (latlng) => {
  const [ lat, lng ] = latlng
  const meter = 10
  console.log(latlng, lat, lng)
  const _data = {
    lat: lat,
    lng: lng,
    meter: meter
  }
  console.log(_data)
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/latlng`,
    params: _data
  })
  return _res.data.data;
}

export const getSaegimDetailById = async (id) => {
  console.log(id)
  const _res = await axios ({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/detail`,
    params: {
      saegimid: id
    }
  })

  return _res.data.data;
}