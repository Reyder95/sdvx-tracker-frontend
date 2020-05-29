import React from 'react'
import axios from 'axios'
import queryString from 'query-string'
import Scores from './scores'

class ScoreTable extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            scores: [],
            isValidSong: false
        }
    }

    openScoreboard(tabName, e) {
        let i, tabcontent, tablinks;
    
        tabcontent = document.getElementsByClassName("tabcontent");
    
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        tablinks = document.getElementsByClassName("tablinks");

        for (i = 0; i < tablinks.length; i++) { 
            tablinks[i].className = tablinks[i].className.replace(" active", " ");
        }
    
        document.getElementById(tabName).style.display = "block";
    
        e.currentTarget.className += " active";

        this.props.setCurrentDiff(tabName.toUpperCase());
    }

    componentDidMount() {
        let queryValues = queryString.parse(this.props.location.search)
        axios.get('http://localhost:3000/api/scores?sid=' + queryValues.id + '&uid=' + localStorage.getItem('user_id'))
        .then(res => {

            let myDifficulties = res.data.data[0].difficulties;

            if (myDifficulties[0].difficulty == 'NOVICE') {
                document.getElementById('novice').style.display = 'block'
                this.props.setCurrentDiff('NOVICE')
                document.getElementById('nov-button').className += " active"
            } else if (myDifficulties[0].difficulty == 'ADVANCED') {
                document.getElementById('advanced').style.display = 'block'
                this.props.setCurrentDiff('ADVANCED')
                document.getElementById('adv-button').className += " active"
            } else if (myDifficulties[0].difficulty == 'EXHAUST') {
                document.getElementById('exhaust').style.display = 'block'
                this.props.setCurrentDiff('EXHAUST')
                document.getElementById('exh-button').className += " active"
            } else if (myDifficulties[0].difficulty == 'MAXIMUM') {
                document.getElementById('maximum').style.display = 'block'
                this.props.setCurrentDiff('MAXIMUM')
                document.getElementById('mxm-button').className += " active"
            }
            
            this.setState({
                scores: myDifficulties,
                isValidSong: true
            })

            for (let i = 0; i < myDifficulties.length; i++) {
                if (myDifficulties[i].difficulty == 'NOVICE')
                {
                    document.getElementById('nov-btn').style.display = 'block'
                    this.props.setSpecificId(myDifficulties[i].id, 'NOVICE')
                }
                else if (myDifficulties[i].difficulty == 'ADVANCED') {
                    document.getElementById('adv-btn').style.display = 'block'
                    this.props.setSpecificId(myDifficulties[i].id, 'ADVANCED')
                }
                else if (myDifficulties[i].difficulty == 'EXHAUST') {
                    document.getElementById('exh-btn').style.display = 'block'
                    this.props.setSpecificId(myDifficulties[i].id, 'EXHAUST')
                }
                else if (myDifficulties[i].difficulty == 'MAXIMUM') {
                    document.getElementById('mxm-btn').style.display = 'block'
                    this.props.setSpecificId(myDifficulties[i].id, 'MAXIMUM')
                }

            }

        })
        .catch(err => {
            console.log(err)
        })

        
    }
    
    render() {

        if (localStorage.getItem('user_id') != null) {
            return (
                <div className="comp_scoretable">
    
                    <div className="diff-buttons">
                        <div className="row">
    
                            <div id="nov-btn" className="column">
                                <button id="nov-button" onClick={(e) => this.openScoreboard('novice', e)} className="tablinks nov-button btn">NOVICE</button>
                            </div>
    
                            <div id="adv-btn" className="column">
                                <button id="adv-button" onClick={(e) => this.openScoreboard('advanced', e)} className="tablinks adv-button btn">ADVANCED</button>
                            </div>
    
                            <div id="exh-btn" className="column">
                                <button id="exh-button" onClick={(e) => this.openScoreboard('exhaust', e)} className="tablinks exh-button btn">EXHAUST</button>
                            </div>
    
                            <div id="mxm-btn" className="column">
                                <button id="mxm-button" onClick={(e) => this.openScoreboard('maximum', e)} className="tablinks mxm-button btn">MAXIMUM  </button>
                            </div>
    
                        </div>
                    </div>
    
                    <div className="tabcontent" id="novice">
                        <Scores 
                        scores={this.state.scores}
                        diff="NOVICE"
                        />
                    </div>
    
                    <div className="tabcontent" id="advanced">
                        <Scores 
                        scores={this.state.scores}
                        diff="ADVANCED"
                        />
                    </div>
    
                    <div className="tabcontent" id="exhaust">
                        <Scores 
                        scores={this.state.scores}
                        diff="EXHAUST"
                        />
                    </div>
    
                    <div className="tabcontent" id="maximum">
                        <Scores 
                        scores={this.state.scores}
                        diff="MAXIMUM"
                        />
                    </div>
         
                </div>
            )
        } else {
            return (
                <div className="notloggedin">
                    <div className="no-scores bg-primary color-secondary m-2 p-4 font-roboto-slab">
                        You must be logged in to view your scores!
                    </div>
                </div>
                
            )
        }
        

        
    }
}

export default ScoreTable;