import React, { Component } from "react";
import styled from "styled-components";

class TutorialItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }
  render() {
    const PageChecker = () => {
      if (this.props.page === 0) {
        return <div>Hello 0</div>;
      } else if (this.props.page === 1) {
        return <div>Hello 1</div>;
      } else if (this.props.page === 2) {
        return <div>Hello 2</div>;
      } else {
        return <div>Hello 3</div>;
      }
    };

    return (
      <Wrapper>
        <PageChecker />
      </Wrapper>
    );
  }
}
export default TutorialItem;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  opacity: 0.4;
  justify-content: center;
  align-items: center;
  display: flex;
`;
