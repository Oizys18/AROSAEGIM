import React, { Component } from "react";
import styled from "styled-components";
import Zoom from "@material-ui/core/Zoom";
import WriteSaegim from "./WriteSaegim";
import WriteComplete from "./WriteComplete";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: false,
    };
  }
  handleWriteChange = (value) => {
    this.setState({ text: value });
  };
  render() {
    const Written = () => {
      if (this.state.write) {
        return <WriteComplete />;
      } else {
        return <WriteSaegim />;
      }
    };
    return (
      <Wrapper>
        <Container>
          <Zoom in={true}>
            <Written />
          </Zoom>
        </Container>
      </Wrapper>
    );
  }
}
export default Write;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
  background-color: #e6d7bb;
`;
const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
// const Container = styled.div`
//   padding: 8px;
//   position: relative;
//   bottom: 16vh;
//   background-color: #dcc29b;
//   margin-left: 8vw;
//   margin-right: 8vw;
//   width: 84vw;
//   height: 48vh;
//   display: flex;
//   justify-content: space-between;
//   flex-direction: column;
//   border-radius: 16px;
// `;

// const Top = styled.div`
//   justify-content: space-between;
//   align-items: center;
//   display: flex;
// `;
// const Middle = styled.div`
//   justify-content: center;
//   align-items: center;
//   display: flex;
// `;

// const Bottom = styled.div`
//   justify-content: space-between;
//   align-items: center;
//   display: flex;
// `;

// const Text = styled(TextInput)``;
// const Addition = styled.div``;

// const Map = styled(IconButton)`
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   font-size: 16px;
// `;
// const Tag = styled(IconButton)`
//   margin: none;
//   padding: none;
//   justify-content: center;
//   align-items: center;
//   display: flex;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   font-size: 16px;
// `;
