import React, { Component } from 'react';
import { withRouter, } from "react-router-dom";

import styled from 'styled-components';
import { IconButton, Slide, Zoom } from '@material-ui/core';
import { Dashboard, Explore, Create } from '@material-ui/icons';
import { FlexRow } from '../../../styles/DispFlex';

class BotNav extends Component {
  constructor(props){
    super(props);
    this.state={
      curPage: this.props.location.pathname,
    }
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  handlePage = async (e) => {
    if(this.state.curPage !== this.props.location.pathname) {
      await this.setStateAsync({
        curPage: this.props.location.pathname
      })
      
    }
  }

  render(){
    return(
      <Slide in={true} direction='up' timeout={500}>
        <StNavCont>

          <Zoom in={true} timeout={500}>
            <StBtn id="main" onClick={this.props.changePage} disableRipple>
              <Dashboard fontSize={this.props.location.pathname === '/main' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="map" onClick={this.props.changePage} disableRipple>
              <Explore fontSize={this.props.location.pathname === '/map' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="write" onClick={this.props.changePage} disableRipple>
              <Create fontSize={this.props.location.pathname === '/write' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

        </StNavCont>
      </Slide>
    )
  }
} export default withRouter(BotNav);

const StNavCont = styled(FlexRow)`
  justify-content: space-around;

  position: fixed;
  z-index: 100;
  bottom: 0;
  width: 100%;
  height: 56px;
  background: #f2f2f2;
`;

const StBtn = styled(IconButton)`
  width: 56px;
  height: 56px;
`;