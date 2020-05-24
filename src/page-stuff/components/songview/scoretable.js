import React from 'react'
import NoviceScores from './scores_novice'
import AdvancedScores from './scores_advanced'
import ExhaustScores from './scores_exhaust'
import MaximumScores from './scores_maximum'

class ScoreTable extends React.Component {
    
    openScoreboard(tabName, e) {
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
    
    render() {
        return (
            <div className="comp_scoretable">
                
                <div className="addscore">
                    <button className="btn bg-quintery">+</button>
                </div>

                <div className="diff-buttons">
                    <div className="row">

                        <div className="column">
                            <button onClick={(e) => this.openScoreboard('novice', e)} className="nov-button btn">NOVICE</button>
                        </div>

                        <div className="column">
                            <button onClick={(e) => this.openScoreboard('advanced', e)} className="adv-button btn">ADVANCED</button>
                        </div>

                        <div className="column">
                            <button onClick={(e) => this.openScoreboard('exhaust', e)} className="exh-button btn">EXHAUST</button>
                        </div>

                        <div className="column">
                            <button onClick={(e) => this.openScoreboard('maximum', e)} className="mxm-button btn">MAXIMUM  </button>
                        </div>

                    </div>
                </div>

                <div className="tabcontent" id="novice">
                    <NoviceScores />
                </div>

                <div className="tabcontent" id="advanced">
                    <AdvancedScores />
                </div>

                <div className="tabcontent" id="exhaust">
                    <ExhaustScores />
                </div>

                <div className="tabcontent" id="maximum">
                    <MaximumScores />
                </div>

                
            </div>
        )
    }
}

export default ScoreTable;