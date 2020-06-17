/* global kakao */
import React, { Component } from "react";
import styled from "styled-components";
import { Storage } from  '../../../storage/Storage';
import * as MM from "./MapMethod";
import DoneIcon from '@material-ui/icons/Done';
import Chip from "../chip/Chip";
import pointImg from "../../../assets/point/point@2x.png";
import pointFloatImg from "../../../assets/point/point-float@2x.png";
import CtoW from "../../../apis/w3w";
import PinIcon from "../../../assets/PinIcon";
import { ArrowBack, ArrowForward } from '@material-ui/icons';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      mv: null,
      userMarker: null,
      
      write: {
        moving: false,
      },
      centerMarker: null,
      w3w: this.props.w3w,
      w3wHistory: {
        prevStatus: false,
        prev:[],
        savedStatus: false,
        saved:[],
      },
    };
    this.markers = []
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  async componentDidMount() {
    await this.initMapView();
    await this.overlayCurPosition();
    await this.getW3WHistory();
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.write.moving !== this.state.write.moving) {
      const newMarkerImage = this.getMarkerImage(this.state.write.moving ? 'float' : '')
      this.state.centerMarker.setImage(newMarkerImage)

      if (!this.state.write.moving) {
        this.updateW3W();
      }
    }
  }

  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.mv, "idle", this.handleIdle)
    // kakao.maps.event.removeListener(this.state.mv, "zoom_start", this.handleZoomStart)
    kakao.maps.event.removeListener(this.state.mv, "center_changed", this.handleCenterChange)
    kakao.maps.event.removeListener(this.state.mv, "bounds_changed", this.handleBoundsChange)
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
    kakao.maps.event.addListener(_mapView, "idle", this.handleIdle)
    // kakao.maps.event.addListener(_mapView, "zoom_start", this.handleZoomStart)
    kakao.maps.event.addListener(_mapView, "center_changed", this.handleCenterChange)
    kakao.maps.event.addListener(_mapView, "bounds_changed", this.handleBoundsChange)
    kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    kakao.maps.event.addListener(_mapView, "dragend", this.handleDragEnd)

    this.setState({
      mv: _mapView,
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

  handleIdle = () => {
    this.setState({write: {moving: false}})
    this.props.changeMapCenter(this.state.mv.getCenter())
  }

  handleZoomStart = () => {
    this.setState({write: {moving: true}})
  }
  
  handleCenterChange = () => {
    const center = this.state.mv.getCenter();
    this.state.centerMarker.setPosition(center);
  }
  
  handleBoundsChange = () => {
    this.setState({write: {moving: true}})
    // if (!this.state.write.moving) {
    //   this.updateW3W();
    // }
  }

  handleDragStart = () => {
    this.setState({write: {moving: true}})
  };

  handleDragEnd = () => {
    this.setState({write: {moving: false}})
  };

  updateW3W = async () => {
    const center = this.state.mv.getCenter();
    const _lat = center.getLat();
    const _lng = center.getLng();
    const w3w = await CtoW(_lat, _lng);

    this.setState({w3w: w3w.data.words})
    if (!!w3w.data.words && !!center) {this.setW3WHistoryInSession({w3w: w3w.data.words, lat: _lat, lng: _lng})}
  }

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
  
  getW3WHistory = () => {
    const _saved = localStorage.getItem('ARSG W3W History');
    const _prev = sessionStorage.getItem('ARSG W3W History');

    const _parsedHistory = {
      prev: _prev ? JSON.parse(_prev) : [],
      saved: _saved ? JSON.parse(_saved) : []
    }

    this.setState({ w3wHistory: _parsedHistory })
    
    if (!_prev) {
      sessionStorage.setItem('ARSG W3W History', JSON.stringify([]))
    }
    if (!_saved) {
      localStorage.setItem('ARSG W3W History', JSON.stringify([]))
    }
    console.log(this.state.w3wHistory)
  }

  setW3WHistoryInSession = async (item) => {
    const exists = this.state.w3wHistory.prev.findIndex(el=>el.w3w === item.w3w);
    const _prev = this.state.w3wHistory.prev
    const _newPrev = exists === -1 ? _prev.concat([item]) : _prev
    
    await this.setStateAsync({
      w3wHistory: {
        ...this.state.w3wHistory,
        prev: _newPrev
      }
    })

    sessionStorage.setItem('ARSG W3W History', JSON.stringify(this.state.w3wHistory.prev))
  }

  prevOn = () => {
    this.setState({
      w3wHistory: {
        ...this.state.w3wHistory,
        prevStatus: !this.state.w3wHistory.prevStatus
      }
    })
  }

  prevHistoryChips = () => {
    return this.state.w3wHistory.prev.map((el,index) => {
      const moveToHistory = () => {
        MM.panTo(this.state.mv, el.lat, el.lng)
      }
      return <Chip key={index} text={el.w3w} onClick={moveToHistory}/>
    })
  }

  render() {
    return (
      <>
        <StView id="mapView" hidden={this.props.hide}>
        </StView>
        {this.props.status === "write" && !!this.state.w3w &&
          <StTextWrapper>
            <Chip color="primary" size="medium" text={this.state.w3w} icon={<PinIcon />}/>
          </StTextWrapper>
        }
        {this.props.status === "write" && 
          <>
            <StPrevHistoryWrapper>
              {this.state.w3wHistory.prevStatus ? 
              <Chip text={"히스토리 닫기"} icon={<ArrowBack/>} onClick={this.prevOn}/>
              : <Chip text={"히스토리 보기"} icon={<ArrowForward/>} onClick={this.prevOn}/>
              }
              {this.state.w3wHistory.prevStatus
              ? this.prevHistoryChips() : <></>} 
            </StPrevHistoryWrapper>
          </>
        }
        {this.props.status === "write" && 
          <StButtonWrapper>
            <Chip color="primary" size="medium" text={"위치 확정하기"} onClick={this.fixLocation} clickable icon={<DoneIcon />}/>
            <StBlank />
            <Chip size="medium" text={"닫기"} onClick={this.props.cancelMap} onDelete={this.props.cancelMap} clickable deletable />
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
  top: 16px;
  z-index: 15;
  
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content:center;
  align-items: center;
`

const StPrevHistoryWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  z-index: 15;
  
  display: flex;
  flex-direction: row;
  width: 100%;
  
  overflow-x: auto;

  align-items: center;
`

const StBlank = styled.div`
  width: 10px;
`