import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Article from './Article'
import DialogCreate from './DialogCreate/DialogCreate'
import DialogEdit from './DialogEdit/DialogEdit'
import DialogDestroy from './DialogDestroy/DialogDestroy'

import './sass/main.sass'
import './sass/custom.sass'

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            articles: [],
            article: null, // to edit & delete
            options: {
                isDialogCreateSelected: false,
                isDialogEditSelected: false,
                isDialogDestroySelected: false,
            }, 
        }
    }

    // --- LIFE CYCLE

    componentDidMount()
    {
        //GET DATA FROM API
        // ...
        // const articles = ...
    
        this.setState({ 
            articles: [ 
                /*
                { title: 'Article 1', description_short: 'Lorem ...', keywords: [], description: null, },
                { title: 'Article 2', description_short: 'Lorem ...', keywords: [], description: null, } 
                */
            ]
        })  
    }

    // ---

    // --- HANDLE EVENTS 

    // --- START - CREATE
    handleDialogCreateOnClick()
    {
        this.props.onPageScrollDisabled(!this.state.options.isDialogCreateSelected)

        this.setState({
            ...this.state,
            options: {
                ...this.state.options,
                isDialogCreateSelected: !this.state.options.isDialogCreateSelected,
            },
        })
    }

    handleDialogCreateOnStore(article)
    {
        const articles = this.state.articles.slice()
        articles.push(article)
        this.setState({
            ...this.state,
            article: article,
            articles: articles,
        })
    }
    // --- END - CREATE

    // --- START - EDIT

    handleDialogEditOnClick(article = null)
    {
        this.props.onPageScrollDisabled(!this.state.options.isDialogEditSelected)

        this.setState({
            ...this.state,
            article: article,
            options: {
                ...this.state.options,
                isDialogEditSelected: !this.state.options.isDialogEditSelected,
            },
        })
    }

    handleDialogEditOnUpdate(article)
    {
        let articles = this.state.articles.slice()
        let index = articles.findIndex((_article) => _article.id === article.id)
      
       
        articles[index] = {
            ...article,
        } 

        this.setState({
            ...this.state,
            article: article,
            articles: articles,
        })
    }

    // --- END - EDIT

    // --- END - DESTROY

    handleDialogDestroyOnClick(article = null)
    {
        this.props.onPageScrollDisabled(!this.state.options.isDialogDestroySelected)

        this.setState({
            ...this.state,
            article: article,
            options: {
                ...this.state.options,
                isDialogDestroySelected: !this.state.options.isDialogDestroySelected,
            },
        })
    }

    handleDialogDestroyOnDelete(article)
    {
        let articles = this.state.articles.slice()
        articles = this.state.articles.filter( (_article) => {
            return _article.id !== article.id
        })
        
        this.setState({
            ...this.state,
            articles: articles,
        })
    }

    // --- END - DESTROY

    // --- RENDER

    getButtonCreateClassSelected()
    {
        return this.state.options.isDialogCreateSelected ? ' selected' : ''
    }

    renderMessageEmpty()
    {
        if(this.state.articles.length === 0)
        {
            return (
                <div className="message-empty">
                    <div className="block-1">
                        <div className="text">
                            
                        </div>
                    </div>
                    <div className="block-2">
                        <p>
                            Thare are any <strong>Articles</strong>.
                        </p>
                    </div>
                </div>
            )
        }
        return ( null )
    }

    render()
    {
        return (
            <div id="page-blog-home">

                <div className="block-1">
                    <h1>Articles</h1>
                    <div className="options">
                        <div className={ "button-icon btn-rect" + this.getButtonCreateClassSelected() } 
                            onClick={ () => this.handleDialogCreateOnClick() }>
                            <FontAwesomeIcon icon={ solid('plus') } />
                        </div>
                    </div>
                </div>

                <div className="block-2">
                    { this.renderMessageEmpty() }
                    <div className="articles">
                        { 
                            this.state.articles.map( (article) => {
                                return (
                                    <Article key={ article.id } article={ article }

                                        editOnClick={ (article) => this.handleDialogEditOnClick(article) }
                                        destroyOnClick={ (article) => this.handleDialogDestroyOnClick(article) }
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <DialogCreate 
                    isSelected={ this.state.options.isDialogCreateSelected }
                    onClose={ () => this.handleDialogCreateOnClick() }
                    onStore={ (article) => this.handleDialogCreateOnStore(article) } />

                <DialogEdit
                    isSelected={ this.state.options.isDialogEditSelected }
                    onClose={ () => this.handleDialogEditOnClick() }
                    onUpdate={ (article) => this.handleDialogEditOnUpdate(article) } 
                    article= { this.state.article } />
                
                <DialogDestroy
                    isSelected={ this.state.options.isDialogDestroySelected }
                    onClose={ () => this.handleDialogDestroyOnClick() }
                    onDelete={ (article) => this.handleDialogDestroyOnDelete(article) } 
                    article= { this.state.article } />

            </div>
        )
    }
}