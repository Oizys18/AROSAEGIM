/* global kakao */
import React, { Component } from "react";
import styled from "styled-components";
import { Storage } from  '../../../storage/Storage';
import * as MM from "./MapMethod";
import DoneIcon from '@material-ui/icons/Done';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Chip } from "@material-ui/core";
import pointImg from "../../../assets/point/point@2x.png";
import pointFloatImg from "../../../assets/point/point-float@2x.png";
import CtoW from "../../../apis/w3w";

// import MapMarker, {MarkerConfig} from "./MapItemTest";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      mv: null,
      mapProjection: null,
      userMarker: null,
      
      write: {
        moving: false,
      },
      centerMarker: null,
      w3w: this.props.w3w,
    };
    this.markers = []
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  async componentDidMount() {
    await this.initMapView();
    await this.overlayCurPosition();
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.write.moving !== this.state.write.moving) {
      const newMarkerImage = this.getMarkerImage(this.state.write.moving ? 'float' : '')
      this.state.centerMarker.setImage(newMarkerImage)

      if (!this.state.write.moving) {
        const center = this.state.mv.getCenter()
        const w3w = await CtoW(center.getLat(), center.getLng())
        this.setState({w3w: w3w.data.words})
      }
    }

    // // 현위치로 가기 눌렀을 때
    // if(prevProps.mapCenter !== this.props.mapCenter && this.props.mapCenter === this.props.userCenter){
    //   this.state.mv.panTo(this.props.mapCenter);
    //   // console.log('map is in user center')
    //   (this.state.userMarker && this.state.userMarker.setPosition(this.props.userCenter));
    // }

    // // 페이지 전환시 지도 중심, 레벨 유지
    // if(prevProps.mapCenter !== this.props.mapCenter && 
    //   this.context.curMapCenter === this.props.mapCenter && 
    //   this.props.mapCenter !== this.props.userCenter){
    //   this.state.mv.panTo(this.props.mapCenter);
    //   this.state.mv.setLevel(this.props.mapLevel);
    // }


    // (!!this.props.userCenter && this.props.usingUserCenter && !this.state.userMarker && this.showUserCenter())
    // if (prevProps.usingUserCenter !== this.props.usingUserCenter){console.log(prevProps, this.props, this.state)}
    // if (prevProps.usingUserCenter !== this.props.usingUserCenter && this.props.usingUserCenter && !!this.state.userMarker) {
    //   
    //   this.state.mv.panTo(this.props.userCenter)
    //   // MM.panTo(this.state.mv, this.props.userCenter.getLat(), this.props.userCenter.getLng())
    // }

  }

  componentWillUnmount(){
    // kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "center_changed", this.handleCenterChange)
    // kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLv)
    kakao.maps.event.removeListener(this.state.mv, "dragstart", this.handleDragStart)
    kakao.maps.event.removeListener(this.state.mv, "dragend", this.handleDragEnd)
  }

  // 지도 초기화
  initMapView = () => {
    const _cont = document.getElementById('mapView');
    const _options = {
      center: this.props.mapCenter,
      level: this.props.mapLevel,
    }
    const _mapView = new kakao.maps.Map(_cont, _options)
    // kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLvCt)
    // kakao.maps.event.addListener(_mapView, "center_changed", this.changeLvCt)
    // kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLv)
    kakao.maps.event.addListener(_mapView, "center_changed", this.handleCenterChange)
    kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    kakao.maps.event.addListener(_mapView, "dragend", this.handleDragEnd)

    const _mapProjection = _mapView.getProjection()

    // const _clusterer = new kakao.maps.MarkerClusterer({
    //   map: _mapView, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
    //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
    //   minLevel: 1, // 클러스터 할 최소 지도 레벨 
    //   disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    // });

    // kakao.maps.event.addListener(_clusterer, 'clusterclick', this.handleCluster);

    this.setState({
      mv: _mapView,
      // mapProjection: _mapProjection,
      // clusterer: _clusterer,
    })
  }

  changeLv = () => {
    this.props.changeMapLevel(this.state.mv.getLevel())
  }

  showUserCenter = () => {
    const userCenterPos = {
      latitude: this.props.userCenter.getLat(),
      longitude: this.props.userCenter.getLng()
    }
    // MM.panTo(this.state.mv, userCenterPos.latitude, userCenterPos.longitude)
    const markerConfig = MM.MarkerConfig(userCenterPos, "user")
    const userMarker = new kakao.maps.Marker(markerConfig);
    userMarker.setMap(this.state.mv)
    this.setState({userMarker: userMarker})
  }

  handleCenterChange = () => {
    const center = this.state.mv.getCenter();
    this.state.centerMarker.setPosition(center);
  }

  handleDragStart = () => {
    // (this.state.selected.status && this.closeItem());
    // (this.props.usingUserCenter && this.props.unsetUsingUserCenter());
    // (this.state.selectedList.status && this.unsetSelectedList());
    // this.closeItem();
    this.setState({write: {moving: true}})
  };

  handleDragEnd = () => {
    this.setState({write: {moving: false}})
    this.props.changeMapCenter(this.state.mv.getCenter())
    // this.fetchItem();
    // (this.state.selected.status && this.closeItem());
    // (this.state.usingUserCenter && this.setState({usingUserCenter: false}));
  };

  overlayCurPosition = () => {
    const markerImage = this.getMarkerImage()

    const markerConfig = {position: this.props.mapCenter, image: markerImage}
    const centerMarker = new kakao.maps.Marker(markerConfig)
    centerMarker.setMap(this.state.mv)
    this.setState({centerMarker: centerMarker})
  }

  getMarkerImage = (status) => {
    let imageSrc = null;
    let imageSize = null;
    let imageOption = null;

    if (status === 'float') {
      imageSrc = pointFloatImg;
      imageSize = new kakao.maps.Size(21, 42); // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(11, 42) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    } else {
      imageSrc = pointImg;
      imageSize = new kakao.maps.Size(21, 28); // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(11, 28) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    }
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    return markerImage
  }

  fixLocation = () => {
    const center = this.state.mv.getCenter()
    this.props.fixLocation([center.getLat(), center.getLng()], this.state.w3w)
  }

  cancelMap = () => {
    console.log(this.state.mv.getCenter())
  }

  render() {
    return (
      <>
        <StView id="mapView" hidden={this.props.hide}>
        </StView>
        {this.props.status === "list" && 
        this.state.selectedList.status && 
          <StListCont>
            <StList>
              {this.overlaySelectedList()}
            </StList>
          </StListCont>
        }
        {this.props.status === "write" && !!this.state.w3w &&
          <StTextWrapper>
            <Chip color="primary" size="medium" label={this.state.w3w} icon={<LocationOnIcon />}/>
          </StTextWrapper>
        }
        {this.props.status === "write" && 
          <StButtonWrapper>
            <Chip color="primary" size="medium" label={"위치 확정하기"} onClick={this.fixLocation} clickable icon={<DoneIcon />}/>
            <Chip size="medium" label={"닫기"} onClick={this.props.cancelMap} onDelete={this.props.cancelMap} clickable deletable />
          </StButtonWrapper>
        }
      </>
    );
  }
}
export default MapView;
MapView.contextType = Storage;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;

const StListCont = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  overflow-y: auto;
  max-height: 65%;
  max-width: 60%;
  z-index: 15;
  top: 50%;
  right: 0px;
  padding-right: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  transform: translateY(-40%);
  /* background: linear-gradient(0.25turn, rgba(255,255,255,0) 80%, #838e83 ); */
`

const StList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`

const StButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  z-index: 15;
  
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content:center;
  align-items: center;
`

const StTextWrapper = styled.div`
  position: absolute;
  bottom: 56px;
  z-index: 15;
  
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content:center;
  align-items: center;
`