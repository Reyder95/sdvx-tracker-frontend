import React from 'react'

import '../../css/songview.css'

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
    
    render() {
        return (
            <tr>
                <td>{this.props.nbr}</td>
                <td className="jacket2">
                    <img src={this.props.songData.jacket_link} />
                </td>
                <td>{this.props.songData.artist} - {this.props.songData.title}</td>
                <td>{this.state.nov}</td>
                <td>{this.state.adv}</td>
                <td>{this.state.exh}</td>
                <td>{this.state.mxm}</td>
                <td>Official</td>
                <td>-----</td>
            </tr>
        )
    }
}

export default SongEntry;