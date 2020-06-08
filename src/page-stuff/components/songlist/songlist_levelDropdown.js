import React from 'react'

// This is the 20 level song list dropdown to select a level in the add song modal
class SongListLevelDropdown extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="column">
                <label id="songnovice"><strong>{this.props.difficulty}</strong></label>
                <select onChange={(e) => this.props.setSongDifficulties(e, this.props.difficulty)} className="diffDropdown" className="mb-4" className="form-input">
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
        )
    }
}

export default SongListLevelDropdown