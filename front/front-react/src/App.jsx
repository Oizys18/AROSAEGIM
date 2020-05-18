import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Router>
          <Switch>
            <Route path="/login" component={Login}/>
          </Switch>
          
          <Route path="/" component={TopBar}/>
          <Route path="/" component={Main} />
          <Route path="/" component={SideMenu}/>

          <Route path="/auth" component={Auth} />
        </Router>
      </Storage.Provider>
    );
  }
}
export default App;
