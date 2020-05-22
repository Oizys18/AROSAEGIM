/*global kakao*/
import React, { Component } from "react";
import styled from "styled-components";
import DefaultButton from "../buttons/DefaultButton";
import MapItem from "./MapItem";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      myPos: null,
      roadView: false,
      level: 3,
      center: null,
      items: [],
      jsxItems: [],
      customOverlays: [],
      selected: null,
    };
    this.refs = [];
    this.map = null;
  }

  componentDidMount() {
    // load kakao api
    console.log('map mount')
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=2820969c0132ab6234a3db24b7a37921&autoload=false";
    document.head.appendChild(script);

    // initialize state after script is loaded
    script.onload = () => {
      kakao.maps.load(() => {
        const initialCenter = new kakao.maps.LatLng(33.450701, 126.570667);
        this.setState({center: initialCenter})

        let container = document.getElementById("Mymap");

        let options = {
          center: initialCenter, // 37.506502, 127.053617 역삼),
          level: this.state.level,
        };

        this.map = new window.kakao.maps.Map(container, options);

        kakao.maps.event.addListener(this.map, "zoom_changed", () => {
          this.setState({ level: this.map.getLevel() });
        });

        kakao.maps.event.addListener(this.map, "center_changed", () => {
          this.setState({ center: this.map.getCenter() });
        });

        this.initializeOverlay();
      });
    };
  }

  initializeOverlay = () => {
    let refArr = [];
    this.setState({
      items: dummyItems,
      jsxItems: dummyItems.map((el, index) => {
        const itemRef = React.createRef();
        const item = (
          <MapItem
            item={el}
            key={index}
            map={this.map}
            selectItem={this.selectItem}
            ref={itemRef}
          />
        );
        refArr.push(itemRef);
        return item;
      }),
    });

    this.refs = refArr;
  };

  toggleRoadView = (event) => {
    if (this.state.roadView) {
      this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        ...this.state,
        roadView: false,
      });
    } else {
      this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
      this.setState({
        ...this.state,
        roadView: true,
      });
    }
  };

  // TODO : basic map methods
  // 3. go to DetailView (route)
  // 4. go to RoadView (route)

  handleMyPosition = () => {
    console.log(this.state.myPos)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          myPos: position,
        })
      });
    } else {
      
    }
  }

  handleZoomIn = (event) => {
    const currentLevel = this.map.getLevel();
    this.map.setLevel(currentLevel - 1);
    this.setState({ ...this.state, level: currentLevel - 1 });
  };

  handleZoomOut = (event) => {
    const currentLevel = this.map.getLevel();
    this.map.setLevel(currentLevel + 1);
    this.setState({ ...this.state, level: currentLevel + 1 });
  };

  handleDetailView = (event) => {};

  handleRoadView = (event) => {};

  showItem = (event) => {
    this.refs.forEach((el) => el.current.showItem());
  };

  hideItem = (event) => {
    this.refs.forEach((el) => el.current.hideItem());
  };

  selectItem = (item) => {
    this.setState({
      selected: JSON.stringify(item),
    });
  };

  render() {
    return (
      <>
        <MapContainer>
          <MapContents id="Mymap"></MapContents>
          {this.state.jsxItems}
          <div>roadview status : {this.state.roadView ? "ON" : "OFF"}</div>
          <div>current map level: {this.state.level}</div>
          <div>current map center: {this.state.center? this.state.center.getLat() + ' ' + this.state.center.getLng(): ''}</div>
          <div>
            clicked Item : {this.state.selected ? this.state.selected : "none"}
          </div>
        </MapContainer>
        <MapTools>
          <DefaultButton text="where am i?" onClick={this.handleMyPosition} />
          <DefaultButton
            text={this.state.roadView ? "로드뷰 켜짐" : "로드뷰 꺼짐"}
            onClick={this.toggleRoadView}
          />
          <DefaultButton text="map level +" onClick={this.handleZoomIn} />
          <DefaultButton text="map level -" onClick={this.handleZoomOut} />
          <DefaultButton text="show item" onClick={this.showItem} />
          <DefaultButton text="hide item" onClick={this.hideItem} />
        </MapTools>
      </>
    );
  }
}

const MapContainer = styled.div`
  padding-top: 48px;

  width: 300px;
  height: 300px;
`;

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`;

const MapTools = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
`;

export default Map;

const dummyItems = [
  {
    title: "카카오",
    latlng: [33.450705, 126.570677],
  },
  {
    title: "생태연못",
    latlng: [33.450936, 126.569477],
  },
  {
    title: "텃밭",
    latlng: [33.450879, 126.56994],
  },
  {
    title: "근린공원",
    latlng: [33.451393, 126.570738],
  },
];
