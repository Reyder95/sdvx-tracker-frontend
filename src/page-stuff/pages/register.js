import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../css/register.css'

class Register extends React.Component {

    constructor(props) {
        super(props)

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

    setUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    setPasswordConfirm(event) {
        this.setState({
            password_confirm: event.target.value
        })
    }

    setEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    setEmailConfirm(event) {
        this.setState({
            email_confirm: event.target.value
        })
    }

    componentDidMount() {
        let errors = document.getElementById("errors")

        errors.style.display = "none"
    }

    setErrors() {
        let errors = document.getElementById("errors")

        errors.style.display = "block"
    }

    register(event) {
        event.preventDefault()

        if (
            this.state.username.trim() != '' &&
            this.state.password.trim() != '' &&
            this.state.password_confirm.trim() != '' &&
            this.state.email.trim() != '' &&
            this.state.email_confirm.trim() != ''
            )
        {
            if (this.state.password.trim().length >= 6) 
            {
                if (this.state.password === this.state.password_confirm)
                {
                    if (this.state.username.trim().length <= 15)
                    {
                        if (this.state.email.includes("@")) 
                        {
                            if (this.state.email === this.state.email_confirm)
                            {
                                const user = {
                                    username: this.state.username,
                                    password: this.state.password,
                                    email: this.state.email
                                }

                                axios.post('http://localhost:3000/auth/signup', { 
                                    username: this.state.username,
                                    password: this.state.password,
                                    email: this.state.email
                                 })
                                    .then(res => {
                                        alert("Successfully logged in!")
                                        this.setState({
                                            signupOK: true
                                        })
                                    }, (error) => {
                                        alert("Username or Email has been taken")
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

    render() {

        if (this.state.signupOK) {
            return <Redirect push to="/login"/>

        }
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