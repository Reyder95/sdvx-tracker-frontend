import React from 'react'
import { Pie } from 'react-chartjs-2'
import queryString from 'query-string'
import axios from 'axios'



class Grades extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            labels: ['S', 'AAA+', 'AAA', 'AA+', 'AA', 'A+', 'A', 'B', 'C', 'D'],
            datasets: [
                {
                    label: 'Grades',
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
                    data: [70, 88, 50, 44, 20]
                }
            ],
            userID: ''
        }
    }

    componentDidMount() {

        let values = queryString.parse(this.props.location.search)

        this.setState({
            userID: values.id
        })

        axios.get('http://localhost:3000/api/user_grades?id=' + values.id)
        .then(res => {

            let array = [];

            
            array.push(res.data.data.s)
            array.push(res.data.data.aaap)
            array.push(res.data.data.aaa)
            array.push(res.data.data.aap)
            array.push(res.data.data.aa)
            array.push(res.data.data.ap)
            array.push(res.data.data.a)
            array.push(res.data.data.b)
            array.push(res.data.data.c)
            array.push(res.data.data.d)

            this.setState({
                datasets: [
                    {
                        label: 'Grades',
                        backgroundColor: [
                            '#FFE81D',
                            '#CF4A8E',
                            '#8741A8',
                            '#593EBE',
                            '#4785B1',
                            '#41B396',
                            '#22AC47',
                            '#EF885C',
                            '#B48977',
                            '#C3C3C3'
                        ],
                        data: array
                    }
                ]
            })
        })
    }

    filterGrades(event) {
        let gradeLevel = '';

        console.log(event.target.value)

        if (event.target.value.trim() != '')
            gradeLevel = '&l=' + event.target.value

            console.log('http://localhost:3000/api/user_grades?id=' + this.state.userID + gradeLevel)

        axios.get('http://localhost:3000/api/user_grades?id=' + this.state.userID + gradeLevel)
        .then(res => {

            let array = [];

            
            array.push(res.data.data.s)
            array.push(res.data.data.aaap)
            array.push(res.data.data.aaa)
            array.push(res.data.data.aap)
            array.push(res.data.data.aa)
            array.push(res.data.data.ap)
            array.push(res.data.data.a)
            array.push(res.data.data.b)
            array.push(res.data.data.c)
            array.push(res.data.data.d)

            this.setState({
                datasets: [
                    {
                        label: 'Grades',
                        backgroundColor: [
                            '#FFE81D',
                            '#CF4A8E',
                            '#8741A8',
                            '#593EBE',
                            '#4785B1',
                            '#41B396',
                            '#22AC47',
                            '#EF885C',
                            '#B48977',
                            '#C3C3C3'
                        ],
                        data: array
                    }
                ]
            })
        })
    }

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