import React, { Component } from "react";
import styled from "styled-components";
import DefaultButton from "../common/buttons/DefaultButton";
import {Zoom} from '@material-ui/core';
import { Link } from "react-router-dom";
import {FlexColumn} from "../../styles/DispFlex";
class WriteComplete extends Component {
  render() {
    // console.log(this.props.id)
    return (
      <Zoom in={true}>
      <Container>
        <InnerBackground>
          <h2>소중한 기억이<br/>새겨졌습니다.</h2>
          <ButtonWrapper>
            <StLink to={{ pathname: `/list` }}>
              <DefaultButton text="목록으로" />
            </StLink>
            <StLink to={{ pathname: `/list/${this.props.id}` }}>
              <DefaultButton text="새김 확인하기" />
            </StLink>
          </ButtonWrapper>
        </InnerBackground>
      </Container>
      </Zoom>
    );
  }
}
export default WriteComplete;

const Container = styled.div`
  border: transparent;
  border-radius: 16px;
  width: 80vw;
  max-width: 330px;
  height: 30vh;
  min-height: 200px;
  position: absolute;
  top: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #FBF2EE;
`;

const ButtonWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  align-items: center;
  width: 100%;
  
  .MuiButton-root {
    background-color: #f4c6ba;
  }
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

const InnerBackground = styled(FlexColumn)`
  background-color: white;
  border-radius: 16px;
  padding: 8px;
  width: 80vw;
  max-width: 250px;
`;