import React, { Component } from 'react';

import Konva from 'konva';
import {Image, Rect,} from "react-konva";

import styled from 'styled-components';

class imgCrop extends Component {
  render(){
    return(
      <StCropCont> 
        <Image></Image>
      </StCropCont>
    )
  }

} export default imgCrop;

const StCropCont = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 100%;
  
  background: black;

`;
