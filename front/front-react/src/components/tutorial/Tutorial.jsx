import React, { Component } from "react";
import styled from "styled-components";
import { Slide, Grow } from '@material-ui/core';
import { ArrowBack, ArrowForward, Home } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import TutorialItem from "./TutorialItem";
import { Storage } from "../../storage/Storage"
import logo from "../../assets/logo/inline-logo-white.png"
import {FlexRow} from "../../styles/DispFlex";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      max: 3,
      min: 0,
      slideIn: true
    };
  }
  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }

  goHome = () => {
    this.props.history.push(`/list`);
    this.context.toggleSideMenu();
    this.setState({ slideIn: false })
  };
  NextPage = () => {
    if (this.state.page < this.state.max) {
      this.setState({ page: this.state.page + 1 });
    }
  };
  PrevPage = () => {
    if (this.state.page > this.state.min) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <StCont>
        <Slide in={this.state.slideIn} direction="left">
        <Wrapper>
          <Grow in={true} timeout={1000}>
            <Header>튜토리얼</Header>
          </Grow>
          <Container>
            <Navigator>
              <Grow in={true} timeout={1000}>
                <ButtonIcon onClick={this.PrevPage}>
                  {this.state.page > 0 && <ArrowBack fontSize="large" />}
                </ButtonIcon>
              </Grow>
              <Grow in={true} timeout={1000}>
                <ButtonIcon onClick={this.NextPage}>
                  {this.state.page < this.state.max && <ArrowForward fontSize="large" />}
                </ButtonIcon>
              </Grow>
            </Navigator>
          </Container>
          <TutorialItem page={this.state.page} />
          {this.state.page === this.state.max &&
            <HomeButton onClick={this.goHome}>
              <Stimg src={logo}/>
              <StHome>클릭하고 홈으로<Home/></StHome>
            </HomeButton>
          }
        </Wrapper>
        </Slide>
      </StCont>
    );
  }
}
export default withRouter(Tutorial);
Tutorial.contextType = Storage;

const StCont = styled.div`
  overflow: hidden;
  background-color: black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const HomeButton = styled.div`
  /* background: white; */
  color: white;
  z-index: 5;
`;

const Header = styled.div`
  z-index: 5;
  top: 2%;
  position: fixed;
  background: white;
  border-radius: 32px;
  padding: 0.5em;
  font-weight: bolder;
`;
const Navigator = styled.div`
  width: 100vw;
  height: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
`;
const ButtonIcon = styled.div`
  /* background: white; */
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 16px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stimg = styled.img`
  position: fixed;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const StHome = styled(FlexRow)`
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
`;
