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
            errors: []
        }

        this.isDifficultyExist = this.isDifficultyExist.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem('user_id') == null)
            document.getElementById('addScoreDiv').style.display = 'none'

        document.getElementById('errors').style.display = 'none'
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

    isDifficultyExist(difficulty) {
        if (difficulty == 'NOVICE') {
            if (this.state.nov_id == '')
                return false
            else
                return true
        }
        else if (difficulty == 'ADVANCED') {
            if (this.state.adv_id == '')
                return false
            else
                return true
        }
        else if (difficulty == 'EXHAUST') {
            if (this.state.exh_id == '')
                return false
            else
                return true
        }
        else if (difficulty == 'MAXIMUM') {
            if (this.state.mxm_id == '')
                return false
            else
                return true
        }
            
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
                        .then(result => {
                            console.log(result)
                            this.refs.child.updateTable(result, this.state.currentDiff)

                            this.closeModal()
                        })
                        .catch(err => {
                            console.log(err)
                            alert("An error has occurred!")
                        })

                    }
                    
                    
                }
            }
        }

        let errorArray = []

        if (this.state.score == '')
            errorArray.push('You must insert a score!')

        if (this.state.clear_type == '')
            errorArray.push('You must select a clear type!')

        if (parseInt(this.state.score, 10).toString() !== this.state.score)
            errorArray.push('Please enter a valid score')

        if (errorArray.length > 0) {
            this.setState({
                errors: errorArray
            })

            document.getElementById('errors').style.display = 'block'
        }
        else {
            document.getElementById('errors').style.display = 'none'
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
                isDifficultyExist={this.isDifficultyExist}
                />

                <ScoreTable
                location={this.props.location}
                setCurrentDiff={this.setCurrentDiff.bind(this)}
                setSpecificId={this.setSpecificId.bind(this)}
                ref="child"
                />
                
                <Footer />

                
                <div id="addScoreModal" className="modal">
                    <div className="modal-content">
                        <span onClick={this.closeModal.bind(this)} className="close">&times;</span>
                        <div className="modal-header font-roboto">
                            <h2>Add a Score - {this.state.currentDiff}</h2>
                        </div>

                        <div className="modal-body font-source mt-1">
                            <form>
                                <div id="errors" className="mb-4 font-roboto-slab">
                                    {this.state.errors.map(error => (
                                        <span>{error} <br/></span>
                                    ))}
                                </div>
                                <input onChange={(e) => this.setScore(e)} placeholder="Score" value={this.state.score} type="text"/>

                                <select onChange={(e) => this.setClearType(e)} id="level" className="form-input">
                                    <option value="" disabled selected hidden>Clear Type</option>
                                    <option value="4">Effective Clear</option>
                                    <option value="3">Excessive Clear</option>
                                    <option value="1">Perfect Ultimate Chain</option>
                                    <option value="2">Ultimate Chain</option>
                                    <option value="5">Played</option>
                                </select>

                                <div id="addScoreButton">
                                    <button onClick={(e) => this.addScoreToAPI(e)} className="btn">Add Score!</button>
                                </div>
                                    
                            </form>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default SongView;