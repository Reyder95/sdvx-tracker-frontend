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
      username: '',
      selectedFile: null,
      discord: '',
      twitch: '',
      twitter: ''
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

    localStorage.setItem("user_id", data.user[0].id)
    localStorage.setItem("username", data.user[0].username)
    localStorage.setItem("jwt_token", data.token)
    
    document.getElementById('loggedin').style.display = "block";

    document.getElementById('unloggedin').style.display = "none";

    window.location.reload(false)
  }

  handleLogout() {
    axios.get('http://localhost:3000/auth/logout', { withCredentials: true })
      .then(res => {
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        localStorage.removeItem('jwt_token')
        alert("Successfully logged out!")
        document.getElementById('loggedin').style.display = "none"
        document.getElementById('unloggedin').style.display = "block"

        window.location.reload(false)
      })
  }

  openModal() {
    let modal = document.getElementById('profileSettingsModal')

    document.getElementById('userDropdown').classList.toggle("show")

    modal.style.display = 'block'
  }

  closeModal() {
    let modal = document.getElementById('profileSettingsModal')

    modal.style.display = 'none'
  }

  userDropdown() {
    document.getElementById('userDropdown').classList.toggle("show");
  }

  onFileChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onFileUpload(event) {
    event.preventDefault()

    console.log(this.state.selectedFile)

    const formData = new FormData();

    formData.append(
      "profile",
      this.state.selectedFile,
      this.state.selectedFile.name
    )

    axios.post('http://localhost:3000/api/profile_picture/' + localStorage.getItem('user_id'), formData,{
      withCredentials: true,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res)
    })
  }

  setTwitter(event) {
    this.setState({
      twitter: event.target.value
    })
  }

  setDiscord(event) {
    this.setState({
      discord: event.target.value
    })
  }

  setTwitch(event) {
    this.setState({
      twitch: event.target.value
    })
  }

  submitInformation(event) {

    event.preventDefault()

    let postObject = {}

    if (this.state.discord != '' || this.state.twitter != '' || this.state.twitch != '') {
      if (this.state.discord != '')
        postObject.discord = this.state.discord

      if (this.state.twitter != '')
        postObject.twitter = this.state.twitter

      if (this.state.twitch != '')
        postObject.twitch = this.state.twitch

      console.log(postObject)

      axios.post('http://localhost:3000/api/edit_profile', {postObject}, {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('jwt_token')}`
        }
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      console.log('Nope!')
    }
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
                  <p id="profileDropdown" onClick={() => this.userDropdown()} className="color-secondary link">Welcome, {localStorage.getItem("username")}</p>
                  <div id="userDropdown" className="dropdown-content color-secondary font-roboto-slab bg-primary">
                    <Link to={'/profile?id=' + localStorage.getItem('user_id')} onClick={() => this.userDropdown()} className="test color-secondary link">Profile</Link>
                    <p onClick={() => this.openModal()} className="test color-secondary link">Settings</p>
                    <Link to={'/'} onClick={this.handleLogout.bind(this)} className="test color-secondary link">Logout</Link>
                  </div>
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
  
            <Route path="/profile" render={props => ( <Profile {...props}/> )}/>
  
            <Route path="/songlist" render={props => ( <SongList {...props}/> )}>
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
  
            <Route path="/song" render={props => ( <SongView {...props}/> )}/>
          </Switch>
        
        </Router>

        <div id="profileSettingsModal" className="modal">
          <div className="modal-content bg-secondary">
            <div className="modal-header">
              <span className="close" onClick={() => this.closeModal()}>&times;</span>
              <h2 className="mb-1 font-roboto-slab">Profile Settings</h2>
              <hr className="bg-quintery"/>
            </div>
            <div className="modal-body mt-2 font-roboto color-quartery">
              <form>
                <div className="settingsContainer">
                  <h3>Profile Picture</h3> <br />
                  <input onChange={(e) => this.onFileChange(e)} type="file"/>

                  <input onClick={(e) => this.onFileUpload(e)} type="submit" value="Upload Image" className="btn mt-2"/>
                </div>

                <div className="settingsContainer mt-4">
                  <h3>Other Information</h3> <br />
                  <label className="profile-label">Twitter Link</label>
                  <input type='text' onChange={(e) => this.setTwitter(e)} className="profileInput"/>

                  <label className="mt-3 profile-label">Discord Tag</label>
                  <input onChange={(e) => this.setDiscord(e)} className="profileInput"/>

                  <label className="mt-3 profile-label">Twitch Link</label>
                  <input onChange={(e) => this.setTwitch(e)} className="profileInput"/>

                  <input onClick={(e) => this.submitInformation(e)} type="submit" className="btn mt-4 submit-info" value="Submit Information"/>
                </div>
                
              </form>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default App;
