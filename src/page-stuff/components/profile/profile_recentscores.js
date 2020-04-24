import React from 'react'

class RecentScores extends React.Component {
    chartRef = React.createRef();

    componentDidMount() {
    }
    
    render() {
        return(
            <div className="comp_recentsongs">
                <div className="recent-display">
                    <h2>Recent Scores</h2>
                    <div className="columns">
                        <div className="column">
                            <table className="table">
                                 <tr>
                                     <td>1</td>
                                     <td>USAO - Boss Rush [MXM]</td>
                                     <td>9,756,423</td>
                                 </tr>

                                 <tr>
                                     <td>2</td>
                                     <td>かめりあ - Venomous Firefly [EXH]</td>
                                     <td>9,923,445</td>
                                 </tr>

                                 <tr>
                                     <td>3</td>
                                     <td>Chroma - ~I~ [EXH]</td>
                                     <td>9,854,112</td>
                                 </tr>

                                 <tr>
                                     <td>4</td>
                                     <td>Roughsketch - 666 [MXM]</td>
                                     <td>9,231,556</td>
                                 </tr>

                                 <tr>
                                     <td>5</td>
                                     <td>ginkiha - Eastward [MXM]</td>
                                     <td>9,982,540</td>
                                 </tr>
                             </table>                           
                        </div> 
                        <div className="column">
                        <table className="table">
                            <tr>
                                <td>6</td>
                                <td>USAO - Boss Rush [MXM]</td>
                                <td>9,756,423</td>
                            </tr>

                            <tr>
                                <td>7</td>
                                <td>かめりあ - Venomous Firefly [EXH]</td>
                                <td>9,923,445</td>
                            </tr>

                            <tr>
                                <td>8</td>
                                <td>Chroma - ~I~ [EXH]</td>
                                <td>9,854,112</td>
                            </tr>

                            <tr>
                                <td>9</td>
                                <td>Roughsketch - 666 [MXM]</td>
                                <td>9,231,556</td>
                            </tr>

                            <tr>
                                <td>10</td>
                                <td>ginkiha - Eastward [MXM]</td>
                                <td>9,982,540</td>
                            </tr>
                        </table>
                        </div>
                    </div>
                    <div className="table-container">

                    </div>

                </div>
            </div>
        )
    }
}

export default RecentScores;