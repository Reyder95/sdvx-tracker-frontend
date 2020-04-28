import React from 'react'

class HomeDescription extends React.Component {
    render() {
        return(
            <div className="comp_homedescription">
                <div className="row">
                    <div className="column p-2">
                        <div className="icon-image">
                            <img src="https://place-hold.it/128x128/black"/>
                        </div>
                        <h3 className="font-roboto-slab mt-2">Score Tracking</h3>
                        <p className="font-roboto mt-2">
                            Keep track of all your scores on each chart. Personal leaderboards so you can see where you place amongst the rest of your scores.
                            All songs that have a score get placed in your personal user library which you can view right in your profile. You can also check out other user
                            profiles to see their scores and compare.
                        </p>
                    </div>

                    <div className="column p-2">
                        <div className="icon-image">
                            <img src="https://place-hold.it/128x128/black"/>
                        </div>
                        <h3 className="font-roboto-slab mt-2">Player Curated Database</h3>
                        <p className="font-roboto mt-2">
                            The songs on our database will be player-driven. This means that all users will be able to enter in song information for songs that are not there.
                            We hope with this we can build a big database for as many sound voltex songs as possible! This also means customs are fully supported as well!
                        </p>
                    </div>

                    <div className="column p-4">
                        <div className="icon-image">
                            <img src="https://place-hold.it/128x128/black"/>
                        </div>
                        <h3 className="font-roboto-slab mt-2">Personal Player Statistics</h3>
                        <p className="font-roboto mt-2">
                            Keep track of Volforce, Grades, and more through statistics and graphs on your profile page. Keep playing and watch your improvement closely, as well as
                            pinpoint exactly what you need to work on.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeDescription;