import React from 'react'
import { Pie } from 'react-chartjs-2'

const state = {
    labels: ['S', 'AAA+', 'AAA', 'AA+', 'AA'],
    datasets: [
        {
            label: 'Grades',
            backgroundColor: [
                '#DFCE7D',
                '#634FA3',
                '#BE4F8E',
                '#ED6363',
                '#49AF68'
            ],
            data: [70, 88, 50, 44, 20]
        }
    ]
}

class Grades extends React.Component {
    render() {
        return (
            <div className="comp_grades">
                <Pie
                    data={state}
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
        )
    }
}

export default Grades;