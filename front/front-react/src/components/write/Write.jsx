import React, { Component } from "react";
import styled from "styled-components";
// import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MapIcon from "@material-ui/icons/Map";
import { IconButton, Slide } from "@material-ui/core";
import TextInput from "../common/inputs/TextInput";
import Chip from "../common/chip/Chip";
import DefaultButton from "../common/buttons/DefaultButton";
import CtoW from "../../apis/w3w";
import Switch from "../common/switch/Switch";
import axios from "axios";

class Write extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      location: null,
      w3w: null,
      text: null,
      time: Date().slice(0,15),
      locked: false,
    };
  }

  getWWW = async (lat, lng) => {
    var www = await CtoW(lat, lng);
    this.setState({
      w3w: www.data.words,
    });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      // GPS를 지원
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const _lat = position.coords.latitude;
          const _lng = position.coords.longitude;

          this.setState({
            location: [_lat, _lng],
          });

          this.getWWW(_lat, _lng);
        },
        function(error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }

  // lockOrUnlock = () => {
  //   if (this.state.locked) {
  //     this.setState({ locked: false });
  //   } else {
  //     this.setState({ locked: true });
  //   }
  // };

  writePost = () => {
    const data = {};
    axios
      .post(process.env.REACT_APP_BACK_URL + "/saegim/", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleTextChange = (value) => {
    this.setState({ text: value });
  };
  changeSwitch = () => {
    console.log(this.state.locked);
    if (this.state.locked) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  };
  render() {
    // const locked = this.state.locked;
    // let icon;
    // if (locked) {
    //   icon = <LockOutlinedIcon />;
    // } else {
    //   icon = <LockOpenOutlinedIcon />;
    // }

    return (
      <Wrapper>
        <Slide in={true} direction='left'>
        <Container>
          <Chip text={this.state.time} />
          <Switch
            locked={this.state.locked}
            changeSwitch={this.changeSwitch}
            color="primary"
            labelText={this.state.locked ? "비공개" : "공개"}
            labelPlacement="start"
          />
          <Text>
            <TextInput onTextChange={this.handleTextChange} />
          </Text>
          <Addition>
            <Map onClick={this.getLocation}>
              <MapIcon />
              <span>{this.state.w3w}</span>
            </Map>
            <Tag onClick={() => alert("태그 곧 넣을게요ㅠ")}>
              <LocalOfferIcon />
              <Chip size="small" text="태그1" />
              <Chip size="small" text="태그2" />
            </Tag>
          </Addition>
          <ButtonContainer>
            <DefaultButton
              text="작성"
              onClick={() =>
                alert(
                  " w3w: " +
                    this.state.w3w +
                    "\n 잠금여부: " +
                    this.state.locked +
                    "\n location: " +
                    this.state.location +
                    "\n text: " +
                    this.state.text +
                    "\n \n 작성완료"
                )
              }
            />
            {/* <DefaultButton text="작성" onClick={() => this.writePost()} /> */}
          </ButtonContainer>
        </Container>
        </Slide>
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

  overflow: hidden;
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
// const Lock = styled(IconButton)`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background-color: transparent;
//   border: none;
//   grid-column: 4 / 4;
//   grid-row: 1 / 1;
//   outline: none;
// `;
const Text = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  grid-column: 1 / 5;
  grid-row: 2 / 2;
`;
const Addition = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 3;
`;

const Map = styled(IconButton)`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
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
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  grid-column: 4 / 4;
  grid-row: 3 / 3;
`;
