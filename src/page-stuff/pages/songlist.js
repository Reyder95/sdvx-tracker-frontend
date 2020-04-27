import React from 'react'
import SongTable from '../components/songlist/songtable'

import '../css/songlist.css'

class SongList extends React.Component {
    render() {
        return (
            <div className="comp_songlist">
                <SongTable />
            </div>
        )
    }
}

export default SongList;