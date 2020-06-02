/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import {IconButton, Zoom, Slide} from '@material-ui/core';
import {Map, Streetview, MyLocation, MyLocationTwoTone} from '@material-ui/icons';
import {FlexColumn} from '../../../styles/DispFlex';
import DefaultButton from "../buttons/DefaultButton";

import { getPosition } from '../../../apis/GeolocationAPI';
import {Storage} from '../../../storage/Storage';
import SearchBar from "../search/SearchBar";
import MapView from './MapView';
import MapListItem from "./MapListItem";
import RoadView from './RoadView';

import * as MM from './MapMethod';
import * as SA from '../../../apis/SaegimAPI';

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],

      mv: null,

      rv: null,
      rvc: null,

      mapCenter: new kakao.maps.LatLng(37.50083104531534, 127.03694678811341),
      // mapCenter: null,
      level: 3,
      userCenter: null,
      usingUserCenter: false,

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
    // const _coords = (await getPosition()).coords
    // const _lat = _coords.latitude
    // const _lng = _coords.longitude

    const _container = document.getElementById("mapView");
    const _options = {
      center: this.state.mapCenter,
      // center: new kakao.maps.LatLng(_lat, _lng),
      level: this.state.level,
    }

    const _mapView = new kakao.maps.Map(_container, _options);
    kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLvCt)
    kakao.maps.event.addListener(_mapView, "center_changed", this.changeLvCt)
    kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    kakao.maps.event.addListener(_mapView, "dragend", this.handleDragEnd)

    await this.setStateAsync({ 
      mv: _mapView,
      bounds: _mapView.getBounds()
    })
    
    // get items from Backend with map center position
    const meter = SA.boundsToMeter({
      lat1: this.state.bounds.getSouthWest().getLat(),
      lon1: this.state.bounds.getSouthWest().getLng(),
      lat2: this.state.bounds.getNorthEast().getLat(),
      lon2: this.state.bounds.getNorthEast().getLng(),
    })

    let items = await SA.getSaegimNearMe({
      lat: this.state.mapCenter.getLat(),
      lng: this.state.mapCenter.getLng(),
      meter: meter
    })

    await this.setStateAsync({
      items: items
    })

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
    await this.getGeolocation(
      async (data) => {
        await this.setStateAsync({
          center: new kakao.maps.LatLng(data.coords.latitude, data.coords.longitude),
          userCenter: new kakao.maps.LatLng(data.coords.latitude, data.coords.longitude),
          userMarker: MM.myLocationMarker(new kakao.maps.LatLng(data.coords.latitude, data.coords.longitude)),
          usingUserCenter: true
        })
        _mapView.panTo(this.state.center)
        this.showMarker();
      },
      (err) => {
        console.warn(err)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    )

  }

  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "center_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "dragstart", this.handleDragStart)
    kakao.maps.event.removeListener(this.state.mv, "dragend", this.handleDragEnd)
  }

  changeLvCt = () => {
    this.setState({
      mapCenter: this.state.mv.getCenter(),
      level: this.state.mv.getLevel(),
    })
  }

  getGeolocation = async (resolve, reject, options) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options); 
  };

  handleDragStart = () => {
    (this.state.selected.status && this.closeItem());
    (this.state.usingUserCenter && this.setState({usingUserCenter: false}));
  };

  handleDragEnd = () => {
    (this.state.selected.status && this.closeItem());
  };

  tglUserCenter = async () => {
    await this.setStateAsync({usingUserCenter: !this.state.usingUserCenter});
    console.log(this.state.userCenter, this.state.usingUserCenter)
    if (this.state.userCenter && this.state.usingUserCenter) {
      this.state.mv.panTo(this.state.userCenter)
      this.showMarker()
    }
  }

  showMarker = () => {
    this.state.userMarker.setMap(null);
    this.state.userMarker.setMap(this.state.mv);
  }

  // handleBoundsChange = () => {
  //   this.setState({ bounds: this.state.mv.getBounds() });
  //   // this.closeItem();
  // };

  selectItem = (item) => {
    MM.panTo(this.state.mv, item.latitude, item.longitude)
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
    const rndLat = this.generateRandom(bounds.ka, bounds.ja)
    const rndLng = this.generateRandom(bounds.da, bounds.ia)
  
    const lastItem = this.state.items[this.state.items.length - 1];
    const newItem = {
      id: lastItem? lastItem.id + 1 : 1,
      title: `new item ${lastItem ? lastItem.id + 1: 1}`,
      contents: "안녕하세요. 코로나때문에 사람들을 많이 못 보니 쓸쓸하기도 하고 기분이 다운되네요. 다들 어떠신가요?",
      image: null,
      latitude: rndLat,
      longitude: rndLng,
      record: null,
      regDate: 1590650953712,
      secret: 0,
      tags: [],
      userId: 2006,
      userName: "aaaa",
      w3w: "무릎.한글.튤립",
    };
    this.setState({
      items: this.state.items.concat(newItem),
    });
  };

  generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  tglView = async () => {
    await this.setStateAsync({ roadView: !this.state.roadView })
  }

  // changeIcon = () => {
  //   return (
  //     <>
  //       <Map style={{visibility: 'hidden'}}/>
  //       <Zoom in={this.state.roadView} style={{position: 'absolute', zIndex: 12,}}><Map/></Zoom>
  //       <Zoom in={!this.state.roadView} style={{position: 'absolute', zIndex: 13,}}><Streetview/></Zoom>
  //     </>
  //   )
  // }

  render(){
    let _dir = 'left'
    if(this.context.curPage === '/write' || 
       this.context.curPage === '/login' || 
       this.context.curPage === '/signup'){
      _dir = 'right'
    }

    return(
      <StMapCont height={this.context.appHeight}>

        <SearchBar on={!this.state.roadView}/>

        <Slide in={true} direction={_dir} timeout={400}>
        <StViewCont>
          
          {/* <StRVBtn>
            <IconButton disableRipple onClick={this.tglView}>{this.changeIcon()}</IconButton>
          </StRVBtn> */}

          <Zoom in={!this.state.roadView} mountOnEnter unmountOnExit>
            <StRVBtn onClick={this.tglView}><Streetview/></StRVBtn>
          </Zoom>
          <Zoom in={!this.state.roadView} mountOnEnter unmountOnExit>
            <StCurBtn onClick={this.tglUserCenter}>{this.state.usingUserCenter ? <MyLocation color="primary"/> : <MyLocationTwoTone />}</StCurBtn>
          </Zoom>

          {
            !this.state.roadView && 
            <ButtonWrapper>
              <DefaultButton
                text="add random item"
                onClick={this.addRndItemInView}
              />
            </ButtonWrapper>
          }

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

          <MapView
            map={this.state.mv}
            status="list"
            items={this.state.items}
            selectItem={this.selectItem}
            hide={this.state.roadView}
          />

          {
            this.state.roadView &&
            <RoadView 
              center={this.state.mapCenter}
              items={this.state.items}
              hide={!this.state.roadView}
              tglView={this.tglView}
            />
          }

        </StViewCont>
        </Slide>
      </StMapCont>
    )
  }
} export default MapPage;
MapPage.contextType = Storage;


const StMapCont = styled(FlexColumn)`
  overflow: hidden;
  height: ${props => props.height}px;
  /* height: 100vh; */
`;

const StViewCont = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  background: gray;
`;

const StRVBtn = styled.div`
  position: absolute;
  z-index: 10;
  top: 64px;
  right: 8px;

  display: flex;
  padding: 8px;
  border: 2px solid gray;
  border-radius: 50%;
  background: #e6e6e6;

  svg{
    width: 24px;
    height: auto;
  }
`;

const StCurBtn = styled.div`
  position: absolute;
  z-index: 10;
  top: 120px;
  right: 8px;

  display: flex;
  padding: 8px;
  border: 2px solid gray;
  border-radius: 50%;
  background: #e6e6e6;

  svg{
    width: 24px;
    height: auto;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;

  bottom: 72px;

  display: flex;
  padding: 0 16px 0 16px;
`;

/*
data 양식

contents: "안녕하세요"
id: 2009
image: null
latitude: 37.50083104531534
longitude: 127.03694678811341
record: null
regDate: 1590650953712
secret: 0
tags: []
userId: 2006
userName: "aaaa"
w3w: "무릎.한글.튤립"
  
  */