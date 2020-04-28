import React from 'react'

import '../css/register.css'

class Register extends React.Component {
    render() {
        return (
            <div className="comp_register font-roboto-slab">
                <form className="bg-tertiary">
                    <h2 className="color-quartery">Register</h2>
                    <div className="form-item color-secondary">
                        <label>Username</label> <br />
                        <input type="text"/>
                    </div>

                    <div className="form-item color-secondary">
                        <label>Password</label> <br />
                        <input type="password"/>
                    </div>

                    <div className="form-item color-secondary">
                        <label>Confirm Password</label> <br />
                        <input type="password"/>
                    </div>

                    <div className="form-item color-secondary">
                        <label>Email</label> <br />
                        <input type="email"/>
                    </div>

                    <div className="form-item color-secondary">
                        <label>Confirm Email</label> <br />
                        <input type="email"/>
                    </div>

                    <button className="btn bg-quintery">Register!</button>
                </form>
            </div>
        )
    }
}

export default Register;