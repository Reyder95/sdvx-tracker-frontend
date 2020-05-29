import React from 'react'
import SongTableSearch from './songtablesearch'
import SongEntry from './songlist_entry'
import axios from 'axios'
import { Link } from 'react-router-dom'
import _ from 'lodash'

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
            data: [],
            songimageurl: 'http://placehold.it/128',

            addSong_title: '',
            addSong_artist: '',
            addSong_effector: '',
            addSong_game: '',
            addSong_type: '',
            addSong_custom_link: '',
            addSong_bpm: '',
            addSong_novice: 0,
            addSong_advanced: 0,
            addSong_exhaust: 0,
            addSong_maximum: 0
        }
    this.delayedCallback = _.debounce(this.handleSearchChange, 500)
    }

    fetchApi(page, search, level, game, type) {
        console.log('http://localhost:3000/api/songs?p=' + page + '&s=' + search + '&l=' + level + '&g=' + game + '&t=' + type)

        let test = 0

        axios.get('http://localhost:3000/api/songs?p=' + page + '&s=' + search + '&l=' + level + '&g=' + game + '&t=' + type)
            .then(res => {
                const songs = res.data.data;
                const nextPage = res.data.next_page;
                test = 3
                console.log(songs);
                this.setState({
                    data: songs,
                    next_page: nextPage
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

                if (!this.state.next_page) {
                    next[0].style.display = 'none';
                    next[1].style.display = 'none';
                }
                else if (this.state.next_page) {
                    next[0].style.display = 'block';
                    next[1].style.display = 'block';
                }
            })
    }

    handleSearchChange(event) {
        const value = event.target.value

        this.setState({search: value})
        this.fetchApi(1, value, this.state.level, this.state.game, this.state.type);
    }

    handleGameChange(event) {
        const value = event.target.value

        this.setState({game: value})
        this.fetchApi(1, this.state.search, this.state.level, value, this.state.type)
    }

    handleLevelChange(event) {
        const value = event.target.value

        this.setState({level: value})
        this.fetchApi(1, this.state.search, value, this.state.game, this.state.type)
    }

    handleTypeChange(event) {
        const value = event.target.value

        this.setState({type: value})
        this.fetchApi(1, this.state.search, this.state.level, this.state.game, value)
    }

    componentDidMount() {
        this.fetchApi(this.state.page, this.state.search, this.state.level, this.state.game, this.state.type);
    }

    refreshPage(next) {
        if (next) {
            let page = this.state.page + 1;

            this.setState({
                page: page
            })

            this.fetchApi(page, this.state.search, this.state.level, this.state.game, this.state.type)
        }
        else {
            let page = this.state.page - 1;

            this.setState({
                page: page
            })

            this.fetchApi(page, this.state.search, this.state.level, this.state.game, this.state.type)
        }
    }

    openModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'block'
    }

    closeModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'none'
    }

    resetFilters() {
        this.fetchApi(1, '', 0, '', '')
    }

    onChange(event) {
        event.persist()
        this.delayedCallback(event)
    }

    // Set state for adding a song
    setSongImageUrl(event) {
        if (event.target.value.trim() == '')
            this.setState({
                songimageurl: 'http://placehold.it/128'
            })
        else
            this.setState({
                songimageurl: event.target.value
            })
    }

    setSongArtist(event) {
        this.setState({
            addSong_artist: event.target.value
        })
    }

    setSongTitle(event) {
        this.setState({
            addSong_title: event.target.value
        })
    }

    setSongEffector(event) {
        this.setState({
            addSong_effector: event.target.value
        })
    }

    setSongGame(event) {
        this.setState({
            addSong_game: event.target.value
        })
    }

    setSongType(event) {
        this.setState({
            addSong_type: event.target.value
        })
    }

    setSongCustomLink(event) {
        this.setState({
            addSong_custom_link: event.target.value
        })
    }

    setSongBpm(event) {
        this.setState({
            addSong_bpm: event.target.value
        })
    }

    setSongDifficulties(event, difficulty) {
        if (difficulty == 'NOVICE')
            this.setState({
                addSong_novice: event.target.value
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                addSong_advanced: event.target.value
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                addSong_exhaust: event.target.value
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                addSong_maximum: event.target.value
            })
    }

    submitSongInformation(event) {
        event.preventDefault();

        const postObject = {
            title: this.state.addSong_title.trim(),
            artist: this.state.addSong_artist.trim(),
            type: this.state.addSong_type.trim()
        }

        if ((postObject.title != '' && postObject.artist != '' && postObject.type != '') &&
        (this.state.addSong_novice != 0 || this.state.addSong_advanced != 0 || this.state.addSong_exhaust != 0 || 
        this.state.addSong_maximum != 0)) {

            if (this.state.addSong_bpm.trim() == '' || parseInt(this.state.addSong_bpm, 10).toString() === this.state.addSong_bpm.trim())
            {
                if (parseInt(this.state.addSong_bpm, 10).toString() === this.state.addSong_bpm.trim())
                    postObject.bpm = parseInt(this.state.addSong_bpm)

                let difficulties = []
            
                if (this.state.addSong_novice != 0)
                    difficulties.push({name: "NOVICE", level: this.state.addSong_novice})
    
                if (this.state.addSong_advanced != 0)
                    difficulties.push({name: "ADVANCED", level: this.state.addSong_advanced})
                
                if (this.state.addSong_exhaust != 0)
                    difficulties.push({name: "EXHAUST", level: this.state.addSong_exhaust})
    
                if (this.state.addSong_maximum != 0)
                    difficulties.push({name: "MAXIMUM", level: this.state.addSong_maximum})

                    postObject.difficulties = difficulties

                if (this.state.addSong_game.trim() != '')
                    postObject.game = this.state.addSong_game.trim()
    
                if(this.state.addSong_effector.trim() != '')
                    postObject.effector = this.state.addSong_effector.trim()

                if (this.state.addSong_custom_link.trim() != '')
                    postObject.custom_link = this.state.addSong_custom_link.trim()

                if (this.state.songimageurl.trim() != '')
                    postObject.jacket = this.state.songimageurl.trim();
                
                console.log(postObject)
                
                axios.post('http://localhost:3000/api/add_song', {
                    postObject: postObject
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
                    }
                })
                .then(res => {
                    console.log(res)
                })
            }
            

        }
        else {
            console.log('nope!')
        }
    }

    render() {
        return (
            <div className="comp_songtable color-secondary bg-tertiary">

                <form className="form-flex">
                    <div className="row">
                        <div className="form-flex-item column">
                            <input onChange={this.onChange.bind(this)} id="song" className="form-input" placeholder="Song Search" type="text" />
                        </div>
                        <div className="form-flex-item column">
                            <select onChange={this.handleLevelChange.bind(this)} id="level" className="form-input">
                                <option value="" disabled selected hidden>Level Select</option>
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
                        <div className="form-flex-item column">
                            <select onChange={this.handleTypeChange.bind(this)} id="type" className="form-input">
                                <option value="" disabled selected hidden>Type</option>
                                <option value="official">Official</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        <div className="form-flex-item column">
                            <select onChange={this.handleGameChange.bind(this)} id="type" className="form-input">
                                <option value="" disabled selected hidden>Game</option>
                                <option value="SOUND VOLTEX I: BOOTH">SOUND VOLTEX I: BOOTH</option>
                                <option value="SOUND VOLTEX II: -infinite infection-">SOUND VOLTEX II: -infinite infection-</option>
                                <option value="SOUND VOLTEX III: GRAVITY WARS">SOUND VOLTEX III: GRAVITY WARS</option>
                                <option value="SOUND VOLTEX III: GRAVITY WARS コナステ">SOUND VOLTEX III: GRAVITY WARS コナステ</option>
                                <option value="SOUND VOLTEX IV: HEAVENLY HAVEN">SOUND VOLTEX IV: HEAVENLY HAVEN</option>
                                <option value="SOUND VOLTEX V: VIVID WAVE">SOUND VOLTEX V: VIVID WAVE</option>
                           
                            </select>
                        </div>
                        <div className="button-flex column">
                            <button onClick={this.resetFilters.bind(this)} className="btn bg-quintery reset">Reset Filters</button>
                        </div>
                    </div>

                    
                </form>

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
                
                </div>

                <div id="addSongModal" className="modal">
                    <div className="modal-content bg-secondary">
                        <span onClick={this.closeModal.bind(this)} className="close">&times;</span>
                        <div className="modal-header font-roboto">
                            <h2>Add a Song</h2>

                            <h3 className="mt-2">Notes:</h3>

                            <p className="mt-2">1. Please make sure the song you are uploading has not been uploaded previously (search for it)</p>
                            <p className="mt-1">2. It's recommended to fill out all information, but it's not required.</p>
                            <p className="mt-1">3. You can take a look at <a href="http://remywiki.com">Remy Wiki</a> for information when adding a song.</p>
                            <p className="mt-1">4. Customs are allowed, but if possible provide a source to download the custom in <strong>Custom Link</strong>. and set the type to <strong>Custom</strong></p>
                        </div>

                        <hr className="mt-1"/>

                        <div className="modal-body font-source mt-1">
                            {console.log(this.state)}
                            <form>
                                <div className="row">
                                    <div className="column songimagepreview">
                                        <p className="mb-2">
                                            <strong>
                                                Image Preview
                                            </strong>
                                            
                                        </p>
                                        <img className="song-preview" src={this.state.songimageurl}/> <br/>

                                        <label id="songimageurl">Song Image URL</label>
                                        <input className="mb-4" onChange={(e) => this.setSongImageUrl(e)} type="text"/>
                                    </div>

                                    <div className="column songinformation">
                                        <label id="songtitle">Title (required)</label>
                                        <input onChange={(e) => this.setSongTitle(e)} className="mb-4" type="text"/>

                                        <label id="songartist">Artist (required)</label>
                                        <input onChange={(e) => this.setSongArtist(e)} className="mb-4" type="text"/>

                                        <label id="songeffector">Effector</label>
                                        <input onChange={(e) => this.setSongEffector(e)} className="mb-4" type="text"/>

                                        <label id="songeffector">BPM</label>
                                        <input onChange={(e) => this.setSongBpm(e)} className="mb-4" type="text"/>

                                        <label id="songgame">Game</label>
                                        <select onChange={(e) => this.setSongGame(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Select One</option>
                                            <option value="SOUND VOLTEX I: BOOTH">SOUND VOLTEX I: BOOTH</option>
                                            <option value="SOUND VOLTEX II: -infinite infection-">SOUND VOLTEX II: -infinite infection-</option>
                                            <option value="SOUND VOLTEX III: GRAVITY WARS">SOUND VOLTEX III: GRAVITY WARS</option>
                                            <option value="SOUND VOLTEX III: GRAVITY WARS コナステ">SOUND VOLTEX III: GRAVITY WARS コナステ</option>
                                            <option value="SOUND VOLTEX IV: HEAVENLY HAVEN">SOUND VOLTEX IV: HEAVENLY HAVEN</option>
                                            <option value="SOUND VOLTEX V: VIVID WAVE">SOUND VOLTEX V: VIVID WAVE</option>
                                        </select>

                                        <label className="mt-4" id="songtype">Type (required)</label>
                                        <select onChange={(e) => this.setSongType(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Select One</option>
                                            <option value="official">Official</option>
                                            <option value="custom">Custom</option>
                                        </select>

                                        <label id="songcustomlinks">Custom Link</label>
                                        <input onChange={(e) => this.setSongCustomLink(e)} className="mb-4" type="text"/>
                                    </div>
                                    
                                </div>

                                <div className="difficultyLevels color-secondary bg-tertiary">
                                    <p className="mb-4">
                                        <strong>
                                            Specify a level for each difficulty you want to upload (must at least specify one!)
                                        </strong>
                                    </p>

                                    <div className="color-secondary row">

                                        <div className="column">
                                            <label id="songnovice">NOVICE</label>
                                            <select onChange={(e) => this.setSongDifficulties(e, 'NOVICE')} className="diffDropdown" className="mb-4" className="form-input">
                                                <option default value="0">None</option>
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

                                        <div className="column">
                                            <label id="songadvanced">ADVANCED</label>
                                            <select onChange={(e) => this.setSongDifficulties(e, 'ADVANCED')} className="diffDropdown" className="mb-4" className="form-input">
                                                <option default value="0">None</option>
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

                                        <div className="column">
                                            <label id="songexhaust">EXHAUST</label>
                                            <select onChange={(e) => this.setSongDifficulties(e, 'EXHAUST')} className="diffDropdown" className="mb-4" className="form-input">
                                                <option default value="0">None</option>
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

                                        <div className="column">
                                            <label id="songmaximum">MAXIMUM</label>
                                            <select onChange={(e) => this.setSongDifficulties(e, 'MAXIMUM')} className="diffDropdown" className="mb-4" className="form-input">
                                                <option default value="0">None</option>
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

                                <div className="row addSongRow">
                                    <button onClick={(e) => this.submitSongInformation(e)} className="btn bg-quintery">Add Song</button>
                                </div>
                                
                                
                            </form>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SongTable;