import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './page-stuff/pages/profile'
import SongList from './page-stuff/pages/songlist'
import Register from './page-stuff/pages/register'
import Home from './page-stuff/pages/home'
import Login from './page-stuff/pages/login'
import SongView from './page-stuff/pages/song-view'

import './page-stuff/css/global.css'
import './page-stuff/css/navbar.css'

function App() {

  return (
    <div className="App">  
      <Router>

      <nav className="bg-primary p-3 font-roboto-slab">
        <div>
          <div>
            <Link className="color-secondary link" to="/">
              Home
            </Link>

            <Link className="color-secondary link" to="/songlist">
              Song List
            </Link>

            <Link className="color-secondary link">
              Discord
            </Link>
            <div className="nav-right">
              <Link className="color-secondary link" to="/login">Login</Link>
              <Link className="color-secondary link" to="/register">Register</Link>
            </div>
          </div>

          <div>
            <Link>

            </Link>
          </div>
        </div>
      </nav>

        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/songlist">
            <SongList />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/song">
            <SongView />
          </Route>
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
