import React, { Component } from 'react';
import SaegimList from "./SaegimList";
import CardItem from "./CardItem";
import styled from "styled-components";
import { Zoom } from "@material-ui/core";

class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          contents: '내 용 자 리'
        },
        {
          id: 2,
          contents: '내 용 자 리'
        },
        {
          id: 3,
          contents: '내 용 자 리'
        },
        {
          id: 4,
          contents: '내 용 자 리'
        },
        {
          id: 5,
          contents: '내 용 자 리'
        },
        {
          id: 6,
          contents: '내 용 자 리'
        },
        {
          id: 7,
          contents: '내 용 자 리'
        },
        {
          id: 8,
          contents: '내 용 자 리'
        }
      ],
    }
  }

  changeData = () => {
    const _dataLeft = this.state.data.slice(0, 1);
    const _dataRight = this.state.data.slice(1);
    this.setState({
      data: _dataRight.concat(_dataLeft)
    })
  }

  getSaegimList() {
    // 목록 가져오는 api 추가
  }

  componentDidMount() {
    this.getSaegimList()
  }

  render() {
    const data = this.state.data.slice(0, 5);
    const PrintCard = data.map((saegim, idx) => {
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
      <Wrapper>
        <StList>
          <SaegimList>
            {PrintCard}
          </SaegimList>
        </StList>
        {/*<CardView />*/}
      </Wrapper>
    );
  }
}

export default SaegimListPage;

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