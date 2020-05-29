import React, { Component } from "react";
import styled from "styled-components";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MapIcon from "@material-ui/icons/Map";
import { IconButton } from "@material-ui/core";
import TextInput from "../common/inputs/TextInput";
import Chip from "../common/chip/Chip";
import DefaultButton from "../common/buttons/DefaultButton";
import CreateIcon from "@material-ui/icons/Create";
import CtoW from "../../apis/w3w";
import Switch from "../common/switch/Switch";
import axios from "axios";
import PhotoIcon from "@material-ui/icons/AddPhotoAlternate";
class WriteSaegim extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      location: null,
      w3w: null,
      text: null,
      locked: 0,
      tags: [],
      error: 0,
      image: null,
    };
  }
  handleChange = (data) => {
    this.props.changeWrite(data);
  };

  getWWW = async (lat, lng) => {
    var www = await CtoW(lat, lng);
    this.setState({
      w3w: www.data.words,
    });
  };
  getLocation = () => {
    //지도 컴포넌트 열어서 위치 정확하게 수정하기
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

  writePost = () => {
    const data = {
      contents: this.state.text,
      latitude: this.state.location[0],
      longitude: this.state.location[1],
      secret: this.state.locked,
      tags: ["test"],
      userId: 1,
      userName: "hello",
      w3w: this.state.w3w,
    };
    if (this.state.text) {
      axios
        .post("https://k02a2051.p.ssafy.io/api/saegims/", data)
        .then((res) => {
          this.handleChange(res.data);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: 1 });
    }
  };
  handleTextChange = (value) => {
    this.setState({ text: value });
    this.setState({ error: 0 });
  };
  changeSwitch = () => {
    // console.log(this.state.locked);
    if (this.state.locked) {
      this.setState({ locked: 0 });
    } else {
      this.setState({ locked: 1 });
    }
  };
  createTag = (newTag) => {
    this.setState({ tags: this.state.tags.concat(newTag) });
    // console.log(this.state.tags);
  };
  render() {
    const ErrorMsg = () => {
      if (this.state.error) {
        return <Error>텍스트를 입력해주세요!</Error>;
      } else {
        return <div></div>;
      }
    };
    return (
      <Wrapper>
        <Top>
          <Chip
            size="medium"
            text={"/// " + this.state.w3w}
            onClick={this.getLocation}
          />
        </Top>
        <Container>
          <TextInput
            placeholder="당신의 추억을 새겨주세요"
            onTextChange={this.handleTextChange}
          />
          <ErrorMsg />
          <Bottom>
            <Switch
              locked={this.state.locked}
              changeSwitch={this.changeSwitch}
              color="primary"
              labelText={this.state.locked ? "비공개" : "공개"}
              labelPlacement="start"
            />
            <Tag onClick={() => alert("태그 곧 넣을게요ㅠ")}>
              {this.state.tags.map((tag, i) => {
                return <Chip size="small" text={tag} key={i} />;
              })}
            </Tag>
          </Bottom>
        </Container>
        <CreateWrapper>
          <CreateImg onClick={() => console.log("img!")}>
            <PhotoIcon />
          </CreateImg>
          <CreateTag onClick={() => this.createTag("hello")}>
            <LocalOfferIcon />
          </CreateTag>
          <CreateButton onClick={() => this.writePost()}>
            <CreateIcon />
          </CreateButton>
        </CreateWrapper>
      </Wrapper>
    );
  }
}
export default WriteSaegim;
const Error = styled.div`
  color: red;
  font-size: 10px;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 8vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 80vw;
  padding: 8px;
  background-color: ghostwhite;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 16px;
`;
const Top = styled.div`
  margin: 4vh;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Bottom = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const CreateWrapper = styled.div`
  justify-content: flex-end;
  width: 80vw;
  flex-direction: row;
  align-items: center;
  display: flex;
  margin-top: 10px;
`;
const CreateTag = styled(IconButton)`
  color: default;
  background: white;
  padding: 0.25em;
  margin-right: 10px;
`;
const CreateButton = styled(IconButton)`
  background: white;
  padding: 0.25em;
`;

const CreateImg = styled(IconButton)`
  background: white;
  padding: 0.25em;
  margin-right: 10px;
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
