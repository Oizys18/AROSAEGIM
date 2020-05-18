import React, { Component } from "react";
import { BrowserRouter as Router, Route, withRouter, } from "react-router-dom";
import { Storage } from './storage/Storage'
import Main from "./components/main/Main";
import TopBar from './components/common/menus/TopBar';
import SideMenu from './components/common/menus/SideMenu';
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";

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
    window.addEventListener('resize', this.changeHeight)
  }
  componentDidUpdate(preProps, preState){
    if(preState.height !== this.state.height){
      this.setState({
        appHeight: window.innerHeight,
      })
    }
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.changeHeight)
  }
  changeHeight = () => {
    this.setState({
      appHeight: window.innerHeight,
    })
  }

  toggleSideMenu = () => {
    this.setState({
      sideMenu: !this.state.sideMenu,
    })
  }


  render() {
    return (
      <Storage.Provider value={this.state}>
        {
          this.props.location.pathname !== '/login' && 
          <>
            <TopBar on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
            <SideMenu on={this.state.sideMenu} toggle={this.toggleSideMenu}/>
          </>
        }

        {/* <Router> */}
          <Route exact path="/" component={Main} />
          <Route path="/auth" component={Auth} />
          <Route path="/login" component={Login}/>
        {/* </Router> */}

      </Storage.Provider>
    );
  }
}
export default withRouter(App);
