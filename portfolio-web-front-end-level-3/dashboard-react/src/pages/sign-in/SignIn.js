import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import Particles from 'react-tsparticles'
import { loadFirePreset } from 'tsparticles-preset-fire'
import ButtonMenuResponsive from 'components/button-menu-responsive/js/ButtonMenuResponsive'

import './sass/main.sass'
import './sass/custom.sass'

export default class SignIn extends React.Component
{
    idTimeout = null
    particlesOptions = {
        preset: 'fire',
        fullScreen: false,
    }

    constructor(props)
    {
        super(props)
        this.state = {
            isSelected: false,
            isReady: false,
            isScrollDisabled: false
        }
    }

    async particlesInit(engine)
    {
        await loadFirePreset(engine)
    }

    // --- LIFE CYCLE

    componentDidMount() 
    {
        
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if (this.state.isSelected && this.state.isSelected !== prevState.isSelected)
        {
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
    }

    componentWillUnmount() 
    {
        clearTimeout(this.idTimeout)
    }

    // --- HANDLE EVENTS 

    handleOnTransitionEnd()
    {
        if(!this.state.isReady)
        {
            this.setState({
                ...this.state,
                isSelected: false, 
                isScrollDisabled: false,
            })
        }    
    }

    handleOnSelect(isSelected)
    {
        if(isSelected)
        {
            this.setState({
                ...this.state,
                isSelected: true,
                isScrollDisabled: true,
            })
        }
        else
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

    handleFormButtonOnSubmit()
    {
        this.props.onSigned(true)
    }

    // --- RENDER

    getClassScrollDisabled()
    {
        return this.state.isScrollDisabled ? 'scroll-disabled' : ''
    }

    getClassSelected()
    {
        return this.state.isSelected ? ' selected' : ''
    }

    getClassIsReady()
    {
        return this.state.isReady ? ' is-ready' : ''
    }

    renderBlockRightForm()
    {
        return (
            <form onSubmit={ (event) => event.preventDefault() }>

                <div className="form-row">
                    <div className="input-icon">
                        <input type="text" name="username" 
                            placeholder="Jane Doe"
                            autoComplete="username" />
                        <div className="icon">
                            <FontAwesomeIcon icon={ icon({name: 'circle-user', style: 'solid'}) } />
                        </div>
                    </div>
                    <div className="form-error">
                        Username is required!
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-icon">
                        <input type="password" name="password" 
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            autoComplete="current-password" />
                        <div className="icon">
                            <FontAwesomeIcon icon={ icon({name: 'key', style: 'solid'}) } />
                        </div>
                    </div>
                    <div className="form-error">
                        Password is required!
                    </div>
                </div>

                <div className="form-row">
                    <button className="button-text" onClick={ () => this.handleFormButtonOnSubmit() }>Sign In</button>
                </div>

            </form>
        )
    }


    render()
    {
        return (
            <div id="sign-in" className={ this.getClassScrollDisabled() }>

                <div className={ "block-left" + this.getClassSelected() + this.getClassIsReady() }
                    onTransitionEnd={ () => this.handleOnTransitionEnd() }>
        
                    <Particles 
                        options={ this.particlesOptions } init={ this.particlesInit } />

                    <div className="scroller">

                        <div className="container">

                            <div className="welcome">
                                <div className="text">
                                    <h1>Wellcome Back!</h1>
                                    <p>Ready To Start An Excellent Day!</p>
                                </div>
                            </div>

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

                    </div>
                    
                </div>

                <div className="block-right">
                    <div className="container">
                        <ButtonMenuResponsive 
                            onSelect={ (isSelected) => this.handleOnSelect(isSelected) } />
                        { this.renderBlockRightForm() }
                    </div>
                </div>

            </div>
        )
    }
}