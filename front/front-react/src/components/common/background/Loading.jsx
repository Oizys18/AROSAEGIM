import React, { Component } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

class Loading extends Component {
  render(){
    return(
      <StCont>
        <CircularProgress thickness={5}/>
      </StCont>
    )
  }
} export default Loading;

const StCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: black;

  .MuiCircularProgress-root{
    color: white;
  }

  /* svg path, svg rect{
    fill: white;
  } */
`;
