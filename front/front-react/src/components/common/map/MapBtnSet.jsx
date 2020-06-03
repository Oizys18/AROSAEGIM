import React, { Component } from 'react';
import styled from 'styled-components';
import { Zoom, } from '@material-ui/core';
import { Map, Streetview, MyLocation  } from '@material-ui/icons';
import { FlexRow, FlexColumn } from '../../../styles/DispFlex';

class MapBtnSet extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

   changeIcon = (id) => {
    if(id === 'view')
    return (
      <>
        <Map style={{visibility: 'hidden'}}/>
        <Zoom in={this.props.roadView} style={{position: 'absolute', zIndex: 1,}}><Map/></Zoom>
        <Zoom in={!this.props.roadView} style={{position: 'absolute', zIndex: 2,}}><Streetview/></Zoom>
      </>
    )
    else if(id === 'filter')
    return (
      <>
        <Map style={{visibility: 'hidden'}}/>
        <Zoom in={this.props.roadView} style={{position: 'absolute', zIndex: 1,}}><Map/></Zoom>
        <Zoom in={!this.props.roadView} style={{position: 'absolute', zIndex: 2,}}><Streetview/></Zoom>
      </>
    )
  }

  render(){
    const _actions = this.props.actions
    return (
      <StBtnSetCont>
        <StBtnCont onClick={_actions.tglView}>{this.changeIcon('view')}</StBtnCont>
        <StBtnCont onClick={_actions.goUserCenter}><MyLocation/></StBtnCont>
        {/* <StBtnCont onClick={_actions.tglFilter}>{this.changeIcon('')}</StBtnCont> */}
      </StBtnSetCont>
    )
  }
} export default MapBtnSet;


const StBtnSetCont = styled(FlexColumn)`
  position: absolute;
  z-index: 10;
  top: 64px;
  right: 8px;
`;

const StBtnCont = styled(FlexRow)`
  margin-bottom: 4px;

  position: relative;
  padding: 8px;
  border: 2px solid gray;
  border-radius: 50%;
  background: #e6e6e6;

  svg{
    width: 24px;
    height: 24px;
  }
`