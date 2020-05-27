import React from 'react'
import axios from 'axios'
import SongViewTop from '../components/songview/songview_top'
import ScoreTable from '../components/songview/scoretable'
import Footer from '../components/general/footer'

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

    openModal() {
        let modal = document.getElementById('addScoreModal')

        modal.style.display = 'block'
    }

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

    closeModal() {
        let modal = document.getElementById('addScoreModal')

        modal.style.display = 'none'
    }

    setScore(event) {
        this.setState({
            score: event.target.value
        })
    }

    setClearType(event) {
        this.setState({
            clear_type: event.target.value
        })
    }

    setCurrentDiff(data) {
        this.setState({
            currentDiff: data
        }) 
    }

    addScore(event) {
        event.preventDefault()

        if (this.state.score != '' && this.state.clear_type != '')
        {
            let score = this.state.score;
            let clearType = this.state.clear_type
            let diffID = '';
    
            if (localStorage.getItem('user_id') != null) {
                score = score.replace(/,/g,'');
    
                if (parseInt(score, 10).toString() === score) {
                    score = parseInt(score, 10);

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

                        axios.post('http://localhost:3000/api/add_score', {
                            score: score,
                            chart_id: diffID,
                            clear_id: clearType
                        }, { withCredentials: true })
                            .then(res => {
                                window.location.reload(false)
                            })
                            .catch(err => {
                                console.log("NOPE")
                            })
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

    componentDidMount() {
        if (localStorage.getItem('user_id') == null)
            document.getElementById('addScoreDiv').style.display = 'none'
    }

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

                                <button onClick={(e) => this.addScore(e)} className="btn bg-quintery">Add Score!</button>
                            </form>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default SongView;