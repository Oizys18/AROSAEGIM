/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Zoom, Slide} from '@material-ui/core';
import {Streetview, MyLocation, MyLocationTwoTone} from '@material-ui/icons';
import {FlexColumn} from '../../../styles/DispFlex';
import DefaultButton from "../buttons/DefaultButton";

// import { getPosition } from '../../../apis/GeolocationAPI';
import {Storage} from '../../../storage/Storage';
import SearchBar from "../search/SearchBar";
import MapView from './MapView';
import MapListItem from "./MapListItem";
import RoadView from './RoadView';

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
      // mapCenter: new kakao.maps.LatLng(sessionStorage.getItem('ARSG latitude'), sessionStorage.getItem('ARSG longitude')),
      
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

  async componentDidMount() {
    const _lat = sessionStorage.getItem('ARSG latitude');
    const _lng = sessionStorage.getItem('ARSG longitude');
    // console.log(Number(_lat), Number(_lng), _lng);
    const _options = {
      // center: this.state.mapCenter,
      center: new kakao.maps.LatLng(Number(_lat), Number(_lng)),
      level: this.state.level,
    }
    await this.setStateAsync({ 
      mapCenter: _options.center,
      userCenter: _options.center
    })
  }

  tglUserCenter = () => {
    this.setState({usingUserCenter: !this.state.usingUserCenter});
  }

  unsetUsingUserCenter = () => {
    this.setState({usingUserCenter: false});
  }

  unsetAll = () => {
    this.setState({
      usingUserCenter: false,
      selected: {
        status: false,
        item: null,
      },
    })
  }

  showMarker = () => {
    this.state.userMarker.setMap(null);
    this.state.userMarker.setMap(this.state.mv);
    kakao.maps.event.addListener(this.state.userMarker, "click", () => console.log('hello'))
  }

  fetchItem = async (bounds, center) => {
    const meter = SA.boundsToMeter({
      lat1: bounds.getSouthWest().getLat(),
      lon1: bounds.getSouthWest().getLng(),
      lat2: bounds.getNorthEast().getLat(),
      lon2: bounds.getNorthEast().getLng(),
    })

    let items = await SA.getSaegimNearMe({
      lat: center.getLat(),
      lng: center.getLng(),
      meter: meter
    })

    this.setState({
      items: items
    })
  }

  selectItem = (item) => {
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

        <Slide in={true} direction={_dir} timeout={300} mountOnEnter unmountOnExit>
        <StViewCont>
          <Zoom in={!this.state.roadView} mountOnEnter unmountOnExit>
            <StRVBtn onClick={this.tglView}><Streetview/></StRVBtn>
          </Zoom>
          <Zoom in={!this.state.roadView} mountOnEnter unmountOnExit>
            <StCurBtn onClick={this.tglUserCenter}>{this.state.usingUserCenter ? <MyLocation color="primary"/> : <MyLocationTwoTone />}</StCurBtn>
          </Zoom>

          {
            false && !this.state.roadView && 
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
            status="list"
            center={this.state.mapCenter}
            items={this.state.items}
            hide={this.state.roadView}
            usingUserCenter={this.state.usingUserCenter}
            userCenter={this.state.userCenter}
            unsetUsingUserCenter={this.unsetUsingUserCenter}
            unsetAll={this.unsetAll}
            selectItem={this.selectItem}
            closeItem={this.closeItem}
            fetchItem={this.fetchItem}
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