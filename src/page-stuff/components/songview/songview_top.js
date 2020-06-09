import React from 'react'
import queryString from 'query-string'
import ReactTooltip from 'react-tooltip'
import { getSong, editScore, addDiffs } from '../../../api-calls'

class SongViewTop extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            artist: '',
            bpm: '',
            bpmHigh: '',
            game: '',
            image: '',

            editSong_jacket: 'https://placehold.it/128',
            editSong_title: '',
            editSong_artist: '',
            editSong_effector: '',
            editSong_bpm: '',
            editSong_bpmHigh: '',
            editSong_game: '',
            editSong_type: '',
            editSong_custom_link: '',
            editSong_novice: 0,
            editSong_noviceEffector: null,
            editSong_advanced: 0,
            editSong_advancedEffector: null,
            editSong_exhaust: 0,
            editSong_exhaustEffector: null,
            editSong_maximum: 0,
            editSong_maximumEffector: null,
        }
    }
    
    // When the component mounts, get the song details from the API
    componentDidMount() {
        let queryValues = queryString.parse(this.props.location.search)

        getSong(queryValues.id)
        .then(result => {
            this.setState({
                title: result.data.data[0].title,
                artist: result.data.data[0].artist,
                bpm: result.data.data[0].bpm,
                bpmHigh: result.data.data[0].bpmend,
                game: result.data.data[0].game,
                image: result.data.data[0].jacket
            })

            if (result.data.data[0].user_fk == localStorage.getItem('user_id'))
                document.getElementById('editsongbtn').style.display = 'block'
        })
        .catch(() => {
            alert('Something went wrong!')
        })
        
    }

    // 
    openModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'block'
    }

    closeModal() {
        let modal = document.getElementById('addSongModal')

        modal.style.display = 'none'
    }

    //---State Setting---

    // Set state for adding a song
    setSongJacket(event) {
        if (event.target.value.trim() == '')
            this.setState({
                editSong_jacket: 'http://placehold.it/128'
            })
        else
            this.setState({
                editSong_jacket: event.target.value
            })
    }

    // this.state.artist
    setSongArtist(event) {
        this.setState({
            editSong_artist: event.target.value
        })
    }

    // this.state.title
    setSongTitle(event) {
        this.setState({
            editSong_title: event.target.value
        })
    }

    // this.state.game
    setSongGame(event) {
        this.setState({
            editSong_game: event.target.value
        })
    }

    setSongType(event) {
        this.setState({
            editSong_type: event.target.value
        })

        if (event.target.value != 'custom')
            this.setState({
                editSong_custom_link: ''
            })
    }

    setSongCustomLink(event) {
        this.setState({
            editSong_custom_link: event.target.value
        })
    }

    setSongBpm(event) {
        this.setState({
            editSong_bpm: event.target.value
        })
    }

    setSongBpmHigh(event) {
        this.setState({
            editSong_bpmHigh: event.target.value
        })
    }

    setSongDifficulties(event, difficulty) {
        if (difficulty == 'NOVICE')
            this.setState({
                editSong_novice: event.target.value
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                editSong_advanced: event.target.value
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                editSong_exhaust: event.target.value
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                editSong_maximum: event.target.value
            })
    }

    copyEffector() {
        this.setState({
            editSong_advancedEffector: this.state.editSong_noviceEffector,
            editSong_exhaustEffector: this.state.editSong_noviceEffector,
            editSong_maximumEffector: this.state.editSong_noviceEffector
        })
    }

    setDifficultyEffector(event, difficulty) {
        if (difficulty == 'NOVICE')
            this.setState({
                editSong_noviceEffector: event.target.value
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                editSong_advancedEffector: event.target.value
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                editSong_exhaustEffector: event.target.value
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                editSong_maximumEffector: event.target.value
            })
    }

    submitSongInformation(event) {
        event.preventDefault();
        let value = queryString.parse(this.props.location.search)

        const postObject = {
            id: value.id
        }

        const postObject2 = {
            id: value.id
        }

        console.log('test')
        
        if (this.state.editSong_title.trim() != '' ||
            this.state.editSong_artist.trim() != '' ||
            this.state.editSong_game.trim() != '' ||
            this.state.editSong_bpm.trim() != '' ||
            this.state.editSong_bpmHigh.trim() != '' ||
            this.state.editSong_effector.trim() != '' ||
            this.state.editSong_jacket.trim() != 'https://placehold.it/128' ||
            this.state.editSong_type.trim() != '' ||
            this.state.editSong_novice != 0 ||
            this.state.editSong_advanced != 0 ||
            this.state.editSong_exhaust != 0 ||
            this.state.editSong_maximum != 0 ||
            this.state.editSong_noviceEffector != null ||
            this.state.editSong_advancedEffector != null ||
            this.state.editSong_exhaustEffector != null ||
            this.state.editSong_maximumEffector != null
            )
            {
                if (parseInt(this.state.editSong_bpm, 10).toString() === this.state.editSong_bpm.trim() && this.state.editSong_bpm.trim() != '')
                    postObject.bpm = parseInt(this.state.editSong_bpm)

                if (parseInt(this.state.editSong_bpmHigh, 10).toString() === this.state.editSong_bpmHigh.trim() && this.state.editSong_bpmHigh.trim() != '')
                    postObject.bpmhigh = parseInt(this.state.editSong_bpmHigh)

                let updateDifficulties = []
                let addDifficulties = []

                if (this.state.editSong_title.trim() != '')
                    postObject.title = this.state.editSong_title

                if (this.state.editSong_artist.trim() != '')
                    postObject.artist = this.state.editSong_artist

                if (this.state.editSong_type.trim() != '')
                    postObject.type = this.state.editSong_type
                
                if ((this.state.editSong_noviceEffector != null || this.state.editSong_novice != 0) && this.props.isDifficultyExist('NOVICE')) {
                    
                    updateDifficulties.push({name: "NOVICE", level: this.state.editSong_novice, effector: this.state.editSong_noviceEffector})

                }
                else if (this.state.editSong_novice != 0 && !this.props.isDifficultyExist('NOVICE')) {
                    
                    addDifficulties.push({name: "NOVICE", level: this.state.editSong_novice, effector: this.state.editSong_noviceEffector})

                }

                if ((this.state.editSong_advancedEffector != null || this.state.editSong_advanced != 0) && this.props.isDifficultyExist('ADVANCED')) {
                    
                    updateDifficulties.push({name: "ADVANCED", level: this.state.editSong_advanced, effector: this.state.editSong_advancedEffector})

                }
                else if (this.state.editSong_advanced != 0 && !this.props.isDifficultyExist('ADVANCED')) {

                    addDifficulties.push({name: "ADVANCED", level: this.state.editSong_advanced, effector: this.state.editSong_advancedEffector})

                }
                
                if ((this.state.editSong_exhaustEffector != null || this.state.editSong_exhaust != 0) && this.props.isDifficultyExist('EXHAUST')) {

                    updateDifficulties.push({name: "EXHAUST", level: this.state.editSong_exhaust, effector: this.state.editSong_exhaustEffector})

                }
                else if (this.state.editSong_exhaust != 0 && !this.props.isDifficultyExist('EXHAUST')) {

                    addDifficulties.push({name: "EXHAUST", level: this.state.editSong_exhaust, effector: this.state.editSong_exhaustEffector})

                }

                if ((this.state.editSong_maximumEffector != null || this.state.editSong_maximum != 0) && this.props.isDifficultyExist('MAXIMUM')) {

                    updateDifficulties.push({name: "MAXIMUM", level: this.state.editSong_maximum, effector: this.state.editSong_maximumEffector})
                    
                }
                else if (this.state.editSong_maximum != 0 && !this.props.isDifficultyExist('MAXIMUM'))
                    addDifficulties.push({name: "MAXIMUM", level: this.state.editSong_maximum, effector: this.state.editSong_maximumEffector})

                    postObject.difficulties = updateDifficulties

                if (this.state.editSong_game.trim() != '')
                    postObject.game = this.state.editSong_game.trim()

                if(this.state.editSong_effector.trim() != '')
                    postObject.effector = this.state.editSong_effector.trim()

                if (this.state.editSong_custom_link.trim() != '')
                    postObject.custom_link = this.state.editSong_custom_link.trim()

                if (this.state.editSong_jacket.trim() != 'https://placehold.it/128')
                    postObject.jacket = this.state.editSong_jacket.trim();

                editScore(postObject)

                if (addDifficulties.length > 0) {
                    postObject2.difficulties = addDifficulties
                    addDiffs(postObject2)
                }
            }
    }
    
    render() {
        return(
            <div className="comp_songviewtop bg-tertiary pb-4">
                <div className="song-block">
                    <div className="song-image">
                        
                        <div onClick={() => this.openModal()} id="editsongdiv">
                            <button id="editsongbtn" className="btn">Edit Song</button>
                        </div>

                        <h2 className="font-roboto-slab color-secondary mb-2 pt-2">{this.state.title} / {this.state.artist}</h2>
                        <img src={this.state.image}/>
                        <div className="song-info font-source color-quartery">
                            <p>
                                <strong>BPM:</strong> {this.state.bpmHigh == null ? this.state.bpm : `${this.state.bpm} - ${this.state.bpmHigh}`} <br />
                            </p>
                            <p>
                                <strong>Game:</strong> {this.state.game}
                            </p>
                        </div>

                    </div>
                </div>

                <div id="addSongModal" className="modal">
                    <div className="modal-content bg-secondary">
                        <span onClick={this.closeModal.bind(this)} className="close">&times;</span>
                        <div className="modal-header font-roboto">
                            <h2>Edit Song Information - {this.state.title}</h2>

                            <p>Anything left blank will not be changed.</p>

                        </div>

                        <hr className="mt-1"/>

                        <div className="modal-body font-source mt-1">
                            <form>
                                <div className="row">
                                    <div className="column songimagepreview">
                                        <img className="song-preview" src={this.state.editSong_jacket}/> <br/>

                                        <input placeholder="Song Image URL" className="mb-4" onChange={(e) => this.setSongJacket(e)} type="text"/>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="column">
                                        <input onChange={(e) => this.setSongTitle(e)} placeholder="Title" className="mb-4" type="text"/>
                                    </div>

                                    <div className="column">
                                        <input onChange={(e) => this.setSongArtist(e)} placeholder="Artist" className="mb-4" type="text"/>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="column">
                                        <select onChange={(e) => this.setSongGame(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Game</option>
                                            <option value="SOUND VOLTEX I: BOOTH">SOUND VOLTEX I: BOOTH</option>
                                            <option value="SOUND VOLTEX II: -infinite infection-">SOUND VOLTEX II: -infinite infection-</option>
                                            <option value="SOUND VOLTEX III: GRAVITY WARS">SOUND VOLTEX III: GRAVITY WARS</option>
                                            <option value="SOUND VOLTEX III: GRAVITY WARS コナステ">SOUND VOLTEX III: GRAVITY WARS コナステ</option>
                                            <option value="SOUND VOLTEX IV: HEAVENLY HAVEN">SOUND VOLTEX IV: HEAVENLY HAVEN</option>
                                            <option value="SOUND VOLTEX V: VIVID WAVE">SOUND VOLTEX V: VIVID WAVE</option>
                                        </select>
                                     </div>
            
                                    <div className="column">
                                        <div className="row">
                                            <div className="column">
                                                <input data-tip data-for="bpmlow" onChange={(e) => this.setSongBpm(e)} placeholder="BPM - Low" className="mb-4" type="text"/>
                                            </div>

                                            <div className="column">
                                                <input data-tip data-for="bpmhigh" onChange={(e) => this.setSongBpmHigh(e)} placeholder="BPM - High" className="mb-4" type="text"/>
                                            </div>

                                            <ReactTooltip id="bpmlow" effect="solid">
                                                <span>The lowest BPM goes here</span>
                                            </ReactTooltip>

                                            <ReactTooltip id="bpmhigh" effect="solid">
                                                <span>The highest BPM goes here. If you'd like to remove this, put "0"</span>
                                            </ReactTooltip>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="column">
                                        <select onChange={(e) => this.setSongType(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Type</option>
                                            <option value="official">Official</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>

                                    <div className="column">
                                            <input disabled={this.state.type == 'custom' ? false : true} value={this.state.custom_link} onChange={(e) => this.setSongCustomLink(e)} placeholder="Custom Link" className="mb-4" type="text"/>
                                    </div>



                                </div>

                                <div className="row">

                                    {/*<div className="column songinformation">
                                        <label id="songtitle">Title</label>
                                        <input onChange={(e) => this.setSongTitle(e)} className="mb-4" type="text"/>

                                        <label id="songartist">Artist</label>
                                        <input onChange={(e) => this.setSongArtist(e)} className="mb-4" type="text"/>

                                        <label id="songeffector">Effector</label>
                                        <input onChange={(e) => this.setAllEffector(e)} className="mb-4" type="text"/>

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

                                        <label className="mt-4" id="songtype">Type</label>
                                        <select onChange={(e) => this.setSongType(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Select One</option>
                                            <option value="official">Official</option>
                                            <option value="custom">Custom</option>
                                        </select>

                                        <label id="songcustomlinks">Custom Link</label>
                                        <input disabled={this.state.editSong_type == 'custom' ? false : true} value={this.state.editSong_custom_link} onChange={(e) => this.setSongCustomLink(e)} className="mb-4" type="text"/>
        </div>*/}
                                    
                                </div>

                                <div className="difficultyLevels color-secondary">
                                    <p className="mb-4">
                                        <strong>
                                            Specify a level for each difficulty you want to update
                                        </strong>
                                    </p>

                                    <hr />

                                    <div className="songDropdowns color-secondary row">

                                        <div className="column">
                                            <label id="songnovice"><strong>NOVICE</strong></label>
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
                                            <label id="songadvanced"><strong>ADVANCED</strong></label>
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
                                            <label id="songexhaust"><strong>EXHAUST</strong></label>
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
                                            <label id="songmaximum"><strong>MAXIMUM</strong></label>
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

                                    <div className="effectors color-secondary row">
                                        <div className="column">
                                            <label id="songnovice"><strong>Effector</strong> <a data-tip data-for='copy' onClick={() => this.copyEffector()}>(Copy)</a></label>
                                            <input placeholder="NOV" type="text" value={this.state.editSong_noviceEffector} onChange={(e) => this.setDifficultyEffector(e, 'NOVICE')}/>
                                        
                                        <ReactTooltip id="copy" effect="solid">
                                            <span>Copies the NOVICE effector across every other difficulty.</span>
                                        </ReactTooltip>
                                        </div>

                                        <div className="column">
                                            <label id="songnovice"><strong>Effector</strong></label>
                                            <input placeholder="ADV" type="text" value={this.state.editSong_advancedEffector} onChange={(e) => this.setDifficultyEffector(e, 'ADVANCED')}/>
                                        </div>

                                        <div className="column">
                                            <label id="songnovice"><strong>Effector</strong></label>
                                            <input placeholder="EXH" type="text" value={this.state.editSong_exhaustEffector} onChange={(e) => this.setDifficultyEffector(e, 'EXHAUST')}/>
                                        </div>

                                        <div className="column">
                                            <label id="songnovice"><strong>Effector</strong></label>
                                            <input placeholder="MXM" type="text" value={this.state.editSong_maximumEffector} onChange={(e) => this.setDifficultyEffector(e, 'MAXIMUM')}/>
                                        </div>


                                    </div>
                                </div>

                                <div className="row addSongRow">
                                    <button onClick={(e) => this.submitSongInformation(e)} className="btn bg-quintery">Edit Song</button>
                                </div>
                                
                                
                            </form>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SongViewTop;