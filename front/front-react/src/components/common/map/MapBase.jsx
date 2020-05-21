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
      mapCenter: center,
      userCenter: null,
      level: level,
    };
    this.map = null;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    kakao.maps.event.removeListener(
      this.map,
      "zoom_changed",
      this.handleZoomChange
    );
    kakao.maps.event.removeListener(
      this.map,
      "center_changed",
      this.handleCenterChange
    );
  }

  // TODO : navigator.geolocation.watchLocation() 확인하기
  // https://developer.mozilla.org/ko/docs/WebAPI/Using_geolocation
  initMap = () => {
    let center = { lat: 37.506502, lng: 127.053617 };
    let userCenter = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.warn("error", error);
        }
      );
    } else {
      alert("위치 정보를 사용할 수 없습니다. 브라우저 설정을 확인해주세요.");
      center = { lat: 37.506502, lng: 127.053617 };
    }
    this.setState({ mapCenter: center, userCenter: userCenter });
    this.fetchKakaoAPI();
  };

  // 카카오 지도 불러오기
  fetchKakaoAPI = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API}&autoload=false`;
    document.head.appendChild(script);

    // initialize state after script is loaded
    script.onload = () => {
      kakao.maps.load(() => {
        const initialCenter = new kakao.maps.LatLng(
          this.state.mapCenter.lat,
          this.state.mapCenter.lng
        );
        const initialLevel = this.state.level;

        this.setState({ center: initialCenter, level: initialLevel });

        let container = document.getElementById("MapBase");
        let options = {
          center: initialCenter, // 37.506502, 127.053617 역삼),
          level: initialLevel,
        };

        this.map = new kakao.maps.Map(container, options);

        kakao.maps.event.addListener(
          this.map,
          "zoom_changed",
          this.handleZoomChange
        );
        kakao.maps.event.addListener(
          this.map,
          "center_changed",
          this.handleCenterChange
        );

        const getGeolocation = this.getGeolocation();
        getGeolocation.then((data) => {
            const userCenter = {
              lat: data.coords.latitude,
              lng: data.coords.longitude,
            };
            this.setCenter(userCenter);
            this.setState({ userCenter: userCenter });
          })
          .catch((err) =>
            console.warn(
              "위치 정보를 가져오는데 실패했습니다. 브라우저 설정을 확인해주세요.",
              err
            )
          );
        
        if (this.status === 'list') {
          this.createOverlay();
        } else if (this.status === 'point') {
          // show point overlay
        } else {
          // do nothing
        }

      });
    };
  };

  getGeolocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  createOverlay = () => {
    let itemRefs = [];
    const jsxItems = this.state.items.map((el, index) => {
      const itemRef = React.createRef();
      const item = (
        <MapItem
          ref={itemRef}
          map={this.map}
          item={el}
          key={index}
          selectItem={this.props.selectItem}
        />
      );
      itemRefs.push(itemRef);
      return item;
    });
    this.setState({
      itemRefs: itemRefs,
      jsxItems: jsxItems,
    });
  };

  // move directly to given center
  setCenter = (center) => {
    console.log("set new center to ", center);
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.map.setCenter(targetCenter);
  };

  // move smoothly to given center
  panTo = (center) => {
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.map.panTo(targetCenter);
  };

  handleZoomChange = () => {
    this.props.onZoomChange();
    this.setState({ level: this.map.getLevel() });
  };

  handleCenterChange = () => {
    this.props.onCenterChange();
    this.setState({ mapCenter: this.map.getCenter() });
  };

  showOverlay = () => {};

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
        <div>
          geolocation {!!this.state.userCenter ? "enabled" : "disabled"}
        </div>
      </>
    );
  }
}

const MapBaseContainer = styled.div`
  width: 300px;
  height: 300px;
`;
