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
    alert("GPS를 지원하지 않는 디바이스 입니다!");
  }
}

const success = (position) => {
  const _lat = position.coords.latitude;
  const _lng = position.coords.longitude;
  window.sessionStorage.setItem('ARSG latitude', _lat)
  window.sessionStorage.setItem('ARSG longitude', _lng)
}

const error = (err) => {
  var msg = null;
  switch(err.code) {
    case err.PERMISSION_DENIED:
        msg = "사용자가 위치 정보 수집을 거부.";
        break;
    case err.POSITION_UNAVAILABLE:
        msg = "위치 정보 수집 불가.";
        break;
    case err.TIMEOUT:
        msg = "요청 시간 초과.";
        break;
    case err.UNKNOWN_ERROR:
        msg = "알 수 없는 오류.";
        break;
    default: break;
  }
  alert(msg);
}

