/* global kakao */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';

class MapSearchList extends Component {
  render(){
    return(
      <Slide in={this.props.on} direction='up' mountOnEnter unmountOnExit>
        <StListCont> 
        <StTopCont>
          <div>
            <IconButton onClick={this.props.initSearch}><Close/></IconButton>
          </div>
        </StTopCont>
        <StResultCont>
        {
          this.props.searchResult.map((el, idx) => {
            return <SearchResult key={idx} item={el} changeMapCenter={this.props.changeMapCenter}/>
          })
        }
        </StResultCont>
        </StListCont>
      </Slide>
    )
  }
} export default MapSearchList;

const StListCont = styled(FlexColumn)`
  justify-content: flex-start;

  position: fixed;
  z-index: 101;
  bottom: 0;
  
  width: 100%;
  height: 40vh;
  overflow: scroll;

  background: #FBF2EE;
  border-top: 2px solid gray;
  border-radius: 10px 10px 0 0;
`;

const StTopCont = styled(FlexRow)`
  justify-content: flex-end;
  width: 100%;
`;
const StResultCont = styled(FlexColumn)`
  justify-content: flex-start;
  overflow: scroll;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

class SearchResult extends Component {
  changeMapCenter = () => {
    console.log(Number(this.props.item.x), this.props.item.y)
    this.props.changeMapCenter( new kakao.maps.LatLng(Number(this.props.item.y), Number(this.props.item.x)))
  }

  render(){
    const _item = this.props.item
    return(
      <StResult onClick={this.changeMapCenter}>
        {_item.place_name}<br/>
        {_item.address_name}<br/>
        {_item.phone}<br/>
        {_item.place_url}
      </StResult>
    )
  }
}

const StResult = styled.div`
  width: 100%;
  height: 25vh;
  background: white;
  margin-bottom: 8px; 
  border-radius: 10px;
  color: gray;
`;