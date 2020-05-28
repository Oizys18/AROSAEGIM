import React, {Component} from "react";
import Card from "../common/cards/Card";
// import DefaultButton from "../common/buttons/DefaultButton";
import styled from "styled-components";
import bgImage from "../../assets/images/sample_img.jpg"
import { Zoom } from "@material-ui/core";
import { ArrowBack, Lock, LockOpen } from "@material-ui/icons";

class SaegimDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user_id: '',
      user_name: '',
      contents: '이것은 상세보기에서 보이는 카드',
      images: '',
      w3w: '',
      longitude: '',
      latitude: '',
      registered_datetime: '',
      isLocked: 0,
      like: '',
      tags: ''
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  getSaegimDetail() {
    // 상세정보 가져오는 api 추가
  }

  componentDidMount() {
    this.getSaegimDetail();
  }

  render() {
    return (
      <Zoom in={true}>
      <Wrapper>
      <Contents>
        <BackGround />
        <Location>위 치 자 리</Location>
        <Registered>작 성 시 간</Registered>
        <CardWrapper>
          <Card>
            <div>{this.state.user_name}</div>
            <div>{this.state.contents}</div>
          </Card>
        </CardWrapper>
        <Tags>
          태 그 자 리
        </Tags>
        <LockIcon>
          {this.state.isLocked ? <Lock /> : <LockOpen />}
         </LockIcon>
      </Contents>
      <Communication>
        <Likes>
          <div>공감</div>
          <div>북마크</div>
        </Likes>
        <Comments>
          <div>댓 글 자 리 </div>
        </Comments>
        <div onClick={this.goBack} >
          <ArrowBack />
          뒤로가기 임시자리
        </div>
      </Communication>
      </Wrapper>
      </Zoom>
    );
  }
}

export default SaegimDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const CardWrapper = styled.div `
  grid-area: contents
`

const Contents = styled.div `
  position: relative;
  z-index: 1;
  
  margin-top: 48px;
  height: 50%;
  
  display: grid;
  grid-template-rows: repeat(5, 20%);
  grid-template-columns: repeat(5, 20%);
  grid-template-areas:
    "location location . date date"
    ". contents contents contents ."
    ". contents contents contents ."
    ". contents contents contents ."
    "tags tags tags . isLocked";
`

const BackGround = styled.div `
  position: absolute;
  z-index: -1;
  
  height: 100%;
  width: 100%;
  
  background-image: url(${bgImage});
  background-size: 100% 100%;
  opacity: 0.7;
`

const LockIcon = styled.div `
  grid-area: isLocked;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Tags = styled.div `
  grid-area: tags;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Location = styled.div `
  grid-area: location;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Registered = styled.div `
  grid-area: date;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Communication = styled.div`
  height: 50%;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 0px 16px 0px;
`

const Comments = styled.div`
  padding: 16px
`