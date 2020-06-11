import React from 'react'

class UserSearch extends React.Component {
    render() {
        return(
            <div className="component_usersearch">
                <div className="filter-heading">
                    <p className="font-roboto-slab">User Search</p>
                </div>
                <div className="filter-body">
                    <form>
                        <input placeholder="Search" type="text"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserSearch