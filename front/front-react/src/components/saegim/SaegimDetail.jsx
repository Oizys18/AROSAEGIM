import React, {Component} from "react";
import Card from "../common/cards/Card";
// import DefaultButton from "../common/buttons/DefaultButton";
import styled from "styled-components";
import bgImage from "../../assets/images/sample_img.jpg"
import { ArrowBack, Lock, LockOpen } from "@material-ui/icons";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import * as SA from "../../apis/SaegimAPI"
import { getTimeDeltaString } from "../common/time/TimeFunctinon";
import Chip from "../common/chip/Chip"
import { Zoom } from "@material-ui/core";
import SaegimDetailButton from "./SaegimDetailButton";
import PhotoIcon from "@material-ui/icons/Photo";
import Comment from "./Comment";
import Like from "./Like";
import {Storage} from "../../storage/Storage";
import Background from "../common/background/Background";

class SaegimDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tags: [],
        images: []
      },
      regDate: "",
      userId: "",
      updateFlagByLike: false
    };
    this.goBack = this.goBack.bind(this);
    this.setUpdateLike = this.setUpdateLike.bind(this);
  }

  goBack() {
    this.props.history.goBack();
    this.context.idxUpdate(true);
  }

  getSaegimDetail = async () => {
    const _data = await SA.getSaegimDetailById(this.props.match.params.id)
    await this.setStateAsync({ data: _data })
    const _regDate = getTimeDeltaString(this.state.data.regDate)
    this.setState({
      regDate: _regDate
    })
    console.log(this.state.data)
  }

  async componentDidMount() {
    const _userInfo = this.context.userInfo
    if (_userInfo !== {}) {
      this.setState({
        userId: _userInfo.id
      })
    }
    await this.getSaegimDetail();
    console.log(this.state.data.images.length)
  }

  setUpdateLike(flag) {
    this.setState({
      updateFlagByLike: flag
    })
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  render() {
    const PrintChip = this.state.data.tags.map((tag) => {
      return (
        <Chip text={tag.name} key={tag.id}/>
      )
    })

    return (
      <Zoom in={true}>
        <Wrapper>
          <Contents>
            {this.state.data.images.length > 0
              ? <>
                  <BackGround bgImage={this.state.data.images[0]}/>
                  <Image>
                    <StPhotoIcon/>
                    <div>{this.state.data.images.length}</div>
                  </Image>
                </>
              : <BackGround />
            }
            <Location>{this.state.data.w3w}</Location>
            <Registered>
              <StAccessTimeIcon />
              <div>{this.state.regDate}</div>
            </Registered>
            <CardWrapper>
              <Card>
                <StCard>{this.state.data.contents}</StCard>
              </Card>
            </CardWrapper>
            <Tags>
              {PrintChip}
            </Tags>
            <LockIcon>
              {this.state.data.secret ? <Lock/> : <LockOpen/>}
            </LockIcon>
            <BackButton onClick={this.goBack}>
              <ArrowBack/>
            </BackButton>
          </Contents>
          <Communication>
            <Likes>
              <div>{this.state.data.userName}</div>
              <div>
                <Like
                  setUpdateLike={this.setUpdateLike}
                  id={this.props.match.params.id}
                  likes={this.state.data.likes}/>
              </div>
            </Likes>
            <Comments>
              <Comment id={this.props.match.params.id} />
            </Comments>
          </Communication>
          {this.state.userId === this.state.data.userId &&
          <StButton>
            <SaegimDetailButton id={this.props.match.params.id}/>
          </StButton>
          }
        </Wrapper>
      </Zoom>
    )
  }
}

export default SaegimDetail;
SaegimDetail.contextType = Storage;

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
  grid-template-columns: 14% 24% 24% 24% 14%;
  grid-template-areas:
    "goBack location location date date"
    ". contents contents contents image"
    ". contents contents contents ."
    ". contents contents contents ."
    "tags tags tags . isLocked";
  align-items: center;
`;

const BackGround = styled.div `
  position: absolute;
  z-index: -1;
  
  height: 100%;
  width: 100%;
  
  background-image: url(${props => props.bgImage});
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
  justify-content: flex-start;
  color: white;
  margin-left: 24px;
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

const StAccessTimeIcon = styled(AccessTimeIcon)`
  margin-right: 4px;
`;

const Communication = styled.div`
  height: 50%;
  background-color: white;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 0 16px 0;
`

const Comments = styled.div`
  padding: 16px
`

const StButton = styled.div`
  position: absolute;
  bottom: 10%;
  right: 5%;
`;

const BackButton= styled.div`
  grid-area: goBack;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Image = styled.div`
  grid-area: image;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StPhotoIcon = styled(PhotoIcon)`
  margin-right: 4px;
`;

const StCard = styled.div`
  min-height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`;