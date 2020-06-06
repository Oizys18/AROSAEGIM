export const getPositionAsync = () => {
  return new Promise(function (resolve, reject) {
    const option = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity,
    }
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    }
    else{
      alert("GPS를 지원하지 않는 디바이스 입니다!");
    }
  });
}

export const getPosition = () => {
  const option = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  }
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFail, option);
  }
  else{
    alert("GPS를 지원하지 않는 디바이스 입니다!");
  }
}

export const getPositionSuccess = (position) => {
  const _lat = position.coords.latitude;
  const _lng = position.coords.longitude;
  window.sessionStorage.removeItem('ARSG no GPS')
  window.sessionStorage.setItem('ARSG latitude', _lat)
  window.sessionStorage.setItem('ARSG longitude', _lng)
}

export const getPositionFail = (err) => {
  var msg = null;
  switch(err.code) {
    case err.PERMISSION_DENIED:
        msg = `위치 정보 수집이\n거부되었습니다.\n\n현재위치를 기반으로\n아로새김을 이용하시려면\n위치 정보 수집을 동의하고, GPS를 켜주세요!`;
        break;
    case err.POSITION_UNAVAILABLE:
        msg = "위치 정보 수집이 불가한 장소입니다.";
        break;
    case err.TIMEOUT:
        msg = "위치 정보 요청 시간이 초과되었습니다.";
        break;
    case err.UNKNOWN_ERROR:
        msg = "위치 정보 수집에 알 수 없는 오류가 발생하였습니다.";
        break;
    default: break;
  }
  window.sessionStorage.setItem('ARSG no GPS', true)
  window.sessionStorage.setItem('ARSG latitude', 37.5012767241426)
  window.sessionStorage.setItem('ARSG longitude', 127.039600248343)
  return msg;
}

export const getPositionFromSession = () => {
  const _lat = sessionStorage.getItem('ARSG latitude');
  const _lng = sessionStorage.getItem('ARSG longitude');
  return [Number(_lat), Number(_lng)];
}