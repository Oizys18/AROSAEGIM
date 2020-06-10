import React, { Component } from 'react';
import MapSearchResult from './MapSearchResult';
import styled from 'styled-components';
import { Slide, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';

class MapSearchList extends Component {
  render(){
    return(
      <Slide in={this.props.on} direction='up' mountOnEnter unmountOnExit>
        <StListCont> 
          <div>
            <StTopCont>
              <div>
                <IconButton onClick={this.props.initSearch}><Close/></IconButton>
              </div>
            </StTopCont>
            <StResultCont>
            {
              this.props.searchResult.map((el, idx) => {
                return <MapSearchResult key={idx} item={el} searchCenter={this.props.searchCenter}/>
              })
            }
            </StResultCont>
          </div>
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
  
  background: #FBF2EE;
  border-top: 2px solid gray;
  border-radius: 10px 10px 0 0;
`;

const StTopCont = styled(FlexRow)`
  justify-content: flex-end;
  width: 100%;
`;
const StResultCont = styled(FlexColumn)`
  display: flex;
  justify-content: flex-start;
  overflow: scroll;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

