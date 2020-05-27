import React, { Component } from 'react';

import styled from 'styled-components';
import { Person } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex'

class ImgUp extends Component {
  render(){
    return(
      <>
      {
        this.props.signup && 
        <StProfileCont>
          <input
            id="imgUpload"
            type="file"
            accept="image/*"
            onClick={(e) => {e.target.value = null}} //연속적으로 같은 파일 선택 시 해줘야하는
            onChange={this.props.imgUpload}
          />
          <StProfile>
            <label htmlFor="imgUpload">
            {
              this.props.cropedImgBase64 === '' ?
              <Person/>
              :
              <StPrev src={this.props.cropedImgBase64}/>
            }
            </label>
          </StProfile>

          <div className='label'>프로필 사진</div>

        </StProfileCont>
      }
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
    width: 35vw;
    height: 35vw;
  }
`;

const StPrev = styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 35vw;
`