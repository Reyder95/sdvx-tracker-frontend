import React from 'react'
import axios from 'axios'
import queryString from 'query-string'

class SongViewTop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            artist: '',
            bpm: '',
            effector: '',
            game: '',
            image: ''
        }
    }
    
    componentDidMount() {
        let queryValues = queryString.parse(this.props.location.search)
        console.log('hi')

        axios.get('http://localhost:3000/api/song_single?id=' + queryValues.id)
        .then(res => {
            this.setState({
                title: res.data.data[0].title,
                artist: res.data.data[0].artist,
                bpm: res.data.data[0].bpm,
                effector: res.data.data[0].effector,
                game: res.data.data[0].game,
                image: res.data.data[0].jacket_link
            })
        })
    }
    
    render() {
        return(
            <div className="comp_songviewtop bg-tertiary pb-4">
                <div className="song-block">
                    <div className="song-image">
                        <h2 className="font-roboto-slab color-secondary mb-2 pt-2">{this.state.title} / {this.state.artist}</h2>
                        <img src={this.state.image}/>
                        <div className="song-info font-source color-quartery">
                            <p>
                                <strong>BPM:</strong> {this.state.bpm} <br />
                            </p>
                            <p>
                                <strong>Effector:</strong> {this.state.effector}
                            </p>
                            <p>
                                <strong>Game:</strong> {this.state.game}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default SongViewTop;