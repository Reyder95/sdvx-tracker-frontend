import React from 'react'
import Sidebar from '../components/profile/profile_sidebar'
import RecentScores from '../components/profile/profile_recentscores'
import Grades from '../components/profile/profile_grades'
import Volforce from '../components/profile/profile_volforce'
import TopScores from '../components/profile/profile_topscores'


import '../css/profile.css'

class Profile extends React.Component 
{
    render() {
        return(
            <div className="comp_profile">
                <div className="columns main-cols is-desktop">
                    <div className="column side-bar is-one-fifth">
                        <Sidebar />
                    </div>
                    <div className="column">
                        <div className="columns rightside">
                            <div className="column">
                                <RecentScores />
                            </div>
                        </div>
                        
                        <div className="columns graphs">
                            <div className="column">
                                <Volforce />
                            </div>
                            <div className="column col2">
                                <Grades />
                            </div>
                        </div>
                        <div className="columns rightside">
                            <div className="column">
                                <TopScores />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;