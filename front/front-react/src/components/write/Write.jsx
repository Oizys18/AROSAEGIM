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
        return <WriteSaegim changeWrite={this.changeWrite} />;
      }
    };
    return (
      <Wrapper>
        <Zoom in={true}>
          <Written />
        </Zoom>
      </Wrapper>
    );
  }
}
export default Write;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e6d7bb;
  width: 100vw;
  height: 100vh;
`;
