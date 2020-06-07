import React, { Component } from "react";
import styled from "styled-components";
import DefaultButton from "../common/buttons/DefaultButton";
import { Link } from "react-router-dom";
class WriteComplete extends Component {
  render() {
    return (
      <Container>
        <h1>작성완료!</h1>
        <ButtonWrapper>
          <StLink to={{ pathname: `/list` }}>
            <DefaultButton text="목록보기" />
          </StLink>
          <StLink to={{ pathname: `/list/${this.props.id}` }}>
            <DefaultButton text="작성 글 보기" />
          </StLink>
        </ButtonWrapper>
      </Container>
    );
  }
}
export default WriteComplete;

const Container = styled.div`
  border: transparent;
  border-radius: 16px;
  width: 80vw;
  height: 30vh;
  position: absolute;
  top: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ghostwhite;
`;

const ButtonWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
