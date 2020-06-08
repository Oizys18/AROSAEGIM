import React, { Component } from "react";
import styled from "styled-components";
import { Slide } from '@material-ui/core';
// import { ArrowBack } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import BackBtn from '../common/buttons/BackBtn';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      slideIn: true,
    };
    // this.goBack = this.goBack.bind(this);
  }
  setStateAsync(state) { return new Promise(resolve => { this.setState(state, resolve) }) }
  goBack = async () => {
    // console.log(this.props);
    await this.setStateAsync({ slideIn: false })
    this.props.history.goBack();
  };

  componentDidMount() {}

  render() {
    return (
      <StCont>
        <BackBtn handleBack={this.goBack}/>
        
        <Slide in={this.state.slideIn} direction="left">
        <Wrapper>
          {/* <BackButton onClick={this.goBack}>
            <ArrowBack />
          </BackButton> */}
          <Slide in={true} direction="left" timeout={400}>
            <Header>
              <Title>개발자에게 메일보내기</Title>
              <Content href="mailto:hello@saegim.me">hello@saegim.me</Content>
            </Header>
          </Slide>

          <Slide in={true} direction="left" timeout={600}>
            <MemberCard href="https://github.com/Oizys18">
              <ProfileImg src="https://avatars3.githubusercontent.com/u/37648340?s=120&v=4" />
              <Message>
                <Name>양찬우 @Oizys18</Name>
                <Role>Frontend</Role>
              </Message>
            </MemberCard>
          </Slide>

          <Slide in={true} direction="left" timeout={650}>
            <MemberCard href="https://github.com/soulgchoi">
              <ProfileImg src="https://avatars0.githubusercontent.com/u/52682603?s=120&v=4" />
              <Message>
                <Name>최솔지 @soulgchoi</Name>
                <Role>Frontend</Role>
              </Message>
            </MemberCard>
          </Slide>

          <Slide in={true} direction="left" timeout={700}>
            <MemberCard href="https://github.com/EXTC27">
              <ProfileImg src="https://avatars1.githubusercontent.com/u/40153405?s=120&v=4" />
              <Message>
                <Name>김신재 @EXTC27</Name>
                <Role>Frontend</Role>
              </Message>
            </MemberCard>
          </Slide>
          
          <Slide in={true} direction="left" timeout={750}>
            <MemberCard href="https://github.com/kingjky">
              <ProfileImg src="https://avatars3.githubusercontent.com/u/51773494?s=120&v=4" />
              <Message>
                <Name>전경윤 @kingjky</Name>
                <Role>Backend</Role>
              </Message>
            </MemberCard>
          </Slide>

          <Slide in={true} direction="left" timeout={800}>
            <MemberCard href="https://github.com/ghleokim">
              <ProfileImg src="https://avatars3.githubusercontent.com/u/52501513?s=120&v=4" />
              <Message>
                <Name>김건호 @ghleokim</Name>
                <Role>Frontend</Role>
              </Message>
            </MemberCard>
          </Slide>

        </Wrapper>
        </Slide>

      </StCont>
    );
  }
}
export default withRouter(Contact);

const StCont = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const MemberCard = styled.a`
  width: 60vw;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 32px;
  background: white;
  display: flex;
  margin: 0.25em;
  padding: 0.5em;
  padding-right: 1em;
  font-weight: lighter;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const ProfileImg = styled.img`
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;
const Message = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  color: rgba(0, 0, 0, 0.87);
`;
const Name = styled.div`
  margin-left:10px;
  font-weight: bolder;
  font-size: 16px;
`;
const Role = styled.div`
  /* justify-content: flex-start; */
  /* display: flex; */
  font-weight:lighter;
  opacity:0.7;
  font-size:14px;
`;

// const BackButton = styled.div`
//   position: absolute;
//   top: 5%;
//   left: 5%;
//   background: white;

//   width: 24px;
//   height: 24px;
//   border-radius: 16px;
// `;

const Header = styled.div`
  background: white;
  border-radius: 32px;
  margin: 1em;
  padding: 1em;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;
const Title = styled.div``;
const Content = styled.a`
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;
