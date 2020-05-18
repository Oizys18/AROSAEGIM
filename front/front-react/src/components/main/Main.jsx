import React, { Component } from "react";
import DefaultButton from "../common/buttons/DefaultButton";

class Main extends Component {

  go = () => {
    this.props.history.replace('/login')
  }

  render() {
    return (
      <div>
        <div>Main! 제발 나와라!</div>
        <DefaultButton text="default-button" onClick={this.go}/>
      </div>
    );
  }
}
export default Main;
