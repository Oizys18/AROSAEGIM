import React, { Component } from "react";
import styled from "styled-components";

class TutorialItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      content: null,
    };
  }
  render() {
    return (
      <Wrapper>
        <Container></Container>
      </Wrapper>
    );
  }
}
export default TutorialItem;

const Wrapper = styled.div``;
const Container = styled.div``;
