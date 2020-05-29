import React from 'react'
import { Link } from 'react-router-dom'

class HomeTop extends React.Component {

    componentDidMount() {
        if (localStorage.getItem('user_id') != null)
            document.getElementById('register').style.display = 'none'
    }

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