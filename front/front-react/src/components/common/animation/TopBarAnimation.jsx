import React, { Component } from 'react';
import styled from 'styled-components';

class TopBarAnimation extends Component {
  render() {
    return (
      <StAnima>
        <div className="words">
          <div className="word">우리는</div>
          <div className="word">여기에</div>
          <div className="word">있었다</div>
          <div className="word">아로새김</div>
          <div className="word"></div>
        </div>
      </StAnima>
    )
  }
}

export default TopBarAnimation;

const StAnima = styled.div`
  position: relative;
  width: 70%;
  /* height: 20%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  /* transform: translateY(22vh); */
  animation: 6s 4.5s infinite;
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

  /* .logo{
    display: flex;
    margin: 0.5rem;
    // background: linear-gradient(to bottom, #66ffff 0%, #ff99cc 100%);
    // border: 3px solid white;
    border-radius: 29px;
    img{
      width: 190px;
    }
  } */

  .words{
    color: white;
    text-shadow: 0 0 10px gray;
    display: flex;
    width: 80%;
    height: 25%;
    justify-content: center;
    align-items: center;

    
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
      animation: motion 10s 6.5s infinite;
    }
    .word:nth-child(5) {
      animation: motion 10s 9s infinite;
    }
  }

  @keyframes motion {
    0% {
      opacity: 0;
      /* transform: translateY(10px); */
      /* transform: translateX(2rem); */
      transform: translateY(0);
    }
    
    5% {
      opacity: 0;
      /* transform: translateY(0); */
      /* transform: translateX(0); */
      transform: translateY(0);
    }
    
    20% {
      opacity: 1;
      /* transform: translateY(0); */
      /* transform: translateX(0); */
      transform: translateY(0);
    }

    30% {
      opacity: 0;
      /* transform: translateY(-50px); */
      /* transform: translateX(-4rem); */
      transform: translateY(0);
    }

    80% {
      opacity: 0;
      /* transform: translateY(-50px); */
      /* transform: translateX(0); */
      transform: translateY(0);
    }
  }

  @keyframes motion2 {
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
  }
`