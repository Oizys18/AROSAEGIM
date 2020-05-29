import React, { Component } from "react";
import styled from "styled-components";
// import Zoom from "@material-ui/core/Zoom";
import { Zoom, Slide } from "@material-ui/core";
import WriteSaegim from "./WriteSaegim";
import WriteComplete from "./WriteComplete";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: false,
      id: null,
    };
  }
  changeWrite = (data) => {
    this.setState({ write: true });
    this.setState({ id: data.data.id });
    // console.log(data.data.id)
  };
  render() {
    const Written = () => {
      if (this.state.write) {
        return <WriteComplete id={this.state.id} />;
      } else {
        return <WriteSaegim changeWrite={this.changeWrite} />;
      }
    };
    return (
      <Slide in={true} direction="left">
        <Wrapper>
          <Container>
            <Written />
          </Container>
        </Wrapper>
      </Slide>
    );
  }
}
export default Write;

const Wrapper = styled.div`
  background-color: #e6d7bb;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
