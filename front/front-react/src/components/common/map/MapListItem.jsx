import React, { Component } from "react";
import Card from "../cards/Card";
import DefaultButton from "../buttons/DefaultButton";
import styled from "styled-components";

export default class MapListItem extends Component {
  render() {
    return (
      <CardContainer>
        <Card>
          {this.props.item.title}
          <DefaultButton text="이전 항목" onClick={this.props.prevItem} />
          <DefaultButton text="다음 항목" onClick={this.props.nextItem} />
        </Card>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  width: 300px;
  margin: 0 30px 0 30px;
`