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
  changeWrite = () => {
    this.setState({ write: true });
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
