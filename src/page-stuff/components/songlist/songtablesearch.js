import React from 'react'

class SongTableSearch extends React.Component {
    render() {
        return(
            <div className="comp_songtablesearch">
                <form className="form-flex">
                    <div className="row">
                        <div className="form-flex-item column">
                            <input id="song" className="form-input" placeholder="Song Search" type="text" />
                        </div>
                        <div className="form-flex-item column">
                            <select id="level" className="form-input">
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
                            <select id="type" className="form-input">
                                <option value="" disabled selected hidden>Type</option>
                                <option value="official">Official</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                        <div className="button-flex column">
                            <button className="btn bg-quintery">Reset Filters</button>
                        </div>
                    </div>

                    
                </form>
            </div>
        )
    }
}

export default SongTableSearch;