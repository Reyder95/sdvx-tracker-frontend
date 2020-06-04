import React from 'react'

// Import CSS File
import '../../css/footer.css'

// In the entire site. The base of the website
class Footer extends React.Component {
    render() {
        return (
            <div className="comp_footer bg-primary font-source color-quartery">
                <div className="footer-div">
                    <div className="row">
                        <div className="column">
                            <p>
                                Have an idea or issue? Post it on Github
                            </p>
                        </div>
                        
                        <div className="column">
                            <p>
                                Want a community of other awesome people? Check out the Discord
                            </p>
                        </div>

                        <div className="column">
                            <p>
                                Wish to help development? Talk to Scarlet Red or start developing using the open source code on Github!
                                [will be handling this in the future]
                            </p>
                        </div>
                    </div>

                    <h3 className="developed-by">
                        Developed by Scarlet Red
                    </h3>
                </div>
            </div>
        )
    }
}

export default Footer;