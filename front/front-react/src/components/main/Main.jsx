import React, { Component } from "react";
import DefaultButton from "../common/buttons/DefaultButton";
import HugeButton from "../common/buttons/HugeButton";
import styled from "styled-components";

class Main extends Component {

  go = () => {
    // this.props.history.replace('/login')
  }

  render() {
    return (
      <Wrapper>
        <div>Main! 제발 나와라!</div>
        <DefaultButton text="더 귀여운 버튼😘" />
        <HugeButton text="귀여운 버튼🥰"/>
      </Wrapper>
    );
  }
}
export default Main;

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100vw;
  height:100vh;
`

const Container = styled.div`
   display: flex;
   flex-direction:column;
   justify-content:center;
   align-items:center;
`

