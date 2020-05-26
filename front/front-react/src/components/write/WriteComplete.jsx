import React, { Component } from "react";
import styled from "styled-components";
import DefaultButton from "../common/buttons/DefaultButton"
class WriteComplete extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
            <DefaultButton text="작성 글"/>
            <DefaultButton text="메인화면"/>
          작성완료! 메세지 보여주는 페이지 1. 작성글 보러가기 2. 메인페이지가기
        </Container>
      </Wrapper>
    );
  }
}
export default WriteComplete;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
  background-color: #e6d7bb;
`;

const Container = styled.div`
  border: transparent;
  border-radius:16px;
`;
