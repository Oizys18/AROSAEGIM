import React, { Component } from 'react';
import styled from 'styled-components';

class RoadViewOverlay extends Component {

  render(){
    return(
      <StCont id={this.props.id}>
        {this.props.item.contents}
      </StCont>
    )
  }
} export default RoadViewOverlay;


const StCont = styled.div`
  background: white;
  width: 40vw;
  height: 45vw;
`;

