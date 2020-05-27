import React from 'react'
import Sidebar from '../components/profile/profile_sidebar'
import RecentScores from '../components/profile/profile_recentscores'
import Grades from '../components/profile/profile_grades'
import Volforce from '../components/profile/profile_volforce'
import TopScores from '../components/profile/profile_topscores'
import Library from '../components/profile/profile_library'
import Footer from '../components/general/footer'
import queryString from 'query-string'
import axios from 'axios'

import '../css/profile.css'

class Profile extends React.Component 
{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            date_joined: '',
            scoreCount: '',
            libraryCount: '',
            pf_picture: ''
        }
    }

    openCity(tabName, e) {
        let i, tabcontent, tablinks;
    
        tabcontent = document.getElementsByClassName("tabcontent");
    
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        tablinks = document.getElementsByClassName("tablinks");
    
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        document.getElementById(tabName).style.display = "block";
    
        e.currentTarget.className += " active";
    }

    componentDidMount() {
        let values = queryString.parse(this.props.location.search)
        
        axios.get('http://localhost:3000/api/user?id=' + values.id)
            .then(res => {
                this.setState({
                    username: res.data.userData.username,
                    date_joined: res.data.userData.date_joined,
                    scoreCount: res.data.scoreData.scorenumber,
                    libraryCount: res.data.libraryData.librarynumber
                })
            })
    }

    render() {
        return(
            <div className="comp_profile">
                <div className="row">
                    <div className="column bg-tertiary">
                        <div className="row">
                            <div className="column">
                                <button className="tablinks btn stats bg-primary color-secondary font-roboto-slab active" onClick={(e) => this.openCity('tabProfile', e)}>Stats</button>
                            </div>
                            <div className="column">
                                <button className="tablinks btn library bg-primary color-secondary font-roboto-slab" onClick={(e) => this.openCity('tabLibrary', e)}>Library</button>
                            </div>
                        </div>
                        <Sidebar
                        username={this.state.username}
                        date_joined={this.state.date_joined}
                        scorecount={this.state.scoreCount}
                        librarycount={this.state.libraryCount}
                        pf_picture={this.state.pf_picture}
                        />
                    </div>

                    <div className="column four-times">
                        <div id="tabProfile" className="tabcontent">
                            <div className="row recentscores bg-tertiary ml-2 p-4 mt-2 mr-2">
                                <RecentScores />
                            </div>
                            <div className="row">
                                <div className="column volforce-line bg-quintery ml-2 p-4 mt-2">
                                    <Volforce />
                                </div>
                                <div className="column grade-pie bg-quintery ml-2 p-4 mt-2 mr-2 order-4">
                                    <Grades />
                                </div>
                            </div>

                            <div className="row topscores bg-tertiary ml-2 p-4 mt-2 mr-2 order-3 mb-2">
                                <TopScores />
                            </div>
                        </div>

                        <div id="tabLibrary" className="tabcontent more-library-content">
                            <div className="row library-content bg-tertiary ml-2 mr-2 p-4 mt-2 mb-2">
                                <Library />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

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