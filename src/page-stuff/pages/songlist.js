import React from 'react'
import SongTable from '../components/songlist/songtable'
import Footer from '../components/general/footer'

import '../css/songlist.css'

class SongList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            test: ''
        }
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