/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide} from '@material-ui/core';
import {FlexColumn} from '../../../styles/DispFlex';
// import { getPosition } from '../../../apis/GeolocationAPI';
import {Storage} from '../../../storage/Storage';
import SearchBar from "../search/SearchBar";
import MapSearchList from './MapSearchList';
import SideMenu from "../menus/SideMenu";
import MapView from './MapView';
import RoadView from './RoadView';
import MapBtnSet from './MapBtnSet';
import CtoW from '../../../apis/w3w';
import * as SA from '../../../apis/SaegimAPI';
import * as GA from '../../../apis/GeolocationAPI';

class MapPage extends Component {
  constructor(props){
    const _today = new Date()
    super(props)
    this.state = {
      items: [],

      mapCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화
      level: 4,
      userCenter: new kakao.maps.LatLng(37.5012767241426, 127.039600248343), //멀티캠퍼스로 초기화

      geocoder: new kakao.maps.services.Geocoder(), //카카오 주소-좌표 변환 객체
      addr: '',
      w3w: '',
      place: new kakao.maps.services.Places(), //카카오 장소 검색 객체
      searchResult: [],
      searchCenter: null,
      handleSearch: this.handleSearch,

      bounds: null,

      roadView: false,
      filter: false,
      filterVal:{
        mine: false,
        term: 0,
        sTime: _today,
        eTime: _today,
      },
      applyFilter: false,
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

  tglView = () => {
    this.setState({ 
      roadView: !this.state.roadView,
      searchResult: []
    })
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

  handleInit = () => {
    const _today = new Date()
    this.setState(prevState => ({
      filterVal: {...prevState.filterVal,
        mine: false,
        term: 0,
        sTime: _today,
        eTime: _today,
      },
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
    this.tglFilter()
  }

  handleSearch = (select, value) => {
    if(select === '장소'){
      this.state.place.keywordSearch(value, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          this.setState({
            searchResult: data
          })
        } 
        else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          this.context.popModal(`검색 결과가\n존재하지 않습니다.`, 'no place', 'alert')
        } 
        else if (status === kakao.maps.services.Status.ERROR) {
          this.context.popModal(`검색 중\n오류가 발생했습니다`, 'no place', 'alert')
        }
      })
    }
  }
  initSearch = () => {
    this.setState({
      searchResult: [],
      searchCenter: null,
    })
  }
  searchCenter = (_center) => {
    this.setState({
      searchCenter: _center
    })
    this.changeMapCenter(_center)
  }

  fetchItem = async (bounds, center) => {
    const meter = SA.boundsToMeter({
      lat1: bounds.getSouthWest().getLat(),
      lon1: bounds.getSouthWest().getLng(),
      lat2: bounds.getNorthEast().getLat(),
      lon2: bounds.getNorthEast().getLng(),
    })

    // let items = await SA.getSaegimNearMe({
    //   lat: center.getLat(),
    //   lng: center.getLng(),
    //   meter: meter
    // })

    let items = null;
    let _userid = 0
    if(this.state.filterVal.mine) _userid = this.context.userInfo.id
    if(this.state.filterVal.sTime.getTime() !== this.state.filterVal.eTime.getTime()){
      items = await SA.getSaegimByFilter({
        lat: center.getLat(),
        lng: center.getLng(),
        meter: meter,
        sTime: this.state.filterVal.sTime.getTime(),
        eTime: this.state.filterVal.eTime.getTime(),
        userid: _userid
      })
    }
    else{
      items = await SA.getSaegimByFilter({
        lat: center.getLat(),
        lng: center.getLng(),
        meter: meter,
        sTime: 0,
        eTime: 0,
        userid: _userid
      })
    }
    this.setState({
      items: items
    })

    // api로 불러온 객체에 새로운 item이 나왔을 때만 state 변경
    // const itemsDiff = items.filter(el => {
    //   const itemIndex = this.state.items.findIndex(stateItem => el.id === stateItem.id)
    //   return itemIndex === -1 ? true : false;
    // });

    // if (itemsDiff.length > 0) {
    //   this.setState({
    //     items: this.state.items.concat(itemsDiff)
    //   })
    // }
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

        <SearchBar 
          on={!this.state.roadView} 
          addr={this.state.addr} 
          w3w={this.state.w3w} 
          handleSearch={this.handleSearch}
          searchCenter={this.state.searchCenter}
        />
        <MapSearchList 
          on={this.state.searchResult.length > 0 && !this.state.roadView} 
          searchResult={this.state.searchResult} 
          initSearch={this.initSearch}
          searchCenter={this.searchCenter}
        />
        

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
              items={this.state.items.filter(el=> el.secret === 0 || el.userId === this.context.userInfo.id)}
              on={!this.state.roadView}
              tglView={this.tglView}
              fetchItem={this.fetchItem}
              filterVal={this.state.filterVal}
            />
            :
            <MapView
              status="list"
              mapCenter={this.state.mapCenter}
              mapLevel={this.state.level}
              items={this.state.items.filter(el=> el.secret === 0 || el.userId === this.context.userInfo.id)}
              hide={this.state.roadView}
              userCenter={this.state.userCenter}
              changeMapCenter={this.changeMapCenter}
              changeMapLevel={this.changeMapLevel}
              fetchItem={this.fetchItem}
              filterVal={this.state.filterVal}

              searchCenter={this.state.searchCenter}
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