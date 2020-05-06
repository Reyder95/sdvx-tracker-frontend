import React from 'react'
import SongTableSearch from './songtablesearch'
import SongEntry from './songlist_entry'
import axios from 'axios'

class SongTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/songs')
            .then(res => {
                const songs = res.data.data;
                console.log(songs);
                this.setState({data: songs}, console.log(this.state.data))
            })
    }

    render() {
        return (
            <div className="comp_songtable color-secondary bg-tertiary">
                
                {console.log(this.state.data)}

                <SongTableSearch />

                <button id="prev" className="btn pageControl bg-secondary">Previous</button>
                <button id="next" className="btn pageControl bg-secondary">Next</button>
               
                <div className="songtableclass">
                    <table>
                        <tr className="color-quartery">
                            <th>#</th>
                            <th className="jacket">Jacket</th>
                            <th>Song</th>
                            <th>NOV</th>
                            <th>ADV</th>
                            <th>EXH</th>
                            <th>MXM</th>
                            <th>Type</th>
                            <th>Link (if custom)</th>
                        </tr>
        
                        {
                            
                            this.state.data.map((song, index) => (
                                <SongEntry 
                                    nbr={index + 1}
                                    songData={song}
                                />
                            ))
                        }

                    </table>
                    <button id="prev" className="btn pageControl bg-secondary">Previous</button>
                <button id="next" className="btn pageControl bg-secondary">Next</button>
                </div>
            </div>
        )
    }
}

export default SongTable;