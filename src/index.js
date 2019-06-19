import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import FirstPage from './views/FirstPage';
import SecondPage from './views/SecondPage';
import ThirdPage from './views/ThirdPage';

import './style.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/second">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/third">
                Contact
              </NavLink>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route path="/second" component={SecondPage} />
            <Route path="/third" component={ThirdPage} />
            {/* <Route component={Notfound} /> */}
          </Switch>
        </div>
      </Router>
      );
    }
}

ReactDOM.render(<App />, document.getElementById("create-article-form"))