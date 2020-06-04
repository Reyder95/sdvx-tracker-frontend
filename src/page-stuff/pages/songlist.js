import React from 'react'
import SongTable from '../components/songlist/songtable'
import Footer from '../components/general/footer'

import '../css/songlist.css'

// The song list for users to view all the songs in the database
class SongList extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="comp_songlist">

                <SongTable 
                history={this.props.history}
                />
                <Footer />
            </div>
        )
    }
}

export default SongList;