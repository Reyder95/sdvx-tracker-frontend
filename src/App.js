import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './page-stuff/pages/profile'
import SongList from './page-stuff/pages/songlist'
import Footer from './page-stuff/components/general/footer'

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
              <Link className="color-secondary link">Login</Link>
              <Link className="color-secondary link">Register</Link>
            </div>
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
          <Route path="/songlist">
            <SongList />
          </Route>
        </Switch>
      
      </Router>

      <Footer />
    </div>
  );
}

export default App;
