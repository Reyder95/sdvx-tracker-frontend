import React from 'react'

import '../../css/songview.css'

// For each song that gets rendered into the song list, this is what it goes through
class SongEntry extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            nov: '---',
            adv: '---',
            exh: '---',
            mxm: '---'
        }
    }

    testFunction() {
        let test = 'mytest';

        console.log(test.charAt(0).toUpperCase() + test.slice(1))
    }

    // On component did mount, set the state for each level that exists within the current song
    componentDidMount() {

        this.props.songData.dfficulties.map((diff) => {
            if (diff.difficulty == "NOVICE") 
            {
                this.setState({
                    nov: diff.level
                })
            }
            else if (diff.difficulty == "ADVANCED")
            {
                this.setState({
                    adv: diff.level
                })
            }
            else if (diff.difficulty == "EXHAUST")
            {
                this.setState({
                    exh: diff.level
                })
            }
            else if (diff.difficulty == "MAXIMUM") 
            {
                this.setState({
                    mxm: diff.level
                })
            }
        })

        this.setState({
            id: this.props.songData.id
        })
    }

    // Set this on the song entry. This meeans whenever a user clicks on the song it will redirect them
    redirectionLink(songID) {
        this.props.history.push('/song?id=' + songID)
    }
    
    // Render elements to the screen
    render() {
        return (
            <tr className="song_entry_tr" onClick={() => this.redirectionLink(this.props.songData.id)}>

                {console.log(this.props)}
                
                <td>
                    {this.props.nbr}    
                </td>
                

                <td className="jacket2">
                    <img src={(this.props.songData.jacket == null) ? 'http://placehold.it/128' : this.props.songData.jacket} />
                </td>

                <td>{this.props.songData.artist} - {this.props.songData.title}</td>
                <td id="submission">{this.props.songData.username}</td>
                <td>{this.state.nov}</td>
                <td>{this.state.adv}</td>
                <td>{this.state.exh}</td>
                <td>{this.state.mxm}</td>
                <td>{this.props.songData.type.charAt(0).toUpperCase() + this.props.songData.type.slice(1)}</td>
                <td><a href={this.props.songData.type == 'custom' ? this.props.songData.custom_link : '#'}>{this.props.songData.type == 'custom' && this.props.songData.custom_link != null ? this.props.songData.custom_link : '-----'}</a></td>
                
                {
                   this.testFunction()
                }
            </tr>
        )
    }
}

export default SongEntry;