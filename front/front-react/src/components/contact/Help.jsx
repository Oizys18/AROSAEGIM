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
        <Container>
          <BackButton onClick={this.goBack}>
            <ArrowBack />
          </BackButton>
          <Header>
            <Title>도움말</Title>
            <Content>커뮤니티 가이드라인</Content>
            <Content>튜토리얼 다시보기</Content>
            <Content>개발자에게 연락하기</Content>
          </Header>
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 80vh;
  background: white;
  flex-direction: column;
`;
const BackButton = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 16px;
`;

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
const Content = styled.a``;
