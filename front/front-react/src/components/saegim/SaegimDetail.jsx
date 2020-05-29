import React, {Component} from "react";
import Card from "../common/cards/Card";
// import DefaultButton from "../common/buttons/DefaultButton";
import styled from "styled-components";
import bgImage from "../../assets/images/sample_img.jpg"
import { ArrowBack, Lock, LockOpen } from "@material-ui/icons";
import * as SA from "../../apis/SaegimAPI"
import Time from "../common/time/Time";
import Chip from "../common/chip/Chip"
import { Zoom } from "@material-ui/core";

class SaegimDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tags: []
      }
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  getSaegimDetail = async () => {
    const _data = await SA.getSaegimDetailById(this.props.match.params.id)
    await this.setStateAsync({ data: _data })
  }

  async componentDidMount() {
    await this.getSaegimDetail();
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.data.tags !== prevState.tags) {
    }
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
          <Time regTime={this.state.data.regDate} />
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
          {this.state.data.secret ? <Lock /> : <LockOpen />}
         </LockIcon>
      </Contents>
      <Communication>
        <Likes>
          <div>{this.state.data.userName}</div>
          <div>공감</div>
        </Likes>
        <Comments>
          <div>댓 글 자 리 </div>
        </Comments>
        <div onClick={this.goBack} >
          <ArrowBack />
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