import React, { Component } from "react";
import { Route, withRouter, } from "react-router-dom";
import { Storage } from './storage/Storage'
import Main from "./components/main/Main";
import TopBar from './components/common/menus/TopBar';
import SideMenu from './components/common/menus/SideMenu';
import Auth from "./components/account/Auth";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      appHeight: window.innerHeight,

      sideMenu: false,
      toggleSideMenu: this.toggleSideMenu,
    }
  }

  // 생각해보니 생성할때 높이 초기화하면 필요없을듯
  // componentDidMount(){
  //   window.addEventListener('resize', this.handleHeight) // 화면 높이를 항상 맞추기 위한 이벤트리스너
  //   console.log('app did mount', window.innerHeight) 
  // }
  // shouldComponentUpdate(){ // 자판 튀어나와도 앱의 높이를 유지하기 위한 생명주기 메서드
  //   return (window.innerHeight !== this.state.appHeight) ? false : true;
  // }
  // componentDidUpdate(preProps, preState){
  //   console.log('app did update', window.innerHeight)
  //   if(preState.appHeight !== window.innerHeight){
  //     this.setState({ appHeight: preState.appHeight })
  //   }
  // }
  // componentWillUnmount(){
  //   window.removeEventListener('resize', this.handleHeight) // 화면 높이 이벤트리스너 해제
  // }
  // handleHeight = () => {
  //   this.setState({ appHeight: window.innerHeight })
  // }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu })
  }

  render() {
    return (
      <Storage.Provider value={this.state}>

        { // 사이드메뉴랑, 상단바(햄버거)는 라우터가 아니라 그냥 조건부 렌더링으로 작성
          (this.props.location.pathname !== '/login' && 
          this.props.location.pathname !== '/signup') && 
          <>
            <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
            <SideMenu on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
          </>
        }

        <Route exact path="/" component={Main} />
        <Route path="/auth" component={Auth} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>

      </Storage.Provider>
    );
  }
} export default withRouter(App);