import React, { Component } from 'react';
import styled from 'styled-components';

class RoadView extends Component {

  render(){
    return(
      <StView id="roadView" hidden={this.props.hide}/>
    )
  }
} export default RoadView;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;