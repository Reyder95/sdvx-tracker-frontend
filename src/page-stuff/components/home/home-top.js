// Main Component: Home

import React from 'react'   // React stuff
import { Link } from 'react-router-dom' // Add link to go to another route when something is clicked

// Top of the Homepage
class HomeTop extends React.Component {

    // If the user is logged in, remove the "Register Now" button from the homepage
    componentDidMount() {
        if (localStorage.getItem('user_id') != null)
            document.getElementById('register').style.display = 'none'
    }

    // Render elements to the screen
    render() {
        return(
            <div className="comp_hometop bg-tertiary font-oswald color-secondary">
                <div className="content">
                    <h1>Welcome to Sepia <br/> A SOUND VOLTEX score tracker</h1>        
                    <Link to="/register">
                        <button id="register" className="register-btn btn bg-quintery mt-4">Register Now!</button>
                    </Link>           
                    
                </div>
            </div>
        )
    }
}

export default HomeTop;