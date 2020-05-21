import React, { Component } from "react";
import Card from "../cards/Card";
import DefaultButton from "../buttons/DefaultButton";
import styled from "styled-components";

export default class MapListItem extends Component {
  render() {
    return (
      <CardContainer>
        <Card>
          {JSON.stringify(this.props.item)}
          <DefaultButton text="자세히보기" onClick={ ()=>{alert(JSON.stringify(this.props.item))}}/>
        </Card>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  width: 300px;
  margin: 0 30px 0 30px;
`