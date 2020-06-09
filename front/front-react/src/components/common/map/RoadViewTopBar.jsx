import React, { Component } from 'react';
import styled from 'styled-components';
import { Slide, Grow, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
          <IconButton onClick={this.props.tglView}><Close/></IconButton>
          <StMsgCont>
            <Grow in={this.state.toggle} timeout={300} mountOnEnter unmountOnExit>
              <StAddrCont>{this.props.addr}</StAddrCont>
            </Grow>
            <Grow in={!this.state.toggle} timeout={300} mountOnEnter unmountOnExit>
              <StW3WCont>{this.props.w3w}</StW3WCont>
            </Grow>
          </StMsgCont>
          <IconButton style={{visibility: 'hidden'}}><Close/></IconButton>
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
  justify-content: space-between;
  align-items: center;

  background: rgba(251, 242, 238, 0.85);
  
  width: 100%;
  height: 48px;
`;

const StMsgCont = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const StAddrCont = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
`;
const StW3WCont = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
`;