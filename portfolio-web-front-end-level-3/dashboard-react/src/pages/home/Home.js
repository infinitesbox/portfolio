import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import './sass/main.sass'
import './sass/custom.sass'

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div id="page-home">
                <div className="p-zero">
                    {/* intro motivation ... text + pojects indicators s+ article indicators */}
                    <div className="block-1">
                        <div className="decoration">
                            <img src="./images/portfolio-dashboard-web-home-500x286.png" alt="Dashboard" />
                        </div>
                        <div className="content">
                            <h1>Welcome Back!</h1>
                            <p>Ready To Start An Excellent Day!</p>
                        </div>
                    </div>
                    <div className="block-2">
                        <div className="decoration">
                            <img src="./images/portfolio-dashboard-web-projects-500x286.png" alt="Projects" />
                        </div>
                        <div className="content">
                            <h6>Projects!</h6>
                            <p>Ready To Create Some Projects To Share!</p>
                            <div className="indicator">
                                <div className="icon">
                                    <FontAwesomeIcon icon={ solid('dice-d6') } />
                                </div>
                                <div className="label-value">
                                    <div className="label">Total</div>
                                    <div className="value">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block-3">
                        <div className="decoration">
                            <img src="./images/portfolio-dashboard-web-articles-500x286.png" alt="Articlse" />
                        </div>
                        <div className="content">
                            <h6>Articles!</h6>
                            <p>Ready To Create Some Articles To Share!</p>
                            <div className="indicator">
                                <div className="icon">
                                    <FontAwesomeIcon icon={ solid('newspaper') } />
                                </div>
                                <div className="label-value">
                                    <div className="label">Total</div>
                                    <div className="value">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}