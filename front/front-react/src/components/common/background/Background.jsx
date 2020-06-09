import React, { Component } from 'react';

import styled from 'styled-components';

class Background extends Component{
  constructor(props){
    super(props)
    this.state = {
      src: this.randomImg(),
    }
  }

  randomImg = () => {
    // return ``
    return `https://source.unsplash.com/collection/10626623/${window.innerWidth}x${window.innerHeight}`
  }

  render(){
    return(
      <StCont src={this.state.src}>
        <StOpacity/>
      </StCont>
    )
  }

} export default Background;

const StCont = styled.div`
  position: fixed;
  z-index: -2;

  width: 100vw;
  height: 100vh;

  background: url(${props => props.src}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const StOpacity = styled.div`
  width: 100vw;
  height: 100vh;
  
  background: black;
  opacity: 0.7;
  position: fixed;
  z-index: -1;
`;
