/* global kakao */

export const setCenter = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.setCenter(targetCenter);
};

export const panTo = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.panTo(targetCenter);
};

