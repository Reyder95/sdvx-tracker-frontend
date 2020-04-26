import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './page-stuff/pages/profile.js';

import './page-stuff/css/global.css'
import './page-stuff/css/navbar.css'

function App() {
  return (
    <div className="App">  
      <Router>

      <nav className="bg-primary p-3 font-oswald">
        <div>
          <div>
            <Link className="color-secondary link">
              Home
            </Link>

            <Link className="color-secondary link">
              Song List
            </Link>

            <Link className="color-secondary link">
              Discord
            </Link>
          </div>

          <div>
            <Link>

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
