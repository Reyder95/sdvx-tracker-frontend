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
                <div className="row">
                    <div className="column bg-tertiary">
                        <Sidebar/>
                    </div>

                    <div className="column four-times">
                        <div className="row recentscores bg-tertiary ml-2 p-4 mt-2 mr-2">
                            <RecentScores />
                        </div>
                        <div className="row">
                            <div className="column volforce-line bg-quintery ml-2 p-4 mt-2 mr-2">
                                <Volforce />
                            </div>
                            <div className="column grade-pie bg-quintery ml-2 p-4 mt-2 mr-2">
                                <Grades />
                            </div>
                        </div>
                        
                        <div className="row .topscores bg-tertiary ml-2 p-4 mt-2 mr-2">
                            <TopScores />
                        </div>
                    </div>
                </div>

{/*                 <div className="row">
                    <div className="column">
                        <Sidebar />
                    </div>
                    <div className="column">
                        <div className="row">
                            <div className="">
                                <RecentScores />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="">
                                <Volforce />
                            </div>
                            <div className="">
                                <Grades />
                            </div>
                        </div>
                        <div className="row">
                            <div className="">
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Profile;