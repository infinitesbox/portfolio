import React from 'react'
import {
    Link,
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class ContentLeft extends React.Component
{
    idTimeout = null

    constructor(props)
    {
        super(props)
        this.state = {
            isSelected: false,
            isReady: false,
            isScrollDisabled: false,
        }
    }

    setScrollDisabled(isDisabled)
    {
        this.setState({
            ...this.state,
            isScrollDisabled: isDisabled,
        })
    }

    // --- LIFE CYCLE

    componentDidMount() 
    {
        
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (this.props.isSelected && this.props.isSelected !== prevState.isSelected)
        {
            this.props.onPageScrollDisabled(true)

            this.setState({
                ...this.state,
                isSelected: true,
            })

            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {

                this.setState({
                    ...this.state,
                    isReady: true,
                    style: {
                        overflow: 'auto',
                    }
                })
                
            }, 100)
        }
        else if(!this.props.isSelected && prevState.isReady)
        {
            this.setState({
                ...this.state,
                isReady: false,
                style: {
                    overflow: 'hidden',
                }
            })  
        }
    }

    componentWillUnmount() 
    {
        clearTimeout(this.idTimeout)
    }

    // --- HANDLE EVENTS 

    handleOnSignOut() 
    {
        this.props.onSignOut()
    }

    handleOnTransitionEnd()
    {
        if(!this.state.isReady)
        {
            if(this.state.isSelected)
                this.props.onPageScrollDisabled(false)

            this.setState({
                ...this.state,
                isSelected: false, 
            })
        }    
    }

    handleCloseButtonOnClick()
    {
        this.setState({
            ...this.state,
            isReady: false, 
        })

        this.props.onClose()
    }

    // --- RENDER

    getClassScrollDisabled()
    {
        return this.state.isScrollDisabled ? ' scroll-disabled' : ''
    }

    getClassIsModeXS()
    {
        return (this.props.isModeXS ? ' mode-xs' : ' ')
    }

    getClassSelected()
    {
        return this.state.isSelected ? ' selected' : ''
    }

    getClassIsReady()
    {
        return this.state.isReady ? ' is-ready' : ''
    }

    render()
    {
        return (
            <nav id="page-block-left" 
                className={ this.getClassIsModeXS() + this.getClassSelected() + this.getClassIsReady() + this.getClassScrollDisabled() }
                onTransitionEnd={ () => this.handleOnTransitionEnd() }>
                
                <div className="content-top">
                    <div className="button-icon btn-rect btn-close"
                        onClick={ () => this.handleCloseButtonOnClick() }>
                        <FontAwesomeIcon icon={ solid('xmark') } />
                    </div>
                    <div className="button-icon btn-rect"
                        onClick={ () => this.handleOnSignOut() }>
                        <FontAwesomeIcon icon={ solid('right-from-bracket') } />
                    </div>
                </div>

                <Link to="/" className="content-app">
                    <div className="logo">
                        <div className="frame">
                            <img src="./images/portfolio-dashboard-web-logo-100x100.png" alt="Dashboard" />
                        </div>
                    </div>
                    <div className="name">DASHBOARD</div>
                </Link>

                <div className="content-main">
                    
                    <Link to="/projects" className="item">
                        <div className="icon">
                            <FontAwesomeIcon icon={ solid('dice-d6') } />
                        </div>
                        <div className="label">Projects</div>
                    </Link>
                    <Link to="/blog" className="item">
                        <div className="icon">
                            <FontAwesomeIcon icon={ solid('newspaper') } />
                        </div>
                        <div className="label">Blog</div>
                    </Link>

                </div>

                <div className="content-bottom">

                    <div className="links">
                        <a href="https://github.com" className="button-icon link">
                            <FontAwesomeIcon icon={ brands('github') } />
                        </a>
                        <a href="https://twitter.com" className="button-icon link">
                            <FontAwesomeIcon icon={ brands('twitter') } />
                        </a>
                        <a href="https://linkedin.com" className="button-icon link">
                            <FontAwesomeIcon icon={ brands('linkedin-in') } />
                        </a>
                    </div>

                </div>

            </nav>
        )
    }
}