import React, { Component } from 'react';
import styled from 'styled-components';

class SearchBar extends Component {
  render(){
    return(
      <StCont> 
        검색 바 자리
      </StCont>
    )
  }
} export default SearchBar;

const StCont = styled.div`
  position: fixed;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background: gray;
  width: 100%;
  height: 48px;
  /* padding-top: 2px; */
`;

