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
                        <p className="mb-2">
                            <input id="alphabetical" onChange={() => this.props.setSort('alphabet')} type="radio" name="sort"/> <label for="alphabetical">Alphabetical</label> <br />
                        </p>

                        <p className="mb-2">
                            <input id="library" onChange={() => this.props.setSort('library')} type="radio" name="sort"/> <label for="library">Library</label> <br />
                        </p>

                        <p className="mb-2">
                            <input id="scores" onChange={() => this.props.setSort('score')} type="radio" name="sort"/> <label for="scores">Scores</label> <br />
                        </p>
                        
                        <p>
                            <input id="submissions" onChange={() => this.props.setSort('submission')} type="radio" name="sort"/> <label for="submissions">Submissions</label> <br />
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserSort