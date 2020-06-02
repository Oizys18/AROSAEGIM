/* global kakao */
import myLocationImg from "../../../assets/point/myLocation.png";

export const setCenter = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.setCenter(targetCenter);
};

export const panTo = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.panTo(targetCenter);
};

export const myLocationMarker = (userCenter) => {
  const imageSrc = myLocationImg; // 마커이미지의 주소입니다
  const imageSize = new kakao.maps.Size(50, 50); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(25, 50) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  const markerPosition = userCenter; // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  });
  return marker
};
