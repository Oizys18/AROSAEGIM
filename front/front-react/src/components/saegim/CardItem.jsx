import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import "./CardItem.css";
import { Lock, Photo, AccessTime, CreateOutlined  } from "@material-ui/icons";
import Chip from "../common/chip/Chip";
import { getTimeDeltaString } from "../common/time/TimeFunctinon";
import PinIcon from "../../assets/PinIcon";
import { FlexColumn, FlexRow } from "../../styles/DispFlex";
import Card from "../common/cards/Card";

class CardItem extends Component {
  listElement;
  wrapper;

  dragStartX = 0;
  left = 0;
  dragged = false;

  startTime;
  fpsInterval = 1000/60;

  constructor(props) {
    super(props);
    this.state = {
      currentId: 0,
      colors: ['#FBF2EE', '#f4c6ba', '#f3b3a6', '#d69f94', '#B98B82', '#A76E62' ],
      regDate: ""
    }
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onClicked = this.onClicked.bind(this);
    this.onSwiped = this.onSwiped.bind(this);
  }

  changeOrder() {
    this.setState({
      currentId: this.props.saegim.id
    })
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
    this.changeOrder()
    this.getRegDate()
  }

  onDragStartMouse(e) {
    this.onDragStart(e.clientX);
    window.addEventListener("mousemove", this.onMouseMove)
  }

  onDragStartTouch(e) {
    const _touch = e.targetTouches[0];
    this.onDragStart(_touch.clientX);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.listElement.className = "ListItem";
    this.startTime = Date.now();
    this.changeOrder()
    this.listElement.style.transition = "none";
    this.listElement.style.animation = "none"
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(e) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(e) {
    window.removeEventListener("touchmove", this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;
      if (Math.abs(this.left) > this.listElement.offsetWidth / 2) {
        this.left = -this.listElement.offsetWidth * 2;
        this.wrapper.style.maxHeight = 0;
        this.listElement.style.transform = `translateX(${this.left}px)`;
        this.onChangeData(this.props.idx)
        this.onSwiped();
      }
      this.left = 0;
      if (this.state.currentId !== this.props.saegim.id) {
        this.listElement.style.animation = 'zoom 1s ease-out';
        this.listElement.style.transform = `translateX(${this.left}px)`;
      } else {
        this.listElement.style.transition = `all ease 0.5s`;
        this.listElement.style.transform = `translateX(${this.left}px)`;
      }
    }
  }

  onMouseMove(e) {
    const _left = e.clientX - this.dragStartX;
    if (_left < 0 ) {
      this.left = _left;
    }
  }

  onTouchMove(e) {
    const _touch = e.targetTouches[0];
    const _left = _touch.clientX - this.dragStartX;
    if (_left < 0) {
      this.left = _left;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const _now = Date.now();
    const _elapsed = _now - this.startTime;

    if (this.dragged && _elapsed > this.fpsInterval) {
      this.listElement.style.transform = `translateX(${this.left}px)`;
      this.startTime = Date.now();
    }
  }

  onClicked() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onSwiped() {
    if (this.props.onSwipe) {
      this.props.onSwipe();
    }
  }

  onChangeData() {
    this.props.onChangeData()
  }

  getRegDate = () => {
    if (this.props.saegim.regDate !== undefined) {
      const _regDate = getTimeDeltaString(this.props.saegim.regDate)
      this.setState({regDate: _regDate})
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.saegim !== this.props.saegim) {
      this.getRegDate()
    }
  }

  render() {
    const saegim = this.props.saegim;
    const idx = this.props.idx;
    const length = this.props.length;
    const PrintTags = saegim.tags.slice(0, 3).map((tag) => {
      return <StChip size='small' text={tag.name} key={tag.id} idx={idx} />
    })
    return (
      <div className="Wrapper" ref={div => (this.wrapper = div)}>
        <StackedCard idx={idx} length={length} >
            <div
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: "480px"
              }}
              onClick={this.onClicked}
              ref={div => (this.listElement = div)}
              onMouseDown={this.onDragStartMouse}
              onTouchStart={this.onDragStartTouch}
              className="ListItem"
            >
              <Card
                color={this.state.colors[idx]}
                subcolor={this.state.colors[idx+1]}
              >
                <StCard>
                  <Top>
                    <Location>
                      <PinIcon />{saegim.w3w}
                    </Location>
                    <Registered>
                      <StTime>
                        <StAccessTimeIcon />
                        <div>{this.state.regDate}</div>
                      </StTime>
                    </Registered>
                  </Top>
                  <Top>
                    <StIcon>
                      <StPhotoIcon/>
                      <div>{saegim.filesCount}</div>
                      {/* <div>{saegim.imagesCount}</div> */}
                    </StIcon>
                    <Tags>
                      {PrintTags}
                      {saegim.tags.length > 3
                        && <StChip size='small' text='..' idx={idx}/>
                      }
                    </Tags>
                  </Top>
                  <ContentsBox>
                    {saegim.secret
                      ? <ContentsL>
                          <Lock />
                          비밀글
                        </ContentsL>
                      : <Contents>{saegim.contents}</Contents>
                    }
                  </ContentsBox>
                  <Bottom>
                    <User>
                      <StCreateOutlined />
                      <UserName>{saegim.userName}</UserName>
                    </User>
                    <StLink to={`list/${saegim.id}`}>
                      더보기
                    </StLink>
                  </Bottom>
                </StCard>
              </Card>
            </div>
          </StackedCard>
      </div>
    )
  }
}

export default CardItem;

const StLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:active {
      opacity: 60%;
    }
    align-self: right;
    font-size: 1rem;
    font-weight: bold;
    color: #B98B82;
`;

const StCard = styled.div`
  height: 40vh;
  width: 100%;
  /* width: 80vw; */
  /* max-width: 480px; */
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: 4vh;
  font-size: 0.9rem;
  padding: 0 16px 0 16px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: 5vh;
  font-size: 0.9rem;
  padding: 0 16px 0 16px;
`;

const StPhotoIcon = styled(Photo)`
  margin-right: 4px;
`;

const StIcon = styled(FlexRow)``;
const Tags = styled(FlexRow)``;

const ContentsBox = styled(FlexColumn)`
  height: 23vh;
  /* width: 80vw; */
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 20px;
  margin: 2vh 1vw;
  text-align: center;
`;

const Contents = styled.div`
  /* width: 60vw; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`

const ContentsL = styled(FlexRow)`
  grid-area: contents;
  color: #616161;
`;

const User = styled(FlexRow)``;

const UserName = styled.div`
  font-size: 1rem;
`;

const StCreateOutlined = styled(CreateOutlined)`
  margin-right: 4px;
  color: rgba(0, 0, 0, 0.7);
`;

const Location = styled(FlexRow)`
  grid-area: location;
`

const Registered = styled.div`
  grid-area: date;
`

const zoom = keyframes`
  from { transform: none; }
  to { transform: scale(${props => 1.0 - props.idx * 0.05}); }
`

const StackedCard = styled.div`
  width: 100%;
  position: absolute;
  z-index: ${props => props.length - props.idx};
  bottom: ${props => 20 + props.idx * 3}%;
  transform: scale(${props => 1.0 - ((props.idx+1) * 0.05)});
  animation: ${zoom} 2s ease;
  display: ${props => props.idx > 4 && 'none'};
`

const StTime = styled(FlexRow)``;

const StAccessTimeIcon = styled(AccessTime)`
  margin-right: 4px;
`;

const StChip = styled(Chip)`
  margin-left: 4px;
  background-color: ${props => props.idx===0 ? '#f4c6ba' : '#FBF2EE' };
`;