import React from 'react'
import SongViewTop from '../components/songview/songview_top'
import ScoreTable from '../components/songview/scoretable'
import Footer from '../components/general/footer'

import '../css/songview.css'

class SongView extends React.Component {
    render() {
        return(
            <div className="comp_songview">
                <SongViewTop />
                <ScoreTable />
                <Footer />
            </div>
        )
    }
}

export default SongView;