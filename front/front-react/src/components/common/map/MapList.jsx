import React, { Component } from "react";
import MapBase from "./MapBase";
import styled from "styled-components";
import MapListItem from "./MapListItem";
import DefaultButton from "../buttons/DefaultButton";

// 이 컴포넌트는 데이터를 리스트로 받아오고, 이를 MapBase에 전달하면 MapBase가 커스텀 오버레이를 렌더하는 방식

export default class MapList extends Component {
  constructor() {
    super();
    this.state = {
      items: dummyItems,
      mapListItems: [],
      testList: [1, 2, 3],
      selected: false,
      selectedItem: {
        id: -1,
        title: "",
        latlng: [],
      },
    };
  }

  componentDidMount() {
    console.log(this.state);
    const mapListItems = this.state.items.map((el, index) => (
      <MapListItem
        key={index}
        item={el}
        prevItem={this.prevItem}
        nextItem={this.nextItem}
      />
    ));
    this.setState({
      mapListItems: mapListItems,
    });
  }

  componentDidUpdate() {}

  selectItem = (item) => {
    console.log("selected: ", item);
    if (!this.state.selected) {
      this.setState({
        selected: true,
        selectedItem: item,
      });
    } else if (item === this.state.selectedItem) {
      this.setState({
        selected: false,
      });
    } else {
      this.setState({
        selectedItem: item,
      });
    }
  };

  onCenterChange = () => {
    console.log("center changed");
    // this.setState({ selected: false });
  };

  onZoomChange = () => {
    console.log("zoom changed");
    this.setState({ selected: false });
  };

  onDragStart = () => {
    this.setState({ selected: false });
  }

  decr = () => {
    console.log("previous item");
    const testList = this.state.testList;
    testList.pop();
    testList.unshift(testList[0] - 1);
    this.setState({
      testList: testList,
    });
  };

  incr = () => {
    console.log("next item");
    const testList = this.state.testList;
    testList.shift();
    testList.push(testList[testList.length - 1] + 1);
    this.setState({
      testList: testList,
    });
  };

  prevItem = () => {
    const currentIndex = this.getIndexById(this.state.selectedItem.id);
    const prevIndex =
      currentIndex === 0 ? this.state.items.length - 1 : currentIndex - 1;
    this.setState({
      selectedItem: this.state.items[prevIndex],
    });
  };

  nextItem = () => {
    const currentIndex = this.getIndexById(this.state.selectedItem.id);
    const nextIndex =
      currentIndex === this.state.items.length - 1 ? 0 : currentIndex + 1;
    this.setState({
      selectedItem: this.state.items[nextIndex],
    });
  };

  addItem = () => {
    const lastItem = this.state.items[this.state.items.length - 1];
    const newItem = {
      id: lastItem.id + 1,
      title: lastItem.title,
      latlng: [lastItem.latlng[0] + 0.0005, lastItem.latlng[1]],
    };
    this.setState({
      items: this.state.items.concat(newItem),
    });
  };

  getIndexById = (itemId) => {
    return this.state.items.indexOf(
      this.state.items.find((el) => el.id === itemId)
    );
  };

  render() {
    return (
      <>
        <MapBase
          status={"list"}
          items={this.state.items}
          selectItem={this.selectItem}
          onCenterChange={this.onCenterChange}
          onZoomChange={this.onZoomChange}
          onDragStart={this.onDragStart}
        />
        <DefaultButton text="decrease" onClick={this.decr} />
        <DefaultButton text="increase" onClick={this.incr} />
        <DefaultButton text="add item" onClick={this.addItem} />
        {this.state.testList.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
        {this.state.selected ? (
          <div>
            현재 선택한 아이템의 카드 뷰: {this.state.selectedItem.id},{" "}
            {this.state.selectedItem.title}
            <MapListItem item={this.state.selectedItem} />
            <DefaultButton text="prev Item" onClick={this.prevItem} />
            <DefaultButton text="next Item" onClick={this.nextItem} />
          </div>
        ) : (
          <></>
        )}
        {/* <CardWrapper>{this.state.mapListItems}</CardWrapper> */}
      </>
    );
  }
}

const CardWrapper = styled.div`
  position: absolute;
  height: 250px;
  width: 300px;
  z-index: 15;
  bottom: -30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const dummyItems = [
  {
    id: 1,
    title: "도화동 주민센터",
    latlng: [37.54158754476082, 126.94985085530882],
  },
  {
    id: 2,
    title: "공덕역",
    latlng: [37.54247160070765, 126.9524527989876],
  },
  {
    id: 3,
    title: "마포역",
    latlng: [37.539567547196356, 126.94586935139986],
  },
  {
    id: 4,
    title: "탐앤탐스",
    latlng: [37.53893313829381, 126.94763492477553],
  },
];
