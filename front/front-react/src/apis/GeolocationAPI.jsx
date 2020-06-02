export const getPosition = () => {
  const option = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  }
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, option);
  }
  else{
    alert("GPS를 지원하지 않습니다");
  }
}

const success = (position) => {
  const _lat = position.coords.latitude;
  const _lng = position.coords.longitude;
  window.sessionStorage.setItem('ARSG latitude', _lat)
  window.sessionStorage.setItem('ARSG longitude', _lng)
}

const error = (err) => {
  alert(err)
}

