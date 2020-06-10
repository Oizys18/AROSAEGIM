import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AccessTime, Close, Add } from '@material-ui/icons';
import { FlexColumn, FlexRow } from '../../../styles/DispFlex';
import { getTimeDeltaString } from "../../common/time/TimeFunctinon";
import * as SA from '../../../apis/SaegimAPI';
 
class RoadViewOverlay extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgSrc: null,
      sgDetail: null,
    }
  }
  async componentDidMount(){
    this.get1stImg()
  }
  
  get1stImg = async () => {
    const data = await SA.getSaegimDetailById(this.props.item.id)
    if(this.props.item.filesCount > 0){
      this.setState({
        imgSrc: data.files[0].url,
        // imgSrc: data.images[0].source,
      })
    }
    this.setState({
      sgDetail: data
    })
  }
  
  openDetail = () => {
    this.props.openDetail(this.props.item.id, this.state.sgDetail)
  }
  closeOverlay = () => {    
    this.props.closeOverlay(this.props.item.id)
  }

  render(){
    return(
      <>
      <StCont id={this.props.id}>
        <StBackImg src={this.state.imgSrc}>
          <StItem isImg={this.props.item.imagesCount > 0}>

            <StTop>
              <StUserName>{this.props.item.userName}</StUserName>
              <StCloseBtn onClick={this.closeOverlay}><Close/></StCloseBtn>
            </StTop>

            <StContent>{this.props.item.contents}</StContent>

            <StTimeCont>
              <AccessTime/>
              <StTime>{getTimeDeltaString(this.props.item.regDate)}</StTime>
            </StTimeCont>

            <StBot>
              <StWWW>{this.props.item.w3w}</StWWW>
              <StDetail onClick={this.openDetail}><Add/></StDetail>
              {/* <StDetail onClick={this.openDetail}>더보기</StDetail> */}
            </StBot>

          </StItem>
        </StBackImg>
      </StCont>
      </>
    )
  }
} export default withRouter(RoadViewOverlay);


const StCont = styled.div`
  position: relative;
`;

const StBackImg = styled.div`
  ${props =>  props.src &&
    css`
      background: ${props => `url(${props.src}) no-repeat center center`}; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    `
  }
  border-radius: 10px;
`;

const StItem = styled(FlexColumn)`
  justify-content: space-between;
  padding: 8px;

  /* background: ${props => props.isImg ? `rgba(251,242,238, 0.4)` : `rgba(251,242,238, 0.9)`}; */
  background: ${props => props.isImg ? `rgba(0,0,0, 0.5)` : `rgba(0,0,0, 0.9)`};
  width: 55vw;
  min-height: 40vw;
  max-height: 55vh;
  overflow: scroll;

  /* width: ${props => props.ratio*0.45}vw;
  font-size: ${props => props.ratio}%; */

  border: 2px solid #FBF2EE;
  border-radius: 10px;
  box-sizing: border-box;
`;

const StTop = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
`;
const StUserName = styled(FlexRow)`
  color: white;
  font-size: 80%;
`;
const StCloseBtn = styled(FlexRow)`
  color: white;
`;
const StTimeCont = styled(FlexRow)`
  align-self: flex-start;
  color: white;
  font-size: 80%;
  svg{
    font-size: 100%;
  }
`;
const StTime = styled(FlexRow)`
`;

const StContent = styled.div`
  background: rgba(251,242,238,0.4);
  display: flex;
  width: 90%;
  margin: 8px 0;
  padding: 8px;
  border-radius: 10px;
  color: white;
  white-space: normal;
`;

const StBot = styled(FlexRow)`
  width: 100%;
  justify-content: space-between;
  *{
    color: white;
  }
`;
const StWWW = styled(FlexRow)`
  font-size: 70%;
`;
const StDetail = styled(FlexRow)`
  /* font-size: 80%; */
`;