import React, { Component} from "react";
import Card from "../common/cards/Card";
import styled from "styled-components";

class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
      <div className="stack">
        <StackedCard1 className="card">
          <Card children={"카드1"}/>
        </StackedCard1>
        <StackedCard2 className="card">
          <Card children={"카드2"}/>
        </StackedCard2>
        <StackedCard3 className="card">
          <Card children={"카드3"}/>
        </StackedCard3>
        <StackedCard4 className="card">
          <Card children={"카드4"}/>
        </StackedCard4>
      </div>
        </div>
    )
  }
}

export default CardView;

const StackedCard1 = styled.div `
  position: absolute;
  height: 200px;
  z-index: 4;
  bottom: 0;
  transform: scale(1.0);
`

const StackedCard2 = styled.div `
  position: absolute;
  height: 200px;
  z-index: 3;
  bottom: 16px;
  transform: scale(0.90);
`

const StackedCard3 = styled.div `
  position: absolute;
  height: 200px;
  z-index: 2;
  bottom: 32px;
  transform: scale(0.80);
`

const StackedCard4 = styled.div `
  position: absolute;
  height: 200px;
  z-index: 1;
  bottom: 48px;
  transform: scale(0.70);
`