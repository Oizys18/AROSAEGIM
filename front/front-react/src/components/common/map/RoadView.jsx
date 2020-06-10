/*global kakao*/
import React, { Component } from 'react';
import './MapWalker.css';
import MapWalker from './MapWalker';
import styled from 'styled-components';
import { Zoom, Grow, Slide, } from '@material-ui/core';
import { ArrowDownward, Refresh, HourglassEmpty } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex';
import RoadViewTopBar from "./RoadViewTopBar";
import RoadViewOverlay from "./RoadViewOverlay";
import RoadViewSaegimDetail from "./RoadViewSaegimDetail";
import * as MM from './MapMethod';

class RoadView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rv: null,
      rvc: null,
      mmOn: true,
      mm: null,
      cls: null,

      userMarker: null,
      itemIds: [],
      newItems: [],
      olComps: [],
      olObjs: [],

      loading: false,

      detailId: 0,
      sgDetail: null,
      popDetail: false,
    };
    this.markers = [];
  }
  
  //미니맵 토글
  toggleMiniMap = async () => { await this.setStateAsync({ mmOn: !this.state.mmOn }) }
  handleRefresh = async () => {
    await this.setStateAsync({ loading: true })
    .then(() => {
      this.fetchItem()    
    })
    // this.initOLMK();
    // this.renderOLMK();
  }

  setStateAsync(state) {
    return new Promise(resolve => { this.setState(state, resolve) })
  }

  async componentDidMount() { 
    this.initRV();
    this.initOLMK();
    this.renderOLMK();
  }
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.mmOn !== this.state.mmOn){
      this.state.rv.relayout(); //로드뷰 크기 변경 시 새고로침
      // if(this.state.mmOn){ 
        // this.initMM() 
        // this.initOLMK()
        // this.renderOLMK()
      // }
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

    if(prevProps.filterVal !== this.props.filterVal){
      this.fetchItem()
    }

    if(prevProps.items !== this.props.items) {
      this.initOLMK()
      this.renderOLMK()
      await this.setStateAsync({ loading: false })
    }

    if(prevState.loading !== this.state.loading){
      if(!this.state.loading){
        this.initOLMK()
        this.renderOLMK()
      }
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
    .then(() => {
      this.setState({
        cls: new kakao.maps.MarkerClusterer({
          map: this.state.mm, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
          averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
          minLevel: 1, // 클러스터 할 최소 지도 레벨 
          disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        })
      })
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
  initOLMK = async () => {
    const _newItems = this.props.items.filter((el) => {
      return !this.state.itemIds.includes(el.id)
    })
    this.setStateAsync({
      newItems: _newItems,
      itemIds: this.state.itemIds.concat(_newItems.map((el) => el.id)),
      olComps: this.state.olComps.concat(
        _newItems.map((el) => 
          <RoadViewOverlay key={`${el.id}`} 
            id={`${el.id}`} 
            item={el} 
            mapCenter={this.props.mapCenter}
            openDetail={this.tgleDetail}
            closeOverlay={this.closeOverlay}
          />
        )
      )
    })
  }
  renderOLMK = async () => {
    if(this.state.newItems.length > 0)
    {
      await this.setStateAsync({
        olObjs: this.state.olObjs.concat(
          this.state.newItems.map((el) => {
            const _co = new kakao.maps.CustomOverlay({
              position: new kakao.maps.LatLng(el.latitude, el.longitude),
              content: document.getElementById(`${el.id}`),
              // xAnchor: Math.random(), 
              // yAnchor: Math.random(), 
              xAnchor: 0.5, 
              yAnchor: 0.5, 
            })
            const _mk = new kakao.maps.Marker(MM.MarkerConfig(el))
            return { id:el.id, co:_co, mk:_mk }
          })
        )
      })
    }
    this.state.olObjs.forEach((el) => {
      const _flag = this.props.items.findIndex(item => item.id === el.id)
      if(_flag !== -1){
        // el.co.setAltitude(MM.randomInt(0, 15))
        el.co.setRange(70)
        el.co.setMap(this.state.rv)
        // el.mk.setMap(this.state.mm)
        this.state.cls.addMarker(el.mk)
      }
      else{
        el.co.setMap(null)
        // el.mk.setMap(null)
        this.state.cls.removeMarker(el.mk)
      }
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
    _miniMap.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);

    await this.setStateAsync({
      mm: _miniMap
    })
    .then(() => {
      ( !sessionStorage.getItem('ARSG no GPS') && this.showUserCenter() ) //현재 위치 표시
    })

    const _mapWalker = new MapWalker(this.state.rv.getPosition()) //맵워커 생성
    const _viewpoint = this.state.rv.getViewpoint(); // 맵워커 뷰포트 초기화
    _mapWalker.setMap(_miniMap); // 맵워커를 지도에 설정한다.
    _mapWalker.setAngle(_viewpoint.pan);

    await this.setStateAsync({
      mw: _mapWalker,
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
    this.state.rvc.getNearestPanoId(_center, MM.calcPanoRadius(_level), (panoId) => {
      if(panoId)  {
        this.state.rv.setPanoId(panoId, _center) //panoId와 중심좌표를 통해 로드뷰 실행
      }
    })
    this.props.changeMapCenter(_center)
  }
  //맵워커 위치, 로드 뷰 변경
  changeMWCt = (e) => {
    const _center = this.state.mm.getCenter()
    this.state.mw.setPosition(_center)
  }

  tgleDetail = (id, sgDetail) => {
    if(id) {
      this.setState({
        detailId: id,
        sgDetail: sgDetail,
        popDetail: true,
      })
    }
    else{
      this.setState({
        popDetail: false,
      })
    }
  }
  closeOverlay = (id) => {
    const _idx = this.state.itemIds.indexOf(id)
    this.state.olObjs[_idx].co.setMap(null)
    this.state.cls.removeMarker(this.state.olObjs[_idx].mk)
  }

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
        
        <Zoom in={!this.state.loading} mountOnEnter unmountOnExit>
          <StRefreshBtn onClick={this.handleRefresh}><Refresh/></StRefreshBtn>
        </Zoom>
        <Zoom in={this.state.loading} mountOnEnter unmountOnExit>
          <StLoading><HourglassEmpty/></StLoading>
        </Zoom>

        <Zoom in={this.state.mmOn} mountOnEnter unmountOnExit>
          <StCloseMMBtn onClick={this.toggleMiniMap}><ArrowDownward/></StCloseMMBtn>
        </Zoom>
        <Zoom in={!this.state.mmOn} mountOnEnter unmountOnExit>
          <StOpenMMBtn onClick={this.toggleMiniMap}>미니맵</StOpenMMBtn>
        </Zoom>

        <Zoom in={this.state.popDetail} mountOnEnter unmountOnExit>
          <RoadViewSaegimDetail 
            on={this.state.popDetail} 
            tgleDetail={this.tgleDetail} 
            id={this.state.detailId} 
            sgDetail={this.state.sgDetail}
          />
        </Zoom>

        <div>
        {
          this.state.olComps
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

const StRefreshBtn = styled(StBtn)`
  bottom: 56px;
  z-index: 10;
  background: #FBF2EE;
  svg{
    color: #404040;
    width: 24px;
    height: 24px; 
  }
`;

const StLoading = styled(StBtn)`
  bottom: 56px;
  z-index: 11;
  background: #FBF2EE;
  svg{
    color: #404040;
    width: 24px;
    height: 24px; 
  }
`;
const StOpenMMBtn = styled(StBtn)`
  z-index: 10;
  height: 24px;
  background: #FBF2EE;
  color: #404040;
`;

const StCloseMMBtn = styled(StBtn)`
  z-index: 11;
  background: #FBF2EE;
  svg{
    color: #404040;
    width: 24px;
    height: 24px; 
  }
`;

const StMap = styled.div`
  width: 100%;
  height: 35%;

  border-top: 1px solid white;
  box-sizing: border-box;
`