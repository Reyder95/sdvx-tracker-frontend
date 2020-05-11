import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import '../css/login.css'


class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            key: '',
            password: '',
            current_error: '',
            loginOK: false
        }
    }

    setKey(event) {
        this.setState({
            key: event.target.value
        })
    }

    setPassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    login(event) {
        event.preventDefault()

        if (
            this.state.key.trim() != '' &&  
            this.state.password.trim() != ''
            )
        {
            axios.post('http://localhost:3000/auth/login', {
                key: this.state.key,
                password: this.state.password
            })
                .then(res => {
                    alert("Successfully logged in!")
                    this.setState({
                        loginOK: true
                    })
                }, (error) => {
                    alert("Invalid username or password!")
                })
        }
        else
        {
            this.setState({
                current_error: 'Please fill in all fields!'
            }, this.setErrors())
        }
    }

    componentDidMount() {
        let errors = document.getElementById("errors")

        errors.style.display = "none"
    }

    setErrors() {
        let errors = document.getElementById("errors")

        errors.style.display = "block"
    }

    render() {

        if (this.state.loginOK) {
            return <Redirect push to="/"/>
        }
        else
        {
            return(
                <div className="comp_login font-roboto-slab">
                    <form className="bg-tertiary">
                        <h2 className="color-quartery">Login</h2>
                        
                        <div id="errors">
                            {this.state.current_error}
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