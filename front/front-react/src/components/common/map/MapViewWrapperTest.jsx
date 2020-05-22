/* global kakao */
import React, { Component } from "react";
import MapView from "./MapView";
import MapListItem from "./MapListItem";
import styled from "styled-components";
import DefaultButton from "../buttons/DefaultButton";

// this is mappage
class MapViewWrapperTest extends Component {
  constructor() {
    super();
    this.state = {
      items: dummyItems,
      map: null,
      mapCenter: null,
      userCenter: null,
      level: 3,
      selected: {
        status: false,
        item: null,
      },
      bounds: null,
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async componentDidMount() {
    let container = document.getElementById("MapView");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 3,
    };

    await this.setStateAsync({ map: new kakao.maps.Map(container, options) });

    kakao.maps.event.addListener(
      this.state.map,
      "center_changed",
      this.handleCenterChange
    );

    kakao.maps.event.addListener(
      this.state.map,
      "zoom_changed",
      this.handleZoomChange
    );

    kakao.maps.event.addListener(
      this.state.map,
      "dragstart",
      this.handleDragStart
    );

    kakao.maps.event.addListener(
      this.state.map,
      "bounds_changed",
      this.handleBoundsChange
    );
  }

  handleZoomChange = () => {
    this.setState({ level: this.state.map.getLevel() });
    this.closeItem();
  };

  handleCenterChange = () => {
    this.setState({ mapCenter: this.state.map.getCenter() });
    this.closeItem();
  };

  handleDragStart = () => {
    this.setState({ mapCenter: this.state.map.getCenter() });
    this.closeItem();
  };

  handleBoundsChange = () => {
    this.setState({ bounds: this.state.map.getBounds() });
    this.closeItem();
  };

  // move directly to given center
  setCenter = (center) => {
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.state.map.setCenter(targetCenter);
  };

  // move smoothly to given center
  panTo = (center) => {
    const targetCenter = new kakao.maps.LatLng(center.lat, center.lng);
    this.state.map.panTo(targetCenter);
  };

  selectItem = (item) => {
    console.log(item);
    this.panTo({ lat: item.latlng[0], lng: item.latlng[1] });
    this.setState({ selected: { status: true, item: item } });
  };

  closeItem = () => {
    this.setState({ selected: { status: false, item: null } });
  };

  prevItem = () => {
    const currentIndex = this.state.items.indexOf(this.state.selected.item);
    const prevIndex =
      currentIndex === 0 ? this.state.items.length - 1 : currentIndex - 1;
    this.selectItem(this.state.items[prevIndex]);
  };

  nextItem = () => {
    const currentIndex = this.state.items.indexOf(this.state.selected.item);
    const nextIndex =
      currentIndex === this.state.items.length - 1 ? 0 : currentIndex + 1;
    this.selectItem(this.state.items[nextIndex]);
  };

  // function for development
  addRndItemInView = () => {
    const bounds = this.state.map.getBounds();
    const rndLatLng = [
      this.generateRandom(bounds.ka, bounds.ja),
      this.generateRandom(bounds.da, bounds.ia),
    ];
    const lastItem = this.state.items[this.state.items.length - 1];
    const newItem = {
      id: lastItem.id + 1,
      title: `new item ${lastItem.id + 1}`,
      latlng: rndLatLng,
    };
    this.setState({
      items: this.state.items.concat(newItem),
    });
  };

  generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  render() {
    return (
      <>
        <MapView
          map={this.state.map}
          status="list"
          items={this.state.items}
          selectItem={this.selectItem}
        />
        <ButtonWrapper>
          <DefaultButton
            text="add random item"
            onClick={this.addRndItemInView}
          />
        </ButtonWrapper>
        {this.state.selected.status && (
          <>
            <ButtonWrapper>
              <DefaultButton text="prev Item" onClick={this.prevItem} />
              <DefaultButton text="next Item" onClick={this.nextItem} />
            </ButtonWrapper>
            <MapListItem
              item={this.state.selected.item}
              closeItem={this.closeItem}
            />
          </>
        )}
      </>
    );
  }
}

export default MapViewWrapperTest;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 16px 0 16px;
`;

const dummyItems = [
  {
    id: 1,
    title: "도화동 주민센터",
    latlng: [37.54158754476082, 126.94985085530882],
  },
  {
    id: 2,
    title: "공덕역",
    latlng: [37.54247160070765, 126.9524527989876],
  },
  {
    id: 3,
    title: "마포역",
    latlng: [37.539567547196356, 126.94586935139986],
  },
  {
    id: 4,
    title: "탐앤탐스",
    latlng: [37.53893313829381, 126.94763492477553],
  },
];
