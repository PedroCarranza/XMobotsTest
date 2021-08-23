import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import React from 'react';

import Login from "./pages/Login"
import Register from './pages/Register';
import Main from './pages/Main';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
    };
  }


  render() {
    if (this.state.user !== "") {
      return (
        <div className="App">
          <BrowserRouter>
            <Route path="/" exact component={() => <Main user={this.state.user} />} />
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div className="App">
          <BrowserRouter>
            <Route path="/" exact component={() => <Login setUser={(param) => { this.setState({ user: param }) }} />} />
            <Route path="/login" exact component={() => <Login setUser={(param) => { this.setState({ user: param }) }} />} />
            <Route path="/register" exact component={() => <Register setUser={(param) => { this.setState({ user: param }) }} />} />
          </BrowserRouter>
        </div>
      );
    }
  }

}

export default App;
