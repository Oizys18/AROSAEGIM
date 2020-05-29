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
            <StBtn id="list" disableRipple onClick={this.props.changePage} clicked={this.props.location.pathname === '/list'}>
              <Dashboard fontSize={this.props.location.pathname === '/list' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="map" disableRipple onClick={this.props.changePage} clicked={this.props.location.pathname === '/map'}>
              <Explore fontSize={this.props.location.pathname === '/map' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="write" disableRipple onClick={this.props.changePage} clicked={this.props.location.pathname === '/write'}>
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
  width: 100vw;
  height: 56px;
  background: rgba(0, 0, 0, 0.7);
  /* background: rgba(242, 242, 242, 0.5); */
  /* background: #f2f2f2; */
`;

const StBtn = styled(IconButton)`
  width: 56px;
  height: 56px;

  color: rgba(255, 255, 255, ${ props => props.clicked ? 1 : 0.5 });
`;