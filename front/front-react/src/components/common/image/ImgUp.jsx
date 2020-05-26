import React, { Component } from 'react';

import styled from 'styled-components';
import { AddAPhoto, Person } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex'

import ImgCrop from './ImgCrop'

class ImgUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgW: 0,
      imgH: 0,
      cropedImg: '',
    }
  }

  render(){
    return(
      <>
        <StProfileCont>
          <input
            id="imgUpload"
            type="file"
            accept="image/*"
            onChange={this.props.imgUpload}
          />
          <StProfile>
            <label htmlFor="imgUpload">
            {
              this.props.imgBase64 === '' ?
              <Person/>
              :
              <StPrev imgBase64={this.props.imgBase64}/>
            }
            </label>
          </StProfile>

          <div className='label'>프로필 사진</div>

          {
            this.props.imgBase64 !== '' && 
            <ImgCrop imgBase64={this.props.imgBase64} imgCrop={this.props.imgCrop}/>
          }
        </StProfileCont>
      </>
    )
  }
} export default ImgUp;


const StProfileCont = styled(FlexColumn)`
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .MuiIconButton-root {
    padding: 0;
    border-radius: 10px;
  }


  .label {
    margin-top: 0.4rem;
    font-family: 'Jua', sans-serif;
    font-size: 110%;
    /* color: white; */
    /* text-shadow: 0 0 10px gray; */
  }
`;

const StProfile = styled(FlexRow)`
  border: 5px solid gray;
  border-radius: 50%;
  background: gray;

  overflow: hidden;

  *{
    width: 40vw;
    height: 40vw;
  }
`;

const StPrev = styled.div`
  background-image: url(${props => props.imgBase64});
  background-repeat: no-repeat;
  background-position: center center;
`

const StOpacityBack = styled(FlexRow)`
  position: fixed;
  top: 0;
  z-index: 110;

  width: 100%;
  height: 100%;

  background: black;
`;

const StCropCont = styled.div`
  img{
    width: 300px;
    height: 300px;
  }
`