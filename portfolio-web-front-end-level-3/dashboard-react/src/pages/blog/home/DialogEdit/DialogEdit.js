import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import FormOverview from './FormOverview'
import FormDescription from './FormDescription'

export default class DialogEdit extends React.Component
{
    idTimeout = null
    formOverview = null
    formDescription = null

    constructor(props)
    {
        super(props)
        this.state = {
            title: 'Article Demo',
            article: null,
            isSelected: false,
            isReady: false,
            currentTabNumber: 1,
        }

        this.formOverview = React.createRef()
        this.formDescription = React.createRef()
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
                    title: this.props.article.title,
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

    handleTitleOnChange(title) 
    {
        this.setState({
            ...this.state,
            title: title, 
        })
    }

    handleTabNavItemOnSelect(event, number)
    {
        this.setState({
            ...this.state,
            currentTabNumber: number,
        })
    }

    handleButtonSubmitOnClick()
    {
        const data = this.formOverview.current.getData()
        const editor = this.formDescription.current.getEditor()

        const articleData = {
            ...data,
            description: {
                ...editor.getContents()
            }
        }

        this.formOverview.current.clear()  
        this.formDescription.current.clear()        

        //console.log(editor, lastData)
        this.handleOnSubmitDone(articleData)
    }

    handleOnSubmitDone(data)
    {
        this.setState({
            ...this.state,
        })

        console.log(data)

        // update view
        this.props.onUpdate({
            ...data,
        })
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

    getTabNavItemIsSelected(number)
    {
        return this.state.currentTabNumber === number ? ' selected' : ''
    }

    render()
    {
        return (

            <div className={ "dialog-edit" + this.getClassSelected() + this.getClassIsReady() }
                onTransitionEnd={ () => this.handleOnTransitionEnd() }
                style={ this.state.style }>

                <div className="content-close">
                    <div className="button-icon" onClick={ () => this.handleCloseButtonOnClick() }>
                        <FontAwesomeIcon icon={ solid('xmark') } />
                    </div>
                </div>

                <div className="content-zero">
                    <div className="button-icon btn-rect"
                        onClick={ () => this.handleButtonSubmitOnClick() }>
                        <FontAwesomeIcon icon={ solid('pencil') } />
                    </div>
                    <h2>
                        <span className="title">Project - Edit</span>
                        <span className="title-article">{ this.state.title }</span>
                    </h2>
                </div>

                <div className="content-main">

                    <div className="tabs-nav">
                        <div className={ "tn-item " + this.getTabNavItemIsSelected(1) }
                            onClick={ (event) => this.handleTabNavItemOnSelect(event, 1) }>Overview</div>
                        <div className={ "tn-item" + this.getTabNavItemIsSelected(2) }
                            onClick={ (event) => this.handleTabNavItemOnSelect(event, 2) }>Description</div>
                    </div>

                    <div className="tabs-contents">
                        <div className={ "tc-content " + this.getTabNavItemIsSelected(1) }>
                            <FormOverview ref={ this.formOverview }
                                article={ this.props.article }
                                titleOnChange={ (title) => this.handleTitleOnChange(title) } /> 
                        </div>
                        <div className={ "tc-content " + this.getTabNavItemIsSelected(2) }>
                            <FormDescription ref={ this.formDescription }
                                article={ this.props.article } />
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }
}