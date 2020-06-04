import React from 'react'   // React stuff
import { addScore } from '../../api-calls'  // Add a score to the database
import SongViewTop from '../components/songview/songview_top'   // Top of the song view page
import ScoreTable from '../components/songview/scoretable'      // The score table
import Footer from '../components/general/footer'               // Footer

import '../css/songview.css'

class SongView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentDiff: '',
            nov_id: '',
            adv_id: '',
            exh_id: '',
            mxm_id: '',
            score: '',
            clear_type: '',
            error: ''
        }

        
    }

    componentDidMount() {
        if (localStorage.getItem('user_id') == null)
            document.getElementById('addScoreDiv').style.display = 'none'
    }

    // Opens the 'addScoreModal'
    openModal() {
        let modal = document.getElementById('addScoreModal')

        modal.style.display = 'block'
    }

    // Opens the 'addSongModal'
    closeModal() {
        let modal = document.getElementById('addScoreModal')

        modal.style.display = 'none'
    }

    // ---State Setting---

    // Sets the ID for each chart
    setSpecificId(id, difficulty) {
        if (difficulty == 'NOVICE')
            this.setState({
                nov_id: id
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                adv_id: id
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                exh_id: id
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                mxm_id: id
            })
    }

    // this.state.score
    setScore(event) {
        this.setState({
            score: event.target.value
        })
    }

    // this.state.clear_type
    setClearType(event) {
        this.setState({
            clear_type: event.target.value
        })
    }

    // this.state.currentDiff
    setCurrentDiff(data) {
        this.setState({
            currentDiff: data
        }) 
    }

    // Adding a score to the database
    addScoreToAPI(event) {
        event.preventDefault()  // Do not refresh the page

        // Checks that the user fills in both fields
        if (this.state.score != '' && this.state.clear_type != '')
        {
            let score = this.state.score   
            let clearType = this.state.clear_type
            let diffID = '';
    
            // Check if user is logged in before proceeding
            if (localStorage.getItem('user_id') != null) {
                score = score.replace(/,/g,'');
    
                // If score can be parsed as an integer
                if (parseInt(score, 10).toString() === score) {
                    score = parseInt(score, 10);

                    // Score is between 0 and 10 million
                    if (score >= 0 && score <= 10000000)
                    {
                        if (this.state.currentDiff == 'NOVICE')
                            diffID = this.state.nov_id
                         else if (this.state.currentDiff == 'ADVANCED')
                            diffID = this.state.adv_id
                        else if (this.state.currentDiff == 'EXHAUST')
                            diffID = this.state.exh_id
                        else if (this.state.currentDiff == 'MAXIMUM')
                            diffID = this.state.mxm_id

                        // Call the API to add the score and then close the modal
                        addScore(score, diffID, clearType)

                        this.closeModal()
                    }
                    else 
                    {
                        this.setState({
                            error: 'Please only input a score between 0 and 10,000,000'
                        })
                    }
                    
                    
                }
                else
                {
                    console.log(this.state.score)
                    this.setState({
                        error: 'Please use numbers or numbers with commas when inserting a score!'
                    })
                }
                
            }
            else {
                console.log('ACCESS DENIED: PLEASE LOG IN FIRST')
            }
        }
        else
        {
            this.setState({
                error: 'Please make sure to not leave anything blank!'
            })
        }
    }

    // Render elements on the screen
    render() {
        return(
            <div className="comp_songview">

                <div id="addScoreDiv" className="addscore">
                    <button onClick={this.openModal.bind(this)} className="btn bg-quintery">+</button>
                </div>

                <SongViewTop 
                location={this.props.location}
                />

                <ScoreTable
                location={this.props.location}
                setCurrentDiff={this.setCurrentDiff.bind(this)}
                setSpecificId={this.setSpecificId.bind(this)}
                />
                
                <Footer />

                
                <div id="addScoreModal" className="modal">
                    <div className="modal-content bg-secondary">
                        <span onClick={this.closeModal.bind(this)} className="close">&times;</span>
                        <div className="modal-header font-roboto">
                            <h2>Add a Score - {this.state.currentDiff}</h2>
                        </div>

                        <hr className="mt-1"/>

                        <div className="modal-body font-source mt-1">
                            <form>
                                <label>Score</label>
                                {this.state.error}
                                <p className="mb-1">Must be a number between 0 and 10,000,000</p>
                                <input onChange={(e) => this.setScore(e)} value={this.state.score} type="text"/>

                                <label>Clear Type</label>
                                <select onChange={(e) => this.setClearType(e)} id="level" className="form-input">
                                    <option value="" disabled selected hidden>Select One</option>
                                    <option value="4">Effective Clear</option>
                                    <option value="3">Excessive Clear</option>
                                    <option value="1">Perfect Ultimate Chain</option>
                                    <option value="2">Ultimate Chain</option>
                                    <option value="5">Played</option>
                                </select>

                                <button onClick={(e) => this.addScoreToAPI(e)} className="btn bg-quintery">Add Score!</button>
                            </form>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default SongView;