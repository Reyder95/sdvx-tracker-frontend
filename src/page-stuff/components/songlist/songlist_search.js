import React from 'react'
import _ from 'lodash'

class SongListSearch extends React.Component {
    constructor(props) {
        super(props)

        // When a user types in the search bar, there is a 500ms delay between when they stop typing and when the API is called. This is to prevent an overwhelming spam of API calls.
        this.delayedCallback = _.debounce((e) => this.props.handleSearchChange(e), 500)
    }

    // Intermediary debounce function. This gets debounced using delayedCallback which calls handleSongSearch
    onChange(event) {
        event.persist()
        this.delayedCallback(event)
    }

    render() {
        return(
            <form className="form-flex">
                    <div className="row">
                        <div className="form-flex-item column">
                            <input onChange={(e) => this.onChange(e)} id="song" className="form-input" placeholder="Song Search" type="text" />
                        </div>
                        <div className="form-flex-item column">
                            <select onChange={(e) => this.props.handleLevelChange(e)} id="level" className="form-input">
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
                            <select onChange={(e) => this.props.handleTypeChange(e)} id="type" className="form-input">
                                <option value="" disabled selected hidden>Type</option>
                                <option value="official">Official</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        <div className="form-flex-item column">
                            <select onChange={(e) => this.props.handleGameChange(e)} id="type" className="form-input">
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
                            <button onClick={() => this.props.resetFilters()} className="btn bg-quintery reset">Reset Filters</button>
                        </div>
                    </div>

                    
            </form>
        )
    }
}

export default SongListSearch