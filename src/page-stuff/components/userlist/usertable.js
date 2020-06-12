import React from 'react'

import { Waypoint } from 'react-waypoint'

import UserEntry from './userentry'
import { getUsers } from '../../../api-calls'

class UserTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            page: 0,
            sort: null,
            search: null,
            next_page: true
        }

        this.appendUsers = this.appendUsers.bind(this)

        this.setSort = this.setSort.bind(this)
        this.setSearch = this.setSearch.bind(this)
    }

    componentDidMount() {
    }

    setSort(sort) {
        this.setState({
            sort: sort,
            page: 1
        })

        getUsers(1, sort, this.state.search) 
        .then(result => {
            this.setState({
                data: result.data.data
            })
        })
    }

    setSearch(event) {
        this.setState({
            search: event.target.value,
            page: 1
        })

        getUsers(1, this.state.sort, event.target.value)
        .then(result => {
            this.setState({
                data: result.data.data
            })
        })
    }

    appendUsers() {
        if (this.state.next_page) {
            getUsers(this.state.page + 1, this.state.sort)
            .then(result => {

                let nextPage = true

                if (result.data.data.length < 20)  
                    nextPage = false

                    let moreUsers = this.state.data.concat(result.data.data)
                    this.setState({
                        data: moreUsers,
                        page: this.state.page + 1,
                        next_page: nextPage
                    })
            })
            .catch(err => {
                console.log(err)
            })
        }
        

    }

    renderCount(item, user) {
        if (this.state.sort == null || this.state.sort == 'alphabet') {
            for (let i = 0; i < user.info.length; i++) {
                if (item == 'score' && Object.keys(user.info[i] == 'scorecount')) {
                    
                    return user.info[i].scorecount
                }
                else if (item == 'library' && Object.keys(user.info[i]) == 'librarycount') {
    
                    return user.info[i].librarycount
                }
                else if (item == 'submission' && Object.keys(user.info[i]) == 'submissioncount') {
    
                    return user.info[i].submissioncount
                }
            }
        } else {
            if (this.state.sort == 'score') {
                if (item == 'score')
                    return user.scorecount

                for (let i = 0; i < user.info.length; i++) {
                    if (item == 'library' && Object.keys(user.info[i]) == 'librarycount') {
                        return user.info[i].librarycount
                    }
                    else if (item == 'submission' && Object.keys(user.info[i]) == 'submissioncount') {
                        return user.info[i].submissioncount
                    }
                }
            } else if (this.state.sort == 'submission') {
                for (let i = 0; i < user.info.length; i++) {
                    if (item == 'submission')
                        return user.submissioncount

                    if (item == 'library' && Object.keys(user.info[i]) == 'librarycount') {
                        return user.info[i].librarycount
                    }
                    else if (item == 'score' && Object.keys(user.info[i]) == 'scorecount') {
                        return user.info[i].scorecount
                    }
                }
            } else if (this.state.sort == 'library') {
                for (let i = 0; i < user.info.length; i++) {
                    if (item == 'library')
                    return user.librarycount == null ? '0' : user.librarycount

                    if (item == 'submission' && Object.keys(user.info[i]) == 'submissioncount') {
                    return user.info[i].submissioncount
                    }
                    else if (item == 'score' && Object.keys(user.info[i]) == 'scorecount') {
                    return user.info[i].scorecount
                    }
                
                }
            }
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