import React from 'react'
import { Link } from 'react-router-dom'

import keys from '../../../keys.json'

class UserEntry extends React.Component {
    renderDate(date) {
        let scoreDate = new Date(date)

        var month = new Array();
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

        return month[scoreDate.getMonth()] + " " + scoreDate.getDate() + ", " + scoreDate.getFullYear();
    }

    redirectionLink(id) {
        console.log(this.props.props.props.history.push(`/profile?id=${id}`))
    }

    render() {
        return (
            <tr className="table-body" onClick={() => this.redirectionLink(this.props.id)}>
                <td id="table-number">{this.props.index}</td>
                <td id="profile-image">
                    <div className="pfp">
                    <img src={this.props.image != null ? `${keys.api_url}/images/${this.props.image}` : 'http://placehold.it/120'}/>
                    </div>   
                </td>
                <td>                
                    <span className="name">{this.props.username}</span>
                </td>
                <td>{this.renderDate(this.props.joined)}</td>
                <td>{this.props.scores}</td>
                <td>{this.props.submissions}</td>
                <td>{this.props.library}</td>
            </tr>
        )
    }
}

export default UserEntry