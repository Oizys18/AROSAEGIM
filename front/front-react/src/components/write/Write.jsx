import React, { Component } from "react";
import styled from "styled-components";
// import Zoom from "@material-ui/core/Zoom";
import { Zoom, Slide } from "@material-ui/core";
import {Storage} from '../../storage/Storage'
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
      <StCont>
        <Slide in={true} direction="left" timeout={300}>
          <Wrapper height={this.context.appHeight}>
            <Container>
              <Written />
            </Container>
          </Wrapper>
        </Slide>
      </StCont>
    );
  }
}
export default Write;
Write.contextType = Storage;

const StCont = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  /* background-color: #e6d7bb; */
  height: ${props => props.height}px;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
