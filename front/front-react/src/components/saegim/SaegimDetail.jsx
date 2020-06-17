import React, { Component } from "react";
import styled from "styled-components";
import {
  ArrowBack,
  Lock,
  AccessTime,
  ArrowBackIos,
  ArrowForwardIos,
  Photo,
  Close,
} from "@material-ui/icons";
import * as SA from "../../apis/SaegimAPI";
import { getUserByID } from "../../apis/UserAPI";
import { getTimeDeltaString } from "../common/time/TimeFunctinon";
import Chip from "../common/chip/Chip";
import { Zoom, Avatar, Modal, MobileStepper, Button } from "@material-ui/core";
import SaegimDetailButton from "./SaegimDetailButton";
import Comment from "./Comment";
import Like from "./Like";
import { Storage } from "../../storage/Storage";
import { FlexRow, FlexColumn } from "../../styles/DispFlex";
import Loading from "../common/background/Loading";
import PinIcon from "../../assets/PinIcon";
import saegimRowImg from "../../assets/saegimRow/saegim-row-85.png";

class SaegimDetail extends Component {
  isLoading = true;

  constructor(props) {
    super(props);
    this.state = {
      data: {
        tags: [],
        // images: [],
        files: [],
      },
      regDate: "",
      userId: "",
      updateFlagByLike: false,
      curImage: -1,
      open: false,
      activeStep: 0,
      maxSteps: 0,
      detailColor:
        "linear-gradient(#FBF2EE,#ffffff38),linear-gradient(-45deg,#f3b3a6,#ffffff00),linear-gradient(45deg,#ff6b6b,#ffffff40)",
      user: {},
      isUser: 0,
      isLoading: true,
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
      open: status,
    });
  }

  handleOpen = () => {
    this.setOpen(true);
  };

  handleClose = () => {
    this.setOpen(false);
  };

  setActiveStep(step) {
    this.setState({
      activeStep: step,
    });
  }

  handleNext = () => {
    this.setActiveStep(this.state.activeStep + 1);
  };

  handleBack = () => {
    this.setActiveStep(this.state.activeStep - 1);
  };

  getSaegimDetail = async () => {
    // console.log(this.props.match.params.id)
    const _data = await SA.getSaegimDetailById(this.props.match.params.id)
    // console.log(_data)
    await this.setStateAsync({ data: _data })

    const _user = await getUserByID(this.state.data.userId);
    await this.setStateAsync({ user: _user });
  };

  getRegDate = () => {
    if (this.state.data.regDate !== undefined) {
      const _regDate = getTimeDeltaString(this.state.data.regDate);
      this.setState({ regDate: _regDate });
    }
  };

  setIsUser = () => {
    if (this.state.data.secret) {
      if (this.state.userId === this.state.data.userId) {
        this.setStateAsync({
          isUser: 2,
        });
      } else {
        this.setState({
          isUser: 1,
        });
      }
    }
  };

  switchImage = () => {
    if (this.state.curImage < this.state.data.files.length - 1) {
      this.setState({
        curImage: this.state.curImage + 1,
      });
    } else {
      this.setState({
        curImage: 0,
      });
    }
    return this.state.curImage;
    // if (this.state.curImage < this.state.data.images.length - 1) {
    //   this.setState({
    //     curImage: this.state.curImage + 1
    //   });
    // } else {
    //   this.setState({
    //     curImage: 0
    //   });
    // }
    // return this.state.curImage;
  };

  async componentDidMount() {
    const _userInfo = this.context.userInfo;
    if (_userInfo !== {}) {
      this.setState({
        userId: _userInfo.id,
      });
    }
    await this.getSaegimDetail();
    this.setStateAsync({
      maxSteps: this.state.data.files.length,
      // maxSteps: this.state.data.images.length
    });
    await this.setIsUser();
    await this.getRegDate();

    this.isLoading = false;
    this.startTimer = setTimeout(
      this.setState({
        curImage: this.state.curImage + 1,
      }),
      5000
    );
  }

  setUpdateLike(flag) {
    this.setState({
      updateFlagByLike: flag,
    });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.curImage !== prevState.curImage) {
      this.timer = setTimeout(this.switchImage, 5000);
    }
    this.regTimer = setTimeout(this.getRegDate, 30000);
    if (this.context.updateFlag === 1) {
      this.props.history.push("list");
      this.context.setUpdateFlag(0);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.startTimer);
    clearTimeout(this.timer);
    clearTimeout(this.regTimer);
  }

  newLineContent = (contents) => {
    return contents.split("\n").map((el, index) => {
      return (
        <span key={index}>
          {el}
          <br />
        </span>
      );
    });
  };

  render() {
    if (this.isLoading === true) {
      return <Loading />;
    } else {
      const PrintChip = this.state.data.tags.map((tag) => {
        return <StChip text={tag.name} key={tag.id} />;
      });
      return (
        <Zoom in={true}>
          <Wrapper>
            {/* {this.state.data.images.length > 0 && */}
            {this.state.data.files.length > 0 && (
              <Modal open={this.state.open}>
                <>
                  <ImageWrapper>
                    <StClose onClick={this.handleClose}>
                      <Close />
                    </StClose>
                    <StImg
                      src={this.state.data.files[this.state.activeStep].url}
                      alt={this.state.data.files[this.state.activeStep]}
                    />
                    <StMobileStepper
                      steps={this.state.maxSteps}
                      position="static"
                      variant="dots"
                      activeStep={this.state.activeStep}
                      nextButton={
                        <Button
                          onClick={this.handleNext}
                          disabled={
                            this.state.activeStep === this.state.maxSteps - 1
                          }
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
            )}
            <TopBar>
              <StTopBarR>
                <BackButton onClick={this.goBack}>
                  <ArrowBack />
                </BackButton>
                {this.state.userId === this.state.data.userId && (
                  <SaegimDetailButton id={this.props.match.params.id} />
                )}
              </StTopBarR>
              <StCont>
                <StNick>{this.state.user.name}</StNick>
                <Avatar src={this.state.user.profileImage} />
              </StCont>
            </TopBar>
            <Contents>
              {this.state.data.files.length > 0 && this.state.isUser !== 1 && (
                <BackGround
                  bgImage={this.state.data.files[this.state.curImage].url}
                />
              )}
              <W3WChip>
                <Chip
                  size="medium"
                  text={this.state.data.w3w}
                  icon={<PinIcon />}
                  style={{ boxShadow: "0 1px 2px gray" }}
                />
              </W3WChip>
              <CardWrapper>
                <StCard>
                  {this.state.isUser !== 1 ? (
                    this.newLineContent(this.state.data.contents)
                  ) : (
                    <p>
                      {"비밀글입니다."}
                      <br />
                      {"작성자만 볼 수 있습니다."}
                    </p>
                  )}
                </StCard>
              </CardWrapper>
              <ContentsBot>
                <LockIcon>
                  {this.state.data.secret ? (
                    <Lock />
                  ) : (
                    <Lock style={{ display: "none" }} />
                  )}
                </LockIcon>
                {this.state.data.files.length > 0 ? (
                  <Image>
                    <StPhotoIcon onClick={this.handleOpen} />
                    <div>{this.state.data.files.length}</div>
                  </Image>
                ) : (
                  <Image style={{ display: "none" }}>
                    <StPhotoIcon />
                  </Image>
                )}
              </ContentsBot>
            </Contents>
            <Communication>
              <BotWrapper>
                <Registered>
                  <StAccessTime />
                  {this.state.regDate}
                </Registered>
                <Likes>
                  <Like
                    setUpdateLike={this.setUpdateLike}
                    id={this.props.match.params.id}
                    likes={this.state.data.likes}
                  />
                </Likes>
              </BotWrapper>
              <Tags>{PrintChip}</Tags>
              <Comment id={this.props.match.params.id} />
            </Communication>
          </Wrapper>
        </Zoom>
      );
    }
  }
}

export default SaegimDetail;
SaegimDetail.contextType = Storage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  padding: 8px 24px 8px 24px;
  justify-content: space-between;
  align-items: center;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 48px;
    background: black;
    opacity: 0.6;
    content: "";
  }

  color: white;
`;

const BackButton = styled(FlexRow)``;

const StCont = styled(FlexRow)`
  .MuiAvatar-root {
    max-width: 30px;
    max-height: 30px;
  }
`;

const StNick = styled.div`
  word-break: break-all;
  margin: 0 16px 0 16px;
`;

const W3WChip = styled.div`
  z-index: 3;
  justify-content: space-between;
  align-items: center;
  display: flex;

  position: absolute;
  top: 2%;
  left: 50%;
  transform: translateX(-50%);

  .MuiChip-root {
    background-color: #fafafa;
  }
`;

const Contents = styled(FlexColumn)`
  position: relative;
  z-index: 1;
  height: 50%;
`;

const BackGround = styled.div`
  position: absolute;
  z-index: -1;

  height: 100%;
  width: 100%;

  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 8%;
  width: 85vw;
  height: 32vh;
  max-width: 800px;
  padding: 18px 8px 8px 8px;
  background-color: #f4c6ba;
  border-radius: 16px;
`;
const StCard = styled.div`
  max-height: 100%;
  word-break: keep-all;
  overflow: auto;
  height: 31vh;
  background: url(${saegimRowImg}) repeat-y;
  line-height: 25px;
  padding-left: 35px;
  border-radius: 16px;
  font-family: "Noto Serif KR", serif;
  font-size: 15px;
`;

const BotWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Registered = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 16px 8px 8px 16px;
`;

const StAccessTime = styled(AccessTime)`
  margin-right: 8px;
`;

const Tags = styled.div`
  grid-area: tags;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fafafa;
  margin: 0 16px 8px 16px;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 16px 8px 16px;
`;

const ContentsBot = styled.div`
  position: absolute;
  bottom: 5%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LockIcon = styled.div`
  color: #fafafa;
  margin-left: 32px;
`;

const Communication = styled.div`
  height: 50%;
  background-color: white;
`;

const Image = styled(FlexRow)`
  color: #fafafa;
  margin-right: 32px;
`;

const StPhotoIcon = styled(Photo)`
  margin-right: 4px;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StMobileStepper = styled(MobileStepper)`
  border-radius: 0 0 15px 15px;

  &.MuiMobileStepper-dotActive {
    color: #ff6262;
  }
`;

const ImageWrapper = styled.div`
  padding: 24px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const StClose = styled.div`
  padding: 8px;
  background: #fafafa;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 15px 15px 0 0;
`;

const StTopBarR = styled(FlexRow)``;

const StChip = styled(Chip)`
  margin-right: 4px;
  background-color: #fbf2ee;
  box-shadow: 1px 0 2px gray;
`;
