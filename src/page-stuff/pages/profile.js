import React from 'react'   // React stuff
import Sidebar from '../components/profile/profile_sidebar' // Sidebar, where some profile information goes (name, profile picture, and other smaller stats)
import RecentScores from '../components/profile/profile_recentscores'   // Shows the latest 5 scores the user posted
import Grades from '../components/profile/profile_grades'   // A pie chart to show the grades of a particular user
import Volforce from '../components/profile/profile_volforce'   // Volforce line chart (not yet implemented properly)
import TopScores from '../components/profile/profile_topscores' // Top scores based on volforce (not yet implemented properly)
import Library from '../components/profile/profile_library'     // Library of songs, only songs users have gotten a score on will appear here
import Footer from '../components/general/footer'   // The footer of the website
import queryString from 'query-string'  // Allows us to extract and use the query string obtained in the URL (?id=x)      
import { userInformation } from '../../api-calls'

// Import CSS File
import '../css/profile.css'

// Profile page, everything related to a user profile
class Profile extends React.Component 
{

    constructor(props) {
        super(props);

        // State containing all the information retrieved from the database. This information gets sent to various different components as props
        this.state = {
            username: '',
            date_joined: '',
            scoreCount: '',
            libraryCount: '',
            pf_picture: '',
            discord: '',
            twitter: '',
            twitch: '',
            userID: ''
        }
    }
    
    // When component loads, do this
    componentDidMount() {

        // Parse the query string into different values, but here we are only obtaining user ID
        let values = queryString.parse(this.props.location.search)
        
        // Grab user information using the ID and set the state with it
        userInformation(values.id)
        .then(result => {
            console.log(result)
            this.setState({
                username: result.data.userData.username,
                date_joined: result.data.userData.date_joined,
                scoreCount: result.data.scoreData.scorecount,
                libraryCount: result.data.libraryData.librarycount,
                pf_picture: result.data.userData.pf_picture,
                discord: result.data.userData.discord,
                twitter: result.data.userData.twitter,
                twitch: result.data.userData.twitch,
                userID: values.id
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    profileRefresh() {
        if (this.props.location.pathname == '/profile')
            window.location.reload(false)
    }

    // Handle the tab changing from Library to Stats
    tabChange(tabName, e) {
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

    componentDidUpdate(prevProps, prevState) {
        let prevValue = queryString.parse(prevProps.location.search)
        let currValue = queryString.parse(this.props.location.search)

        if (prevValue.id != currValue.id)
            window.location.reload(false)
    }

    // Display elements to the screen
    render() {
        return(
            <div className="comp_profile">
                <div className="row">
                    <div className="column bg-tertiary">
                        <div className="row">
                            <div className="column">
                                <button className="tablinks btn stats bg-primary color-secondary font-roboto-slab active" onClick={(e) => this.tabChange('tabProfile', e)}>Stats</button>
                            </div>
                            <div className="column">
                                <button className="tablinks btn library bg-primary color-secondary font-roboto-slab" onClick={(e) => this.tabChange('tabLibrary', e)}>Library</button>
                            </div>
                        </div>

                        <Sidebar
                        username={this.state.username}
                        date_joined={this.state.date_joined}
                        scorecount={this.state.scoreCount}
                        librarycount={this.state.libraryCount}
                        pf_picture={this.state.pf_picture}
                        discord={this.state.discord}
                        twitter={this.state.twitter}
                        twitch={this.state.twitch}
                        />
                    </div>

                    <div className="column four-times">
                        <div id="tabProfile" className="tabcontent">
                            <div className="row recentscores bg-tertiary ml-2 p-4 mt-2 mr-2">
                                <RecentScores {...this.props}/>
                            </div>
                            <div className="row">
                                <div className="column volforce-line bg-quintery ml-2 p-4 mt-2">
                                    <Volforce />
                                </div>

                                <div className="column grade-pie bg-quintery ml-2 p-4 mt-2 mr-2 order-4">
                                    <Grades {...this.props}/>
                                </div>
                            </div>

                            <div className="row topscores bg-tertiary ml-2 p-4 mt-2 mr-2 order-3 mb-2">
                                <TopScores />
                            </div>
                        </div>

                        <div id="tabLibrary" className="tabcontent more-library-content">
                            <div className="row library-content bg-tertiary ml-2 mr-2 p-4 mt-2 mb-2">
                                <Library 
                                {...this.props}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Profile;