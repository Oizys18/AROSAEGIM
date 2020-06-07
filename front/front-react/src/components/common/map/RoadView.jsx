/*global kakao*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MapWalker.css';
import MapWalker from './MapWalker';
import styled from 'styled-components';
import { Zoom, Grow, Slide, } from '@material-ui/core';
import { ArrowDownward, } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex';
import RoadViewTopBar from "./RoadViewTopBar";
import RoadViewOverlay from "./RoadViewOverlay";
import * as MM from './MapMethod';

class RoadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rv: null,
      rvc: null,
      mmOn: true,
      mm: null,
      mpj: null,

      userMarker: null,
      clusterer: null,
      overlayComps: [],
      itemIds: [],
    };
    this.markers = [];
  }

  setStateAsync(state) {
    return new Promise(resolve => { this.setState(state, resolve) })
  }

  async componentDidMount() { 
    this.initRV();
    this.renderOverlay();
    // this.overlayMarkers();
  }
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.mmOn !== this.state.mmOn){
      this.state.rv.relayout(); //로드뷰 크기 변경 시 새고로침
      if(this.state.mmOn){ this.initMM() }
    }
    if(prevProps.mapCenter !== this.props.mapCenter && this.props.mapCenter === this.props.userCenter){
      this.state.rvc.getNearestPanoId(this.props.mapCenter, 100, (panoId) => {
        if(panoId){
          this.state.rv.setPanoId(panoId, this.props.mapCenter);
        }
      })
      if(this.state.mmOn) {
        const _position = this.state.rv.getPosition()
        this.state.mm.panTo(_position);
        (this.state.userMarker && this.state.userMarker.setPosition(this.props.userCenter));
      }
    }

    if(prevProps.mapCenter !== this.props.mapCenter){
      this.fetchItem()
    }
    if(prevProps.filterVal !== this.props.filterVal){
      this.fetchItem()
    }

    if(prevProps.items !== this.props.items) {
      // this.renderOverlay()
      this.overlayMarkers()
    }
  }
  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.rv, 'position_changed', this.changeRVPos);
    kakao.maps.event.removeListener(this.state.rv, 'viewpoint_changed', this.changeRVVP);
    // kakao.maps.event.removeListener(this.state.rv, 'init', this.initMM)
    // kakao.maps.event.removeListener(this.state.rv, 'init', this.renderOverlay)
    if(this.state.mm){
      kakao.maps.event.removeListener(this.state.mm, "zoom_changed", this.changeLvCt)
      kakao.maps.event.removeListener(this.state.mm, "dragend", this.changeLvCt)
      kakao.maps.event.removeListener(this.state.mm, "center_changed", this.changeMWCt)
      // kakao.maps.event.removeListener(this.state.mm, 'tilesloaded', this.fetchItem);
    }
  }

  //로드뷰 초기화
  initRV = async () => {
    const _cont = document.getElementById('roadView');
    const _roadView = new kakao.maps.Roadview(_cont); //로드뷰 객체
    const _roadViewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    const _pos = this.props.mapCenter

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    _roadViewClient.getNearestPanoId(_pos, 100, (panoId) => {
      if(panoId){
        _roadView.setPanoId(panoId, _pos); //panoId와 중심좌표를 통해 로드뷰 실행
      }
      else{
        this.props.popModal(`지도 중심 반경\n100m안에\n로드뷰가 없습니다!`, 'no road view', 'alert')
        this.props.tglView()
      }
    });

    this.setStateAsync({
      rv: _roadView,
      rvc: _roadViewClient,
    })
    .then(() => {
      this.initMM()
    })

    kakao.maps.event.addListener(_roadView, 'position_changed', this.changeRVPos);
    kakao.maps.event.addListener(_roadView, 'viewpoint_changed', this.changeRVVP);
  }

  //로드뷰 이동
  changeRVPos = () => { 
    const _position = this.state.rv.getPosition()
    if(this.state.mm){
      this.state.mm.panTo(_position) //미니맵 이동
      this.state.mw.setPosition(_position) // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영 
    }
    this.props.changeMapCenter(_position)
  }
  //뷰포인트 변경
  changeRVVP = () => {
    // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
    if(this.state.mm){
      var _viewpoint = this.state.rv.getViewpoint();
      this.state.mw.setAngle(_viewpoint.pan);
    }
  }

  //커스텀 오버레이
  renderOverlay = () => {
    const _newItems = this.props.items.filter((el) => {
      return !this.state.itemIds.includes(el.id)
    })
    this.setStateAsync({
      itemIds: this.state.itemIds.concat(_newItems.map((el) => el.id)),
      overlayComps: this.state.overlayComps.concat(
        _newItems.map((el) => <RoadViewOverlay key={`${el.id}`} id={`${el.id}`} item={el}/>)
      )
    })
  }
  overlayMarkers = () => {
    const _items = this.props.items.filter((el) => {
      return !this.state.itemIds.includes(el.id)
    })

    this.props.items.forEach((el) => {
      console.log(el)
      const rvCustomOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(el.latitude, el.longitude),
        content: document.getElementById(`${el.id}`),
        xAnchor: 0.5, 
        yAnchor: 0.5, 
      });
      rvCustomOverlay.setMap(this.state.rv);
      rvCustomOverlay.setRange(100);
  
      const marker = new kakao.maps.Marker(MM.MarkerConfig(el));// new MapMarker(el);
      marker.setMap(this.state.mm)
      marker.itemId = el.id
    })
  }
  fetchItem = () => {
    const _bounds = this.state.mm.getBounds();
    const _center = this.state.mm.getCenter();
    this.props.fetchItem(_bounds, _center);
  }

  //미니맵 초기화
  initMM = async () => {
    const _cont = document.getElementById('miniMap');
    const _option = {
      center: this.state.rv.getPosition(),
      level: 4,
    }
    const _miniMap = new kakao.maps.Map(_cont, _option)

    await this.setStateAsync({
      mm: _miniMap
    })
    .then(() => {
      ( !sessionStorage.getItem('ARSG no GPS') && this.showUserCenter() ) //현재 위치 표시
    })

    const _mapWalker = new MapWalker(this.state.rv.getPosition()) //맵워커 생성
    _mapWalker.setMap(_miniMap); // 맵워커를 지도에 설정한다.

    const _viewpoint = this.state.rv.getViewpoint(); // 맵워커 뷰포트 초기화
    _mapWalker.setAngle(_viewpoint.pan);

    await this.setStateAsync({
      mw: _mapWalker
    })

    _miniMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    kakao.maps.event.addListener(_miniMap, "zoom_changed", this.changeLvCt)
    kakao.maps.event.addListener(_miniMap, "dragend", this.changeLvCt)
    kakao.maps.event.addListener(_miniMap, "center_changed", this.changeMWCt)
  }

  showUserCenter = () => {
    const userCenterPos = {
      latitude: this.props.userCenter.getLat(),
      longitude: this.props.userCenter.getLng()
    }
    const markerConfig = MM.MarkerConfig(userCenterPos, "user")
    const userMarker = new kakao.maps.Marker(markerConfig);
    userMarker.setMap(this.state.mm)
    this.setState({ userMarker: userMarker })
  }

  

  //레벨 변경
  //중심 이동
  changeLvCt = () => {
    const _center = this.state.mm.getCenter()
    const _level = this.state.mm.getLevel()
    // this.changeAddr(_center)
    this.state.rvc.getNearestPanoId(_center, MM.calcPanoRadius(_level), (panoId) => {
      if(panoId)  {
        this.state.rv.setPanoId(panoId, _center) //panoId와 중심좌표를 통해 로드뷰 실행
      }
    })
    this.props.changeMapCenter(_center)
  }
  //맵워커 위치 변경
  changeMWCt = () => {
    const _center = this.state.mm.getCenter()
    this.state.mw.setPosition(_center)
  }

  //미니맵 토글
  toggleMiniMap = async () => { await this.setStateAsync({ mmOn: !this.state.mmOn }) }

  render(){
    return(
      <>
        <RoadViewTopBar 
          on={!this.props.on}
          tglView={this.props.tglView}
          addr={this.props.addr} 
          w3w={this.props.w3w}
        />
      
        <Grow in={!this.props.on} mountOnEnter unmountOnExit>
          <StView id="roadView" mmOn={this.state.mmOn}/>
        </Grow>

        {/* <Slide in={this.state.mmOn} direction="up" mountOnEnter unmountOnExit> */}
        <Slide in={this.state.mmOn} direction="up">
          <StMap id="miniMap"/>
        </Slide>
        
        <Zoom in={this.state.mmOn} mountOnEnter unmountOnExit>
          <StCloseMMBtn onClick={this.toggleMiniMap}><ArrowDownward/></StCloseMMBtn>
        </Zoom>
        <Zoom in={!this.state.mmOn} mountOnEnter unmountOnExit>
          <StOpenMMBtn onClick={this.toggleMiniMap}>미니맵</StOpenMMBtn>
        </Zoom>

        <div>
        {
          this.state.overlayComps
        }
        </div>
      </>
    )
  }
} export default RoadView;

const StView = styled.div`
  width: 100%;
  /* height: 100%; */
  height: ${props => props.mmOn ? 65 : 100}%;
`;

const StBtn = styled(FlexRow)`
  position: absolute;
  bottom: 16px;
  right: 8px;

  padding: 4px;
  border: 1px solid gray;
  border-radius: 8px;
  background: #e6e6e6;
`;

const StOpenMMBtn = styled(StBtn)`
  z-index: 10;
  height: 20px;
`;

const StCloseMMBtn = styled(StBtn)`
  z-index: 11;
  svg{
    width: 20px;
    height: 20px; 
  }
`;

const StMap = styled.div`
  width: 100%;
  height: 35%;

  border-top: 1px solid white;
  box-sizing: border-box;
`

// const emptyItem = {
//   contents: "emptyItem",
//   id: 0,
//   image: null,
//   latitude: 37.50083104531534,
//   longitude: 127.03694678811341,
//   record: null,
//   regDate: 1590650953712,
//   secret: 0,
//   tags: [],
//   userId: 0,
//   userName: "empty",
//   w3w: "empty"
// }