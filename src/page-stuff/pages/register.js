import React from 'react'   // React things
import { Redirect } from 'react-router-dom'     // React router to add redirect to login page if the user signs up
import { registerUser } from '../../api-calls'  // Import the API call to register the user

// Import CSS file
import '../css/register.css' 

// Registration Page
class Register extends React.Component {

    constructor(props) {
        super(props)

        // State regarding all the registration information inside the form
        this.state = {
            username: '',
            password: '',   
            password_confirm: '',
            email: '',
            email_confirm: '',
            current_error: '',
            signupOK: false
        }
    }

    // ---State Setting---

    // this.state.username
    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    // this.state.password
    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    // this.state.password_confirm
    setPasswordConfirm(event) {
        this.setState({
            password_confirm: event.target.value
        })
    }

    // this.state.email
    setEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    // this.state.email_confirm
    setEmailConfirm(event) {
        this.setState({
            email_confirm: event.target.value
        })
    }

    // On component startup
    componentDidMount() {
        let errors = document.getElementById("errors")

        errors.style.display = "none"
    }

    // Error display
    setErrors() {
        let errors = document.getElementById("errors")

        errors.style.display = "block"
    }

    // Register the users
    register(event) {

        event.preventDefault()  // Do not refresh the page

        // Checks whether or not any fields are blank
        if (
            this.state.username.trim() != '' &&
            this.state.password.trim() != '' &&
            this.state.password_confirm.trim() != '' &&
            this.state.email.trim() != '' &&
            this.state.email_confirm.trim() != ''
            )
        {
            // Checks if password character count is greater than or equal to 6
            if (this.state.password.trim().length >= 6) 
            {
                // Checks if password and confirm password match
                if (this.state.password === this.state.password_confirm)
                {
                    // Checks if username character count is less than or equal to 15
                    if (this.state.username.trim().length <= 15)
                    {
                        // Checks if email is a valid email (is there a way to make this better lol)
                        if (this.state.email.includes("@")) 
                        {
                            // Checks if email and confirm email match
                            if (this.state.email === this.state.email_confirm)
                            {
                                // Build the user object out of the username, password, and email
                                const user = {
                                    username: this.state.username,
                                    password: this.state.password,
                                    email: this.state.email
                                }

                                // Call the api to register the user and receive and true or false if it worked or not
                                registerUser(user)
                                .then(result => {
                                   this.setState({
                                       signupOK: result
                                   })
                                })
                                .catch(result => {
                                    console.log(result)
                                    console.log("Crashed")
                                })
                            }
                            else
                            {
                                this.setState({
                                    current_error: 'Emails do not match!'
                                }, this.setErrors())
                            }
                        }
                        else 
                        {
                            this.setState({
                                current_error: 'Email must be a valid email!'
                            }, this.setErrors())
                        }

                    }
                    else {
                        this.setState({
                            current_error: 'Username cannot be longer than 15 characters!'
                        }, this.setErrors())
                    }

                }
                else
                {
                    this.setState({
                        current_error: 'Passwords do not match!'
                    }, this.setErrors())
                }
            }
            else {
                this.setState({
                    current_error: 'Make sure password is 6 characters or more!'
                }, this.setErrors())
            }

            }
            else {
                this.setState({
                    current_error: 'Please fill in all fields!'
                }, this.setErrors())
            }


    }

    // Render elements to the screen
    render() {

        // If the signup was successful, go to the login page to log in
        if (this.state.signupOK) {
            return <Redirect push to="/login"/>

        }
        // If it wasn't successful or the user didn't sign up yet, display the sign up page
        else
        {
            return (

                <div className="comp_register font-roboto-slab">
                    
                    <form className="bg-tertiary">
                        <h2 className="color-quartery">Register</h2>
    
                        <div id="errors">
                            {this.state.current_error}
                        </div>
                        <div className="form-item color-secondary">
                            <label>Username</label> <br />
                            <input type="text" onChange={this.setUsername.bind(this)} value={this.state.username}/>
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Password</label> <br />
                            <input type="password" onChange={this.setPassword.bind(this)} value={this.state.password}/>
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Confirm Password</label> <br />
                            <input type="password" onChange={this.setPasswordConfirm.bind(this)} value={this.state.password_confirm}/>
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Email</label> <br />
                            <input type="email" onChange={this.setEmail.bind(this)} value={this.state.email}/>
                        </div>
    
                        <div className="form-item color-secondary">
                            <label>Confirm Email</label> <br />
                            <input type="email" onChange={this.setEmailConfirm.bind(this)} value={this.state.email_confirm}/>
                        </div>
    
                        <button onClick={this.register.bind(this)} className="btn bg-quintery">Register</button>
                    </form>
                </div>
            )
        }
        
    }
}

export default Register;