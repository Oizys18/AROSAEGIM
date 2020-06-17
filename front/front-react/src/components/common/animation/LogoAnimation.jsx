import React, { Component } from 'react';
import styled from 'styled-components';
import { Zoom } from '@material-ui/core';

class LogoAnimation extends Component {
  render() {
    return (
      <Zoom in={true}>
      <StAnima>
        <div className="logo">
        </div> 
        <div className="words">
          <div className="word">우리는</div>
          <div className="word">여기에</div>
          <div className="word">있었다</div>
          <div className="word">아로새김</div>
          <div className="word"></div>
        </div>
      </StAnima>
      </Zoom>
    )
  }
}

export default LogoAnimation;

const StAnima = styled.div`
  position: relative;
  width: 70%;
  /* height: 20%; */
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  /* transform: translateY(22vh); */
  animation: backColor 6s 4.5s infinite;
  /* animation-delay: 6s; */
  /* animation-iteration-count: infinite; */
  
  /* @keyframes backColor{
    0% {
      background-color: white;
    }
    5% {
      background-color: #00e6ac;
    }
    20% {
      background-color: #00e6ac;
    }
    30% {
      background-color: white;
    }
    80% {
      background-color: white;
    }
  } */

  div{
    /* box-sizing: content-box; */
  }

  .logo{
    display: flex;
    margin: 0.5rem;
    height: 40vw;
    width: 40vw;
    max-width: 360px;
    max-height: 360px;

    background-size: contain;
    background-image: url('/logo.png');

    border-radius: 29px;
  }

  .words{
    color: white;
    text-shadow: 0 0 5px gray;
    /* text-align:center; */
    display: flex;
    width: 80%;
    height: 25%;
    justify-content: center;
    align-items: center;
    margin-top: 16px;

    .word{
      opacity: 0;
      position: absolute;
      padding-top: 3px;
      font-family: 'BMEULJIRO';
      font-size: 28px;
      display: flex;
      align-items: center;
    }
    .word:nth-child(1) {
      animation: motion 10s 0s infinite;
    }
    .word:nth-child(2) {
      animation: motion 10s 2s infinite;
    }
    .word:nth-child(3) {
      animation: motion 10s 4s infinite;
    }
    .word:nth-child(4) {
      animation: motion 10s 6s infinite;
    }
    .word:nth-child(5) {
      animation: motion 10s 8s infinite;
    }
  }

  @keyframes motion {
    0% {
      opacity: 0;
      /* transform: translateY(10px); */
      transform: translateX(2rem);
    }
    
    5% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }
    
    20% {
      opacity: 1;
      /* transform: translateY(0); */
      transform: translateX(0);
    }
    
    30% {
      opacity: 0;
      /* transform: translateY(-50px); */
      transform: translateX(-4rem);
    }

    80% {
      opacity: 0;
      /* transform: translateY(-50px); */
      transform: translateX(0);
    }
  }
`