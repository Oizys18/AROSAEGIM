/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import DefaultButton from '../buttons/DefaultButton';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      map: Object(),
      roadView: false,
      level: 3,
    };
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=78ea54eeb30cab7c0130ac4ab15d3939&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: this.state.level,
        };

        const map = new window.kakao.maps.Map(container, options);
        this.setState({
          map: map
        });
      })
    }
  }

  toggleRoadView = (event) => {
    console.log(event);
    if (this.state.roadView) {
      this.state.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        ...this.state,
        roadView: false,
      });
    } else {
      this.state.map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        ...this.state,
        roadView: true,
      });
    }
  }

  // TODO : basic map methods
  // 1. handle zoom in , out event
  // 2. show item on map coordinate with <MapItem />
  // 3. go to DetailView (route)
  // 4. go to RoadView (route)
  handleZoomIn = (event) => {}

  handleZoomOut = (event) => {}

  handleDetailView = (event) => {}

  handleRoadView = (event) => {}

  render() {
    return (
      <MapContainer>
        <h1>지도컴포넌트</h1>
        <DefaultButton text={this.state.roadView? "로드뷰 켜짐" : "로드뷰 꺼짐"} onClick={this.toggleRoadView}></DefaultButton>
        <div>roadview status : {this.state.roadView? "ON" : "OFF"}</div>
        <MapContents id="Mymap"></MapContents>
      </MapContainer>
    );
  }
}

const MapContainer = styled.div`
  width: 300px;
  height: 300px;
`

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`

export default Map;