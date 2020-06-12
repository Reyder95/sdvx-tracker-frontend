import React from 'react'
import _ from 'lodash'

class UserSearch extends React.Component {
    constructor(props) {
        super(props)

        this.delayedCallback = _.debounce((e) => this.props.handleSearchChange(e), 500)
    }

    onChange(event) {
        event.persist()
        this.delayedCallback(event)
    }

    render() {
        return(
            <div className="component_usersearch">
                <div className="filter-heading">
                    <p className="font-roboto-slab">User Search</p>
                </div>
                <div className="filter-body">
                    <form>
                        <input onChange={(e) => this.onChange(e)} placeholder="Search" type="text"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserSearch