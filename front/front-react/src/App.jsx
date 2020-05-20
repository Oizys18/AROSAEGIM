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

  componentDidMount(){
    window.addEventListener('resize', this.handleHeight) // 화면 높이를 항상 맞추기 위한 이벤트리스너
  }
  // componentDidUpdate(preProps, preState){
  //   if(preState.height !== this.state.height){
  //     this.setState({
  //       appHeight: window.innerHeight,
  //     })
  //   }
  // }
  componentWillUnmount(){
    window.removeEventListener('resize', this.handleHeight) // 화면 높이 이벤트리스너 해제
  }
  handleHeight = () => {
    this.setState({
      appHeight: window.innerHeight,
    })
  }

  toggleSideMenu = () => {
    this.setState({ sideMenu: !this.state.sideMenu })
  }

  render() {
    return (
      <Storage.Provider value={this.state}>
        {
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