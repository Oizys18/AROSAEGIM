import React, { Component } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import TextInput from "../common/inputs/TextInput";
import Chip from "../common/chip/Chip";
import { Create, Photo } from "@material-ui/icons";
import CtoW from "../../apis/w3w";
import Switch from "../common/switch/Switch";
import axios from "axios";
import { Storage } from "../../storage/Storage";
import SimplePopover from "./Writetag";
import MapView from "../common/map/MapViewClone";
import { kakaoLatLng } from "../common/map/MapMethod";
import PinIcon from "../../assets/PinIcon";
import { ThemeProvider } from "@material-ui/styles";
import { setPrimaryColor2 } from "../../styles/MuiStyles";

class WriteSaegim extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      locationStat: null,
      location: [37.498584699999995, 127.0337029],
      w3w: "진학.등록금.호흡",
      text: null,
      locked: 0,
      tags: [],
      error: 0,
      userInfo: {},
      imgBase64: [],
      imgFiles: [],

      mapView: {
        status: false,
        center: null,
      },
      delFlag: false,
    };
    this.inputReference = React.createRef();
  }

  fileUploadAction = () => this.inputReference.current.click();
  fileUploadInputChange = async (e) => {
    e.preventDefault();
    if (e.target.files.length + this.state.imgBase64.length > 5) {
      this.setState({ error: 2 });
    } else {
      this.setState({ error: 0 });
      for (let i = 0; i < e.target.files.length; i++) {
        let _reader = new FileReader();
        let _imgFile = e.target.files[i];
        _reader.readAsDataURL(_imgFile);
        _reader.onloadend = () => {
          this.setState({
            imgFiles: this.state.imgFiles.concat(_imgFile),
            imgBase64: this.state.imgBase64.concat(_reader.result),
          });
        };
      }
    }
  };

  handleChange = (data) => {
    // console.log(data)
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
    // if (this.state.locationStat === null) {
    //   return;
    // }
    this.setState({
      mapView: {
        status: true,
        center: kakaoLatLng(this.state.location[0], this.state.location[1]),
      },
    });
  };

  changeMapCenter = (location) => {
    // 지도상의 위치를 현재 위치로 설정
    this.setState({ location: [location.getLat(), location.getLng()] });
  };

  fixLocation = (location, w3w) => {
    this.setState({
      location: location,
      w3w: w3w,
      mapView: {
        status: false,
        center: null,
      },
    });
  };

  cancelMap = () => {
    this.setState({ mapView: { status: false, center: null } });
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
          this.getUserInfo();
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

  writePost = async () => {
    let data = {
      contents: this.state.text,
      latitude: this.state.location[0],
      longitude: this.state.location[1],
      secret: this.state.locked,
      tags: this.state.tags,
      userId: this.state.userInfo.id,
      userName: this.state.userInfo.name,
      w3w: this.state.w3w,
    };
    // if (this.state.imgBase64) {
    // data["imageSources"] = this.state.imgBase64;
    // }
    if (this.state.text && this.state.error !== 1 && this.state.error !== 2) {
      axios
        .post("https://k02a2051.p.ssafy.io/api/saegims", data)
        .then((res) => {
          const _saegimId = res.data.data.id;
          this.state.imgFiles.forEach((el, idx) => {
            const _formData = new FormData();
            _formData.append("file", el);
            axios({
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/files/saegimid/${_saegimId}`,
              data: _formData,
              headers: { 'content-Type': 'multipart/form-data' }
            })
            .then((res) => {
              // console.log(res)
            })
          })
          // console.log(res)
          this.handleChange(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ error: 1 });
    }
  };
  handleTextChange = (value) => {
    if (value.length < 200) {
      this.setState({ text: value });
      this.setState({ error: 0 });
    } else {
      this.setState({ text: value });
      this.setState({ error: 3 });
    }
  };
  changeSwitch = () => {
    if (this.state.locked) {
      this.setState({ locked: 0 });
    } else {
      this.setState({ locked: 1 });
    }
  };
  getUserInfo = async () => {
    this.setState({
      userInfo: this.context.userInfo,
    });
  };
  createTag = (newTag) => {
    this.setState({ tags: this.state.tags.concat(newTag) });
  };
  deleteTag = (e) => {
    const _target = e.target.firstChild.nodeValue;
    const _idx = this.state.tags.indexOf(_target);
    if (_idx > -1) {
      this.state.tags.splice(_idx, 1);
    }
    this.setState({ delFlag: true });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.state.delFlag !== prevProps.delFlag &&
      this.state.delFlag === true
    ) {
      this.setState({ delFlag: false });
    }
  }

  render() {
    const ErrorMsg = () => {
      if (this.state.error === 1) {
        return <Error>텍스트를 입력해주세요.</Error>;
      } else if (this.state.error === 2) {
        return <Error>이미지는 최대 5장까지 입니다.</Error>;
      } else if (this.state.error === 3) {
        return <Error>텍스트는 최대 200자까지 입니다.</Error>;
      } else {
        return <Error>　</Error>;
      }
    };
    return (
      <Wrapper>
        {this.state.mapView.status && (
          <StMapCont height={300}>
            <StViewCont>
              <MapView
                status="write"
                mapCenter={this.state.mapView.center}
                mapLevel={3}
                changeMapCenter={this.changeMapCenter}
                cancelMap={this.cancelMap}
                fixLocation={this.fixLocation}
                w3w={this.state.w3w}
              />
            </StViewCont>
          </StMapCont>
        )}

        <Top>
          {this.state.mapView.status ? (
            <Chip
              size="medium"
              text={"위치를 확정해주세요."}
              onClick={this.getLocation}
            />
          ) : (
            <Chip
              size="medium"
              text={
                this.state.w3w ? this.state.w3w : "위치를 가져오는 중입니다 ..."
              }
              onClick={this.getLocation}
              icon={<PinIcon />}
            />
          )}
        </Top>
        <Container>
          <ThemeProvider theme={setPrimaryColor2}>
            <TextInput
              placeholder="당신의 추억을 새겨주세요"
              onTextChange={this.handleTextChange}
            />
          </ThemeProvider>

          <Bottom>
            <Switch
              locked={this.state.locked}
              changeSwitch={this.changeSwitch}
              labelText={this.state.locked ? "비공개" : "공개"}
              labelPlacement="start"
            />
            <ErrorMsg></ErrorMsg>
          </Bottom>
          <Tag>
            {this.state.tags.map((tag, i) => {
              return (
                <div onClick={this.deleteTag} style={{ margin: "1px" }} key={i}>
                  <StChip size="small" text={tag} />
                </div>
              );
            })}
          </Tag>
        </Container>
        <CreateWrapper>
          <input
            type="file"
            hidden
            id="imgUpload"
            multiple
            accept="image/*"
            ref={this.inputReference}
            onChange={this.fileUploadInputChange}
          />
          <StBtnCont>
            <CreateImg onClick={this.fileUploadAction}>
              <Photo />
            </CreateImg>
          </StBtnCont>
          <StBtnCont>
            <CreateTag onClick={this.openPop}>
              <SimplePopover createTag={this.createTag} />
            </CreateTag>
          </StBtnCont>
          <StBtnCont>
            <CreatePost onClick={!this.state.mapView.status && this.writePost}>
              <Create />
            </CreatePost>
          </StBtnCont>
        </CreateWrapper>
        <ImageWrapper>
          {this.state.imgBase64.map((img, i) => {
            return <ImgBalloon src={img} key={i} />;
          })}
        </ImageWrapper>
      </Wrapper>
    );
  }
}
export default WriteSaegim;
WriteSaegim.contextType = Storage;

const ImgBalloon = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid white;
  border-radius: 24px;
  margin: 0.5vw;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: 80vw;
  max-width: 800px;
  margin-top: 2vh;
`;
const Error = styled.div`
  color: red;
  font-size: 12px;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 6vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  max-width: 800px;
  width: 80vw;
  padding: 16px;
  /* background-color: ghostwhite; */
  background: #fbf2ee;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 16px;
`;
const Top = styled.div`
  margin: 3vh;
  justify-content: space-between;
  align-items: center;
  display: flex;
  .MuiButtonBase-root {
    background: linear-gradient(45deg, #ffffff, #f4bdb0);
  }
`;

const Bottom = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const CreateWrapper = styled.div`
  justify-content: flex-end;
  max-width: 800px;
  width: 80vw;
  flex-direction: row;
  align-items: center;
  display: flex;
  margin-top: 10px;
  border-radius: 16px;
`;
const CreateTag = styled(IconButton)`
  /* background: white; */
  padding: 0.25em;
  /* margin-right: 10px; */
  /* &:focus {
    background: lightgrey;
  } */
`;

const CreatePost = styled(IconButton)`
  /* background: white; */
  padding: 0.25em;
  /* &:focus {
    background: lightgrey;
  } */
`;

const CreateImg = styled(IconButton)`
  /* background: white; */
  padding: 0.25em;
  /* margin-right: 10px; */
  /* &:focus {
    background: lightgrey;
  }
  &:active {
    background: lightgrey;
  } */
`;

const Tag = styled.div`
  margin: none;
  padding: none;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  margin-left: 16px;
  flex-wrap: wrap;
`;

const StMapCont = styled.div`
  overflow: hidden;
  height: ${(props) => props.height}px;
  width: 100%;
  z-index: 5;
  /* height: 100vh; */
`;

const StViewCont = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  background: gray;
`;

const StBtnCont = styled.div`
  border: 1px solid gray;
  border-radius: 50%;
  box-shadow: 0 0 2px #f3b3a6;

  background: #ffffff;
  margin-left: 10px;
`;

const StChip = styled(Chip)`
  background-color: #f4c6ba;
  margin-right: 4px;
`;
