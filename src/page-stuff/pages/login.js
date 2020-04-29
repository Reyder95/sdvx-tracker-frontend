import React from 'react'

import '../css/login.css'


class Login extends React.Component {
    render() {
        return(
            <div className="comp_login font-roboto-slab">
                <form className="bg-tertiary">
                    <h2 className="color-quartery">Login</h2>
                    <div className="form-item color-secondary">
                        <label>Username or Email</label> <br />
                        <input type="text"/>
                    </div>

                    <div className="form-item color-secondary">
                        <label>Password</label> <br />
                        <input type="password"/>
                    </div>

                    <button className="btn bg-quintery">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;