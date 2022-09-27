import React from 'react'
import SignIn from './pages/sign-in/SignIn'
import Page from './pages/page/Page'

import './sass/main.sass'
import './sass/custom.sass'

export default class App extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            isSigned: false,
        }
    }

    handleOnDefaultScrollDisabled(isDisabled)
    {
        if(isDisabled)
            document.body.className = 'scroll-disabled'
        else
            document.body.className = ''
    }

    handleOnSigned(isSigned)
    {
        this.setState({
            isSigned: isSigned
        })
    }

    renderSignIn()
    {
        return (<SignIn 
                onSigned={ (isSigned) => this.handleOnSigned(isSigned) }
                onDefaultScrollDisabled={ (isDisabled) => this.handleOnDefaultScrollDisabled(isDisabled) } />)
    }

    renderPage()
    {
        return (<Page 
            onSignOut={ () => this.handleOnSigned(false) }
            onDefaultScrollDisabled={ (isDisabled) => this.handleOnDefaultScrollDisabled(isDisabled) } />)
    }

    render()
    {
        return (
            <>
                { this.state.isSigned ? this.renderPage() : this.renderSignIn() }
            </>
        )
    }
}