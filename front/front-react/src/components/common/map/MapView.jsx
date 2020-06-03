/* global kakao */
import React, { Component } from "react";
import styled from "styled-components";
import MapItem from "./MapItem";
import * as MM from "./MapMethod";

// import MapMarker, {MarkerConfig} from "./MapItemTest";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      mv: null,
      userMarker: null,
    };
  }

  setStateAsync(state) {
    return new Promise(resolve => { this.setState(state, resolve) })
  }

  async componentDidMount() {
    await this.initMapView();
    await this.fetchItem();
    this.overlayMarkers();
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.overlayMarkers();
    (!!this.props.userCenter && this.props.usingUserCenter && !this.state.userMarker && this.showUserCenter())
    if (prevProps.usingUserCenter !== this.props.usingUserCenter){console.log(prevProps, this.props, this.state)}
    if (prevProps.usingUserCenter !== this.props.usingUserCenter && this.props.usingUserCenter && !!this.state.userMarker) {
      this.state.userMarker.setPosition(this.props.userCenter)
      this.state.mv.panTo(this.props.userCenter)
      // MM.panTo(this.state.mv, this.props.userCenter.getLat(), this.props.userCenter.getLng())
    }
  }

  componentWillUnmount(){
    kakao.maps.event.removeListener(this.state.mv, "zoom_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "center_changed", this.changeLvCt)
    kakao.maps.event.removeListener(this.state.mv, "dragstart", this.handleDragStart)
    kakao.maps.event.removeListener(this.state.mv, "dragend", this.handleDragEnd)
  }

  // 지도 초기화
  initMapView = () => {
    const _cont = document.getElementById('mapView');
    const _options = {
      center: this.props.center,
      level: 3,
    }
    const _mapView = new kakao.maps.Map(_cont, _options)
    kakao.maps.event.addListener(_mapView, "zoom_changed", this.changeLvCt)
    kakao.maps.event.addListener(_mapView, "center_changed", this.changeLvCt)
    kakao.maps.event.addListener(_mapView, "dragstart", this.handleDragStart)
    kakao.maps.event.addListener(_mapView, "dragend", this.handleDragEnd)

    this.setState({
      mv: _mapView
    })
  }

  changeLvCt = () => {
    this.setState({
      mapCenter: this.state.mv.getCenter(),
      level: this.state.mv.getLevel(),
    })
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
    MM.panTo(this.state.mv, userCenterPos.latitude, userCenterPos.longitude)
    const markerConfig = MM.MarkerConfig(userCenterPos, "user")
    const userMarker = new kakao.maps.Marker(markerConfig);
    userMarker.setMap(this.state.mv)
    this.setState({userMarker: userMarker})
  }

  handleDragStart = () => {
    // (this.state.selected.status && this.closeItem());
    (this.props.usingUserCenter && this.props.unsetUsingUserCenter());
  };

  handleDragEnd = () => {
    this.fetchItem();
    // (this.state.selected.status && this.closeItem());
    // (this.state.usingUserCenter && this.setState({usingUserCenter: false}));
  };

  overlayMarkers = () => {
    const markers = this.props.items.map((el) => {
      const marker = new kakao.maps.Marker(MM.MarkerConfig(el));// new MapMarker(el);
      marker.setMap(this.state.mv)
      marker.item = el
      kakao.maps.event.addListener(marker, "click", () => {
        console.log(marker.item,'marker clicked');
        this.selectItem(marker.item)
      })
      return marker
    })
    this.markers = markers;
  }

  
  overlayItems = () => {
    const itemRefs = [];
    const items = this.props.items.map((el, index) => {
      const itemRef = React.createRef();
      const item = (
        <MapItem
          ref={itemRef}
          map={this.props.map}
          item={el}
          key={el.id}
          selectItem={this.selectItem}
        />
      );
      itemRefs.push(itemRef);
      return item;
    });
    this.itemRefs = itemRefs;
    this.items = items;
    return items
  };

  selectItem = (item) => {
    this.props.selectItem(item);
    this.props.unsetUsingUserCenter();
    MM.panTo(this.state.mv, item.latitude, item.longitude)
  };

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
      </>
    );
  }
}
export default MapView;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;
