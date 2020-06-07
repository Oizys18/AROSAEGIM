import React, { Component } from "react";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TutorialItem from "./TutorialItem";
import HomeIcon from "@material-ui/icons/Home";
class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      max: 5,
      min: 0,
    };
  }
  goHome = () => {
    this.props.history.push(`/list`);
  };
  goBack = () => {
    this.props.history.goBack();
  };
  NextPage = () => {
    if (this.state.page < this.state.max) {
      console.log(this.state.page);
      this.setState({ page: this.state.page + 1 });
    }
  };
  PrevPage = () => {
    if (this.state.page > this.state.min) {
      console.log(this.state.page);
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <Wrapper>
        <BackButton onClick={this.goBack}>
          <ArrowBack />
        </BackButton>
        <HomeButton onClick={this.goBack}>
          <HomeIcon />
        </HomeButton>
        <Header>튜토리얼</Header>
        <Container>
          <Navigator>
            <ButtonIcon onClick={this.PrevPage}>
              <ArrowBackIcon fontSize="Large" />
            </ButtonIcon>
            <ButtonIcon onClick={this.NextPage}>
              <ArrowForwardIcon fontSize="Large" />
            </ButtonIcon>
          </Navigator>
        </Container>
        <TutorialItem page={this.state.page} />
      </Wrapper>
    );
  }
}
export default withRouter(Tutorial);

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

const BackButton = styled.div`
  position: absolute;
  top: 3%;
  left: 5%;
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 16px;
  z-index: 5;
`;
const HomeButton = styled.div`
  position: absolute;
  top: 3%;
  left: 15%;
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 16px;
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
  background: white;
  width: 36px;
  height: 36px;
  border-radius: 16px;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
