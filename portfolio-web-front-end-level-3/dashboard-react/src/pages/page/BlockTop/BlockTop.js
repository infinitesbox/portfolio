import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class BlockTop extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    handleOnModeXS()
    {
        this.setState({
            isSelected: !this.state.isSelected
        })

        this.props.onModeXS()
    }

    getClassSelected()
    {
        return this.state.isSelected ? ' selected' : ''
    }

    render()
    {
        return (
            <div id="page-block-top" className={ (this.props.isModeXS ? ' mode-xs' : ' ') }>
                <div className="options">
                    <div className={ "button-icon btn-rect " + this.getClassSelected() }
                        onClick={ () => this.handleOnModeXS() }>
                        <FontAwesomeIcon icon= { solid('crop-simple') } />
                    </div>
                </div>
                <div className="user">
                    <div className="icon">
                        <FontAwesomeIcon icon= { solid('circle-user') } />
                    </div>
                    <div className="info">
                        <div className="name">Jane Doe</div>
                        <div className="email">contact@portfolio.com</div>
                    </div>
                </div>
            </div>
        )
    }
}