import React from 'react'

class Sidebar extends React.Component {
    render() {
        return(
            <div className="comp_sidebar">
                <div className="profile-image">
                    <img src="https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png"/>
                </div>
                <h1 className="username-display color-quartery mb-2 mt-2 font-roboto">Username</h1>
                <div className="color-secondary bg-primary pt-2 pb-2 font-source">
                    <p className="p-1">
                        <strong>Date Joined: </strong> 4/23/2020
                    </p>
                    <p className="p-1">
                        <strong>Scores Posted: </strong> 254
                    </p>
                    <p className="p-1">
                        <strong>Songs In Library: </strong> 186
                    </p>
                    <p className="p-1">
                        <strong>Highest Clear Level: </strong> 20
                    </p>
                </div>
                <div className="volforce-display font-roboto mt-2 mb-2">
                    <h1 className="color-quartery">17.75</h1>
                    <h2 className="color-quartery">Argento</h2>
                </div>
                <div className="bg-primary font-source color-secondary pt-2 pb-2">
                    <p className="p-1">
                        <strong>Twitter: </strong> None
                    </p>
                    <p className="p-1">
                        <strong>Discord Server: </strong> None
                    </p>
                    <p className="p-1">
                        <strong>Instagram: </strong> None
                    </p>
                </div>
            </div>
        )
    }
}

export default Sidebar