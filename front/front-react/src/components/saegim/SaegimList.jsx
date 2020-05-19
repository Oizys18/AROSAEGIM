import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from '../common/cards/Card';
import DefaultButton from "../common/buttons/DefaultButton";

class SaegimList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 3,
      contents: '여기는 목록 페이지에서 보이는 카드',
    }
  }

  render() {
    return (
      <div>
        <Card children={this.state.contents}/>
        <Link to={{pathname: `${this.state.id}/`}}>
          <DefaultButton text={this.state.id + '페이지로 갑니다'}/>
        </Link>
      </div>
    );
  }
}

export default SaegimList;
