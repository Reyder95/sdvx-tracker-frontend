import React from 'react'
import queryString from 'query-string'
import axios from 'axios'

class RecentScores extends React.Component {
    chartRef = React.createRef();

    constructor(props) {
        super(props)

        this.state = {
            scores: []
        }
    }

    componentDidMount() {
        let values = queryString.parse(this.props.location.search)

        axios.get('http://localhost:3000/api/user_recent?id=' + values.id)
        .then(res => {
            this.setState({
                scores: res.data.result
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