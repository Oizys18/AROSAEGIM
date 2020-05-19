import React, { Component } from "react";
import styled from "styled-components";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { IconButton } from "@material-ui/core";

class Write extends Component {
  state = {
    locked: false,
  };

  LockOrUnlock = () => {
    if (this.state.locked) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  };
  render() {
    const locked = this.state.locked;
    let icon;
    if (locked) {
      icon = <LockOutlinedIcon />;
    } else {
      icon = <LockOpenOutlinedIcon />;
    }

    return (
      <Wrapper>
        <Container>
          <Lock onClick={this.LockOrUnlock}>{icon}</Lock>
          <Text>당신의 추억을 새겨보세요.</Text>
          <Location>
            <div>Your Location</div>
            <div>Your Location</div>
          </Location>
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
  grid-template-rows: 1fr 5fr;
  grid-template-columns: 1fr 5fr 1fr;
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
  grid-column: 2 / 2;
  grid-row: 2 / 2;
`;
const Location = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 3;
`;
