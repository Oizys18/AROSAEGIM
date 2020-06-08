/*global kakao*/
import React, { Component } from 'react';
import {Storage} from '../../storage/Storage'
import styled from "styled-components";
import * as SA from "../../apis/SaegimAPI";
import { Zoom, Slide, Select, MenuItem } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import CtoW from "../../apis/w3w";
import CardItem from "./CardItem";
import Loading from "../common/background/Loading";
import PinIcon from '../../assets/PinIcon';
import { FlexRow } from "../../styles/DispFlex";


class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [37.498584699999995, 127.0337029],
      addr: "",
      w3w: "",
      geocoder: new kakao.maps.services.Geocoder(),
      options: [
        { value: 100, text: '100m', idx: 0},
        { value: 500, text: '500m', idx: 1},
        { value: 1000, text: '1km', idx: 2}
      ],
      selectedOption: 0,
      distance: 100,
      data: [],
      printLocation: "",
      isLoading: true
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
    console.log(this.state.selectedOption)
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
    const _reversedData = _data.reverse()
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
    const _lat = await sessionStorage.getItem('ARSG latitude');
    const _lng = await sessionStorage.getItem('ARSG longitude');

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

  getCurrentLocation = async () => {
    const _lat = await sessionStorage.getItem('ARSG latitude');
    const _lng = await sessionStorage.getItem('ARSG longitude');
    this.setState({
      location: [_lat, _lng],
    });
    await this.getSaegimList()
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
      await this.getCurrentLocation()
    }
    await this.getAddrW3W()

    this.setState({
      isLoading: false
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.distance !== prevState.distance) {
      if (this.context.idxUpdateFlag === false) {
        this.getSaegimList()
      }
    } else if (this.state.printLocation !== prevState.printLocation) {
      this.timer = setTimeout(this.switchLocation, 5000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    if (this.state.isLoading === true) {
      return <Loading/>
    } else {
      let _dir = 'right'
      if (this.context.curPage === '/') {
        _dir = 'left'
      }
      const PrintCard = this.state.data.map((saegim, idx) => {
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

      const PrintOptions = this.state.options.map((option) => {
          return (
            <StMenuItem value={option.idx} key={option.idx}>{option.text}</StMenuItem>
          )
        }
      );

      return (
        <StCont>
          <StMenu>
            <StSelect
              autoWidth
              value={this.state.selectedOption}
              onChange={this.selectChange}
            >
              {PrintOptions}
            </StSelect>
            <StLocation>
            {this.state.printLocation === this.state.w3w
             && <PinIcon />}
            {this.state.printLocation}
            </StLocation>
            <StButton onClick={this.refresh}>
              <Refresh/>
            </StButton>
          </StMenu>
          <Slide in={true} direction={_dir} timeout={300} mountOnEnter unmountOnExit>
            <Wrapper height={this.context.appHeight}>
              <StList>
                {PrintCard}
              </StList>
            </Wrapper>
          </Slide>
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
  height: ${props => props.height}px;
`

const StList = styled.div `
  margin-top: 48px;
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
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: 3vh;
  
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
  justify-content: center;
  align-items: center;
  
  max-width: 40vw;
  overflow: hidden;
  white-space: nowrap;
`;

const StMenuItem = styled(MenuItem)`
  font-size: 0.9rem;
`;