/*global kakao*/
import React, { Component } from 'react';
import './MapWalker.css';
import MapWalker from './MapWalker';
import styled from 'styled-components';
import { Zoom, Grow, Slide,   } from '@material-ui/core';
import { Map, ArrowDownward, } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex';
import RoadViewTopBar from "./RoadViewTopBar";

class RoadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocoder: new kakao.maps.services.Geocoder(),
      addr: '',
      w3w: '',

      rv: null,
      rvc: null,
      mmOn: false,
      mm: null,
    };
  }

  setStateAsync(state) {
    return new Promise(resolve => { this.setState(state, resolve) })
  }

  componentDidMount() { 
    this.initRV()
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.mmOn !== this.state.mmOn){
      this.state.rv.relayout(); //로드뷰 크기 변경 시 새고로침
      if(this.state.mmOn){ this.initMM() }
    }
  }
  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.rv, 'position_changed', this.changeRVPos);
    kakao.maps.event.removeListener(this.state.rv, 'viewpoint_changed', this.changeRVVP);
    if(this.state.mm){
      kakao.maps.event.removeListener(this.state.mm, "zoom_changed", this.changeLvCt)
      kakao.maps.event.removeListener(this.state.mm, "dragend", this.changeLvCt)
      kakao.maps.event.removeListener(this.state.mm, "center_changed", this.changeMWCt)
    }
  }

  //로드뷰 초기화
  initRV = () => {
    const _cont = document.getElementById('roadView');
    const _roadView = new kakao.maps.Roadview(_cont); //로드뷰 객체
    const _roadViewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    var rvResultValue = {}
    const _pos = this.props.mapCenter

    // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    _roadViewClient.getNearestPanoId(_pos, 50, (panoId) => {
      _roadView.setPanoId(panoId, _pos); //panoId와 중심좌표를 통해 로드뷰 실행
      rvResultValue.panoId = panoId;
    });

    this.setState({
      rv: _roadView,
      rvc: _roadViewClient,
    })

    this.changeAddr(this.props.mapCenter)

    kakao.maps.event.addListener(_roadView, 'position_changed', this.changeRVPos);
    kakao.maps.event.addListener(_roadView, 'viewpoint_changed', this.changeRVVP);
  }

  changeAddr = (center) => {
    this.state.geocoder.coord2RegionCode(center.getLng(), center.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        for(var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            this.setState({ addr:  result[i].address_name })
            break;
          }
        }
      }     
    });
  }

  //로드뷰 이동
  changeRVPos = () => { 
    const _position = this.state.rv.getPosition()
    this.changeAddr(_position)
    if(this.state.mm){
      this.state.mm.panTo(_position) //미니맵 이동
      this.state.mw.setPosition(_position) // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영 
    }
    this.props.changeMapCenter(_position)
  }
  //뷰포인트 변경
  changeRVVP = () => {
    // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
    var _viewpoint = this.state.rv.getViewpoint();
    if(this.state.mm){
      this.state.mw.setAngle(_viewpoint.pan);
    }
  }

  //미니맵 초기화
  initMM = async () => {
    const _cont = document.getElementById('miniMap');
    const _option = {
      center: this.state.rv.getPosition(),
      level: 3,
    }
    const _miniMap = new kakao.maps.Map(_cont, _option)
    const _mapWalker = new MapWalker(this.state.rv.getPosition()) //맵워커 생성
    _mapWalker.setMap(_miniMap); // 맵워커를 지도에 설정한다.

    var _viewpoint = this.state.rv.getViewpoint(); // 맵워커 뷰포트 초기화
    _mapWalker.setAngle(_viewpoint.pan);

    await this.setStateAsync({
      mm: _miniMap,
      mw: _mapWalker
    })

    _miniMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
    kakao.maps.event.addListener(_miniMap, "zoom_changed", this.changeLvCt)
    kakao.maps.event.addListener(_miniMap, "dragend", this.changeLvCt)
    kakao.maps.event.addListener(_miniMap, "center_changed", this.changeMWCt)
  }

  //레벨 변경
  //중심 이동
  changeLvCt = () => {

    const _center = this.state.mm.getCenter()
    this.changeAddr(_center)
    this.state.rvc.getNearestPanoId(_center, 50, (panoId) => {
      if(panoId)  this.state.rv.setPanoId(panoId, _center) //panoId와 중심좌표를 통해 로드뷰 실행
    })
    this.props.changeMapCenter(_center)
  }
  //맵워커 위치 변경
  changeMWCt = () => {
    const _center = this.state.mm.getCenter()
    this.state.mw.setPosition(_center)
  }

  toggleMap = async () => {
    await this.setStateAsync({ mmOn: !this.state.mmOn })
  }

  changeIcon = () => {
    return (
      <>
        {/* <Map style={{visibility: 'hidden'}}/> */}
        
        <Zoom in={this.state.mmOn} style={{position: 'absolute', zIndex: 2,}}></Zoom>
      </>
    )
  }

  render(){
    return(
      <>
        <RoadViewTopBar 
          on={!this.props.hide} 
          addr={this.state.addr} 
          w3w={this.state.w3w}
          tglView={this.props.tglView} 
        />
      
        <Grow in={!this.props.hide} mountOnEnter unmountOnExit>
          <StView id="roadView" mmOn={this.state.mmOn}/>
        </Grow>

        <Slide in={this.state.mmOn} direction="up" mountOnEnter unmountOnExit>
          <StMap id="miniMap"/>
        </Slide>
        
        <Zoom in={this.state.mmOn} mountOnEnter unmountOnExit>
          <StCloseMMBtn onClick={this.toggleMap}><ArrowDownward/></StCloseMMBtn>
        </Zoom>
        <Zoom in={!this.state.mmOn} mountOnEnter unmountOnExit>
          <StOpenMMBtn onClick={this.toggleMap}>미니맵</StOpenMMBtn>
        </Zoom>
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
  right: 16px;

  padding: 4px;
  border: 1px solid gray;
  border-radius: 8px;
  background: #e6e6e6;
`;

const StOpenMMBtn = styled(StBtn)`
  z-index: 10;
  height: 28px;
`;

const StCloseMMBtn = styled(StBtn)`
  z-index: 11;
  svg{
    width: 28px;
    height: 28px; 
  }
`;

const StMap = styled.div`
  width: 100%;
  height: 35%;

  border-top: 1px solid white;
  box-sizing: border-box;
`
