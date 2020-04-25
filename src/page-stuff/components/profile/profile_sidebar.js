import React from 'react'

class Sidebar extends React.Component {
    render() {
        return(
            <div className="comp_sidebar">
                <div className="profile-image">
                    <img src="https://zcoin.io/storage/2017/01/blank-avatar-300x300.png"/>
                </div>
                <h2 className="username-display">Username</h2>
                <div className="profile-stats">
                    <p>
                        <strong>Date Joined: </strong> 4/23/2020
                    </p>
                    <p>
                        <strong>Scores Posted: </strong> 254
                    </p>
                    <p>
                        <strong>Songs In Library: </strong> 186
                    </p>
                    <p>
                        <strong>Highest Clear Level: </strong> 20
                    </p>
                </div>
                <div className="volforce-display">
                    <h1>17.75</h1>
                    <h2>Argento</h2>
                </div>
                <div className="social-media-display">
                    <p>
                        <strong>Twitter: </strong> None
                    </p>
                    <p>
                        <strong>Discord Server: </strong> None
                    </p>
                    <p>
                        <strong>Instagram: </strong> None
                    </p>
                </div>
            </div>
        )
    }
}

export default Sidebar
