import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from '../common/cards/Card';
import DefaultButton from "../common/buttons/DefaultButton";

class SaegimList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          contents: '여기는 목록 페이지에서 보이는 카드'
        },
        {
          id: 4,
          contents: '여기는 목록 페이지에서 보이는 카드'
        }
      ]
    }
  }

  getSaegimList() {
    // 목록 가져오는 api 추가
  }

  componentDidMount() {
    this.getSaegimList()
  }

  render() {
    const data = this.state.data
    const PrintList = data.map((saegim, i) => {
      return (
          <div>
            <Card children={saegim.contents}/>
            <Link to={{pathname: `${saegim.id}/`}}>
              <DefaultButton text={saegim.id + '페이지로 갑니다'}/>
            </Link>
          </div>
      )
    });

    return (
      <div>
        {PrintList}
      </div>
    );
  }
}

export default SaegimList;
