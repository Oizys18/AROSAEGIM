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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  animation: 6s 4.5s infinite;
  
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
      transform: translateY(0);
    }
    
    5% {
      opacity: 0;
      transform: translateY(0);
    }
    
    20% {
      opacity: 1;
      transform: translateY(0);
    }

    30% {
      opacity: 0;
      transform: translateY(0);
    }

    80% {
      opacity: 0;
      transform: translateY(0);
    }
  }
`;