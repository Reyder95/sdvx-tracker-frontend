import React from 'react'   // React Stuff
import { Redirect } from 'react-router-dom'     // Redirect to redirect user after they login
import { loginUser } from '../../api-calls'     // Import API function to login the user
import queryString from 'query-string'

// Import CSS file
import '../css/login.css'

// Login Page
class Login extends React.Component {
    constructor(props) {
        super(props)

        // Contains information from the form (username and password as well as any errors and if the login is okay)
        this.state = {
            key: '',
            password: '',
            current_error: '',
            loginOK: false,
            userID: ''
        }
    }

    // ---State Setting---

    // this.state.key
    setKey(event) {
        this.setState({
            key: event.target.value
        })
    }

    // this.state.password
    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    // Log in the user
    login(event) {

        event.preventDefault() // Don't refresh the page

        // If the user doesn't leave any field blank, proceed
        if (
            this.state.key.trim() != '' &&  
            this.state.password.trim() != ''
            )
        {
            // Build the user object out of the key and password
            const user = {
                key: this.state.key.trim(),
                password: this.state.password.trim()
            }

            // Call the API to log in the user
            loginUser(user)
            .then(result => {
                console.log(result.user.user[0].id)

                // Set the state to login okay and handle the login in the App class
                this.setState({
                    loginOK: result.confirm,
                    userID: result.user.user[0].id
                })
                this.props.handleLogin(result.user)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else
        {
            this.setState({
                current_error: 'Please fill in all fields!'
            }, this.setErrors())
        }
    }

    // On component startup change errors to none display
    componentDidMount() {
        let errors = document.getElementById("errors")

        errors.style.display = "none"

        let values = queryString.parse(this.props.location.search)

        if (values.l == 1) 
            document.getElementById('signed-up').style.display = 'block'
        else
            document.getElementById('signed-up').style.display = 'none'
    }

    // When the user does something wrong display the errors
    setErrors() {
        let errors = document.getElementById("errors")

        errors.style.display = "block"
    }

    // Render elements to the screen
    render() {

        // If the login was successful, redirect to the homepage
        if (this.state.loginOK) {
            return <Redirect push to={`/profile?id=${this.state.userID}`}/>
        }
        // If the login wasn't successful or the user never tried logging in yet, show them the login page
        else
        {
            return(
                <div className="comp_login font-roboto-slab">
                    <form className="bg-tertiary">
                        <h2 className="color-quartery">Login</h2>
                        
                        <div id="errors">
                            {this.state.current_error}
                        </div>

                        <div id="signed-up">
                            You have successfully signed up
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Username or Email</label> <br />
                            <input onChange={this.setKey.bind(this)} value={this.state.key} type="text"/>
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Password</label> <br />
                            <input onChange={this.setPassword.bind(this)} type="password"/>
                        </div>
    
                        <button onClick={this.login.bind(this)} className="btn bg-quintery">Login</button>
                    </form>
                </div>
            )
        } 
    }
}

export default Login;