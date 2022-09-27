import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid} from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Form from './Form'

export default class DialogDestroy extends React.Component
{
    idTimeout = null

    constructor(props)
    {
        super(props)
        this.state = {
            name: 'Project Demo',
            project: null,
            isSelected: false,
            isReady: false,
        }

        if(this.props.project)
        {   
            this.state.project = this.props.project
            this.state.name = this.props.project.name
        }
    }

    // --- LIFE CYCLE

    componentDidMount() 
    {
        this.handleOnSelect()
    }

    componentDidUpdate() 
    {
        if(this.props.project !== this.state.project)
        {
            this.setState({
                ...this.state,
                project: this.props.project,
            })
        }
        
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
                    name: this.props.project.name,
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

        // need to close after
        this.handleCloseButtonOnClick()

        // update view
        this.props.onDelete(data)
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

            <div className={ "dialog-destroy" + this.getClassSelected() + this.getClassIsReady() }
                onTransitionEnd={ () => this.handleOnTransitionEnd() }
                style={ this.state.style }>

                <div className="content-close">
                    <div className="button-icon" onClick={ () => this.handleCloseButtonOnClick() }>
                        <FontAwesomeIcon icon={ solid('xmark') } />
                    </div>
                </div>

                <div className="content-zero">
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('dice-d6') } />
                    </div>
                    <h2>
                        <span className="title">Project - Destroy</span>
                        <span className="name">{ this.state.name }</span>
                    </h2>
                </div>

                <div className="content-main">

                    <Form 
                        nameOnChange={ (name) => this.handleNameOnChange(name) } 
                        onSubmitDone={ (data) => this.handleOnSubmitDone(data) } 
                        project={ this.state.project } />

                </div>
                
            </div>
        )
    }
}