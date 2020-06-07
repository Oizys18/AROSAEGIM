import React, { Component } from 'react';
import styled from 'styled-components';
import { Zoom, Slide, IconButton } from '@material-ui/core';
import { Map, Streetview, MyLocation, FilterList } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';

class MapBtnSet extends Component {
   changeIcon = (id) => {
    return (
      <>
        <Map style={{visibility: 'hidden'}}/>
        <Zoom in={this.props.roadView} style={{position: 'absolute', zIndex: 1,}}><Map/></Zoom>
        <Zoom in={!this.props.roadView} style={{position: 'absolute', zIndex: 2,}}><Streetview/></Zoom>
      </>
    )
    // return (
    //   <>
    //     <Map style={{visibility: 'hidden'}}/>
    //     <Zoom in={this.props.roadView} style={{position: 'absolute', zIndex: 1,}}><Map/></Zoom>
    //     <Zoom in={!this.props.roadView} style={{position: 'absolute', zIndex: 2,}}><Streetview/></Zoom>
    //   </>
    // )
  }

  render(){
    const _actions = this.props.actions
    return (
      <>
      <Slide in={true} direction='left' timeout={700}>
        <StBtnRT>
          {/* <StBtn className='location' onClick={_actions.goUserCenter}><MyLocation/></StBtn> */}
          <StBtnCont isUC={this.props.isUC}><IconButton onClick={_actions.goUserCenter}><MyLocation/></IconButton></StBtnCont>
          {/* <StBtn className='view' onClick={_actions.tglView}>{this.changeIcon('view')}</StBtn> */}
          <Zoom in={!this.props.roadView}>
            <StBtnCont><IconButton onClick={_actions.tglView}><Streetview/></IconButton></StBtnCont>
            {/* <StBtnCont><IconButton onClick={_actions.tglView}>{this.changeIcon('view')}</IconButton></StBtnCont> */}
          </Zoom>
        </StBtnRT>
      </Slide>
      <Zoom in={true} timeout={500}>
        <StBtnLT>
          <StBtn className='filter' onClick={_actions.tglFilter}><FilterList/></StBtn>
        </StBtnLT>
      </Zoom>
      </>
    )
  }
} export default MapBtnSet;


const StBtnRT = styled(FlexColumn)`
  position: absolute;
  z-index: 10;
  top: 56px;
  right: 8px;
`;
const StBtnLT = styled(FlexColumn)`
  position: absolute;
  z-index: 10;
  top: 56px;
  left: 8px;
`;

const StBtn = styled(FlexRow)`
  margin-bottom: 8px;

  position: relative;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 50%;
  background: #FBF2EE;

  svg{
    color: #404040;
    width: 20px;
    height: 20px;
  }

  &.filter{
    margin: 0;
    border-radius: 10px;
  }
`

const StBtnCont = styled(FlexRow)`
  position: relative;
  z-index: 120;

  margin-bottom: 8px;
  border: 1px solid gray;
  border-radius: 50%;
  background: #FBF2EE;

  .MuiButtonBase-root{
    padding: 8px;
  }

  svg{
    color: ${props => props.isUC ? "#6699ff" : "#404040"};
    width: 20px;
    height: 20px;
  }
`