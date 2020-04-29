import React from 'react'

class ScoreTable extends React.Component {
    render() {
        return (
            <div className="comp_scoretable">
                
                <div className="addscore">
                    <button className="btn bg-quintery">Add Score</button>
                </div>

                <div className="diff-buttons">
                    <div className="row">

                        <div className="column">
                            <button className="nov-button btn">NOVICE</button>
                        </div>

                        <div className="column">
                            <button className="adv-button btn">ADVANCED</button>
                        </div>

                        <div className="column">
                            <button className="exh-button btn">EXHAUST</button>
                        </div>

                        <div className="column">
                            <button className="mxm-button btn">MAXIMUM  </button>
                        </div>

                    </div>
                </div>

                <table className="font-source">
                    <tr className="font-roboto-slab">
                        <th>#</th>
                        <th>Score</th>
                        <th>Clear Type</th>
                        <th>Grade</th>
                        <th>Date</th>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>9,716,888</td>
                        <td>Clear</td>
                        <td>AAA</td>
                        <td>4/20/2020</td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>9,716,888</td>
                        <td>Clear</td>
                        <td>AAA</td>
                        <td>4/20/2020</td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>9,716,888</td>
                        <td>Clear</td>
                        <td>AAA</td>
                        <td>4/20/2020</td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>9,716,888</td>
                        <td>Clear</td>
                        <td>AAA</td>
                        <td>4/20/2020</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default ScoreTable;