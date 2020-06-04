// Main Component: Profile

import React from 'react'

// Sidebar information, to the left of the profile page
class Sidebar extends React.Component {

    // When given a date via props it parses it into Month Date, Year format (ex. May 18th, 2020)
    renderDate() {

        // Takes prop of date_joined and turns it into a date object
        let profileDate = new Date(this.props.date_joined)

        // Create an array of months so depending on the specific month it can simply pull from this array
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

        // Put it all together into a proper date and return
        return month[profileDate.getMonth()] + " " + profileDate.getDate() + ", " + profileDate.getFullYear();
    }

    // Display elements to the screen
    render() {
        return(
            <div className="comp_sidebar">
                <div className="profile-image">
                    <img src={this.props.pf_picture != null ? `http://localhost:3000/images/${this.props.pf_picture}` : 'http://placehold.it/120'}/>
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
                        <strong>Twitter: </strong> <a href={'http://' + this.props.twitter}>{this.props.twitter}</a>
                    </p>
                    <p className="p-1">
                        <strong>Discord Tag: </strong> {this.props.discord}
                    </p>
                    <p className="p-1">
                        <strong>Twitch: </strong> <a href={'http://' + this.props.twitch}>{this.props.twitch}</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default Sidebar
