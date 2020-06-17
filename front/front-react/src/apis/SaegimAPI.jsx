import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const getSaegimListByLocation = async (latlng, meter) => {
  const [ lat, lng ] = latlng
  const _data = {
    lat: lat,
    lng: lng,
    meter: Math.floor(meter / 2)
  }
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/latlng`,
    params: _data
  })
  return _res.data.data;
}

export const getSaegimDetailById = async (id) => {
  const _res = await axios ({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}/detail`,
    params: {
      saegimid: id
    }
  })
  return _res.data.data;
}

export const boundsToMeter = ({lat1, lon1, lat2, lon2}) => {
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
};


export const delSaegim = async (id) => {
  const _res = await axios ({
    method: 'delete',
    url: `${BASE_URL}/saegims/${id}`,
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


export const getSaegimByFilter = async (data) => {
  const { lat, lng, meter, sTime, eTime, userid } = data;
  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/latlngtime`,
    params: {
      lat: lat,
      lng: lng,
      meter: Math.floor(meter / 2),
      userid: userid,
      starttime: sTime,
      endtime: eTime,
    }
  })

  if (_res.data.state === "success") {
    return _res.data.data;
  } else {
    return [];
  }
}

export const getSaegimById = async (id) => {
  const _res = await axios ({
    method: 'get',
    url: `${BASE_URL}/saegims/${id}`,
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