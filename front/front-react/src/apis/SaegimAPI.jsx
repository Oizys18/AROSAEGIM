import axios from "axios";

const BASE_URL =  process.env.REACT_APP_BASE_URL

export const getSaegimListByLocation = async (latlng, meter) => {
  const [ lat, lng ] = latlng
  const _meter = meter
  console.log(latlng, lat, lng)
  const _data = {
    lat: lat,
    lng: lng,
    meter: _meter
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

export const getSaegimNearMe = async (data) => {
  const { lat, lng, meter } = data;

  const _res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/saegims/latlng?lat=${lat}&lng=${lng}&meter=${Math.floor(meter / 2)}`,
  });

  if (_res.data.state === "success") {
    return _res.data.data;
  } else {
    return [];
  }
};

export const delSaegim = async (id) => {
  console.log(id)
  const _res = await axios ({
    method: 'delete',
    url: `${BASE_URL}/saegims/${id}`,
    params: {
      saegimid: id
    }
  })
  return _res.data.data;
}


export const getSaegimByFilter = async (latlng, meter, mine, stime, etime) => {
  const [ lat, lng ] = latlng
  const _meter = meter
  let _userid = 0;
  const _starttime = stime;
  const _endtime = etime;

  if(mine){
    _userid = mine
  }

  const _res = await axios({
    method: 'get',
    url: `${BASE_URL}/saegims/latlngtime`,
    params: {
      lat: lat,
      lng: lng,
      meter: _meter,
      userid: _userid,
      starttime: _starttime,
      endtime: _endtime,
    }
  })

  console.log(_res.data)
}