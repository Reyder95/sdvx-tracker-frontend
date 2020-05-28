import React from 'react'

class Sidebar extends React.Component {

    renderDate() {
        let profileDate = new Date(this.props.date_joined)

        let month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        return month[profileDate.getMonth()] + " " + profileDate.getDate() + ", " + profileDate.getFullYear();
    }

    render() {
        return(
            <div className="comp_sidebar">
                <div className="profile-image">
                    <img src="https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png"/>
                </div>
                <h1 className="username-display color-quartery mb-2 mt-2 font-roboto">{this.props.username}</h1>
                <div className="color-secondary bg-primary pt-2 pb-2 font-source">
                    <p className="p-1">
                        <strong>Date Joined: </strong> {this.renderDate()}
                    </p>
                    <p className="p-1">
                        <strong>Scores Posted: </strong> {this.props.scorecount}
                    </p>
                    <p className="p-1">
                        <strong>Songs In Library: </strong> {this.props.librarycount}
                    </p>
                </div>
                <div className="volforce-display font-roboto mt-2 mb-2">
                    <h1 className="color-quartery">xx.xx</h1>
                    <h2 className="color-quartery">---</h2>
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
