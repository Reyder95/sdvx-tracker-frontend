// Main Component: Profile

import React from 'react'   // React stuff 
import queryString from 'query-string'  // Allows parsing URL query strings
import { userLibrary } from '../../../api-calls'    // API call to get the user library

// Library component, shows all songs a user has a score on
class Library extends React.Component {

    constructor(props) {
        super(props)

        // Contains an array of library songs
        this.state = {
            library: []
        }
    }

    // On component mount, call the API to search for a user's library
    componentDidMount() {
        let values = queryString.parse(this.props.location.search)

        userLibrary(values.id)
        .then(result => {
            this.setState({
                library: result.data.result
            })
        })
        .catch(err => {
            console.log(err)
        })

    }

    // Checks if a difficulty exists and if it does, post the score of the difficulty. if it doesn't exist, post a '----'
    renderDifficulty(difficulty) {
        if (difficulty.length > 0)
            return difficulty[0].scores[0].score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        else
            return '----'
    }

    redirectionLink(id) {
        this.props.history.push(`/song?id=${id}`)
    }

    // Render elements to the screen
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
                                <tr onClick={() => this.redirectionLink(song.id)}>
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