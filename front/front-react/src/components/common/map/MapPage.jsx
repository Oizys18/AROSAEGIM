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
import * as GA from '../../../apis/GeolocationAPI';

class MapPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      items: [],

      mapCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화
      level: 4,
      userCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화

      geocoder: new kakao.maps.services.Geocoder(),
      addr: '',
      w3w: '',

      bounds: null,

      roadView: false,
      filter: false,
      filterVal:{
        mine: false,
        term: 24,
        sTime: this.initSTime(),
        eTime: new Date(),
      }
    }

    this.actions = {
      tglView: this.tglView,
      goUserCenter: this.goUserCenter,
      tglFilter: this.tglFilter,
    }

    this.handleFilter = {
      handleInit: this.handleInit,
      handleMine: this.handleMine,
      handleTerm: this.handleTerm,
      handleSTime: this.handleSTime,
      handleETime: this.handleETime,
      handleApply: this.handleApply
    }
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  async componentDidMount() {
    await this.initMapPage()
    this.getAddrW3W()
  }
  componentWillUnmount() {
    this.context.handleCurMap(this.state.mapCenter, this.state.level)
  }

  initMapPage = async () => {
    let _center = this.state.mapCenter;

    // const _lat = sessionStorage.getItem('ARSG latitude');
    // const _lng = sessionStorage.getItem('ARSG longitude');
    // if(_lat && _lng){
    //   _center = new kakao.maps.LatLng(Number(_lat), Number(_lng))
    // }
    const _latlng = GA.getPositionFromSession()
    _center = new kakao.maps.LatLng(_latlng[0], _latlng[1])

    await this.setStateAsync({ 
      mapCenter: this.context.curMapCenter ? this.context.curMapCenter : _center,
      userCenter: _center,
      level: this.context.curMapLevel ? this.context.curMapLevel : this.state.level,
    })
  };

  changeMapCenter = async (_mapCenter) => {
    await this.setStateAsync({ mapCenter: _mapCenter })
    this.getAddrW3W()
  };
  changeMapLevel = (_level) => {
    this.setState({ level: _level })
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

  // tglView = async () => {
  //   await this.setStateAsync({ roadView: !this.state.roadView })
  // };
  tglView = () => {
    this.setState({ roadView: !this.state.roadView })
  };
  goUserCenter = () => {
    GA.getPositionAsync()
    .then((position) => { 
      GA.getPositionSuccess(position) 
    })
    .then(() => {
      const _latlng = GA.getPositionFromSession()
      const _center = new kakao.maps.LatLng(_latlng[0], _latlng[1])

      this.setState({ 
        mapCenter: _center,
        userCenter: _center
      });
    })
    .catch((err) => { 
      this.context.popModal(GA.getPositionFail(err), 'geolocation error', 'alert') 
    });
  };
  tglFilter = () => {
    this.setState({ filter: !this.state.filter })
  };


  initSTime = () => {
    const _today = new Date()
    const _sTime = new Date()
    _sTime.setHours(_today.getHours() - 24)
    return _sTime
  }
  handleInit = () => {
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        term: 24,
        sTime: this.initSTime(),
        eTime: new Date(),
      }
    }))
  }
  handleMine = () => {
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        mine: !this.state.filterVal.mine
      }
    }))
  }
  handleSTime = (_sTime) => {
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        sTime: _sTime,
      }
    }))
  }
  handleETime = (_eTime) => {
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        eTime: _eTime,
      }
    }))
  }
  handleTerm = (_term) => {
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        term: _term,
      }
    }))
  }
  handleApply = async () => {
    const _sT = this.state.filterVal.sTime.getTime()
    const _eT = this.state.filterVal.eTime.getTime()
    console.log(_sT, _eT)
  }

  // showMarker = () => {
  //   this.state.userMarker.setMap(null);
  //   this.state.userMarker.setMap(this.state.mv);
  //   kakao.maps.event.addListener(this.state.userMarker, "click", () => console.log('hello'))
  // }

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

    // api로 불러온 객체에 새로운 item이 나왔을 때만 state 변경
    const itemsDiff = items.filter(el => {
      const itemIndex = this.state.items.findIndex(stateItem => el.id === stateItem.id)
      return itemIndex === -1 ? true : false;
    });

    if (itemsDiff.length > 0) {
      this.setState({
        items: this.state.items.concat(itemsDiff)
      })
    }
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

        <SearchBar on={!this.state.roadView} addr={this.state.addr} w3w={this.state.w3w}/>

        <Slide in={true} direction={_dir} timeout={300} mountOnEnter unmountOnExit>
        <StViewCont>
          
          <MapBtnSet 
            isUC={this.state.mapCenter === this.state.userCenter}
            roadView={this.state.roadView} 
            actions={this.actions}
            isUserCenter={this.state.mapCenter===this.state.userCenter}
          />

          <SideMenu filter
            on={this.state.filter} 
            toggle={this.actions.tglFilter}
            isLogin={this.context.isLogin}
            filterVal={this.state.filterVal}
            handleFilter={this.handleFilter}
          />
          
          {this.state.roadView ?
            <RoadView 
              popModal={this.context.popModal}
              mapCenter={this.state.mapCenter}
              userCenter={this.state.userCenter}
              addr={this.state.addr}
              w3w={this.state.w3w}
              changeMapCenter={this.changeMapCenter}
              items={this.state.items}
              on={!this.state.roadView}
              tglView={this.tglView}
            />
            :
            <MapView
              status="list"
              mapCenter={this.state.mapCenter}
              mapLevel={this.state.level}
              items={this.state.items}
              hide={this.state.roadView}
              userCenter={this.state.userCenter}
              changeMapCenter={this.changeMapCenter}
              changeMapLevel={this.changeMapLevel}
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