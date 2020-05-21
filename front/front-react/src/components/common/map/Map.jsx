/*global kakao*/
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import DefaultButton from '../buttons/DefaultButton';
import MapItem from './MapItem';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      roadView: false,
      level: 3,
      items: [],
      jsxItems: [],
      customOverlays: [],
    };
    this.map = Object();
  }

  componentDidMount() {
    // load kakao api
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=2820969c0132ab6234a3db24b7a37921&autoload=false";
    document.head.appendChild(script);

    // initialize state after script is loaded
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");

        let options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),// 37.506502, 127.053617),
          level: this.state.level,
        };

        this.map = new window.kakao.maps.Map(container, options);

        // load item from dummy array : change to API later
        const items = dummyItems.map((el,index) => {
          return {
            title: el.title,
            latlng: new kakao.maps.LatLng(el.latlng[0], el.latlng[1]),
            jsxElement: <MapItem text={el.title} key={index} />,
          }
        })

        this.setState({
          items: items,
        });
      })
    }
  }

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
  }

  // TODO : basic map methods
  // 2. show item on map coordinate with <MapItem />
  // 3. go to DetailView (route)
  // 4. go to RoadView (route)

  handleZoomIn = (event) => {
    const currentLevel = this.map.getLevel();
    this.map.setLevel(currentLevel - 1);
    this.setState({...this.state, level: currentLevel - 1});
  }

  handleZoomOut = (event) => {
    const currentLevel = this.map.getLevel();
    this.map.setLevel(currentLevel + 1);
    this.setState({...this.state, level: currentLevel + 1});
  }

  handleDetailView = (event) => {}

  handleRoadView = (event) => {}

  // check:
  // 이벤트핸들러를 저 객체에 집어넣을 수 있는가?
  // -> 있다. 하지만 컴포넌트로 해야 state를 건드릴 수 있지 않을까
  //    react dom 을 이용해서 서버사이드 렌더링 함수를 사용하는 것도 마음에 걸립니다

  clickEvent = (event) => {
    event.preventDefault();
    console.log('event called : ');
    console.log(event);
    console.log(event.target);
  }

  showItem = (event, inputItems) => {
    const items = this.state.items;
    let customOverlays = [];

    if (this.state.customOverlays.length !== 0) {
      this.hideItem();
    }

    // make an array of customOverlay from data
    items.forEach(el => {
      // wrap with div element, add click event to container
      const itemContainer = document.createElement('div'); 
      const item = ReactDOMServer.renderToString(el.jsxElement);
      itemContainer.innerHTML = item;
      itemContainer.addEventListener('click', this.clickEvent);

      var customOverlay = new kakao.maps.CustomOverlay({
        position: el.latlng,
        content: itemContainer,
        yAnchor: 1,
      })
      customOverlays.push(customOverlay);
    })
    
    customOverlays.forEach(el => {
      el.setMap(this.map)
    });

    this.setState({customOverlays: customOverlays});
  }

  hideItem = (event) => {
    this.state.customOverlays.forEach(el => {
      el.setMap(null);
    })
  }

  render() {
    return (
      <MapContainer>
        {/* <h1>지도컴포넌트</h1> */}
        <MapItem text="1234" item={dummyItems[0]} map={this.state.map} />
        <DefaultButton text={this.state.roadView? "로드뷰 켜짐" : "로드뷰 꺼짐"} onClick={this.toggleRoadView}></DefaultButton>
        <DefaultButton text="map level +" onClick={this.handleZoomIn}></DefaultButton>
        <DefaultButton text="map level -" onClick={this.handleZoomOut}></DefaultButton>
        <DefaultButton text="show item" onClick={this.showItem}></DefaultButton>
        <DefaultButton text="hide item" onClick={this.hideItem}></DefaultButton>
        <div>roadview status : {this.state.roadView? "ON" : "OFF"}</div>
        <div>current map level: {this.state.level}</div>
        <MapContents id="Mymap"></MapContents>
      </MapContainer>
    );
  }
}

const MapContainer = styled.div`
  padding-top: 48px;

  width: 300px;
  height: 300px;
`

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`

export default Map;

const dummyItems = [
  {
      title: '카카오', 
      latlng: [33.450705, 126.570677]
  },
  {
      title: '생태연못', 
      latlng: [33.450936, 126.569477]
  },
  {
      title: '텃밭', 
      latlng: [33.450879, 126.569940]
  },
  {
      title: '근린공원',
      latlng: [33.451393, 126.570738]
  },
];