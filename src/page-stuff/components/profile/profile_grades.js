// Main Component: Profile

import React from 'react'   // React stuff
import { Pie } from 'react-chartjs-2'   // ChartJS (for displaying charts)
import queryString from 'query-string'  // For parsing URL querystring data
import { userGrades } from '../../../api-calls' // User grades function for API calls

// Shows a pie chart of user's grade count
class Grades extends React.Component {

    constructor(props) {
        super(props);

        // Contains all the data that we are going to be sending into our pie chart
        this.state = {
            // The labels for each part of the pie chart
            labels: ['S', 'AAA+', 'AAA', 'AA+', 'AA', 'A+', 'A', 'B', 'C', 'D'],
            datasets: [
                {
                    // The name of the pie chart
                    label: 'Grades',
                    // This gets set to proper colors on data load (but it coincides with the grade array above)
                    backgroundColor: [
                        '#DFCE7D',
                        '#634FA3',
                        '#BE4F8E',
                        '#ED6363',
                        '#49AF68',
                        'black',
                        'red',
                        'blue',
                        'yellow',
                        'pink'
                    ],
                    // Actual data (this gets set on profile load)
                    data: [70, 88, 50, 44, 20]
                }
            ],
            // User's id
            userID: ''
        }
    }

    // On component mount call the database and insert things into state
    componentDidMount() {

        let values = queryString.parse(this.props.location.search)

        this.setState({
            userID: values.id
        })


        userGrades(values.id, 0)
        .then(result => {

            // A dictionary for what color each grade should be
            const sourceColors = {
                'S': '#FFE81D',
                'AAA+': '#CF4A8E',
                'AAA': '#8741A8',
                'AA+': '#593EBE',
                'AA': '#4785B1',
                'A+': '#41B396',
                'A': '#22AC47',
                'B': '#EF885C',
                'C': '#B48977',
                'D': '#C3C3C3'
            }

            let labels = [] // Labels for the pie chart.
            let counts = [] // Count of each grade
            let colors = [] // the colors that we choose to push to the array (based on the grades that get pushed)

            // For each grade that exists, give us the count and insert into the 3 arrays.
            result.forEach(gradeCount => {
                labels.push(gradeCount.grade)
                counts.push(gradeCount.count)
                colors.push(sourceColors[gradeCount.grade])
            })

            this.setState({
                labels: labels,
                datasets: [
                    {
                        label: 'Grades',
                        backgroundColor: colors,
                        data: counts
                    }
                ]
            })
        })
        
    }

    // Calls the API for a count of grades.
    filterGrades(event) {

        let gradeLevel = 0;

        if (event.target.value.trim() != '')
            gradeLevel = event.target.value

            userGrades(this.state.userID, gradeLevel)
        .then(result => {

            // A dictionary for what color each grade should be
            const sourceColors = {
                'S': '#FFE81D',
                'AAA+': '#CF4A8E',
                'AAA': '#8741A8',
                'AA+': '#593EBE',
                'AA': '#4785B1',
                'A+': '#41B396',
                'A': '#22AC47',
                'B': '#EF885C',
                'C': '#B48977',
                'D': '#C3C3C3'
            }

            let labels = [] // Labels for the pie chart.
            let counts = [] // Count of each grade
            let colors = [] // the colors that we choose to push to the array (based on the grades that get pushed)

            // For each grade that exists, give us the count and insert into the 3 arrays.
            result.forEach(gradeCount => {
                labels.push(gradeCount.grade)
                counts.push(gradeCount.count)
                colors.push(sourceColors[gradeCount.grade])
            })

            this.setState({
                labels: labels,
                datasets: [
                    {
                        label: 'Grades',
                        backgroundColor: colors,
                        data: counts
                    }
                ]
            })
        })

        
    }

    // Display elements to the screen
    render() {
        return (
            <div className="comp_grades">
                <div id="piechart">
                    <div className="row">
                        <div className="column four-times">
                            <Pie
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Grades',
                                    fontColor: '#484848',
                                    fontSize: 20
                                },
                                legend: {
                                    display: false,
                                    position: 'right'
                                }
                            }}/>   
                        </div>

                        <div className="column level-filter">
                            <h3 className="font-source mb-2 color-quartery">Level Filter</h3>
                            <select onChange={(e) => this.filterGrades(e)} className="form-input">
                                <option default value="">All</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                            </select>   
                        </div>
                    </div>
                    

                </div>
                
            </div>
        )
    }
}

export default Grades;