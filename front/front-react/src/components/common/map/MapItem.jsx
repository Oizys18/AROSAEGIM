/*global kakao*/
import React, { Component } from "react";
import styled from "styled-components";
import imgLeft from "../../../assets/balloon/balloon-left@2x.png";
import imgMiddle from "../../../assets/balloon/balloon-middle@2x.png";
import imgRight from "../../../assets/balloon/balloon-right@2x.png";

class MapItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
    }
    this.myRef = React.createRef();
  }
  componentDidMount() {
    if (!this.state.on && !!this.props.map) {
      // do something
      this.showOnMap();
    }
  }

  componentDidUpdate() {
    if (!this.state.on && !!this.props.map ) {
      // do something
      this.showOnMap();
    }
  }

  // initial map overlay
  showOnMap = () => {
    const customOverlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(
        this.props.item.latlng[0],
        this.props.item.latlng[1]
      ),
      content: this.myRef.current,
      yAnchor: 1,
      clickable: false,
    });
    customOverlay.setMap(this.props.map);
    this.customOverlay = customOverlay;
    this.setState({
      on: true,
    })
  };

  // deliver state item to parent
  clickEvent = (e) => {
    e.preventDefault();
    this.props.selectItem(this.props.item);
  };

  // show on map
  showItem = () => {
    this.customOverlay.setMap(this.props.map);
  };

  // hide from map
  hideItem = () => {
    this.customOverlay.setMap(null);
  };

  render() {
    return (
      <ItemContainer ref={this.myRef} onClick={this.clickEvent}>
        <ItemLeft />
        <ItemMiddle>
          <TextMiddle>{this.props.item.title}</TextMiddle>
        </ItemMiddle>
        <ItemRight />
      </ItemContainer>
    );
  }
}

export default MapItem;

const ItemContainer = styled.div`
  height: 30px;
  display: flex;
  margin-top: 15px;
`;

const ItemLeft = styled.div`
  height: 20px;
  width: 7px;
  background-image: url(${imgLeft});
  background-size: contain;
`;

const ItemMiddle = styled.div`
  height: 20px;
  width: auto;
  background-image: url(${imgMiddle});
  background-size: contain;
  padding-left: 4px;
  margin-right: -2px;
`;

const ItemRight = styled.div`
  height: 20px;
  width: 13px;
  background-image: url(${imgRight});
  background-size: contain;
`;

const TextMiddle = styled.div`
  position: relative;
  bottom: 10px;
  border-radius: 2px;
  padding: 2px;
  color: #20ad77;
  background: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;
