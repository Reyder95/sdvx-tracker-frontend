import React from 'react'
import HomeTop from '../components/home/home-top'
import HomeDescription from '../components/home/home-description'

import '../css/home.css'

class Home extends React.Component {
    render() {
        return(
            <div className="comp_home">
                <HomeTop />
                <HomeDescription />
            </div>
        )
    }
}

export default Home;