import React, { Component } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import SelectInput from "../common/inputs/SelectInput";

class MyPage extends Component {
  listItem;

  constructor(props) {
    super(props);
    this.state = {
      mySaegim: 'time',
      bookMark: 'time',
      options: [
        { value: 'time', text: '시간 순으로 보기'},
        { value: 'location', text: '장소 별로 보기'},
        { value: 'tag', text: '태그 별로 보기'}
      ],
      data: [
        {
          id: 1,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 2,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 3,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 4,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 5,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 6,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 7,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        },
        {
          id: 8,
          w3w: '///모니터.숨은.자꾸',
          content: '내 용 자 리'
        }
      ],
      preItems: 0,
      items: 3,
      printData: []
    }
  };

  getData() {
    let _result = this.state.data.slice(this.state.preItems, this.state.items)
    this.setState({
      printData: _result
    })
  }

  componentDidMount() {
    this.setState({
      printData: this.getData()
    })
  }

  handleChange = async (e) => {
    const _name = e.target.name;
    await this.setState({
      [_name]: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
      console.log('update')
      this._infiniteScroll()
    }
  }

  _infiniteScroll = () => {
    let _scrollHeight = this.listItem.scrollHeight;
    let _scrollTop = this.listItem.scrollTop;
    let _clientHeight = this.listItem.height;
    console.log(_scrollHeight, _scrollTop, _clientHeight)

    if (_scrollTop + _clientHeight === _scrollHeight) {
      this.setState({
        preItems: this.state.items,
        items: this.state.items + 3
      })
      this.getData()
    }
  }

  render() {
    const PrintOptions = this.state.options.map((option) => {
        return (
          <option value={option.value} key={option.text}>{option.text}</option>
        )
      }
    )

    const PrintList = this.state.data.map((saegim, i) => {
      return (
        <Link to={`list/${saegim.id}`}>
          <div>{saegim.w3w}</div>
          <div>{saegim.content}</div>
        </Link>
      )
    })

    return (
      <div>
        <Wrapper>
          <UserInfo>
            <User>
              <UserName>
                최솔지
              </UserName>
              <UserEmail>
                soulg@ssafy.com
              </UserEmail>
            </User>
            <UserSaegim>
              <SaegimCount>
                작성 00 개
              </SaegimCount>
              <SaegimCount>
                되새김 00 개
              </SaegimCount>
              <SaegimCount>
                덧새김 00 개
              </SaegimCount>
            </UserSaegim>
          </UserInfo>
          <SaegimInfo>
            <StSelect
              autowidth
              value={this.state.mySaegim}
              onChange={this.handleChange}
              inputProps={{
                name: 'mySaegim',
                id: 'mySaegim',
              }}
            >
              {PrintOptions}
            </StSelect>
            <SaegimShortList
              ref={div => (this.listItem = div)}
            >
              {PrintList}
            </SaegimShortList>
          </SaegimInfo>
          <SaegimInfo>
            <StSelect
              autowidth
              value={this.state.bookMark}
              onChange={this.handleChange}
              inputProps={{
                name: 'bookMark',
                id: 'bookMark',
              }}
            >
              {PrintOptions}
            </StSelect>
          </SaegimInfo>
        </Wrapper>
      </div>
    );
  }
}

export default MyPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: 100vh;
`;

const UserInfo = styled.div`
  position: relative;
  top: 8vh;
  padding: 16px 16px 0px 16px;
  background-color: #919191;
  width: 84vw;
  height: 8vh;
`;

const UserEmail = styled.span`
`;

const UserName = styled.span`
`;

const SaegimCount = styled.div`
  font-size: 0.8rem;
`;

const UserSaegim = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SaegimInfo = styled(UserInfo)`
  height: 32vh;
  margin-top: 16px;
  overflow: auto;
  
  display: flex;
  flex-direction: column;
`;

const StSelect = styled(Select)`
  font-size: 0.9rem;
  
`;

const SaegimShortList = styled.div`
 
`;