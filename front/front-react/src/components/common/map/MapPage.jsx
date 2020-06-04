/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide} from '@material-ui/core';
import {FlexColumn} from '../../../styles/DispFlex';
import DefaultButton from "../buttons/DefaultButton";

// import { getPosition } from '../../../apis/GeolocationAPI';
import {Storage} from '../../../storage/Storage';
import SearchBar from "../search/SearchBar";
import SideMenu from "../menus/SideMenu";
import MapView from './MapView';
import MapListItem from "./MapListItem";
import RoadView from './RoadView';
import MapBtnSet from './MapBtnSet';
import CtoW from '../../../apis/w3w';
import * as SA from '../../../apis/SaegimAPI';

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],

      mv: null,

      mapCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화
      level: 4,
      userCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화

      geocoder: new kakao.maps.services.Geocoder(),
      addr: '',
      w3w: '',

      selected: {
        status: false,
        item: null,
      },
      bounds: null,

      roadView: false,
      filter: false,
      filterValues: {
        mine: false,
        startTime: '',
        endTime: '',
      }
    }

    this.actions = {
      tglView: this.tglView,
      goUserCenter: this.goUserCenter,
      tglFilter: this.tglFilter,
    }
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  async componentDidMount() {
    let _options = {
      center: this.state.mapCenter,
      level: this.state.level,
    }

    const _lat = sessionStorage.getItem('ARSG latitude');
    const _lng = sessionStorage.getItem('ARSG longitude');
    if(_lat && _lng){
      _options.center = new kakao.maps.LatLng(Number(_lat), Number(_lng))
    }

    await this.setStateAsync({ 
      mapCenter: _options.center,
      userCenter: _options.center,
    })

    this.getAddrW3W()
  }

  changeMapCenter = async (_mapCenter) => {
    await this.setStateAsync({ mapCenter: _mapCenter })
    this.getAddrW3W()
  };

  //행정 주소, w3w
  getAddrW3W = async () => {
    const _lat = this.state.mapCenter.getLat()
    const _lng = this.state.mapCenter.getLng()
    
    this.state.geocoder.coord2RegionCode(_lng, _lat, (result, status) => {
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
    const www = await CtoW(_lat, _lng);
    this.setState({
      w3w: www.data.words,
    });
  };

  tglView = async () => {
    await this.setStateAsync({ roadView: !this.state.roadView })
  };
  goUserCenter = () => {
    this.setState({ mapCenter: this.state.userCenter });
  };
  tglFilter = () => {
    this.setState({ filter: !this.state.filter })
  };
  handleFilter = (filterValues) => {

  }
  

  unsetUsingUserCenter = () => {
    this.setState({ usingUserCenter: false });
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

  render(){
    let _dir = 'left'
    if(this.context.curPage === '/write' || 
       this.context.curPage === '/login' || 
       this.context.curPage === '/signup'){
      _dir = 'right'
    }

    return(
      <StMapCont height={this.context.appHeight}>

        <SearchBar on={!this.state.roadView} addr={this.state.addr} w3w={this.state.w3w}/>

        <Slide in={true} direction={_dir} timeout={300} mountOnEnter unmountOnExit>
        <StViewCont>
          
          <MapBtnSet 
            roadView={this.state.roadView} 
            actions={this.actions}
          />

          <SideMenu filter 
            on={this.state.filter} 
            toggle={this.actions.tglFilter}
            isLogin={this.context.isLogin}
            handleFilter={this.handleFilter}
          />

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
          
          {this.state.roadView ?
            <RoadView 
              popModal={this.context.popModal}
              mapCenter={this.state.mapCenter}
              userCenter={this.state.userCenter}
              addr={this.state.addr}
              w3w={this.state.w3w}
              changeMapCenter={this.changeMapCenter}
              items={this.state.items}
              hide={!this.state.roadView}
              tglView={this.tglView}
            />
            :
            <MapView
              status="list"
              mapCenter={this.state.mapCenter}
              items={this.state.items}
              hide={this.state.roadView}
              usingUserCenter={this.state.usingUserCenter}
              userCenter={this.state.userCenter}
              changeMapCenter={this.changeMapCenter}
              unsetUsingUserCenter={this.unsetUsingUserCenter}
              unsetAll={this.unsetAll}
              selectItem={this.selectItem}
              closeItem={this.closeItem}
              fetchItem={this.fetchItem}
            />
          }

          {/* <MapView
            status="list"
            mapCenter={this.state.mapCenter}
            items={this.state.items}
            hide={this.state.roadView}
            usingUserCenter={this.state.usingUserCenter}
            userCenter={this.state.userCenter}
            changeMapCenter={this.changeMapCenter}
            unsetUsingUserCenter={this.unsetUsingUserCenter}
            unsetAll={this.unsetAll}
            selectItem={this.selectItem}
            closeItem={this.closeItem}
            fetchItem={this.fetchItem}
          />

          {
            this.state.roadView &&
            <RoadView 
              mapCenter={this.state.mapCenter}
              userCenter={this.state.userCenter}
              changeMapCenter={this.changeMapCenter}
              items={this.state.items}
              hide={!this.state.roadView}
              tglView={this.tglView}
            />
          } */}

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

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 72px;

  display: flex;
  padding: 0 16px 0 16px;
`;