import React from 'react'
import SongListLevelDropdown from './songlist_levelDropdown'
import ReactTooltip from 'react-tooltip'
import { addSong } from '../../../api-calls'

// Modal for adding songs
class AddSongModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            artist: '',
            game: '',
            type: '',
            custom_link: '',
            bpm: '',
            bpmHigh: '',
            novEffector: null,
            advEffector: null,
            exhEffector: null,
            mxmEffector: null,
            novice: 0,
            advanced: 0,
            exhaust: 0,
            maximum: 0,
            jacket: 'http://placehold.it/128',
            errors: []
        }

        this.setSongDifficulties = this.setSongDifficulties.bind(this)
    }

    componentDidMount() {
        document.getElementById('errors').style.display = 'none'
    }

    // ---Add Song---

    // this.state.songimageurl
    setSongImageUrl(event) {
        // Sets it to a default value if nothing is entered
        if (event.target.value.trim() == '')
            this.setState({
                jacket: 'http://placehold.it/128'
            })
        else
            this.setState({
                jacket: event.target.value
            })
    }

    // this.state.addSong_artist
    setSongArtist(event) {
        this.setState({
            artist: event.target.value
        })
    }

    // this.state.addSong_title
    setSongTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    // this.state.addSong_effector
    copyEffector(event) {
        this.setState({
            advEffector: this.state.novEffector,
            exhEffector: this.state.novEffector,
            mxmEffector: this.state.novEffector
        })
    }

    setDifficultyEffector(event, difficulty) {
        if (difficulty == 'NOVICE') 
            this.setState({
                novEffector: event.target.value.trim() == '' ? null : event.target.value
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                advEffector: event.target.value.trim() == '' ? null : event.target.value
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                exhEffector: event.target.value.trim() == '' ? null : event.target.value
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                mxmEffector: event.target.value.trim() == '' ? null : event.target.value
            })
    }

    // this.state.addSong_game
    setSongGame(event) {
        this.setState({
            game: event.target.value
        })
    }

    // this.state.addSong_type
    setSongType(event) {
        this.setState({
            type: event.target.value
        })

        if (event.target.value != 'custom')
            this.setState({
                custom_link: ''
            })
    }

    // this.state.addSong_custom_link
    setSongCustomLink(event) {
        this.setState({
            custom_link: event.target.value
        })
    }

    // this.state.addSong_bpm
    setSongBpm(event) {
        this.setState({
            bpm: event.target.value
        })
    }

    setSongBpmHigh(event) {
        this.setState({
            bpmHigh: event.target.value
        })
    }

    // Sets song difficulties based on which difficulty is selected. Takes in the difficulty name and the level for that difficulty
    setSongDifficulties(event, difficulty) {
        if (difficulty == 'NOVICE') 
            this.setState({
                novice: event.target.value
            })
        else if (difficulty == 'ADVANCED')
            this.setState({
                advanced: event.target.value
            })
        else if (difficulty == 'EXHAUST')
            this.setState({
                exhaust: event.target.value
            })
        else if (difficulty == 'MAXIMUM')
            this.setState({
                maximum: event.target.value
            })
    }

    // Once the user is satisfied they can submit the information
    submitSongInformation(event) {
        event.preventDefault(); // Do not refresh the page

        if (this.state.novEffector == '')
            this.setState({
                novEffector: null
            })
        else if (this.state.advEffector == '')
            this.setState({
                advEffector: null
            })
        else if (this.state.exhEffector == '')
            this.setState({
                exhEffector: null
            })
        else if (this.state.mxmEffector == '')
            this.setState({
                mxmEffector: null
            })

        // Object that will be sent as a post request. Sets the default required values
        const postObject = {
            title: this.state.title.trim(),
            artist: this.state.artist.trim(),
            type: this.state.type.trim()
        }

        // If any of the important values are not entered, do not proceed
        if ((postObject.title != '' && postObject.artist != '' && postObject.type != '') &&
        (this.state.novice != 0 || this.state.advanced != 0 || this.state.exhaust != 0 || 
        this.state.maximum != 0)) {

            // Check if bpm is able to be parsed as an int, then parse it
            if (this.state.bpm.trim() == '' || parseInt(this.state.bpm, 10).toString() === this.state.bpm.trim())
            {
                if (parseInt(this.state.bpm, 10).toString() === this.state.bpm.trim())
                    postObject.bpm = parseInt(this.state.bpm)

                if (parseInt(this.state.bpmHigh, 10).toString() === this.state.bpmHigh.trim())
                    postObject.bpmhigh = parseInt(this.state.bpmHigh)

                // Create an empty difficulty array and push to the array if specific difficulties exist.
                let difficulties = []
            
                if (this.state.novice != 0)
                    difficulties.push({name: "NOVICE", level: this.state.novice, effector: this.state.novEffector})
    
                if (this.state.advanced != 0)
                    difficulties.push({name: "ADVANCED", level: this.state.advanced, effector: this.state.advEffector})
                
                if (this.state.exhaust != 0)
                    difficulties.push({name: "EXHAUST", level: this.state.exhaust, effector: this.state.exhEffector})
    
                if (this.state.maximum != 0)
                    difficulties.push({name: "MAXIMUM", level: this.state.maximum, effector: this.state.mxmEffector})

                // Set difficulties in the postOject
                postObject.difficulties = difficulties

                // Set the rest of the optional information
                if (this.state.game.trim() != '')
                    postObject.game = this.state.game.trim()

                if (this.state.custom_link.trim() != '')
                    postObject.custom_link = this.state.custom_link.trim()

                if (this.state.jacket.trim() != '')
                    postObject.jacket = this.state.jacket.trim();
                
                console.log(postObject)
                
                
                // Add the song using the built up postObject
                addSong(postObject)
                .then(result => {
                    console.log(result)
                    this.props.history.push(`/song?id=${result.data.id}`)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            

        }
        else {
            let errorArray = []

            if (postObject.title.trim() == '')
                errorArray.push('You must enter a title!')

            if (postObject.artist.trim() == '')
                errorArray.push('You must enter an artist!')

            if (postObject.type == '')
                errorArray.push('You must select a type!')

            if (this.state.novice == 0 && this.state.advanced == 0 && this.state.exhaust == 0 && this.state.maximum == 0)
                errorArray.push('You must select at least one difficulty to submit!')

            if (errorArray.length > 0) {
                this.setState({
                    errors: errorArray
                })

                document.getElementById('errors').style.display = 'block'
            }
            else {
                document.getElementById('errors').style.display = 'none'
            }
        }
    }

    render() {
        return(
            <div id="addSongModal" className="modal">
            <div className="modal-content bg-secondary">
                <span onClick={() => this.props.closeModal()} className="close">&times;</span>
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
                    <form>
                        <div id="errors" className="mb-4 font-roboto-slab">
                            {this.state.errors.map(error => (
                                <span>{error} <br/></span>
                            ))}
                        </div>
                        <div className="row">
                            <div className="column songimagepreview">
                                <img className="song-preview" src={this.state.jacket}/> <br/>
                                <input className="mb-4" placeholder="Song Image URL" onChange={(e) => this.setSongImageUrl(e)} type="text"/>
                            </div>
                        </div>

                        <div className="main-form">
                            <div className="row">

                                <div className="column">
                                    <input onChange={(e) => this.setSongTitle(e)} placeholder="Title (required)" className="mb-4" type="text"/>
                                </div>

                                <div className="column">
                                    <input onChange={(e) => this.setSongArtist(e)} placeholder="Artist (required)" className="mb-4" type="text"/>
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
            
                                {/*<div className="column">
                                    <input onChange={(e) => this.setSongEffector(e)} placeholder="Effector (for all difficulties)" className="mb-4" type="text"/>
                                </div>*/}
    
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
                                            <span>The highest BPM goes here. Do not input anything here if the BPM does not change.</span>
                                        </ReactTooltip>
                                    </div>
                                </div>

                            </div>

                            <div className="row">

                                    <div className="column">
                                        <select onChange={(e) => this.setSongType(e)} className="mb-4" className="form-input">
                                            <option hidden default value="">Type (Required)</option>
                                            <option value="official">Official</option>
                                            <option value="custom">Custom</option>
                                        </select>
                                    </div>

                                    <div className="column">
                                            <input disabled={this.state.type == 'custom' ? false : true} value={this.state.custom_link} onChange={(e) => this.setSongCustomLink(e)} placeholder="Custom Link" className="mb-4" type="text"/>
                                    </div>



                                </div>

                                <div className="row">
                                    

                                    <div className="column">
                                            
                                    </div>
                                </div>

                            </div>

                        <div className="difficultyLevels color-secondary">
                            <p className="mb-4">
                                <strong>
                                    Specify a level for each difficulty you want to upload (must at least specify one!)
                                </strong>

                            </p>

                            <hr />

                            <div className="songDropdowns color-secondary row">

                                <SongListLevelDropdown
                                difficulty="NOVICE"
                                setSongDifficulties={this.setSongDifficulties}
                                />

                                <SongListLevelDropdown
                                difficulty="ADVANCED"
                                setSongDifficulties={this.setSongDifficulties}
                                />

                                <SongListLevelDropdown
                                difficulty="EXHAUST"
                                setSongDifficulties={this.setSongDifficulties}
                                />

                                <SongListLevelDropdown
                                difficulty="MAXIMUM"
                                setSongDifficulties={this.setSongDifficulties}
                                />

                            </div>

                            <div className="effectors color-secondary row">
                                <div className="column">
                                    <label id="songnovice"><strong>Effector</strong> <a data-tip data-for='copy' onClick={() => this.copyEffector()}>(Copy)</a></label>

                                    <ReactTooltip id="copy" effect="solid">
                                        <span>Copies the NOVICE effector across every other difficulty.</span>
                                    </ReactTooltip>
                                    <input placeholder="NOV" type="text" value={this.state.novEffector} onChange={(e) => this.setDifficultyEffector(e, 'NOVICE')}/>
                                </div>

                                <div className="column">
                                    <label id="songnovice"><strong>Effector</strong></label>
                                    <input placeholder="ADV" type="text" value={this.state.advEffector} onChange={(e) => this.setDifficultyEffector(e, 'ADVANCED')}/>
                                </div>

                                <div className="column">
                                    <label id="songnovice"><strong>Effector</strong></label>
                                    <input placeholder="EXH" type="text" value={this.state.exhEffector} onChange={(e) => this.setDifficultyEffector(e, 'EXHAUST')}/>
                                </div>

                                <div className="column">
                                    <label id="songnovice"><strong>Effector</strong></label>
                                    <input placeholder="MXM" type="text" value={this.state.mxmEffector} onChange={(e) => this.setDifficultyEffector(e, 'MAXIMUM')}/>
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
        )
    }
}

export default AddSongModal