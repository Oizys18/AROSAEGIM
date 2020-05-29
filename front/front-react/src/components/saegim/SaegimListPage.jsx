import React, { Component } from 'react';
import {Storage} from '../../storage/Storage'
import SaegimList from "./SaegimList";
import CardItem from "./CardItem";
import styled from "styled-components";
import * as SA from "../../apis/SaegimAPI"
import { Zoom, Slide } from "@material-ui/core";

class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:
        [37.498584699999995, 127.0337029]
      ,
      // data: [
      //   {
      //     id: 1,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 2,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 3,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 4,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 5,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 6,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 7,
      //     contents: '내 용 자 리'
      //   },
      //   {
      //     id: 8,
      //     contents: '내 용 자 리'
      //   }
      // ],
      data: []
    }
  }

  changeData = () => {
    const _dataLeft = this.state.data.slice(0, 1);
    const _dataRight = this.state.data.slice(1);
    this.setState({
      data: _dataRight.concat(_dataLeft)
    })
  }

  getSaegimList = async () => {
    const _data = await SA.getSaegimListByLocation(this.state.location)
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

    return (
      <StCont>
        <Slide in={true} direction={_dir}>
            <Wrapper>
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
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  flex-direction: column;
`

const StList = styled.div `
  margin-top: 48px;
`