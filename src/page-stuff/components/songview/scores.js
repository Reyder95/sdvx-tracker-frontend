import React from 'react'
import axios from 'axios';

class Scores extends React.Component {
    
    renderDate(date) {
        let scoreDate = new Date(date)

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        return month[scoreDate.getMonth()] + " " + scoreDate.getDate() + ", " + scoreDate.getFullYear();
    }

    deleteData(id) {
        axios.post('http://localhost:3000/api/delete_score', {
            id: id
        }, {
            withCredentials: true
        })
        .then(res => {
            window.location.reload(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderTable() {
        if (this.props.scores.length > 0) {
            for (let i = 0; i < this.props.scores.length; i++)
            {
                if (this.props.scores[i].difficulty == this.props.diff) {
                    if (this.props.scores[i].scores[0] !== undefined && this.props.scores[i].scores[0] != null && this.props.scores[i].scores.length > 0)
                    {
                            return (
                                <table className="font-source componentScoreTable">
                                    <tr className="font-roboto-slab">
                                        <th>#</th>
                                        <th>Score</th>
                                        <th>Clear Type</th>
                                        <th>Grade</th>
                                        <th>Date</th>
                                        <th>Delete</th>
                                    </tr>

                                    {
                                        this.props.scores[i].scores.map((score, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{score.type}</td>
                                                <td>{score.grade}</td>
                                                <td>{this.renderDate(score.date)}</td>
                                                <td onClick={() => this.deleteData(score.id)} className="table-delete">&times;</td>
                                            </tr>
                                        ))
                                    }

                                </table>
                            )
                        }
                        else {
                            return(
                                <div className="no-scores bg-primary color-secondary p-4 font-roboto-source">
                                    <p>You have no scores on the selected difficulty!</p>
                                </div>
                            )
                        }
                    }
                    
                    
            }
        }
        
        /*
        if (this.props.scores.length > 0 && this.props.scores != null) {
            console.log('test')
            return (
                <table className="font-source componentScoreTable">
                    <tr className="font-roboto-slab">
                        <th>#</th>
                        <th>Score</th>
                        <th>Clear Type</th>
                        <th>Grade</th>
                        <th>Date</th>
                    </tr>
                    
                    {
                        this.props.scores.map((score, index) => (
                                
                            <tr>
                                <td>{index + 1}</td>
                                <td>{score.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{score.clear}</td>
                                <td>{score.grade}</td>
                                <td>{this.renderDate(score.date)}</td>
                            </tr>
                        ))
                    }

                </table> 
            )
        }
        else 
        {
            return (
                <div className="no_scores">
                    <h2>No scores</h2>
                </div>
            )
        
        
        }
        */
    }  
    
    render() {
        return (
            <table className="font-source componentScoreTable">
                    {
                        this.renderTable()
                    }
            </table>
        )
    }
}

export default Scores;