import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Auth from "./components/auth/Auth";
class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Main} />
        <Route path="/auth" component={Auth} />
      </Router>
    );
  }
}
export default App;
