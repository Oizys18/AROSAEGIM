/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import {IconButton, Zoom} from '@material-ui/core';
import {Map, Streetview} from '@material-ui/icons';
import {FlexColumn} from '../../../styles/DispFlex';

import MapView from './MapView';
import RoadView from './RoadView';

const dummyItems = [
  {
    title: "카카오",
    latlng: [33.450705, 126.570677],
  },
  {
    title: "생태연못",
    latlng: [33.450936, 126.569477],
  },
  {
    title: "텃밭",
    latlng: [33.450879, 126.56994],
  },
  {
    title: "근린공원",
    latlng: [33.451393, 126.570738],
  },
  {
    title: "할리스",
    latlng: [37.50083104531534, 127.03694678811341],
  },
];

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      mv: null,

      rv: null,
      rvc: null,

      center: new kakao.maps.LatLng(37.50083104531534, 127.03694678811341),
      level: 3,

      mkrLi: [],

      roadView: false,
    }
    this.map = null
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount(){
    const _container = document.getElementById("mapView");
    const _options = {
      center: this.state.center,
      lever: this.state.level,
    }

    const _mapView = new kakao.maps.Map(_container, _options);
    kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLvCt)
    kakao.maps.event.addListener(_mapView, "center_changed", this.changeLvCt)

    await this.setStateAsync({ mv: _mapView })
    this.getMkrLi()

    const _scale = _container.childNodes[1]
    _scale.style = `
      position: absolute; 
      z-index: 1; 
      margin: 0px 6px; 
      height: 19px; 
      line-height: 14px; 
      left: 0px; 
      bottom: 64px; 
      color: rgb(0, 0, 0);
    `

  }
  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "center_changed", this.changeLvCt)
  }

  getMkrLi = () => {
    dummyItems.forEach((el, idx) => {
      const mkr = new kakao.maps.Marker({
        position:  new kakao.maps.LatLng(el.latlng[0], el.latlng[1])
      });
      // console.log(this.state.mapView)
      mkr.setMap(this.state.mv)
    })
  }

  changeLvCt = () => {
    this.setState({
      center: this.state.mv.getCenter(),
      level: this.state.mv.getLevel(),
    })
  }

  tglView = async () => {
    await this.setStateAsync({ roadView: !this.state.roadView })

    if(this.state.roadView){
      const _cont = document.getElementById('roadView');
      const _rv = new kakao.maps.Roadview(_cont); //로드뷰 객체
      const _rvc = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      var rvResultValue = {}
      const _pos = this.state.center

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      _rvc.getNearestPanoId(_pos, 50, (panoId) => {
        _rv.setPanoId(panoId, _pos); //panoId와 중심좌표를 통해 로드뷰 실행
        rvResultValue.panoId = panoId;
      });
      this.setState({ rv: _rv, rvc:_rvc }) 

      kakao.maps.event.addListener(_rv, 'init', () => {
        dummyItems.forEach((el, idx) => {
          const _mkr = new kakao.maps.Marker({
            position:  new kakao.maps.LatLng(el.latlng[0], el.latlng[1]),
            map: _rv
          });
          var projection = _rv.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
      
          // 마커의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
          var viewpoint = projection.viewpointFromCoords(_mkr.getPosition(), _mkr.getAltitude());
          _rv.setViewpoint(viewpoint); //로드뷰에 뷰포인트를 설정합니다.
  
  
        })
      })
    }
  };

  changeIcon = () => {
    return (
      <>
        <Map style={{visibility: 'hidden'}}/>
        <Zoom in={this.state.roadView} style={{position: 'absolute', zIndex: 12,}}><Map/></Zoom>
        <Zoom in={!this.state.roadView} style={{position: 'absolute', zIndex: 13,}}><Streetview/></Zoom>
      </>
    )
  }

  changeIcon = () => {
    return (
      <>
        <Map style={{visibility: 'hidden'}}/>
        <Zoom in={this.state.roadView} style={{position: 'absolute', zIndex: 12,}}><Map/></Zoom>
        <Zoom in={!this.state.roadView} style={{position: 'absolute', zIndex: 13,}}><Streetview/></Zoom>
      </>
    )
  }

  render(){
    return(
      <StMapCont>
        <StViewCont>
          <Zoom in={true}>
            <StBtnCont>
              <IconButton disableRipple onClick={this.tglView}>{this.changeIcon()}</IconButton>
            </StBtnCont>
          </Zoom>

          <MapView hide={this.state.roadView}/>
          <RoadView rv={this.state.rv} rvc={this.state.rvc} data={dummyItems} hide={!this.state.roadView}/>

        </StViewCont>
      </StMapCont>
    )
  }
} export default MapPage;


const StMapCont = styled(FlexColumn)`
  height: 100vh;
`;

const StViewCont = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  background: gray;
`;

const StBtnCont = styled.div`
  position: absolute;
  z-index: 10;
  top: 64px;
  right: 8px;

  background: darkgray;
  border-radius: 50%;

`;
