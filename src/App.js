import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './page-stuff/pages/profile.js';

import './page-stuff/css/global.css';

function App() {
  return (
    <div className="App">  
      <Router>

      <nav className="navbar">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item">
              Home
            </Link>

            <Link className="navbar-item">
              Song List
            </Link>

            <Link className="navbar-item">
              Discord
            </Link>
          </div>

          <div className="navbar-end">
            <Link className="navbar-item">

            </Link>
          </div>
        </div>
      </nav>

        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
