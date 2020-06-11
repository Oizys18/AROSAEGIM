import React, { Component } from "react";
import styled from "styled-components";
import { Slide } from "@material-ui/core";
import { Storage } from "../../storage/Storage";
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
  };
  render() {
    return (
      <StCont>
        <Slide
          in={true}
          direction="left"
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <Wrapper height={this.context.appHeight}>
            <Container>
              {this.state.write ? (
                <WriteComplete id={this.state.id} />
              ) : (
                <WriteSaegim changeWrite={this.changeWrite} />
              )}
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
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 480px;
  height: ${(props) => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;
