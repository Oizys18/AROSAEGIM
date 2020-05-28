import React, { Component } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import { Link } from "react-router-dom";
import TabPanel from "./TabPanel";
import MyPageMenu from "./MyPageMenu";

class MyPage extends Component {
  listItem;

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      mySaegim: 'time',
      like: 'time',
      commented: 'time',
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
      ]
    }
  };

  selectChange = async (e) => {
    const _name = e.target.name;
    await this.setState({
      [_name]: e.target.value
    })
  };

  tabChange = async (e, val) => {
    console.log(val)
    await this.setState({
      currentTab: val
    })
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
    }
  }

  render() {
    const PrintOptions = this.state.options.map((option) => {
        return (
          <option value={option.value} key={option.text}>{option.text}</option>
        )
      }
    );

    // const PrintList = this.state.data.map((saegim, i) => {
    //   return (
    //     <SaegimItem>
    //       <StLink to={`list/${saegim.id}`}>
    //         <div>{saegim.w3w}</div>
    //         <div>{saegim.content}</div>
    //       </StLink>
    //     </SaegimItem>
    //   )
    // });

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
              <Tabs
                value={this.state.currentTab}
                textColor="primary"
                indicatorColor="none"
                onChange={this.tabChange}
              >
                <Tab icon={<CreateOutlinedIcon/>} value={0} />
                <Tab icon={<FavoriteBorderOutlinedIcon/>} value={1} />
                <Tab icon={<MessageOutlinedIcon/>} value={2} />
              </Tabs>
            </UserSaegim>
          </UserInfo>
          <SaegimInfo value={this.state.currentTab}>
            <ListInfo>
            <ListTitle>{MyPageMenu[this.state.currentTab].title}</ListTitle>
              <StSelect
                autowidth
                value={this.state[MyPageMenu[this.state.currentTab].value]}
                onChange={this.selectChange}
                inputProps={{
                  name: MyPageMenu[this.state.currentTab].value,
                  id: MyPageMenu[this.state.currentTab].value,
                }}
              >
                {PrintOptions}
              </StSelect>
            </ListInfo>
            <SaegimShortList
              ref={div => (this.listItem = div)}
            >
              <TabPanel
                value={this.state.currentTab}
                index={0}
                data={this.state.data}
              />
              <TabPanel
                value={this.state.currentTab}
                index={1}
                data={this.state.data}
              />
              <TabPanel
                value={this.state.currentTab}
                index={2}
                data={this.state.data}
              />
              <TabPanel
                value={this.state.currentTab}
                index={3}
                data={this.state.data}
              />
            </SaegimShortList>
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
  top: 8%;
  padding: 16px 16px 0px 16px;
  background-color: #f1f1f1;
  width: 80%;
  height: 10%;
  margin-bottom: 24px;
  border-radius: 0.4em;
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

const SaegimInfo = styled.div`
  height: 60%;
  width: 80%;
  top: 8%;
  
  margin-top: 8px;
  padding: 16px;

  background-color: #f1f1f1;
  border-radius: .4em;

  display: flex;
  flex-direction: column;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: ${props => ([20, 40, 60][props.value])}%;
    border: 24px solid transparent;
    border-bottom-color: #f1f1f1;
    border-top: 0;
    margin-top: -32px;
    transition: all ease .7s;
  }
`;

const StSelect = styled(Select)`
  font-size: 0.9rem;
`;

const SaegimShortList = styled.div`
  overflow: auto;
`;


const ListInfo = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding: 8px;
`;

const ListTitle = styled.div``;

