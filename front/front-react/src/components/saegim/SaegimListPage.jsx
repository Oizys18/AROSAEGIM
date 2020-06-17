/*global kakao*/
import React, { Component } from 'react';
import {Storage} from '../../storage/Storage'
import styled, { keyframes } from "styled-components";
import * as SA from "../../apis/SaegimAPI";
import { Zoom, Select, MenuItem } from "@material-ui/core";
import { Refresh, HourglassFull } from "@material-ui/icons";
import CtoW from "../../apis/w3w";
import CardItem from "./CardItem";
import Loading from "../common/background/Loading";
import { FlexRow } from "../../styles/DispFlex";

class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [37.498584699999995, 127.0337029],
      time: ["", ""],
      today: "",
      addr: "",
      w3w: "",
      geocoder: new kakao.maps.services.Geocoder(),
      options: [
        { value: 200, text: '100m', idx: 0},
        { value: 1000, text: '500m', idx: 1},
        { value: 2000, text: '1km', idx: 2}
      ],
      selectedOption: 0,
      distance: 200,
      data: [],
      printLocation: "",
      isLoading: true,
      timeCapsule: false,
      timeCapsuleData: []
    }
    this.selectChange = this.selectChange.bind(this);
  }

  changeData = () => {
    const _dataLeft = this.state.data.slice(0, 1);
    const _dataRight = this.state.data.slice(1);
    const _data = _dataRight.concat(_dataLeft)
    const _curData = {
      listData: _data,
      distance: this.state.distance,
      selectedOption: this.state.selectedOption
    }
    this.context.setCurData(_curData)
    this.setState({
      data: _data
    })
  }

  async selectChange(e) {
    await this.setState({
      selectedOption: e.target.value,
    })
    await this.setState({
      distance: this.state.options[this.state.selectedOption].value
    })
    await this.context.setCurData({
      curData: {
        listData: this.state.data,
        distance: this.state.distance,
        selectedOption: this.state.selectedOption
      }
    })
  }

  getSaegimList = async () => {
    const _data = await SA.getSaegimListByLocation(this.state.location, this.state.distance)
    let _reversedData = []
    if (_data.length > 1) {
      _reversedData = _data.reverse()
    }
    const _curData = {
      listData: _reversedData,
      distance: this.state.distance,
      selectedOption: this.state.selectedOption
    }
    this.setState({
      data: _reversedData
    })
    this.context.setCurData(_curData)
  }

  getAddrW3W = async () => {
    const [_lat, _lng] = this.state.location
    this.state.geocoder.coord2RegionCode(_lng, _lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        for(var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            this.setState({ addr:  result[i].address_name })
            break;
          }
        }
      }
    });
    const www = await CtoW(_lat, _lng);
    this.setState({
      w3w: www.data.words,
      printLocation: www.data.words
    });
  };

  switchLocation = () => {
    if (this.state.printLocation === this.state.w3w) {
      this.setState({
        printLocation: this.state.addr
      })
    } else if (this.state.printLocation === this.state.addr) {
      this.setState({
        printLocation: this.state.w3w
      })
    }
  }

  async getSessionLocation() {
    const _lat = await sessionStorage.getItem('ARSG latitude');
    const _lng = await sessionStorage.getItem('ARSG longitude');
    this.setState({
      location: [_lat, _lng],
    });
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const _lat = position.coords.latitude;
          const _lng = position.coords.longitude;
          await this.setState({
            location: [_lat, _lng],
          });
          // console.log(this.state.location)
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
      alert("GPS를 지원하지 않는 디바이스 입니다!");
    }
  }


  setTimeCapsule = async () => {
    if (this.state.timeCapsule === false) {
      await this.setState({ timeCapsule: true })
    } else {
      await this.setState({ timeCapsule: false })
    }
  }

  getToday = () => {
    const date = new Date()
    const strMonth = date.getMonth() + 1
    const strDay = date.getDate()
    const strYear = date.getFullYear() - 1
    return `${strYear}년 ${strMonth}월 ${strDay}일의 새김`
  }

  getTime = () => {
    this.setState({ today: this.getToday() })
    const _oneYear = new Date().setFullYear(new Date().getFullYear() - 1)
    const _sTime = new Date(_oneYear).setHours(0, 0, 0, 0)
    const _eTime = new Date(_oneYear).setHours(24, 0, 0, 0)
    this.setState({
      time: [_sTime, _eTime]
    })
  }

  getTimeCapsuleData = async () => {
    const [ _lat, _lng ] = this.state.location
    const [ _sTime, _eTime ] = this.state.time
    const _data = {
      lat: _lat,
      lng: _lng,
      meter: 4000, // this.state.distance,
      sTime: _sTime,
      eTime: _eTime,
      userid: 0
    }
    const _res = await SA.getSaegimByFilter(_data)
    await this.setState({ timeCapsuleData: _res })
  }

  refresh = async () => {
    this.setState({ isLoading: true })
    
    await this.getCurrentLocation()
    await this.getAddrW3W()

    this.setState({ isLoading: false})
  }

  async componentDidMount() {
    if (this.context.idxUpdateFlag === true) {
      await this.setState({
        data: this.context.curData.listData,
        distance: this.context.curData.distance,
        selectedOption: this.context.curData.selectedOption
      })
      this.context.idxUpdate(false)
    } else {
      if (sessionStorage.getItem('ARSG latitude')) {
        await this.getSessionLocation()
      } else {
        await this.getCurrentLocation()
      }
      await this.getSaegimList()
      await this.getAddrW3W()
    }
    // this.getTime()
    // await this.getTimeCapsuleData()

    this.setState({
      isLoading: false
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.distance !== prevState.distance) {
      if (this.context.idxUpdateFlag === false) {
        if (this.state.timeCapsule === false) { this.getSaegimList() }
      }
    } else if (this.state.printLocation !== prevState.printLocation) {
      this.timer = setTimeout(this.switchLocation, 5000)
    } else if (this.state.timeCapsule !== prevState.timeCapsule && this.state.timeCapsule === true) {
      this.getTime()
      this.getTimeCapsuleData()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    if (this.state.isLoading === true) {
      return <Loading/>
    } else {
      const EmptyList =
        <StMessage>
          주변에 새김이 없습니다.<br/>이 장소의 첫 새김을 남겨주세요.
        </StMessage>
      const EmptyTimeCapsule =
        <StMessage>
          기록된 새김이 없습니다.<br/>이 장소의 첫 새김을 남기고 다시 찾아주세요.
        </StMessage>
      const PrintCurData = this.state.data.map((saegim, idx) => {
        return (
          <Zoom in={true} timeout={300} key={idx}>
            <CardItem
              saegim={saegim}
              idx={idx}
              length={this.state.data.length}
              onChangeData={this.changeData}
            />
          </Zoom>
        )
    });
      const PrintOldData = this.state.timeCapsuleData.map((saegim, idx) => {
        return (
          <Zoom in={true} timeout={300} key={idx}>
            <CardItem
              saegim={saegim}
              idx={idx}
              length={this.state.timeCapsuleData.length}
            />
          </Zoom>
        )
      });
      const PrintOptions = this.state.options.map((option) => {
          return (
            <StMenuItem value={option.idx} key={option.idx}>{option.text}</StMenuItem>
          )
        });
      const PrintNoOption = <div style={{ margin: '0 24px 0 16px', color: 'rgba(0, 0, 0, 0.87)'}}>2km</div>

      return (
        <StCont>
          <StMenu>
            {this.state.timeCapsule ? PrintNoOption
              : <StSelect
                autoWidth
                value={this.state.selectedOption}
                onChange={this.selectChange}>
                {PrintOptions}
                </StSelect>
            }
            <StLocation>
              {this.state.printLocation}
            </StLocation>
            <StButton onClick={this.refresh}>
              <Refresh/>
            </StButton>
          </StMenu>
          <Wrapper height={this.context.appHeight}>
            <StList>
            { this.state.timeCapsule
              ? (this.state.timeCapsuleData.length > 0 ? PrintOldData : EmptyTimeCapsule )
              : (this.state.data.length > 0 ? PrintCurData : EmptyList) }
            </StList>
          </Wrapper>
          {this.state.timeCapsule === false
           ? <StHourglassFull onClick={this.setTimeCapsule}/>
           : <StTCMessage onClick={this.setTimeCapsule}>{this.state.today}</StTCMessage>
          }
        </StCont>
      );
    }
  }
}

export default SaegimListPage;
SaegimListPage.contextType = Storage;

const StCont = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: ${props => props.height}px; */
`

const StList = styled.div `
  margin-top: 48px;
  width: 100%;
`

const StSelect = styled(Select)`
  font-size: 0.9rem;
    
  &:before {
    border-bottom: none; 
  }
  
  .MuiSelect-select {
    border-radius: 5px;
    padding: 8px 24px 8px 8px; 
  }
  
  &.MuiInput-underline:after{
    border-bottom: none;
  }
`;

const StMenu = styled.div`
  /* position: absolute;
  top: 12%;
  left: 50%; */

  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12vh;
  z-index: ${props => props.length + 1};

  /* transform: translateX(-50%); */
  width: 70vw;
  height: 3vh;
  max-width: 360px;
  
  font-size: 0.9rem;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background: linear-gradient(45deg, #ffffff, #F4BDB0);
  padding: 8px 16px 8px 16px;
  border-radius: 50px;
  
`;

const StButton = styled(FlexRow)`
  width: 30px;
  height: 30px;
  margin-left: 8px;

  svg{
    color: white;
    width: 25px;
    height: 35px;
  }
`;

const StLocation = styled(FlexRow)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  max-width: 40vw;
  overflow: hidden;
  white-space: nowrap;
`;

const StMenuItem = styled(MenuItem)`
  font-size: 0.9rem;
`;

const Glow = keyframes`
  0% {
    box-shadow: 0px 0px 10px #0fc4c4, 0px 0px 10px white; 
  }
  20% {
    box-shadow: 0px 0px 20px #0fc4c4, 0px 0px 20px white; 
  } 
  100% {
    box-shadow: 0px 0px 10px transparent, 0px 0px 10px transparent;
    border-width: 2px;
  }
`;

const StHourglassFull = styled(HourglassFull)`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: #0fc4c4;
  
  border-radius: 50px;
  padding: 4px;
  
  animation: ${Glow} 3s ease infinite;
`;

const GlowText = keyframes`
  0% {
    text-shadow: 0px 0px 10px #0fc4c4, 0px 0px 10px white; 
  }
  30% {
    text-shadow: 0px 0px 20px #0fc4c4, 0px 0px 20px white; 
  } 
  100% {
    text-shadow: 0px 0px 10px transparent, 0px 0px 10px transparent;
  }
`;

const StTCMessage = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  animation: ${GlowText} 3s ease infinite;
`;

const StMessage = styled.div`
  word-break: keep-all;
  line-height: 1.5rem;
  text-align: center;
  
  color: #ffffff;
  text-shadow: 0px 0px 10px #ffffff;
  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;