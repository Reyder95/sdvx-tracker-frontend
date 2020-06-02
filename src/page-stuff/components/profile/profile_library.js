import React from 'react'
import queryString from 'query-string'
import axios from 'axios'

class Library extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            library: []
        }
    }

    componentDidMount() {
        let values = queryString.parse(this.props.location.search)

        axios.get('http://localhost:3000/api/user_library?id=' + values.id)
        .then(res => {
            this.setState({
                library: res.data.result
            })
        })
    }

    renderDifficulty(difficulty) {
        if (difficulty.length > 0)
            return difficulty[0].scores[0].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        else
            return '----'
    }

    render() {
        return (
            <div className="comp_library">
             <table className="font-roboto color-secondary">
                        <tr className="color-quartery font-roboto-slab">
                            <th>#</th>
                            <th className="jacket">Jacket</th>
                            <th className="song">Song</th>
                            <th className="diffNOV">NOV</th>
                            <th className="diffADV">ADV</th>
                            <th className="diffEXH">EXH</th>
                            <th className="diffMXM">MXM</th>
                            <th>Type</th>
                        </tr>

                        {
                            this.state.library.map((song, index) => (
                                <tr>
                                <td>{index + 1}</td>
                                <td className="jacket2">
                                    <img src={song.jacket} />
                                </td>
                                <td>{song.artist} - {song.title}</td>
                                <td>{this.renderDifficulty(song.difficulties.filter(e => e.difficulty === 'NOVICE'))}</td>
                                <td>{this.renderDifficulty(song.difficulties.filter(e => e.difficulty === 'ADVANCED'))}</td>
                                <td>{this.renderDifficulty(song.difficulties.filter(e => e.difficulty === 'EXHAUST'))}</td>
                                <td>{this.renderDifficulty(song.difficulties.filter(e => e.difficulty === 'MAXIMUM'))}</td>
                                <td>{song.type.charAt(0).toUpperCase() + song.type.slice(1)}</td>
                            </tr>
                            ))
                        }


                        
                    </table>
            </div>
        )
    }
}

export default Library;