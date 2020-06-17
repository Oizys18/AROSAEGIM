/* global kakao */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Room, ExitToApp, } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';
import { IconButton } from '@material-ui/core';

class MapSearchResult extends Component {
  searchCenter = () => {
    this.props.searchCenter( new kakao.maps.LatLng(Number(this.props.item.y), Number(this.props.item.x)))
  }
  clickLink = () => {
    window.open(this.props.item.place_url, '_blank')
  }

  render(){
    const _item = this.props.item
    return(
      <div>
        <StResult>
          <StMapSvg>
            <IconButton onClick={this.searchCenter}>
              <Room/>
            </IconButton>
          </StMapSvg>
          <StTxtCont onClick={this.searchCenter}>
            <div className='pn'>{_item.place_name}</div>
            <div className='an'>{_item.address_name}</div>
            <div className='ph'>{_item.phone}</div>
            <StUrlCont>
              <div className='km'>
                카카오 맵
              </div>
              <IconButton onClick={this.clickLink}>
                <ExitToApp/>
              </IconButton>
            </StUrlCont>
          </StTxtCont>
        </StResult>
      </div>
    )
  }
} export default MapSearchResult;

const StResult = styled(FlexRow)`
  width: 90vw;
  background: white;
  margin-bottom: 8px; 
  padding: 8px 0;
  border-radius: 10px;
  color: gray;
  justify-content: flex-start;
`;

const StMapSvg = styled(FlexRow)`
`;

const StTxtCont = styled(FlexColumn)`
  width: 100%;
  height: 100%;
  margin: 8px 8px 8px 0;
  padding: 8px;

  border: 1px solid #F4C6BA;
  border-radius: 10px;
  box-sizing: border-box;

  align-items: flex-start;


  .txtcont{
    height: 100%;
  }

  .pn{
    display: flex;
    font-size: 110%;
    font-weight: bold;
    margin-bottom: 8px;
  }
  .an{
    display: flex;
    font-size: 90%;
  }
  .ph{
    display: flex;
    font-size: 80%;
  }
`;

const StUrlCont = styled(FlexRow)`
  margin-top: 8px;
  width: 100%;
  justify-content: flex-end;
  .MuiIconButton-root{
    padding: 4px;
  }
  .MuiSvgIcon-root{
    width: 20px;
    height: 20px;
  }
  .km{
    font-size: 80%;
  }
`;