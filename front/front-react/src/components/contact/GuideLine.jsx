import React, { Component } from "react";
import styled from "styled-components";
import { Slide, } from '@material-ui/core';
// import { ArrowBack } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import BackBtn from '../common/buttons/BackBtn';

class GuideLine extends Component {
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
            <Header>커뮤니티 가이드라인</Header>
          </Slide>

          <Slide in={true} direction="left" timeout={500}>
            <Container>
              <TextWrapper>
                <Title>커뮤니티 가이드라인이란?</Title>
                <Content>
                  커뮤니티 가이드라인이란 커뮤니티 환경을 더욱 잘 가꾸고 편하게
                  이용하기 위한 규정입니다. 이를 지키지 않을시 사용자 제재, 법적
                  대응 및 신고가 이루어질 수 있습니다.
                </Content>
              </TextWrapper>
              <TextWrapper>
                <Title>과도한 노출 및 성적인 내용</Title>
                <Content>
                  포르노나 음란물을 허용하지 않습니다. 아동 학대, 성 착취 등
                  불법적인 내용의 경우 사용자 정보를 법 집행기관과 협조하여
                  신고합니다.
                </Content>
              </TextWrapper>
              <TextWrapper>
                <Title>증오성 내용</Title>
                <Content>
                  새김은 자유로운 표현을 위한 플랫폼입니다. 하지만 인종이나 민족,
                  종교, 장애, 성별, 연령, 국적, 계급, 성적 취향, 성 정체성에 따라
                  폭력을 선동하거나 용납하는 내용 또는 이를 기준으로 증오를 조장하는
                  내용은 허용하지 않습니다.
                </Content>
              </TextWrapper>
              <TextWrapper>
                <Title>괴롭힘/사이버 괴롭힘</Title>
                <Content>
                  악성 컨텐츠를 게시해서는 안 됩니다. 괴롭히는 행위가 도를 넘어
                  악의적이라고 판단되면 신고되어 삭제될 수 있습니다.
                </Content>
              </TextWrapper>
              <TextWrapper>
                <Title>위협 </Title>
                <Content>
                  새김은 타인의 이익을 침해하는 행위, 스토킹, 협박, 괴롭힘, 위협,
                  사생활 침해, 타인의 개인정보 누설 등의 행위는 금지합니다. 이러한
                  행위가 적발될 경우 영구적으로 차단될 수 있습니다.
                </Content>
              </TextWrapper>
            </Container>
          </Slide>

        </Wrapper>
        </Slide>

      </StCont>
    );
  }
}
export default withRouter(GuideLine);

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

const Container = styled.div`
  width: 80vw;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  padding: 1em;
`;

const TextWrapper = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding: 0.2em;
  margin: 0.3em;
  width: 100%;
  flex-direction: column;
`;
const Title = styled.div`
  width: 100%;
  font-weight: bolder;
  font-size: 14px;
`;
const Content = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: lighter;
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
  padding: 0.5em;
  font-weight:bolder;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;
