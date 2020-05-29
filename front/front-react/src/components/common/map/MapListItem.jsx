import React, { Component } from "react";
import Card from "../cards/Card";
import DefaultButton from "../buttons/DefaultButton";
import styled from "styled-components";
import locationPin from "../../../assets/point/point-notfilled@2x.png";
import timeIcon from "../../../assets/time/time@2x.png";
import balloonIcon from "../../../assets/balloon/balloon-whole@2x.png";

export default class MapListItem extends Component {
  render() {
    return (
      <CardViewContainer>
        <Card>
          <div style={{ overflowWrap: "anywhere" }}>
            {this.props.item ? this.props.item.contents : ""}
          </div>
          <StFlexContainer>
            <StLocationIcon />
            <StText>{this.props.item ? ' ' + this.props.item.w3w : " "}</StText>
          </StFlexContainer>
          <StFlexContainer>
            <StTimeIcon />
            <StText>{this.props.item ? ' ' + new Date(this.props.item.regDate).toDateString() : " "}</StText>
          </StFlexContainer>
          <StButtonWrapper>
            <DefaultButton
              text="자세히보기"
              onClick={() => {
                alert(JSON.stringify(this.props.item));
              }}
            />
            <DefaultButton text="닫기" onClick={this.props.closeItem} />
          </StButtonWrapper>
        </Card>
      </CardViewContainer>
    );
  }
}

const CardViewContainer = styled.div`
  position: absolute;
  width: auto;
  max-width: 100%;
  z-index: 5;
  bottom: 120px;
`;

const StFlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StLocationIcon = styled.div`
  margin: 2px;
  width: 15px;
  height: 20px;
  background-image: url(${locationPin});
  background-size: cover;
`;

const StTimeIcon = styled.div`
  margin: 2px;
  width: 20px;
  height: 20px;
  background-image: url(${timeIcon});
  background-size: cover;
`;

const StText = styled.div``;

const StButtonWrapper = styled.div`
  padding-top: 8px;
`;

