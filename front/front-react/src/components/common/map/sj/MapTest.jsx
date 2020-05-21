/*global kakao*/
import React, { Component } from 'react';
import styled from 'styled-components';
import {FlexColumn} from '../../../../styles/DispFlex'


class MapTest extends Component {
  constructor(props){
    super(props)
    this.state = {
      roadView: false,
    }
  }

  componentDidMount(){
    const initialCenter = new kakao.maps.LatLng(37.506502, 127.053617);
    let container = document.getElementById("mapView");
    let options = {
      center: initialCenter, // 37.506502, 127.053617 역삼),
      level: 3,
    };

    this.map = new kakao.maps.Map(container, options);
  }

  toggleRoadView = () => {
    if (this.state.roadView) {
      this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        roadView: false,
      });
    } else {
      this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        roadView: true,
      });
    }
  };

  render(){
    return(
      <MapCont>
        <MapViewCont id='mapView'></MapViewCont>


      </MapCont>
    )
  }
} export default MapTest;


const MapCont = styled(FlexColumn)`
  background: yellow;
  height: 100vh;
`;

const MapViewCont = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
`;