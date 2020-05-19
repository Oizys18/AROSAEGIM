import React, {Component} from "react";
import Card from "../common/cards/Card";
import DefaultButton from "../common/buttons/DefaultButton";

class SaegimDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user_id: '',
      user_name: '',
      contents: '이것은 상세보기에서 보이는 카드',
      images: '',
      w3w: '',
      longitude: '',
      latitude: '',
      registered_datetime: '',
      isLocked: '',
      like: '',
      tags: ''
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Card children={this.state.contents} />
        <DefaultButton onClick={this.goBack} text={'뒤로가기'} />
      </div>
    );
  }
}

export default SaegimDetail;