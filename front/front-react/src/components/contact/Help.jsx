import React, { Component } from "react";
import styled from "styled-components";
import { ArrowBack } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }
  goBack = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <BackButton onClick={this.goBack}>
          <ArrowBack />
        </BackButton>
        <Container>
          <Header>
            <Title>도움말</Title>
          </Header>
          <Body>
            <Content>커뮤니티 가이드라인</Content>
            <Content>튜토리얼 다시보기</Content>
            <Content>개발자에게 연락하기</Content>
          </Body>
        </Container>
      </Wrapper>
    );
  }
}
export default withRouter(Help);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80vw;
  height: 90vh;
  flex-direction: column;
`;
const BackButton = styled.div`
  position: absolute;
  top: 5%;
  left: 10%;
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 16px;
`;

const Header = styled.div`
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 1em;
  padding: 0.5em;
  border-radius: 16px;
`;

const Body = styled.div`
  background: white;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70vh;
  border-radius: 16px;
`;
const Title = styled.div`
  font-size: 1.5em;
`;
const Content = styled.div`
  padding: 0.1em;
  height: 1.5em;
  width: 90%;
  border: 1px solid grey;
`;
