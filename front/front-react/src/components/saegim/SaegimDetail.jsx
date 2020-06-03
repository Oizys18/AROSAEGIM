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
import {getUserByEmail} from "../../apis/AccountAPI";
import Comment from "./Comment";
import Like from "./Like";
import {Storage} from "../../storage/Storage";

class SaegimDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tags: []
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
  }

  async componentDidMount() {
    const _userInfo = this.context.userInfo
    if (_userInfo !== {}) {
      this.setState({
        userId: _userInfo.id
      })
    }
    await this.getSaegimDetail();
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
            <BackGround bgImage={this.state.data.image ? this.state.data.image : bgImage}/>
            <Location>{this.state.data.w3w}</Location>
            <Registered>
              <StAccessTimeIcon />
              <div>{this.state.regDate}</div>
            </Registered>
            <CardWrapper>
              <Card>
                <div>{this.state.data.contents}</div>
              </Card>
            </CardWrapper>
            <Tags>
              {PrintChip}
            </Tags>
            <LockIcon>
              {this.state.data.secret ? <Lock/> : <LockOpen/>}
            </LockIcon>
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
          <BackButton onClick={this.goBack}>
            <ArrowBack/>
          </BackButton>
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
  grid-template-columns: repeat(5, 20%);
  grid-template-areas:
    "location location location date date"
    ". contents contents contents ."
    ". contents contents contents ."
    ". contents contents contents ."
    "tags tags tags . isLocked";
  align-items: center;
`

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
  position: absolute;
  bottom: 10%;
  left: 5%;
`;