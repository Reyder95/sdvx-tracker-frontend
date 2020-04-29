import React from 'react'

class SongViewTop extends React.Component {
    render() {
        return(
            <div className="comp_songviewtop bg-tertiary pb-4">
                <div className="song-block">
                    <div className="song-image">
                        <h2 className="font-roboto-slab color-secondary mb-2 mt-2">かめりあ feat. ななひら - 超☆超☆光☆速☆出☆前☆最☆速!!! スピード★スター★かなで</h2>
                        <img src="https://placehold.it/128x128"/>
                        <div className="song-info font-source color-quartery">
                            <p>
                                <strong>BPM:</strong> 200 <br />
                            </p>
                            <p>
                                <strong>Effector:</strong> Hirayasu Matsudo
                            </p>
                            <p>
                                <strong>Game:</strong> SOUND VOLTEX II: Infinite Infection
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default SongViewTop;