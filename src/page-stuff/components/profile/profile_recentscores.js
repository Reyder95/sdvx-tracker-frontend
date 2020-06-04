// Main Component: Profile

import React from 'react'   // React stuff
import queryString from 'query-string'  // Parses query strings into objects
import { userRecentScores } from '../../../api-calls'

// Shows the recent 5 scores a user has uploaded. Is at the top of the main screen in the "Stats" tab
class RecentScores extends React.Component {

    constructor(props) {
        super(props)

        // Array of scores for display purposes
        this.state = {
            scores: []
        }
    }

    // On component mount, grab the user ID and call the API for the last 5 scores
    componentDidMount() {

        // Just contains ID
        let values = queryString.parse(this.props.location.search)

        // Call the api for user recent scores
        userRecentScores(values.id)
        .then(result => {
            this.setState({
                scores: result.data.result
            })
        })
    }
    
    render() {
        return(
            <div className="comp_recentsongs">
                <div className="recent-display">
                    <h2 className="font-roboto color-quartery mb-2">Recent Scores</h2>
                    <div className="columns">
                        <div className="column">

                            

                            <table className="table font-source color-quartery">
                                 <tr>
                                     <th className="number">#</th>
                                     <th className="jacket">Jacket</th>
                                     <th className="chart">Chart</th>
                                     <th>Score</th>
                                 </tr>

                                {this.state.scores.map((score, index) => (
                                    <tr>
                                        <td>{index + 1}</td>

                                        <td>
                                           <img src={score.jacket}/>
                                        </td>

                                        <td>{score.artist} - {score.title} [{score.difficulty}]</td>

                                        <td>{score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                ))
                                }
                                 
                                 
                             </table>                           
                        </div> 
   
                        </div>
                    </div>
                    
                </div>
        )
    }
}

export default RecentScores;