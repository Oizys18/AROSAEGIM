import React, { Component } from 'react';
import {Storage} from '../../storage/Storage'
import SaegimList from "./SaegimList";
import CardItem from "./CardItem";
import styled from "styled-components";
import * as SA from "../../apis/SaegimAPI"
import { Zoom, Slide } from "@material-ui/core";
import MyPageMenu from "../mypage/MyPageMenu";
import Select from "@material-ui/core/Select";

class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:
        [37.498584699999995, 127.0337029]
      ,
      options: [
        { value: 100, text: '100m', idx: 0},
        { value: 500, text: '500m', idx: 1},
        { value: 1000, text: '1km', idx: 2}
      ],
      selectedOption: 0,
      distance: 100,
      data: []
    }
    this.selectChange = this.selectChange.bind(this);
  }

  changeData = () => {
    const _dataLeft = this.state.data.slice(0, 1);
    const _dataRight = this.state.data.slice(1);
    this.setState({
      data: _dataRight.concat(_dataLeft)
    })
  }

  async selectChange(e) {
    await this.setState({
      selectedOption: e.target.value,
    })
    await this.setState({
      distance: this.state.options[this.state.selectedOption].value
    })
  }

  getSaegimList = async () => {
    const _data = await SA.getSaegimListByLocation(this.state.location, this.state.distance)
    this.setState({
      data: _data
    })
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const _lat = position.coords.latitude;
          const _lng = position.coords.longitude;
          this.setState({
            location: [_lat, _lng],
          });
          await this.getSaegimList()
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

  componentDidMount() {
    this.getCurrentLocation()
    // this.getSaegimList()
    console.log(this.state.options[this.state.selectedOption].text)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.distance !== prevState.distance) {
      this.getSaegimList()
    }
  }

  render() {
    let _dir = 'right'
    if(this.context.curPage === '/list'){
      _dir = 'left'
    }
    const data = this.state.data;
    const PrintCard = this.state.data.map((saegim, idx) => {
      return (
        <Zoom in={true} timeout={300} key={idx}>
          <CardItem
            saegim={saegim}
            idx={idx}
            length={data.length}
            onChangeData={this.changeData}
          />
        </Zoom>
      )
    });

    const PrintOptions = this.state.options.map((option) => {
        return (
          <option value={option.idx} key={option.idx}>{option.text}</option>
        )
      }
    );

    return (
      <StCont>
        <StSelect
          autowidth
          value={this.state.selectedOption}
          onChange={this.selectChange}
        >
          {PrintOptions}
        </StSelect>
        <Slide in={true} direction={_dir} timeout={400}>
          <Wrapper height={this.context.appHeight}>
            <StList>
              <SaegimList>
                {PrintCard}
              </SaegimList>
            </StList>
          </Wrapper>
        </Slide>
      </StCont>
    );
  }
}

export default SaegimListPage;
SaegimListPage.contextType = Storage;

const StCont = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div `
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  text-align: center;
  /* height: 100vh; */
  flex-direction: column;
`

const StList = styled.div `
  margin-top: 48px;
`

const StSelect = styled(Select)`
  font-size: 0.9rem;
  position: absolute;
  top: 15%;
  right: 10%;
    
  &:after {
    border-bottom: none; 
  }
  
  .MuiSelect-select {
    background-color: white;
    border-radius: 5px;
    padding: 8px 24px 8px 8px; 
  }
  
`;