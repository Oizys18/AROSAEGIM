/* global kakao */
import React, { Component } from "react";
import styled from "styled-components";
import { Storage } from  '../../../storage/Storage';
import MapItem from "./MapItem";
import * as MM from "./MapMethod";
import MapListItem from "./MapListItem";
import DefaultButton from "../buttons/DefaultButton";

// import MapMarker, {MarkerConfig} from "./MapItemTest";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      mv: null,
      mapProjection: null,
      userMarker: null,
      clusterer: null,
      selectedList: {
        status: false,
        items: [],
      },
      selected: {
        status: false,
        item: {id:-1},
      },
    };
    this.markers = []
  }

  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  async componentDidMount() {
    await this.initMapView();
    await this.fetchItem();
    // (this.props.userCenter && this.showUserCenter())
    ( !sessionStorage.getItem('ARSG no GPS') && this.showUserCenter() )
    this.overlayMarkers();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.items !== this.props.items) {
      // console.log('re-rendering markers')
      this.overlayMarkers();
    }

    // 현위치로 가기 눌렀을 때
    if(prevProps.mapCenter !== this.props.mapCenter && this.props.mapCenter === this.props.userCenter){
      this.state.mv.panTo(this.props.mapCenter);
      // console.log('map is in user center')
      (this.state.userMarker && this.state.userMarker.setPosition(this.props.userCenter));
    }

    // 페이지 전환시 지도 중심, 레벨 유지
    if(prevProps.mapCenter !== this.props.mapCenter && 
      this.context.curMapCenter === this.props.mapCenter && 
      this.props.mapCenter !== this.props.userCenter){
      this.state.mv.panTo(this.props.mapCenter);
      this.state.mv.setLevel(this.props.mapLevel);
    }

    if(prevProps.filterVal !== this.props.filterVal){
      this.fetchItem()
    }

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
    // kakao.maps.event.removeListener(this.state.mv, "center_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLv)
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
    kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLv)
    kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    kakao.maps.event.addListener(_mapView, "dragend", this.handleDragEnd)

    const _mapProjection = _mapView.getProjection()

    const _clusterer = new kakao.maps.MarkerClusterer({
      map: _mapView, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 1, // 클러스터 할 최소 지도 레벨 
      disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });

    kakao.maps.event.addListener(_clusterer, 'clusterclick', this.handleCluster);

    this.setState({
      mv: _mapView,
      mapProjection: _mapProjection,
      clusterer: _clusterer,
    })
  }

  changeLv = () => {
    this.props.changeMapLevel(this.state.mv.getLevel())
  }

  fetchItem = () => {
    const bounds = this.state.mv.getBounds();
    const center = this.state.mv.getCenter();
    this.props.fetchItem(bounds, center);
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

  handleDragStart = () => {
    // (this.state.selected.status && this.closeItem());
    (this.props.usingUserCenter && this.props.unsetUsingUserCenter());
    (this.state.selectedList.status && this.unsetSelectedList());
    this.closeItem();
  };

  handleDragEnd = () => {
    this.props.changeMapCenter(this.state.mv.getCenter())
    this.fetchItem();
    // (this.state.selected.status && this.closeItem());
    // (this.state.usingUserCenter && this.setState({usingUserCenter: false}));
  };

  handleCluster = (cluster) => {
    const items = cluster.getMarkers()
    const selectedList = {
      status: true,
      items: items.map(marker=>{
        const item = this.props.items.find(el => marker.itemId === el.id);
        return item === undefined ? emptyItem : item
      })
    }
    this.setState({selectedList: selectedList})

    const cluster_lat = cluster.getCenter().getLat();
    const cluster_lng = cluster.getCenter().getLng();

    MM.panToWithOffset(this.state.mv, this.state.mapProjection, cluster_lat, cluster_lng)
  }

  overlayMarkers = async () => {
    // await this.markers.forEach(el=>el.setMap(null));
    const markers = this.props.items.map((el) => {
      const marker = new kakao.maps.Marker(MM.MarkerConfig(el));// new MapMarker(el);
      marker.setMap(this.state.mv)
      marker.itemId = el.id
      kakao.maps.event.addListener(marker, "click", () => {
        console.log(marker.itemId,'marker clicked');
        // this.selectItem(marker.itemId)
        this.selectListwithID([marker.itemId])
      })
      return marker
    })
    this.markers = markers;
    this.state.clusterer.clear();
    this.state.clusterer.addMarkers(markers);
  }

  selectItem = (itemId) => {
    // this.props.selectItem(item);
    const item = this.props.items.find(el => itemId === el.id)
    if (item === undefined) {
      return;
    }
    this.setState({selected: { status: true, item: item }})
  };

  closeItem = () => {
    this.setState({selected: { status: false, item: {id:-1} }})
  }

  prevItem = () => {
    const currentIndex = this.state.selectedList.items.indexOf(this.state.selected.item);
    const prevIndex =
      currentIndex === 0 ? this.state.selectedList.items.length - 1 : currentIndex - 1;
    this.selectItem(this.state.selectedList.items[prevIndex].id);
  };

  nextItem = () => {
    const currentIndex = this.state.selectedList.items.indexOf(this.state.selected.item);
    const nextIndex =
      currentIndex === this.state.selectedList.items.length - 1 ? 0 : currentIndex + 1;
    this.selectItem(this.state.selectedList.items[nextIndex].id);
  };

  selectListwithID = (itemIdList) => {
    // this.props.selectItem(item);
    const items = itemIdList.map(itemId => this.props.items.find(el=>el.id === itemId))
    if (items === undefined) {
      return;
    }

    // get average position of selected items
    const centerPos = items.reduce((acc, current) => {
      return {
        latitude: acc.latitude + current.latitude / items.length,
        longitude: acc.longitude + current.longitude / items.length,
      }
    })

    this.setState({selectedList: { status: true, items: items }})
    MM.panToWithOffset(this.state.mv, this.state.mapProjection, centerPos.latitude, centerPos.longitude)
  };

  overlaySelectedList = () => {
    return this.state.selectedList.items.map(el=> <MapItem key={el.id} item={el} selectItem={this.selectItem} closeItem={this.closeItem} selected={el.id === this.state.selected.item.id}/>)
  }

  unsetSelectedList = () => {
    this.setState({selectedList: {status: false, items: []}})
  }

  render() {
    return (
      <>
        <StView id="mapView" hidden={this.props.hide}>
        {/* {this.props.status === 'list' && this.overlayItems()} */}
          {/* <>{this.props.status === 'list' && this.props.items.map((el, index) => {
            return <MapItem
            map={this.props.map}
            item={el}
            key={index}
            selectItem={this.selectItem}
          />})}</> */}
        </StView>
        {this.state.selectedList.status && 
          <StListCont>
            <StList>
              {this.overlaySelectedList()}
            </StList>
          </StListCont>
        }
        {/* {this.state.selected.status && 
          <>
            {this.state.selectedList.status &&
              <ButtonWrapper>
                <DefaultButton text="prev Item" onClick={this.prevItem} />
                <DefaultButton text="next Item" onClick={this.nextItem} />
              </ButtonWrapper>
            } 
            <MapListItem
              item={this.state.selected.item}
              closeItem={this.closeItem}
            />
          </>
        } */}
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

const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 72px;

  display: flex;
  padding: 0 16px 0 16px;
`;

const emptyItem = {
  contents: "emptyItem",
  id: 0,
  image: null,
  latitude: 37.50083104531534,
  longitude: 127.03694678811341,
  record: null,
  regDate: 1590650953712,
  secret: 0,
  tags: [],
  userId: 0,
  userName: "empty",
  w3w: "empty"
}