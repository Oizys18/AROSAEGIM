import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide, Grow } from '@material-ui/core';

class RoadViewTopBar extends Component {
  constructor(props){
    super(props)
    this.state = { 
      toggle: true,
      intervalId: null,
    }
  }
  componentDidMount(){ 
    const _intervalId = setInterval(() => {this.setState({ toggle: !this.state.toggle })}, 3000)
    this.setState({ intervalId: _intervalId }) 
  }
  componentWillUnmount(){ 
    clearInterval(this.state.intervalId) 
  }

  render(){
    return(
      <Slide in={this.props.on} direction="down">
        <StTopCont>
          <Grow in={this.state.toggle} timeout={300} mountOnEnter unmountOnExit>
            <StAddrCont>{this.props.addr}</StAddrCont>
          </Grow>
          <Grow in={!this.state.toggle} timeout={300} mountOnEnter unmountOnExit>
            <StW3WCont>{this.props.w3w}</StW3WCont>
          </Grow>
        </StTopCont>
      </Slide>
    )
  }
} export default RoadViewTopBar;

const StTopCont = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.9);
  
  width: 100%;
  height: 40px;
`;

const StAddrCont = styled.div`
  position: absolute;
  z-index: 101;
  display: flex;
`;
const StW3WCont = styled.div`
  position: absolute;
  z-index: 102;
  display: flex;
`;