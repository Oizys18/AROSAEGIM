import React, { Component } from 'react';
import styled from 'styled-components';

class MapView extends Component {
  render(){
    return(
      <StView id="mapView" hidden={this.props.hide}></StView>
    )
  }
} export default MapView;


const StView = styled.div`
  width: 100%;
  height: 100%;
`;