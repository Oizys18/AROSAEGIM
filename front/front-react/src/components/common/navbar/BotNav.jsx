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
      sildeIn: true,
    }
  }
  
  setStateAsync(state) {return new Promise(resolve => {this.setState(state, resolve)})}

  componentDidMount(){
    window.addEventListener('resize', this.toggle)
    document.addEventListener('click', this.toggle)
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.toggle)
    document.removeEventListener('click', this.toggle)
  }
  
  toggle = () => {
    if(this.props.appH !== window.innerHeight){ this.setState({ sildeIn: false }) }
    else{
      if(this.props.location.pathname === '/map'){
        if(document.getElementById('roadView'))
          this.setState({ sildeIn: false })
        else 
          this.setState({ sildeIn: true }) 
      }
      else this.setState({ sildeIn: true }) 
    }
  }

  handlePage = async (e) => {
    if(this.state.curPage !== this.props.location.pathname) {
      await this.setStateAsync({
        curPage: this.props.location.pathname
      })
    }
  }

  render(){
    const _pathname = this.props.location.pathname
    return(
      <Slide in={this.state.sildeIn} direction='up' timeout={this.state.sildeIn ? 500 : 100}>
        <StNavCont>

          <Zoom in={true} timeout={500}>
            <StBtn id="list" disableRipple onClick={this.props.changePage} clicked={_pathname === '/list' ? 'clicked' : 'none'}>
              <Dashboard fontSize={_pathname === '/list' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="map" disableRipple onClick={this.props.changePage} clicked={_pathname === '/map' ? 'clicked' : 'none'}>
              <Explore fontSize={_pathname === '/map' ? 'large' : 'default'}/>
            </StBtn>
          </Zoom>

          <Zoom in={true} timeout={500}>
            <StBtn id="write" disableRipple onClick={this.props.changePage} clicked={_pathname === '/write' ? 'clicked' : 'none'}>
              <Create fontSize={_pathname === '/write' ? 'large' : 'default'}/>
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

  color: rgba(255, 255, 255, ${ props => props.clicked === 'clicked' ? 1 : 0.5 });
`;