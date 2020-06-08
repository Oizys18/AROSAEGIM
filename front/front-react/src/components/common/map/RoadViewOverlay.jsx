import React, { Component } from 'react';
import styled from 'styled-components';
import { Zoom } from '@material-ui/core';
import { FlexColumn } from '../../../styles/DispFlex';

import * as SA from '../../../apis/SaegimAPI';
 
class RoadViewOverlay extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgSrc: null,
    }
  }
  async componentDidMount(){
    this.get1stImg()
  }
  
  get1stImg = async () => {
    if(this.props.item.imagesCount > 0){
      const data = await SA.getSaegimDetailById(this.props.item.id)
      this.setState({
        imgSrc: data.images[0].source
      })
    }
  }

  render(){
    return(
      <StCont id={this.props.id}>
        {
          this.state.imgSrc && <StBackImg src={this.state.imgSrc}/>
        }
        <StItem isImg={this.props.item.imagesCount > 0}>
          <StContent>{this.props.item.contents}</StContent>
        </StItem>
      </StCont>
    )
  }
} export default RoadViewOverlay;


const StCont = styled.div`
  position: relative;
`;

const StBackImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  background: ${props => `url(${props.src}) no-repeat center center`}; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 45vw;
  height: 50vw;
  border-radius: 10px;
`;

const StItem = styled(FlexColumn)`
  position: absolute;
  top: 0;
  left: 0;
  
  /* background: ${props => props.isImg ? `rgba(251,242,238, 0.4)` : `rgba(251,242,238, 0.9)`}; */
  background: ${props => props.isImg ? `rgba(251,242,238, 0.4)` : `rgba(0,0,0, 0.7)`};
  width: 45vw;
  height: 50vw;

  /* width: ${props => props.ratio*0.45}vw;
  font-size: ${props => props.ratio}%; */

  border: 2px solid #FBF2EE;
  border-radius: 10px;
  box-sizing: border-box;
`;

const StContent = styled.div`
  color: white;
`;

