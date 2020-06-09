/* global kakao */
import myLocationImg from "../../../assets/point/myLocation.png";
import balloon from "../../../assets/balloon/balloon-whole-green@2x.png";

export const setCenter = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.setCenter(targetCenter);
};

export const panTo = (kakaoMapObj, lat, lng) => {
  const targetCenter = new kakao.maps.LatLng(lat, lng);
  kakaoMapObj.panTo(targetCenter);
};

export const panToWithOffset = (kakaoMapObj, kakaoMapProj, lat, lng) => {
  // set panTo offset : show cluseter on slightly left of screen
  const CENTER_OFFSET_RATIO = 0.2; // percentage
  const width = window.innerWidth;
  const center_offset = Math.floor(width * CENTER_OFFSET_RATIO);

  const cluster_point = kakaoMapProj.pointFromCoords(new kakao.maps.LatLng(lat,lng))
  const target_point = new kakao.maps.Point(cluster_point.x + center_offset, cluster_point.y);

  const target_coords = kakaoMapProj.coordsFromPoint(target_point);

  kakaoMapObj.panTo(target_coords);
}

const MarkerImage = (itemType) => {
  const IMAGE_CONST = (itemType === 'user' ? 25 : 15)
  const imageSrc = (itemType === 'user' ? myLocationImg : balloon);
  const imageSize = new kakao.maps.Size(IMAGE_CONST * 2, IMAGE_CONST * 2); // 마커이미지의 크기입니다
  const imageOption = { offset: new kakao.maps.Point(IMAGE_CONST, IMAGE_CONST * 2) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );
  return markerImage
}

export const MarkerConfig = (item, itemType) => {
  return {
    position: new kakao.maps.LatLng(item.latitude, item.longitude),
    image: MarkerImage(itemType),
  }
}

export const calcPanoRadius = (level) => {
  switch(level){
    case 1:
    case 2:
    case 3:
      return 50
    case 4:
    case 5:
      return 100
    case 6:
    case 7:
      return 200
    default: 
      return 50 
  }
}

export const kakaoLatLng = (lat, lng) => {
  const kakaoLatLng = new kakao.maps.LatLng(lat, lng);
  return kakaoLatLng
}

export const randomInt = (min, max) => {
  const _randVal = Math.floor(Math.random()*(max-min+1)) + min;
    return _randVal;
}

export const calcRVDist = (center, saegim) => {
  
}