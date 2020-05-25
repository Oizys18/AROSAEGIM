import React, { Component } from "react";
import Card from "../cards/Card";
import DefaultButton from "../buttons/DefaultButton";
import styled from "styled-components";

export default class MapListItem extends Component {
  render() {
    return (
      <CardContainer>
        <Card>
          <div style={{overflowWrap: 'anywhere'}}>{JSON.stringify(this.props.item)}</div>
          <DefaultButton text="자세히보기" onClick={ ()=>{alert(JSON.stringify(this.props.item))}}/>
          <DefaultButton text="닫기" onClick={this.props.closeItem}/>
        </Card>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  width: auto;
  max-width: 100%;
`