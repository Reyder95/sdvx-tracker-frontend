import React from 'react'

class SongViewTop extends React.Component {
    render() {
        return(
            <div className="comp_songviewtop bg-tertiary">
                <div className="song-block">
                    <div className="song-image">
                        <h2 className="font-roboto-slab color-secondary mb-2 mt-2">かめりあ feat. ななひら - 超☆超☆光☆速☆出☆前☆最☆速!!! スピード★スター★かなで</h2>
                        <img src="https://placehold.it/128x128"/>
                    </div>

                    <div className="song-info font-roboto color-quartery mt-4">
                        <p>
                            <strong>BPM:</strong> xxx
                        </p>
                        <p>
                            <strong>Effector:</strong> xxx
                        </p>
                        <p>
                            <strong>Game:</strong> xxx
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongViewTop;