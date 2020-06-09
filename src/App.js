import React from 'react' // This is to use react
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom' // Allows us to handle routing

// Various pages (for routing purposes)
import Profile from './page-stuff/pages/profile'  
import SongList from './page-stuff/pages/songlist'
import Register from './page-stuff/pages/register'
import Home from './page-stuff/pages/home'
import Login from './page-stuff/pages/login'
import SongView from './page-stuff/pages/song-view'

// Various helper functions regarding the API
import { 
  getLoggedInStatus,
  logUserOut,
  profilePictureUpload,
  editProfile,
  changeUsername
} from './api-calls'

// Some CSS imports
import './page-stuff/css/global.css'
import './page-stuff/css/navbar.css'
import './page-stuff/css/modals.css'

// App class, this is the entirety of our program.
class App extends React.Component{

  // Initialize props in our constructor
  constructor(props) {
    super(props)

    // Our state. Contains our user ID and some other useful information. Typically things here persist throughout the entire application
    this.state = {
      user_id: '',
      username: '',
      selectedFile: null,
      discord: '',
      twitch: '',
      twitter: '',
      newUsername: '',
      modified: false
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  // On component mount (basically on startup) check whether or not the user is logged in and display relative information regarding this
  componentDidMount() {
    getLoggedInStatus();
  }

  // ---State Setting---

  // this.state.selectedFile (happens when a user chooses a file to upload but doesn't hit the upload button yet ... for profile pictures)
  onFileChange(event) {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  // this.state.twitter
  setTwitter(event) {
    this.setState({
      twitter: event.target.value
    })
  }

  // this.state.discord
  setDiscord(event) {
    this.setState({
      discord: event.target.value
    })
  }

  // this.state.twitch
  setTwitch(event) {
    this.setState({
      twitch: event.target.value
    })
  }

  setUsername(event) {
    this.setState({
      newUsername: event.target.value
    })
  }

  // ---Login / Logout---

  // Login happens through the login page and the result of this data gets sent here.
  handleLogin(data) {
    
    // Set the state properly based on the data returned
    this.setState({
      user_id: data.id,
      username: data.username
    })

    localStorage.setItem("user_id", data.user[0].id)  // Set the user ID in local storage
    localStorage.setItem("username", data.user[0].username) // Set the username in local storage (for ease of display)
    localStorage.setItem("jwt_token", data.token)   // Set the authentication in storage so the user can make requests
    
    // Because the user is logged in let's display the information when the user is logged in and hide the unlogged in information.
    document.getElementById('loggedin').style.display = "block";
    document.getElementById('unloggedin').style.display = "none";

    // Reload the page to properly display things
    window.location.reload(false)
  }

  // When a user logs out call the API to log them out.
  handleLogout() {
    logUserOut()
  }

  // ---Modals---

  // Open the profile settings modal to allow the user to change their settings.
  openModal() {
    let modal = document.getElementById('profileSettingsModal')   // Get the modal with ID 'profileSettingsModal'

    this.userDropdown()  // Toggle the visibility of the dropdown. When this modal shows up the dropdown will typically be visible so we use this to hide it.
    
    modal.style.display = 'block' // Show the modal
  }

  // Close the profile settings modal
  closeModal() {
    let modal = document.getElementById('profileSettingsModal') // Get the modal with ID 'profileSettingsModal'

    modal.style.display = 'none'  // Hide the modal
  }

  // ---Dropdowns---

  // Either display or hide the dropdown
  userDropdown() {
    document.getElementById('userDropdown').classList.toggle("show");
  }

  // ---Profile Settings---

  // When a user clicks the upload button
  onFileUpload() {

    if (this.state.selectedFile != null) {
      const formData = new FormData();  // Create a FormData object 

      // Add to the form data object the file with field "profile"
      formData.append(
        "profile",
        this.state.selectedFile,
        this.state.selectedFile.name
      )
  
      // Send the formData to the API so it can be processed and uploaded to the database
      profilePictureUpload(formData)
    }
    
  }

  // Submit profile edit information
  submitInformation(event) {

    event.preventDefault()  // Don't refresh the page

    let postObject = {} // Create an empty object to place items into

    // Only allow the user through if at least one item has been entered.
    if (this.state.discord != '' || this.state.twitter != '' || this.state.twitch != '') {

      // Checks the particular field and if it has data, add it into the empty object
      if (this.state.discord != '')
        postObject.discord = this.state.discord

      if (this.state.twitter != '')
        postObject.twitter = this.state.twitter

      if (this.state.twitch != '')
        postObject.twitch = this.state.twitch 

        // Call the API to send data and update the user's profile through the database
        editProfile(postObject)
    } else {
      // ... nope
      console.log('Nope!')
    }

    this.onFileUpload()

    if (this.state.newUsername.trim() != null) {
      changeUsername(this.state.newUsername)
    }

    this.setState({
      modified: true
    })
  }

  // Render this stuff to the screen
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
                
                <a className="color-secondary link" id="discordLink" href="https://discord.gg/nK7A5JB">Discord</a>


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
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={() => this.closeModal()}>&times;</span>
              <h2 className="mb-1 font-roboto-slab">Profile Settings</h2>
            </div>
            <div className="modal-body mt-2 font-roboto">
              <form>
                <div id="profile-stuff" className="settingsContainer mb-4">
                  <h3>Profile Picture</h3> <br />
                  
                <hr />
                  <input className="mt-4 color-secondary" onChange={(e) => this.onFileChange(e)} type="file"/>
                </div>


                <div className="settingsContainer otherInfo mt-4 color-secondary">
                  <h3>Social Settings</h3> <br />
                  <hr/>
                  <label className=" mt-4 profile-label">Twitter Link</label>
                  <input type='text' onChange={(e) => this.setTwitter(e)} className="profileInput"/>

                  <label className="mt-3 profile-label">Discord Tag</label>
                  <input type='text' onChange={(e) => this.setDiscord(e)} className="profileInput"/>

                  <label className="mt-3 profile-label">Twitch Link</label>
                  <input type='text' onChange={(e) => this.setTwitch(e)} className="profileInput"/>

                </div>


                <div className="settingsContainer otherInfo mt-4 color-secondary">
                  <h3>Preferences</h3> <br />
                  <hr/>

                  <label className=" mt-4 profile-label">Change Username</label>
                  <input type='text' onChange={(e) => this.setUsername(e)} className="profileInput"/>
                </div>

                
                <button onClick={(e) => this.submitInformation(e)} className="btn mt-4 submit-info">Submit Information</button>
                
              </form>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default App;
