/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import {IconButton, Zoom} from '@material-ui/core';
import {Map, Streetview} from '@material-ui/icons';
import {FlexColumn} from '../../../../styles/DispFlex'

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
];

class MapTest extends Component {
  constructor(props){
    super(props)
    this.state = {
      mapView: null,

      center: new kakao.maps.LatLng(33.450705, 126.570677),
      level: 3,

      mkrLi: [],

      roadView: false,
    }
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

    await this.setStateAsync({ mapView: _mapView })
    this.getMkrLi()
  }
  componentWillUnmount(){
    console.log('unmount')
    kakao.maps.event.removeListener(this.state.mapView, "zoom_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mapView, "center_changed", this.changeLvCt)
  }

  getMkrLi = () => {
    dummyItems.forEach((el, idx) => {
      const mkr = new kakao.maps.Marker({
        position:  new kakao.maps.LatLng(el.latlng[0], el.latlng[1])
      });
      // console.log(this.state.mapView)
      mkr.setMap(this.state.mapView)
    })
  }

  changeLvCt = () => {
    this.setState({
      center: this.state.mapView.getCenter(),
      level: this.state.mapView.getLevel(),
    })
  }

  tglView = async () => {
    await this.setStateAsync({ roadView: !this.state.roadView })

    if(this.state.roadView){
      const _cont = document.getElementById('roadView');
      const _rv = new kakao.maps.Roadview(_cont); //로드뷰 객체
      const _rvc = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

      const _pos = this.state.center

      // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
      _rvc.getNearestPanoId(_pos, 50, (panoId) => {
        _rv.setPanoId(panoId, _pos); //panoId와 중심좌표를 통해 로드뷰 실행
      });
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

  render(){
    return(
      <StMapCont>
        <StViewCont>
          <Zoom in={true}>
            <StBtnCont>
              <IconButton disableRipple onClick={this.tglView}>{this.changeIcon()}</IconButton>
            </StBtnCont>
          </Zoom>
          <StView id='mapView' hidden={this.state.roadView}/>
          <StView id='roadView' hidden={!this.state.roadView}/>
        </StViewCont>
      </StMapCont>
    )
  }
} export default MapTest;



const StMapCont = styled(FlexColumn)`
  height: 100vh;
`;

const StViewCont = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  background: gray;
`;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;

const StBtnCont = styled.div`
  position: absolute;
  z-index: 10;
  top: 64px;
  right: 8px;

  background: darkgray;
  border-radius: 50%;

`;
