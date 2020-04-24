import React from 'react'
import { Line } from 'react-chartjs-2'

const state = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
        {
            label: 'Volforce',
            fill: false,
            lineTension: 0.5,
            backgroundColor: '#000000',
            borderColor: "#000000",
            borderWidth: 2,
            data: [1.00, 5.62, 15.10, 17.75]
        }
    ]
}

class Volforce extends React.Component {
    render() {
        return (
            <div className="comp_volforce">
                <Line className="volforce_line"
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Volforce',
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

export default Volforce;