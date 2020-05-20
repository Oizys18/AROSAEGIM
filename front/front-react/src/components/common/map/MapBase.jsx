/* global kakao */
import React, { Component } from "react";
import styled from "styled-components";
import MapItem from "./MapItem";

// 역할 1 map 띄워주기
// 역할 2 geolocaion api 관리
// 역할 3 아이템 리스트가 들어오면 아이템 띄워주기

export default class MapBase extends Component {
  constructor(props) {
    super(props);
    const center = { lat: 33.450701, lng: 126.570667 };
    const level = 3;
    this.state = {
      status: props.status,
      items: props.items,
      jsxItems: [],
      itemRefs: [],
      center: center,
      level: level,
    };
    this.map = props.map;
  }

  componentDidMount() {
    this.getLocation();
  }

  // TODO : navigator.geolocation.watchLocation() 확인하기
  // https://developer.mozilla.org/ko/docs/WebAPI/Using_geolocation
  // 아래와 같이 카카오 api를 불러오는 것은 카카오 api를
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    } else {
      alert("위치 정보를 사용할 수 없습니다. 브라우저 설정을 확인해주세요.");
      this.setState({
        center: { lat: 37.506502, lng: 127.053617 },
      });
    }
    this.fetchKakaoAPI();
  };

  // 카카오 지도 불러오기
  fetchKakaoAPI = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=78ea54eeb30cab7c0130ac4ab15d3939&autoload=false";
    document.head.appendChild(script);

    // initialize state after script is loaded
    script.onload = () => {
      kakao.maps.load(() => {
        const initialCenter = new kakao.maps.LatLng(
          this.state.center.lat,
          this.state.center.lng
        );
        const initialLevel = this.state.level;

        this.setState({ center: initialCenter, level: initialLevel });

        let container = document.getElementById("MapBase");
        let options = {
          center: initialCenter, // 37.506502, 127.053617 역삼),
          level: initialLevel,
        };

        this.map = new window.kakao.maps.Map(container, options);

        kakao.maps.event.addListener(this.map, "zoom_changed", () => {
          this.setState({ level: this.map.getLevel() });
        });

        kakao.maps.event.addListener(this.map, "center_changed", () => {
          this.setState({ center: this.map.getCenter() });
        });

        this.createOverlay();
      });
    };
  };

  createOverlay = () => {
    let itemRefs = [];
    const jsxItems = this.state.items.map((el, index) => {
      const itemRef = React.createRef();
      const item = <MapItem ref={itemRef} map={this.map} item={el} key={index} selectItem={this.props.selectItem} />;
      itemRefs.push(itemRef);
      return item;
    });
    this.setState({
      itemRefs: itemRefs,
      jsxItems: jsxItems,
    });
  };

  showOverlay = () => {
  };

  hideOverlay = (target) => {
    if (target) {
      console.log("hide everything but this one", target);
    } else {
      console.log("hide all items");
    }
  };

  render() {
    return (
      <>
        <MapBaseContainer id="MapBase" />
        {this.state.jsxItems}
      </>
    );
  }
}

const MapBaseContainer = styled.div`
  width: 300px;
  height: 300px;
`;
