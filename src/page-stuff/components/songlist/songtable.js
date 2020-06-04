import React from 'react'      // React stuff
import SongEntry from './songlist_entry'    // Song entry component, handles each song
import SongListSearch from './songlist_search'
import AddSongModal from './songlist_addSongModal'
import { getSongList, addSong } from '../../../api-calls'

// Displays all the songs in the database and allows users to interact with those songs
class SongTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            level: 0,
            game: '',
            type: '',
            next_page: '',
            page: 1,
            data: []
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleGameChange = this.handleGameChange.bind(this)
        this.handleLevelChange = this.handleLevelChange.bind(this)
        this.handleTypeChange = this.handleTypeChange.bind(this)
    }

    // On component mount call the API for default songs (page 1, no search parameters)
    componentDidMount() {
        this.displaySongs()
    }

    // ---Handling Song Data---

    // Sets this.state.search and calls the API. This is debounced for 500ms so it will not call until 500ms has past since the user stops typing
    handleSearchChange(event) {
        this.setState({search: event.target.value})
        this.displaySongs(1, event.target.value, this.state.level, this.state.game, this.state.type);
    }

    // Sets this.state.game and calls the API
    handleGameChange(event) {
        this.setState({game: event.target.value})
        this.displaySongs(1, this.state.search, this.state.level, event.target.value, this.state.type)
    }

    // Sets this.state.level and calls the API
    handleLevelChange(event) {
        this.setState({level: event.target.value})
        this.displaySongs(1, this.state.search, event.target.value, this.state.game, this.state.type)
    }

    // Sets this.state.type and calls the API
    handleTypeChange(event) {
        this.setState({type: event.target.value})
        this.displaySongs(1, this.state.search, this.state.level, this.state.game, event.target.value)
    }

    // Intermediary API call function. This will call the API and return a set of values which set the data. Has a set of default values.
    displaySongs(page = 1, search = '', level = '', game = '', type = '') {
        getSongList(page, search, level, game, type)
        .then(result => {
            
            this.setState({
                data: result.songs,
                next_page: result.nextPage  
            })

            let previous = document.getElementsByClassName('prevButton');
            let next = document.getElementsByClassName('nextButton')
                if (result.page == 1) {
                    previous[0].style.display = 'none';
                    previous[1].style.display = 'none';
                }
                else if (result.page > 1)
                {
                    previous[0].style.display = 'block';
                    previous[1].style.display = 'block';
                }
    
                if (!this.state.next_page) {
                    next[0].style.display = 'none';
                    next[1].style.display = 'none';
                }
                else if (this.state.next_page) {
                    next[0].style.display = 'block';
                    next[1].style.display = 'block';
                }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // When a page changes it calls this function which changes the page # and re-calls the API
    refreshPage(next) {
        if (next) {
            let page = this.state.page + 1;

            this.setState({
                page: page
            })

            this.displaySongs(page, this.state.search, this.state.level, this.state.game, this.state.type)
        }
        else {
            let page = this.state.page - 1;

            this.setState({
                page: page
            })

            this.displaySongs(page, this.state.search, this.state.level, this.state.game, this.state.type)
        }
    }    
    
    // Resets the filters back to the default state
    resetFilters() {
        this.displaySongs()
    }    
    
    // Intermediary debounce function. This gets debounced using delayedCallback which calls handleSongSearch
    onChange(event) {
        event.persist()
        this.delayedCallback(event)
    }

    // ---Modals---

    // Shows 'addSongModal'
    openModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'block'
    }

    // Hides 'addSongModal'
    closeModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'none'
    }

    // Render elements to the screen
    render() {
        return (
            <div className="comp_songtable color-secondary bg-tertiary">

                <SongListSearch
                handleSearchChange={this.handleSearchChange }
                handleLevelChange={this.handleLevelChange}
                handleTypeChange={this.handleTypeChange}
                handleGameChange={this.handleGameChange}
                resetFilters={this.resetFilters}
                />

                <button onClick={() => this.openModal()} className="btn">Add Song</button>

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
                                        history={this.props.history}
                                    />
                                
                            ))
                        }

                    </table>
                
                <button onClick={() => this.refreshPage(false)} id="prev" className="btn pageControl prevButton bg-secondary">Previous</button>
                <button onClick={() => this.refreshPage(true)} id="next" className="btn pageControl nextButton bg-secondary">Next</button>
                
                <AddSongModal 
                closeModal={this.closeModal}
                {...this.props}
                />

                </div>
            </div>
        )
    }
}

export default SongTable;