import React from 'react'

import { Waypoint } from 'react-waypoint'

import UserEntry from './userentry'
import { getUsers } from '../../../api-calls'

class UserTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            page: 1
        }

        this.appendUsers = this.appendUsers.bind(this)
    }

    componentDidMount() {
        getUsers()
        .then(result => {

            console.log(result.data.data)
            this.setState({
                data: result.data.data
            })
        })
    }

    appendUsers() {
        getUsers(this.state.page + 1)
        .then(result => {
            let moreUsers = this.state.data.concat(result.data.data)
            this.setState({
                data: moreUsers
            })
        })
        this.setState({
            page: this.state.page + 1
        })
    }

    renderCount(item, user) {
        for (let i = 0; i < user.info.length; i++) {
            if (item == 'score' && Object.keys(user.info[i] == 'scorenumber'))
                return user.info[i].scorenumber
            else if (item == 'library' && Object.keys(user.info[i]) == 'librarynumber')
                return user.info[i].librarynumber
            else if (item == 'submission' && Object.keys(user.info[i]) == 'count')
                return user.info[i].count
        }
    }

    render() {
        return (
            <div className="compUserTable">
                <table className="font-roboto">
                        <thead>
                            <tr className="font-roboto-slab table-head">
                                <th id="table-number">#</th>
                                <th></th>
                                <th id="table-user">User</th>
                                <th>Joined</th>
                                <th>Scores</th>
                                <th>Submissions</th>
                                <th>Library</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.data.map((user, index) => (
                                    <UserEntry props={this.props}
                                    id={user.id}
                                    index={index + 1}
                                    image={user.pf_picture}
                                    username={user.username}
                                    joined={user.date_joined}
                                    scores={this.renderCount('score', user)}
                                    library={this.renderCount('library', user)}
                                    submissions={this.renderCount('submission', user)}
                                    />
                                ))
                            }
                        </tbody>
                    </table>

                    <Waypoint 
                    scrollableAncestor={window}
                    onEnter={this.appendUsers}
                    />
            </div>
        )
    }
}

export default UserTable