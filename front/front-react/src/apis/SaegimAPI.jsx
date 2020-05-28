import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const getSaegimListByLocation = async (data) => {
  const { lat, lng } = data
  const meter = 50

  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/latlng`,
    data: {
      lat: lat,
      lng: lng,
      meter: meter
    }
  })

  return _res.data;
}

export const getSaegimDetailById = async (id) => {
  const _res = await axios ({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/detail`,
    data: {
      saegimid: id
    }
  })

  return _res.data;
}