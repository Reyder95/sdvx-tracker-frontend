import React from 'react'
import SongTableSearch from './songtablesearch'
import SongEntry from './songlist_entry'
import axios from 'axios'

class SongTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            next_page: '',
            page: 1,
            data: []
        }
    }

    fetchApi(page) {

        axios.get('http://localhost:3000/api/songs?p=' + page)
            .then(res => {
                const songs = res.data.data;
                const nextPage = res.data.next_page;

                console.log(songs);
                this.setState({
                    data: songs,
                    next_page: nextPage
                })
            })

            let previous = document.getElementsByClassName('prevButton');
            let next = document.getElementsByClassName('nextButton')

        if (page == 1) {
            previous[0].style.display = 'none';
            previous[1].style.display = 'none';
        }
        else if (page > 1)
        {
            previous[0].style.display = 'block';
            previous[1].style.display = 'block';
        }

        if (this.state.next_page) {
            next[0].style.display = 'none';
            next[1].style.display = 'none';
        }
        else if (!this.state.next_page) {
            next[0].style.display = 'block';
            next[1].style.display = 'block';
        }
    }

    componentDidMount() {
        this.fetchApi(this.state.page);
    }

    refreshPage(next) {
        if (next) {
            let page = this.state.page + 1;

            this.setState({
                page: page
            })

            this.fetchApi(page)
        }
        else {
            let page = this.state.page - 1;

            this.setState({
                page: page
            })

            this.fetchApi(page)
        }
    }

    render() {
        return (
            <div className="comp_songtable color-secondary bg-tertiary">

                <SongTableSearch />

                <div className="pageControls">
                    <button onClick={() => this.refreshPage(false)} id="prev" className="btn pageControl prevButton bg-secondary">Previous</button>
                    <button onClick={() => this.refreshPage(true)} id="next" className="btn pageControl nextButton bg-secondary">Next</button>
                </div>
                
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
                                    nbr={index + (this.state.page * 10 - 9)}
                                    key={song.id}
                                    songData={song}
                                />
                            ))
                        }

                    </table>
                
                <button onClick={() => this.refreshPage(false)} id="prev" className="btn pageControl prevButton bg-secondary">Previous</button>
                <button onClick={() => this.refreshPage(true)} id="next" className="btn pageControl nextButton bg-secondary">Next</button>
                
                </div>
            </div>
        )
    }
}

export default SongTable;