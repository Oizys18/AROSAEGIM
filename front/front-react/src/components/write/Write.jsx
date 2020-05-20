import React, { Component } from "react";
import styled from "styled-components";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MapIcon from "@material-ui/icons/Map";
import { IconButton } from "@material-ui/core";
import CtoW from "../../apis/w3w";
import Input from '@material-ui/core/Input';

class Write extends Component {
  constructor() {
    super();
    this.state = {
      locked: false,
      location: null,
      w3w: null,
    };
  }
  getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert([position.coords.latitude + " " + position.coords.longitude]);
          this.setState({
            location: [position.coords.latitude, position.coords.longitude],
          });
        },
        function(error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  };

  lockOrUnlock = () => {
    if (this.state.locked) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  };
  getLoc = async (location) => {
    const getW3W = await CtoW(location[0], location[1]);
    this.setState({ w3w: getW3W });
    console.log(this.state.w3w);
  };

  render() {
    const locked = this.state.locked;
    let icon;
    if (locked) {
      icon = <LockOutlinedIcon />;
    } else {
      icon = <LockOpenOutlinedIcon />;
    }

    // const w3w = this.state.w3w;
    // let loc;
    // if (w3w) {
    //   loc = <div>{w3w}</div>;
    // } else {
    //   loc = <div>hello</div>;
    // }

    return (
      <Wrapper>
        <Container>
          <Lock onClick={this.lockOrUnlock}>{icon}</Lock>
          <Text>
            <Input placeholder="당신의 추억을 새겨보세요"/>
            </Text>
          <Addition>
            <Map onClick={this.getLocation}>
              <MapIcon />
            </Map>
            <Tag onClick={() => alert("태그 곧 넣을게요ㅠ")}>
              <LocalOfferIcon />
            </Tag>
          </Addition>
        </Container>
      </Wrapper>
    );
  }
}
export default Write;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
  background-color: #e6d7bb;
`;

const Container = styled.div`
  padding: 8px;
  position: relative;
  bottom: 16vh;
  background-color: #dcc29b;
  margin-left: 8vw;
  margin-right: 8vw;
  width: 84vw;
  height: 48vh;
  display: grid;
  grid-template-rows: 1fr 4fr 2fr;
  grid-template-columns: 1fr 8fr 1fr;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;
const Lock = styled(IconButton)`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  grid-column: 3 / 3;
  grid-row: 1 / 1;
  outline: none;
`;
const Text = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  grid-column: 1 / 4;
  grid-row: 2 / 2;
`;
const Addition = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 3;
`;

const Map = styled(IconButton)`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
`;
const Tag = styled(IconButton)`
  margin: none;
  padding: none;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
`;
