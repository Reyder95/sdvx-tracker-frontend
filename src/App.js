import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Profile from './page-stuff/pages/profile'
import SongList from './page-stuff/pages/songlist'
import Register from './page-stuff/pages/register'
import Home from './page-stuff/pages/home'
import Login from './page-stuff/pages/login'
import SongView from './page-stuff/pages/song-view'
import axios from 'axios'


import './page-stuff/css/global.css'
import './page-stuff/css/navbar.css'

class App extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      user_id: '',
      username: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3000/users/getloggedin', { withCredentials: true })
      .then(res => {
        document.getElementById('loggedin').style.display = "block"
        document.getElementById('unloggedin').style.display = "none"
      })

    if (localStorage.getItem("user_id") === null)
    {
      document.getElementById('loggedin').style.display = "none"
      document.getElementById('unloggedin').style.display = "block"
    }
    else
    {
      document.getElementById('unloggedin').style.display = "none"
      document.getElementById('loggedin').style.display = "block"
    }
  }

  handleLogin(data) {
    this.setState({
      user_id: data.id,
      username: data.username
    })

    localStorage.setItem("user_id", data.id)
    localStorage.setItem("username", data.username)
    
    document.getElementById('loggedin').style.display = "block";

    document.getElementById('unloggedin').style.display = "none";

    window.location.reload(false)
  }

  handleLogout() {
    axios.get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(res => {
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        alert("Successfully logged out!")
        document.getElementById('loggedin').style.display = "none"
        document.getElementById('unloggedin').style.display = "block"
      })
  }

  render() {
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

              
              <div id="nav-right">
                <div id="loggedin">
                  <Link to={'/profile?id=' + localStorage.getItem('user_id')} className="color-secondary link">{localStorage.getItem("username")}</Link>
                  <Link onClick={this.handleLogout.bind(this)} className="color-secondary link">Log Out?</Link>
                </div>

                <div id="unloggedin">
                  <Link className="color-secondary link" to="/login">Login</Link>
                  <Link className="color-secondary link" to="/register">Register</Link>
                </div>

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
              <Home/>
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
  
            <Route
            path="/login"
            render={props => (
              <Login {...props} handleLogin={this.handleLogin}/>
            )}
            >
            </Route>
  
            <Route path="/song">
              <SongView />
            </Route>
          </Switch>
        
        </Router>
      </div>
    )
  }
}

export default App;
