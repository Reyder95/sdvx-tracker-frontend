import React from 'react'

class HomeTop extends React.Component {
    render() {
        return(
            <div className="comp_hometop bg-tertiary font-oswald color-secondary">
                <div className="content">
                    <h1>Welcome to Volforce <br/> A SOUND VOLTEX score tracker</h1>                   
                    <button className="register-btn btn bg-quintery mt-4">Register Now!</button>
                </div>
            </div>
        )
    }
}

export default HomeTop;