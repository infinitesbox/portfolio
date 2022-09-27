import React from 'react'

import BlockTop from './BlockTop/BlockTop'
import BlockLeft from './BlockLeft/BlockLeft'
import BlockMain from './BlockMain/BlockMain'

import './sass/main.sass'
import './sass/custom.sass'

export default class Page extends React.Component
{
    blockTop = null
    blockLeft = null
    blockMain = null

    constructor(props)
    {
        super(props)
        this.state = {
            isModeXS: false,
            blockLeftIsSelected: false,
            isScrollDisabled: false
        }

        this.blockTop = React.createRef()
        this.blockLeft = React.createRef()
        this.blockMain = React.createRef()

    }

    handleOnModeXS()
    {
        this.setState({
            isModeXS: !this.state.isModeXS,
        })
    }

    handleBlockLeftIsSelectedOnSelect(isSelected)
    {
        this.setState({
            ...this.state,
            blockLeftIsSelected: isSelected,
        })
    }

    handleBlockLeftOnPageScrollDisabled(isDisabled)
    {
        this.blockMain.current.setScrollDisabled(isDisabled)
        this.setState({
            ...this.state,
            isScrollDisabled: isDisabled,
        })
    }

    handleBlockMainOnPageScrollDisabled(isDisabled)
    {
        this.blockLeft.current.setScrollDisabled(isDisabled)
        this.setState({
            ...this.state,
            isScrollDisabled: isDisabled,
        })
    }

    // --- RENDER

    getClassScrollDisabled()
    {
        return this.state.isScrollDisabled ? 'scroll-disabled' : ''
    }

    render()
    {
        return (
            <div id="page" className={ this.getClassScrollDisabled() }>

                <BlockTop ref={ this.blockTop }
                    isModeXS={ this.state.isModeXS }
                    onModeXS={ () => this.handleOnModeXS() } />

                <BlockLeft ref={ this.blockLeft }
                    isModeXS={ this.state.isModeXS }
                    onSignOut={ this.props.onSignOut }
                    isSelected={ this.state.blockLeftIsSelected }
                    onClose={ () => this.handleBlockLeftIsSelectedOnSelect(false) }
                    onPageScrollDisabled={ (isDisabled) => this.handleBlockLeftOnPageScrollDisabled(isDisabled) } />

                <BlockMain ref={ this.blockMain }
                    blockLeftOnSelect={ (isSelected) => this.handleBlockLeftIsSelectedOnSelect(isSelected) }
                    blockLeftIsClosed={ this.state.blockLeftIsSelected }
                    onPageScrollDisabled={ (isDisabled) => this.handleBlockMainOnPageScrollDisabled(isDisabled) } />

            </div>
        )
    }
}