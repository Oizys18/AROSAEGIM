import React, { Component } from 'react';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

import styled from 'styled-components';
import { IconButton, } from '@material-ui/core';
import { Close, Check } from '@material-ui/icons';
import { FlexRow, } from '../../../styles/DispFlex';

import * as IM from './ImgMethod'

class ImgCrop extends Component {
  constructor(props){
    super(props);
    this.state = {
      crop: IM.calcSize(this.props.imgW, this.props.imgH, this.props.mode),
    }
  }

  applyCrop = () => {
    this.props.apply(this.state.croppedImageUrl)
  }

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    this.setState({ crop: percentCrop });
    // this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        `preview ${this.props.imgFile.name}.png`
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      resolve(canvas.toDataURL())

      // canvas.toBlob(blob => {
      //   if (!blob) {
      //     //reject(new Error('Canvas is empty'));
      //     console.error('Canvas is empty');
      //     return;
      //   }
      //   blob.name = fileName;
      //   window.URL.revokeObjectURL(this.fileUrl);
      //   this.fileUrl = window.URL.createObjectURL(blob);
      //   resolve(this.fileUrl);
      // }, 'image/jpeg');
    });
  }

  render(){
    return(
      // <Zoom in={true}>
      <StCropCont> 
        <StTop>
          <IconButton onClick={this.props.cancel}>
            <Close/>
          </IconButton>
          {
            this.props.mode !== 'profile' &&
            <div className='txt'>미리보기 영역설정</div>
          }
          <IconButton onClick={this.applyCrop}>
            <Check/>
          </IconButton>
        </StTop>

        <ReactCrop
          src={this.props.imgBase64}
          crop={this.state.crop}
          ruleOfThirds
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
      </StCropCont>
      // </Zoom>
    )
  }

} export default ImgCrop;

const StCropCont = styled(FlexRow)`
  position: absolute;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 100%;
  
  background: black;
`;

const StTop = styled(FlexRow)`
  justify-content: space-between;

  position: absolute;
  top: 0;
  z-index: 11;

  width: 100%;

  svg, .txt{
    color: white;
  }
`
