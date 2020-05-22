/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';

class RoadView extends Component {

  // componentDidUpdate(){
  //   const _rv = this.props.rv
  //   const _rvc = this.props.rvc
  //   const _mkrList = this.props.data

  //   kakao.maps.event.addListener(_rv, 'init', () => {
  //     _mkrList.forEach((el, idx) => {
  //       const _mkr = new kakao.maps.Marker({
  //         position:  new kakao.maps.LatLng(el.latlng[0], el.latlng[1]),
  //         map: _rv
  //       });
  //       var projection = _rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
    
  //       // 마커의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
  //       var viewpoint = projection.viewpointFromCoords(_mkr.getPosition(), _mkr.getAltitude());
  //       _rv.setViewpoint(viewpoint); //로드뷰에 뷰포인트를 설정합니다.

  //       //각 뷰포인트 값을 초기화를 위해 저장해 놓습니다.
  //       // rvResetValue.pan = viewpoint.pan;
  //       // rvResetValue.tilt = viewpoint.tilt;
  //       // rvResetValue.zoom = viewpoint.zoom;

  //     })
  //   })
  // }

  render(){
    return(
      <StView id="roadView" hidden={this.props.hide}></StView>
    )
  }
} export default RoadView;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;