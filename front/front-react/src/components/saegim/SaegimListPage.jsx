import React, { Component } from 'react';
import ListItem from "./ListItem";
import SaegimList from "./SaegimList";
import CardView from "./CardView";
import CardItem from "./CardItem";
import styled from "styled-components";

const background = <span style={{display:"none"}}>Archive</span>;
const ListState = new React.createContext();

class SaegimListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          id: 2,
          contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          id: 3,
          contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          id: 4,
          contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
    const data = this.state.data;
    const PrintCard = data.map((saegim, idx) => {
      return (
          <CardItem
            saegim={saegim}
            idx={idx}
            length={data.length}
            key={idx}
            onChangeData={this.changeData}
          />
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
  // text-align: center;
  height: 100vh;
  flex-direction: column;
`

const StList = styled.div `
  margin-top: 48px;
`