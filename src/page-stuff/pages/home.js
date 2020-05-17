import React from 'react'
import HomeTop from '../components/home/home-top'
import HomeDescription from '../components/home/home-description'
import Footer from '../components/general/footer'

import '../css/home.css'

class Home extends React.Component {

    componentDidMount() {
        console.log(this.props.user_id)
    }

    render() {
        return(
            <div className="comp_home">
                <HomeTop />
                <HomeDescription />
                <Footer />
            </div>
        )
    }
}

export default Home;