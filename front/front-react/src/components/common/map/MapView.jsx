import React, { Component } from "react";
import styled from "styled-components";
import MapItem from "./MapItem";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
    this.itemRefs = [];
  }

  componentDidMount() {
    // this.overlayItems();
    // console.log(this.props.items);
  }

  componentDidUpdate() {
    // console.log(this.props.items, this.itemRefs);
  }

  overlayItems = () => {
    const itemRefs = [];
    const items = this.props.items.map((el, index) => {
      const itemRef = React.createRef();
      const item = (
        <MapItem
          ref={itemRef}
          map={this.props.map}
          item={el}
          key={index}
          selectItem={this.selectItem}
        />
      );
      itemRefs.push(itemRef);
      return item;
    });
    this.itemRefs = itemRefs;
    this.items = items;
    return items
  };

  selectItem = (item) => {
    this.props.selectItem(item);
  };

  render() {
    const list = this.state.items.map(
      (el, index) => (<MapItem map={this.props.map}
        item={el}
        key={index}
        selectItem={this.selectItem}
      />)
    );

    return (
      <>
        <StView id="mapView" hidden={this.props.hide} />
        {this.props.status === 'list' && this.overlayItems()}
      </>
    );
  }
}
export default MapView;

const StView = styled.div`
  width: 100%;
  height: 100%;
`;
