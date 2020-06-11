import React from 'react'

class UserSort extends React.Component {
    render() {
        return (
            <div className="component_usersort">
                <div className="filter-heading">
                    <p className="font-roboto-slab">Sort</p>
                </div>
                <div className="filter-body font-source">
                    <form>
                        <div className="row">
                            <div className="column">
                                <input type="radio" name="sort"/> <label>Scores</label> 
                            </div>
                            <div className="column">
                                <input type="radio" name="sort"/> <label>Songs</label> 
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="column">
                                <input type="radio" name="sort"/> <label>Alphabetical</label> 
                            </div>
                            <div className="column">
                                <input type="radio" name="sort"/> <label>Library</label> 
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default UserSort