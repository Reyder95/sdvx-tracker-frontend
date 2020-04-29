import React from 'react'
import SongTable from '../components/songlist/songtable'
import Footer from '../components/general/footer'

import '../css/songlist.css'

class SongList extends React.Component {
    render() {
        return (
            <div className="comp_songlist">
                <SongTable />
                <Footer />
            </div>
        )
    }
}

export default SongList;