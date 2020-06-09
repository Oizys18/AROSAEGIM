import React, { Component } from 'react';
import styled from 'styled-components';

class TopBarAnimation extends Component {
  render() {
    return (
      <StAnima>
        <div className="top_ani_words">
          <div className="top_ani_word">우리는</div>
          <div className="top_ani_word">여기에</div>
          <div className="top_ani_word">있었다</div>
          <div className="top_ani_word">아로새김</div>
          <div className="top_ani_word"></div>
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
  
  .top_ani_words{
    color: white;
    text-shadow: 0 0 10px gray;
    display: flex;
    width: 80%;
    height: 25%;
    justify-content: center;
    align-items: center;

    
    .top_ani_word{
      opacity: 0;
      position: absolute;
      padding-top: 3px;
      font-family: 'BMEULJIRO';
      font-size: 28px;
      display: flex;
      align-items: center;
    }
    .top_ani_word:nth-child(1) {
      animation: motion2 10s 0s infinite;
    }
    .top_ani_word:nth-child(2) {
      animation: motion2 10s 2s infinite;
    }
    .top_ani_word:nth-child(3) {
      animation: motion2 10s 4s infinite;
    }
    .top_ani_word:nth-child(4) {
      animation: motion2 10s 6.5s infinite;
    }
    .top_ani_word:nth-child(5) {
      animation: motion2 10s 9s infinite;
    }
  }

  @keyframes motion2 {
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