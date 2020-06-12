import React from 'react'

// Component Imports
import UserTable from '../components/userlist/usertable'
import UserSearch from '../components/userlist/usersearch'
import UserSort from '../components/userlist/usersort'

// CSS Imports
import '../css/users.css'

class UserList extends React.Component {

    constructor(props) {
        super(props)

        this.setSort = this.setSort.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    setSort(sort) {
        this.refs.child.setSort(sort)
    }

    handleSearchChange(event) {
        this.refs.child.setSearch(event)
    }

    render() {
        return (
            <div className="component_userlist">
            <div className="user-container">
                <h2 className="font-roboto-slab"><strong>Users</strong></h2>

                <div className="row mt-4">
                    <div className="column four-times">
                        <UserTable props={this.props} ref="child"/>
                    </div>
                    <div className="column filtering">
                        <UserSearch handleSearchChange={this.handleSearchChange}/>
                        <UserSort setSort={this.setSort}/>
                    </div>
                </div>

                </div>
                
            </div>
        )
    }
}

export default UserList