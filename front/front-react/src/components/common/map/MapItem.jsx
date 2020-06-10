/*global kakao*/
import React, { Component } from "react";
import styled from "styled-components";
import imgLeft from "../../../assets/balloon/balloon-left-filled@2x.png";
import imgMiddle from "../../../assets/balloon/balloon-middle-filled@2x.png";
import imgRight from "../../../assets/balloon/balloon-right-filled@2x.png";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { getTimeDeltaString } from "../time/TimeFunctinon";
import { Link } from "react-router-dom";
import Chip from "../chip/Chip";
import PinIcon from "../../../assets/PinIcon"
import locationPin from "../../../assets/point/point-filled@2x.png";
import timeIcon from "../../../assets/time/time@2x.png";

class MapItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: false,
    }
    this.myRef = React.createRef();
  }
  componentDidMount() {
    if (!this.state.on && !!this.props.map ) {
      // do something
      // this.showOnMap();
    }
  }

  componentDidUpdate() {
    if (!this.state.on && !!this.props.map ) {
      // do something
      // this.showOnMap();
    } 
  }

  componentWillUnmount() {
    // this.customOverlay.setMap(null);
  }

  // initial map overlay
  showOnMap = () => {
    const customOverlay = new kakao.maps.CustomOverlay({
      position: new kakao.maps.LatLng(
        this.props.item.latitude,
        this.props.item.longitude
      ),
      content: this.myRef.current,
      yAnchor: 1,
      clickable: false,
    });
    customOverlay.setMap(this.props.map);
    this.customOverlay = customOverlay;
    this.setState({
      on: true,
    })
  };

  // deliver state item to parent
  clickEvent = (e) => {
    e.preventDefault();
    this.props.selectItem(this.props.item.id);
  };

  // show on map
  showItem = () => {
    this.customOverlay.setMap(this.props.map);
  };

  // hide from map
  hideItem = () => {
    this.customOverlay.setMap(null);
  };

  detailItem = () => {
    return <StDetailCont>
      <StFlexContainer>
        <StLocationIcon />
        <StText>{this.props.item ? ' ' + this.props.item.w3w : " "}</StText>
      </StFlexContainer>
      <StFlexContainer>
        <StTimeIcon />
        <StText>{this.props.item ? ' ' + getTimeDeltaString(this.props.item.regDate) : " "}</StText>
      </StFlexContainer>
      <StText>
        <Link to={`list/${this.props.item.id}`}>{"더 보기 →"}</Link>
      </StText>
      <StClose onClick={this.props.closeItem}>
        {"닫기"}
      </StClose>
    </StDetailCont>
  }

  detailItem2 = () => {
    return <StDetailCont>
      <StFlexContainer>
        <Chip color="primary" size="small" icon={ <PinIcon />} text={this.props.item ? ' ' + this.props.item.w3w : " "} />
      </StFlexContainer>
      <StButtonContainer>
        <StFlexContainer>
          <StLink to={`list/${this.props.item.id}`}>
            <Chip color="primary" size="small" icon={ <ArrowForwardIcon />} text={"더 보기"} onClick={this.showDetail} clickable/>
          </StLink>
        </StFlexContainer>
        <StFlexContainer onClick={this.props.closeItem}>
          <Chip size="small"  onDelete={this.props.closeItem} text={"닫기"}/>
        </StFlexContainer>
      </StButtonContainer>
    </StDetailCont>
  }

  showDetail = () => {
    // console.log('link to', this.props.item.id)
  }

  slicedContent = (contents, length) => {
    const sliced = contents.slice(0,length);
    const extra = contents.length > length ? '...' : ''
    return this.newLineContent(sliced + extra)
  }

  newLineContent = (contents) => {
    return contents.split('\n').map((el, index)=>{
      return <span key={index}>{' ' + el}<br/></span>
    })
  }

  render() {
    return (
      <StItemCont>
        <StItem onClick={this.clickEvent}>
          <Chip color="primary" size="small" icon={<AccessTimeIcon />} text={this.props.item ? ' ' + getTimeDeltaString(this.props.item.regDate) : " "}/>
          <StItemLeft />
          <StItemMiddle>
            <StItemMiddleBg />
            <StTextMiddle>
              {this.slicedContent(this.props.item.contents, 50)}
            </StTextMiddle>
          </StItemMiddle>
          <StItemRight />
        </StItem>
        {/* {this.props.selected ? 
        <StDetailLink>
          <DefaultButton text={this.detailItem()} />
        </StDetailLink>:<></>} */}
        {this.props.selected ? 
        <StDetailLink>{this.detailItem2()}</StDetailLink>:<></>}
      </StItemCont>
    );
  }
}

export default MapItem;

const StItemCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: auto;
  margin-bottom: -16px;
`

const StItem = styled.div`
  height: auto;
  display: flex;

  margin-top: 16px;

  animation-duration: 1s;
  animation-name: slidein;
  @keyframes slidein {
    from {
      margin-right: 100%;
      width: 300%
    }
    to {
      margin-right: 0%;
      width: 100%;
    }
  }
`;

const StItemLeft = styled.div`
  height: 20px;
  width: 7px;
  background-image: url(${imgLeft});
  background-size: contain;
`;

const StItemMiddle = styled.div`
  height: auto;
  width: auto;
  margin-right: -4px;
`;

const StItemMiddleBg = styled.div`
  height: 20px;
  width: auto;
  background-image: url(${imgMiddle});
  background-size: contain;
`;

const StItemRight = styled.div`
  height: 20px;
  width: 13px;
  background-image: url(${imgRight});
  background-size: contain;
`;

const StTextMiddle = styled.div`
  position: relative;
  top: -32px;
  border: solid #20ad77 1px;
  border-radius: 2px;
  padding: 2px;
  color: #20ad77;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 4px 4px 8px #c4c4c4, -4px -4px 8px #ffffff;

  overflow-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
`;

const StDetailLink = styled.div`
  /* box-shadow: 4px 4px 8px #c4c4c4, -4px -4px 8px #ffffff; */
  margin-top: -16px;
  margin-bottom: 24px;
  /* animation-duration: 1s;
  animation-name: slidein;
  @keyframes slidein {
    from {
      width: 0%;
      margin-right: 100%;
    }
    to {
      width: 100%;
      margin-right: 0%;
    } */
  /* } */
`

const StDetailCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StFlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0px 0px 4px;
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
  width: 18px;
  height: 18px;
  background-image: url(${timeIcon});
  background-size: cover;
`;

const StText = styled.div``;

const StClose = styled.span``;

const StLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;