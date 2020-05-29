import React, { Component } from "react";
import styled from "styled-components";
import DefaultButton from "../common/buttons/DefaultButton";
import Card from "../common/cards/Card";
class WriteComplete extends Component {
  go = (path) => {
    return path;
  };
  render() {
    return (
      <Card>

        <DefaultButton text="작성 글" onClick={this.go("/saegim/1")} />
        <DefaultButton text="메인화면" onClick={this.go("/list/")} />
        작성완료! 메세지 보여주는 페이지 1. 작성글 보러가기 2. 메인페이지가기
        </Card>
    );
  }
}
export default WriteComplete;

