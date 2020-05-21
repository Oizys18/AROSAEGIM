import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import DefaultButton from "../common/buttons/DefaultButton";
import Card from "../common/cards/Card";

class CardItem extends Component {
  listElement;
  wrapper;
  // background;

  dragStartX = 0;
  left = 0;
  dragged = false;

  startTime;
  fpsInterval = 1000/60;

  constructor(props) {
    super(props);

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

  componentDidMount() {
    console.log(this.props)
    console.log(this.props.zIndex)
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
  }

  componentWillMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
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
      this.listElement.className = "BouncingListItem";
      this.left = 0;
      this.listElement.style.transform = `translateX(${this.left}px)`;
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

  render() {
    const saegim = this.props.saegim;
    const idx = this.props.idx;
    const length = this.props.length
    return (
      <div className="Wrapper" ref={div => (this.wrapper = div)}>
        <StackedCard idx={idx} length={length}>
          <StCard>
            <div
              onClick={this.onClicked}
              ref={div => (this.listElement = div)}
              onMouseDown={this.onDragStartMouse}
              onTouchStart={this.onDragStartTouch}
              className="ListItem"
            >
              <Card>
                <div>
                  {saegim.id}
                </div>
                <div>
                  {saegim.contents}
                </div>
                <StLinkDiv>
                <StLink to={{pathname: `/list/${saegim.id}/`}}>
                  더보기
                </StLink>
                  </StLinkDiv>
              </Card>
            </div>
          </StCard>
          </StackedCard>
      </div>
    )
  }
}

export default CardItem;

const StLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    &:focus, &:hover, &:active {
      opacity: 60%;
    }
    align-self: right;
  `

const StLinkDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StCard = styled.div`

`

const StackedCard = styled.div `
  position: absolute;
  z-index: ${props => props.length - props.idx};
  bottom: ${props => 20 + props.idx * 3}%;
  transform: scale(${props => 1.0 - props.idx * 0.05});
`