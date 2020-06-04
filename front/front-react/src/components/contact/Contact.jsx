import React, { Component } from "react";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { withRouter } from 'react-router-dom'
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
    // this.goBack = this.goBack.bind(this);
  }
  goBack = () => {
    console.log(this.props)
    this.props.history.goBack();
  }

  componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <BackButton onClick={this.goBack}>
          <ArrowBack />
        </BackButton>
        <Header>
          <Title>개발자에게 메일보내기</Title>
          <Content>hello@saegim.me</Content>
        </Header>
        <MemberCard>
          <ProfileImg src="https://avatars3.githubusercontent.com/u/37648340?s=120&v=4" />
          <Message>
            <Name>양찬우 @Oizys18</Name>
            <Role>Frontend Developer</Role>
          </Message>
        </MemberCard>
        <MemberCard>
          <ProfileImg src="https://avatars0.githubusercontent.com/u/52682603?s=120&v=4" />
          <Message>
            <Name>최솔지 @soulgchoi</Name>
            <Role>Frontend Developer</Role>
          </Message>
        </MemberCard>
        <MemberCard>
          <ProfileImg src="https://avatars1.githubusercontent.com/u/40153405?s=120&v=4" />
          <Message>
            <Name>김신재 @EXTC27</Name>
            <Role>Frontend Developer</Role>
          </Message>
        </MemberCard>
        <MemberCard>
          <ProfileImg src="https://avatars3.githubusercontent.com/u/51773494?s=120&v=4" />
          <Message>
            <Name>전경윤 @kingjky</Name>
            <Role>Backend Developer</Role>
          </Message>
        </MemberCard>
        <MemberCard>
          <ProfileImg src="https://avatars3.githubusercontent.com/u/52501513?s=120&v=4" />
          <Message>
            <Name>김건호 @ghleokim</Name>
            <Role>Frontend Developer</Role>
          </Message>
        </MemberCard>
      </Wrapper>
    );
  }
}
export default withRouter(Contact);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const MemberCard = styled.div`
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
  flex-direction: column;
`;
const Name = styled.div`
  justify-content: flex-start;
  display: flex;
`;
const Role = styled.div`
  justify-content: flex-start;
  display: flex;
`;

const BackButton = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  background: white;
  width:24px;
  height:24px;
  border-radius: 16px;
`;

const Header = styled.div`
  background: white;
  border-radius: 32px;
  margin: 1em;
  padding: 1em;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  display:flex;
`;
const Title = styled.div``;
const Content = styled.a``;
