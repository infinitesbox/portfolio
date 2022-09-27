import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Form from './Form'

export default class DialogCreate extends React.Component
{
    idTimeout = null

    constructor(props)
    {
        super(props)
        this.state = {
            name: 'Project Demo',
            isSelected: false,
            isReady: false,
        }
    }

    // --- LIFE CYCLE

    componentDidMount() 
    {
        this.handleOnSelect()
    }

    componentDidUpdate() 
    {
        this.handleOnSelect()
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
            })
            //this.clear()
            //this._PAGE_.setScrollDisabled(false) 
            this.props.onClose()
        }    
    }

    handleOnSelect()
    {
        if(this.props.isSelected && this.props.isSelected !== this.state.isSelected)
        {
            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {

                this.setState({
                    ...this.state,
                    isSelected: true,
                    isReady: true,
                    style: {
                        overflow: 'auto',
                    }
                })
                
            }, 100)
        }
        else if(!this.props.isSelected && this.props.isSelected !== this.state.isSelected)
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

    handleCloseButtonOnClick()
    {
        this.setState({
            ...this.state,
            isReady: false, 
        })
    }

    handleNameOnChange(name) 
    {
        this.setState({
            ...this.state,
            name: name, 
        })
    }

    handleOnSubmitDone(data)
    {
        this.setState({
            ...this.state,
            name: 'Project Demo'
        })

        // update view
        this.props.onStore(data)
    }

    // --- RENDER

    getClassSelected()
    {
        return this.props.isSelected ? ' selected' : ''
    }

    getClassIsReady()
    {
        return this.state.isReady ? ' is-ready' : ''
    }

    render()
    {
        return (

            <div className={ "dialog-create" + this.getClassSelected() + this.getClassIsReady() }
                onTransitionEnd={ () => this.handleOnTransitionEnd() }
                style={ this.state.style }>

                <div className="content-close">
                    <div className="button-icon" 
                        onClick={ () => this.handleCloseButtonOnClick() }>
                        <FontAwesomeIcon icon={ solid('xmark') } />
                    </div>
                </div>

                <div className="content-zero">
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('pencil') } />
                    </div>
                    <h2>
                        <span className="title">Project - Create</span>
                        <span className="name">{ this.state.name }</span>
                    </h2>
                </div>

                <div className="content-main">

                    <Form 
                        nameOnChange={ (name) => this.handleNameOnChange(name) } 
                        onSubmitDone={ (data) => this.handleOnSubmitDone(data) } />

                </div>
                
            </div>
        )
    }
}