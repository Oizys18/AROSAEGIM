import React, { Component } from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";


class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mySaegim: 'time',
      bookMark: 'time'
    }
  };

  componentDidMount() {
    console.log(this.state)
  }

  handleChange = async (e) => {
    const _name = e.target.name;
    await this.setState({
      [_name]: e.target.value
    })
    console.log(this.state)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state !== prevState) {
      console.log('update')
    }
  }

  render() {
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
            <FormControl className>
              <Select
                native
                value={this.state.mySaegim}
                onChange={this.handleChange}
                inputProps={{
                  name: 'mySaegim',
                  id: 'mySaegim',
                }}
              >
                {/*<option aria-label="None" value="" />*/}
                <option value="time">시간 순으로 보기</option>
                <option value="location">장소로 보기</option>
                <option value="tag">태그로 보기</option>
              </Select>
          </FormControl>
          </SaegimInfo>
          <SaegimInfo>
            <FormControl className>
              <Select
                native
                value={this.state.bookMark}
                onChange={this.handleChange}
                inputProps={{
                  name: 'bookMark',
                  id: 'bookMark',
                }}
              >
                {/*<option aria-label="None" value="" />*/}
                <option value="time">시간 순으로 보기</option>
                <option value="location">장소로 보기</option>
                <option value="tag">태그로 보기</option>
              </Select>
            </FormControl>
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
  margin-top: 16px
`;
