import React, {Component} from "react";
import Card from "../common/cards/Card";
import styled from "styled-components";
import { ArrowBack, Lock, AccessTime, ArrowBackIos, ArrowForwardIos, Photo, Close  } from "@material-ui/icons";
import * as SA from "../../apis/SaegimAPI"
import { getUserByID } from "../../apis/UserAPI"
import { getTimeDeltaString } from "../common/time/TimeFunctinon";
import Chip from "../common/chip/Chip"
import { Zoom, Avatar, Modal, MobileStepper, Button } from "@material-ui/core";
import SaegimDetailButton from "./SaegimDetailButton";
import Comment from "./Comment";
import Like from "./Like";
import {Storage} from "../../storage/Storage";
import {FlexRow} from "../../styles/DispFlex";

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
      updateFlagByLike: false,
      curImage: -1,
      open: false,
      activeStep: 0,
      maxSteps: 0,
      detailColor: "linear-gradient(#FBF2EE,#ffffff38),linear-gradient(-45deg,#f3b3a6,#ffffff00),linear-gradient(45deg,#ff6b6b,#ffffff40)",
      user: {}
    };
    this.goBack = this.goBack.bind(this);
    this.setUpdateLike = this.setUpdateLike.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setActiveStep = this.setActiveStep.bind(this);
  }

  goBack() {
    this.props.history.goBack();
    this.context.idxUpdate(true);
  }

  setOpen(status) {
    this.setState({
      open: status
    })
  }

  handleOpen = () => {
    this.setOpen(true)
  }

  handleClose = () => {
    this.setOpen(false)
  }

  setActiveStep(step) {
    this.setState({
      activeStep: step
    })
  }

  handleNext = () => {
    this.setActiveStep(this.state.activeStep + 1)
  }

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1)
  }

  getSaegimDetail = async () => {
    const _data = await SA.getSaegimDetailById(this.props.match.params.id)
    await this.setStateAsync({ data: _data })

    const _user = await getUserByID(this.state.data.userId)
    await this.setStateAsync({ user: _user })

    const _regDate = getTimeDeltaString(this.state.data.regDate)
    this.setState({ regDate: _regDate })
  }

   switchImage = () => {
    if (this.state.curImage < this.state.data.images.length - 1) {
      this.setState({
        curImage: this.state.curImage + 1
      });
    } else {
      this.setState({
        curImage: 0
      });
    }
    return this.state.curImage;
  }

  async componentDidMount() {
    setTimeout(this.setState({
      curImage: this.state.curImage + 1
    }), 5000)
    const _userInfo = this.context.userInfo
    if (_userInfo !== {}) {
      this.setState({
        userId: _userInfo.id
      })
    }
    await this.getSaegimDetail();
    this.setStateAsync({
      maxSteps: this.state.data.images.length
    })
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.curImage !== prevState.curImage) {
      this.timer = setTimeout(this.switchImage, 5000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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
          {this.state.data.images.length > 0 &&
            <Modal
              open={this.state.open}
              >
              <>
              <ImageWrapper>
                <StClose onClick={this.handleClose}>
                  <Close />
                </StClose>
                <StImg
                  src={this.state.data.images[this.state.activeStep].source}
                  alt={this.state.data.images[this.state.activeStep]}
                />
                <StMobileStepper
                  steps={this.state.maxSteps}
                  position="static"
                  variant="dots"
                  activeStep={this.state.activeStep}
                  nextButton={
                    <Button
                      onClick={this.handleNext}
                      disabled={this.state.activeStep === this.state.maxSteps - 1}
                    >
                      <ArrowForwardIos />
                    </Button>
                  }
                  backButton={
                    <Button
                      onClick={this.handleBack}
                      disabled={this.state.activeStep === 0}
                    >
                      <ArrowBackIos />
                    </Button>
                  }
                />
              </ImageWrapper>
            </>
            </Modal>
          }
          <TopBar>
            <BackButton onClick={this.goBack}>
              <ArrowBack/>
            </BackButton>
            <StCont>
                <StNick>{this.state.user.name}</StNick>
                <Avatar src={this.state.user.profileImage}/>
              </StCont>
          </TopBar>
          <Contents>
            {this.state.data.images.length > 0
              && <BackGround bgImage={this.state.data.images[this.state.curImage].source}/>
            }
            <W3WChip>
              <Chip
                size="medium"
                text={"/// " + this.state.data.w3w}
              />
            </W3WChip>
            <CardWrapper>
              <Card color={this.state.detailColor}>
                <StCard>{this.state.data.contents}</StCard>
              </Card>
            </CardWrapper>
            <ContentsBot>
              <LockIcon>
                {this.state.data.secret ? <Lock /> : <Lock style={{ display: 'none'}}/>}
              </LockIcon>
              {this.state.data.images.length > 0
                ?
                  <Image>
                    <StPhotoIcon onClick={this.handleOpen}/>
                    <div>{this.state.data.images.length}</div>
                  </Image>
                : <Image style={{ display: 'none'}}>
                    <StPhotoIcon/>
                  </Image>
              }
            </ContentsBot>
          </Contents>
          <Communication>
            <BotWrapper>
              <Registered>
                <StAccessTime />
                {this.state.regDate}
              </Registered>
              <Likes>
                <div>
                <Like
                  setUpdateLike={this.setUpdateLike}
                  id={this.props.match.params.id}
                  likes={this.state.data.likes}/>
                </div>
              </Likes>
            </BotWrapper>
            <Tags>
              {PrintChip}
            </Tags>
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

const TopBar = styled.div`
  display: flex;
  padding: 8px 24px 8px 24px;
  justify-content: space-between;
  align-items: center;
  
  &:before{
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 48px;
    background: black;
    opacity: 0.6;
    content: '';
  }
  
  color: white;
`;

const BackButton= styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StCont = styled(FlexRow)`
  .MuiAvatar-root{
    max-width: 30px;
    max-height: 30px;
  }
`;

const StNick = styled.div`
  word-break: break-all;
  margin: 0 16px 0 16px;
`;

const W3WChip = styled.div`
  margin: 0 4vh 4vh 4vh;
  justify-content: space-between;
  align-items: center;
  display: flex;
  
  .MuiChip-root{
    background-color: #fafafa;
  }
`;

const Contents = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  z-index: 1;

  height: 50%;
`;

const BackGround = styled.div `
  position: absolute;
  z-index: -1;

  height: 100%;
  width: 100%;
  
  background-image: url(${props => props.bgImage});
  background-size: 100% 100%;
  opacity: 0.9;
`

const CardWrapper = styled.div `
  max-width: 80%;
`

const BotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Registered = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 16px 8px 8px 24px;
`

const StAccessTime = styled(AccessTime)`
  margin-right: 8px;
`;

const Tags = styled.div `
  grid-area: tags;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fafafa;
  margin: 0 8px 8px 24px;
`

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 16px 8px 24px;
  margin-right: 24px;
`

const ContentsBot = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LockIcon = styled.div `
  color: #fafafa;
  margin-left: 32px;
`

const Communication = styled.div`
  height: 50%;
  background-color: white;
`

const Comments = styled.div`
  padding: 16px;
`

const StButton = styled.div`
  position: fixed;
  bottom: 5%;
  right: 16px;
`;

const Image = styled.div`
  color: #fafafa;
  margin-right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StPhotoIcon = styled(Photo)`
  margin-right: 4px;
`;

const StCard = styled.div`
  min-height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StMobileStepper = styled(MobileStepper)`
  border-radius: 0 0 15px 15px;
`;

const ImageWrapper = styled.div`
  padding: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StClose = styled.div`
  padding: 8px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 15px 15px 0 0;
`;
