import React, { Component } from 'react';
import SaegimItem from "./SaegimItem";
import SaegimList from "./SaegimList";

const background = <span style={{display:"none"}}>Archive</span>;

class SaegimListPage extends Component {
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
    const data = this.state.data;
    const PrintList = data.map((saegim, i) => {
      return (
          <SaegimItem children={saegim} key={i} />
      )
    });

    return (
      <div>
        <SaegimList background={background}>
          {PrintList}
        </SaegimList>
      </div>
    );
  }
}

export default SaegimListPage;
