/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import {IconButton, Zoom} from '@material-ui/core';
import {Map, Streetview} from '@material-ui/icons';
import {FlexColumn} from '../../../styles/DispFlex';
import DefaultButton from "../buttons/DefaultButton";

import MapView from './MapView';
import MapListItem from "./MapListItem";
import RoadView from './RoadView';

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: dummyItems,

      mv: null,

      rv: null,
      rvc: null,

      center: new kakao.maps.LatLng(37.50083104531534, 127.03694678811341),
      level: 3,
      userCenter: null,
      selected: {
        status: false,
        item: null,
      },
      bounds: null,

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
    // kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    // kakao.maps.event.addListener(_mapView, "bounds_changed", this.handleBoundsChange)

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
    // kakao.maps.event.removeListener(this.state.mv, "dragstart", this.handleDragStart)
    // kakao.maps.event.removeListener(this.state.mv, "bounds_changed", this.handleBoundsChange)
  }

  getMkrLi = () => {
    dummyItems.forEach((el, idx) => {
      const mkr = new kakao.maps.Marker({
        position:  new kakao.maps.LatLng(el.latlng[0], el.latlng[1])
      });
      // console.log(this.state.mvView)
      mkr.setMap(this.state.mv)
    })
  }

  // handleDragStart = () => {
  //   this.setState({ mapCenter: this.state.mv.getCenter() });
  //   this.closeItem();
  // };

  // handleBoundsChange = () => {
  //   this.setState({ bounds: this.state.mv.getBounds() });
  //   // this.closeItem();
  // };

  // move directly to given center
  setCenter = (center) => {
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.state.mv.setCenter(targetCenter);
  };

  // move smoothly to given center
  panTo = (center) => {
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.state.mv.panTo(targetCenter);
  };

  selectItem = (item) => {
    // console.log(item);
    this.panTo({ lat: item.latlng[0], lng: item.latlng[1] });
    this.setState({ selected: { status: true, item: item } });
  };

  closeItem = () => {
    this.setState({ selected: { status: false, item: null } });
  };

  prevItem = () => {
    const currentIndex = this.state.items.indexOf(this.state.selected.item);
    const prevIndex =
      currentIndex === 0 ? this.state.items.length - 1 : currentIndex - 1;
    this.selectItem(this.state.items[prevIndex]);
  };

  nextItem = () => {
    const currentIndex = this.state.items.indexOf(this.state.selected.item);
    const nextIndex =
      currentIndex === this.state.items.length - 1 ? 0 : currentIndex + 1;
    this.selectItem(this.state.items[nextIndex]);
  };

  // function for development
  addRndItemInView = () => {
    const bounds = this.state.mv.getBounds();
    console.log(bounds)
    const rndLatLng = [
      this.generateRandom(bounds.ka, bounds.ja),
      this.generateRandom(bounds.da, bounds.ia),
    ];
    const lastItem = this.state.items[this.state.items.length - 1];
    const newItem = {
      id: lastItem.id + 1,
      title: `new item ${lastItem.id + 1}`,
      latlng: rndLatLng,
    };
    this.setState({
      items: this.state.items.concat(newItem),
    });
  };

  generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

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

  render(){
    return(
      <StMapCont>
        <StViewCont>
          <Zoom in={true}>
            <>
            <StBtnCont>
              <IconButton disableRipple onClick={this.tglView}>{this.changeIcon()}</IconButton>
            </StBtnCont>
            <ButtonWrapper>
              <DefaultButton
                text="add random item"
                onClick={this.addRndItemInView}
              />
            </ButtonWrapper>
            {this.state.selected.status && (
              <>
                <ButtonWrapper>
                  <DefaultButton text="prev Item" onClick={this.prevItem} />
                  <DefaultButton text="next Item" onClick={this.nextItem} />
                </ButtonWrapper>
                <MapListItem
                  item={this.state.selected.item}
                  closeItem={this.closeItem}
                />
              </>
            )}
            </>
          </Zoom>

          <MapView
            map={this.state.mv}
            status="list"
            items={this.state.items}
            selectItem={this.selectItem}
            hide={this.state.roadView}
          />

          <RoadView 
            rv={this.state.rv} 
            rvc={this.state.rvc} 
            data={dummyItems} 
            hide={!this.state.roadView}
          />

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

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;

  bottom: 72px;

  display: flex;
  padding: 0 16px 0 16px;
`;


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