import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class FormOverview extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            article: {
                title: '',
                description_short: '',
                keywords: [],
            },
            keyword_tmp: '',
        }
    }

    clear()
    {
        this.setState({
            article: {
                title: '',
                description_short: '',
                keywords: [],
            },
            keyword_tmp: '',
        })
    }

    getData()
    {
        return {
            ...this.state.article
        }
    }

    // --- LIFE CYCLE

    componentDidUpdate(prevProps, prevState) 
    {
        if(
            this.props.article && this.props.article !== prevProps.article
        )
        {
            console.log('update', this.props.article)
            this.setState({
                ...this.state,
                article: this.props.article,
            })
        }
    }

    // ---

    // --- HANDLE EVENTS

    handleFormTitleOnChange(event)
    {
        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                title: event.target.value,
            },
        })

        this.props.titleOnChange(event.target.value)
    }

    handleFormDescriptionShortOnChange(event)
    {
        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                description_short: event.target.value,
            },
        })
    }

    handleKeywordsKeywordOnChange(event)
    {
        this.setState({
            ...this.state,
            keyword_tmp: event.target.value,
        })  
    }

    handleKeywordsKeywordOnKeyDown(event)
    {
        event.stopPropagation()
        if (event.keyCode === 13)
        {
            event.preventDefault()
            this.handleKeywordsKeywordOnCreate()
            return false
        }
    }

    handleKeywordsKeywordOnCreate()
    {
        const keywords = this.state.article.keywords.slice()
        const date = Date.now()
        keywords.push({
            id: date,
            value: this.state.keyword_tmp,
        })

        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                keywords: keywords,
            },
            keyword_tmp: '',
        })
    }

    handleKeywordsKeywordOnDestroy(keyword)
    {
        let keywords = this.state.article.keywords.slice()
        keywords = keywords.filter(_keyword => _keyword.id !== keyword.id)

        this.setState({
            ...this.state,
            article: {
                ...this.state.article,
                keywords: keywords,
            }
        })
    }

    // --- RENDER

    renderFormTitle()
    {
        return (
            <div className="form-row">
                <label>Title</label>
                <div className="input-icon">
                    <input type="text" 
                        placeholder="Ex.: Bug Corrector"
                        value={ this.state.article.title }
                        onChange={ (event) => this.handleFormTitleOnChange(event) } />
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('dice-d6') } />
                    </div>
                </div>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    renderFormDescriptionShort()
    {
        return (
            <div className="form-row">
                <label>Description Short</label>
                <textarea name="description-short" 
                    placeholder="Correct All Bugs ..."
                    maxLength={ 80 }
                    value={ this.state.article.description_short }
                    onChange={ (event) => this.handleFormDescriptionShortOnChange(event) }></textarea>
                <div className="form-error">Title Required</div>
            </div>
        )
    }

    renderFormKeywordsKeyword(keyword)
    {
        return (
            <div className="keyword" key={ keyword.id }>
                <div className="value">{ keyword.value }</div>
                <div className="button-icon" 
                    onClick={ () => this.handleKeywordsKeywordOnDestroy(keyword) }>
                    <FontAwesomeIcon icon={ solid('xmark') } />
                </div>
            </div>    
        )
    }

    renderFormKeywords()
    {
        return (
            <div className="form-row">
                <label>Keywords</label>
                <div className="group">
                    <div className="input-icon">
                        <input type="text" placeholder="Ex. Mobile"
                            value={ this.state.keyword_tmp }
                            onChange={ (event) => this.handleKeywordsKeywordOnChange(event) }
                            onKeyDown={ (event) => this.handleKeywordsKeywordOnKeyDown(event) }  />
                        <div className="icon">
                            <FontAwesomeIcon icon={ solid('key') } />
                        </div>
                    </div>
                    <div className="button-icon btn-rect" 
                        onClick={ () => this.handleKeywordsKeywordOnCreate() }>
                        <FontAwesomeIcon icon={ solid('plus') } />
                    </div>
                </div>
                <div className="keywords">
                    { 
                        this.state.article.keywords.map(keyword => this.renderFormKeywordsKeyword(keyword))
                    }
                </div>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    render()
    {
        return (
            <form onSubmit={ (event) => event.preventDefault() }
                className="tc-overview">
                {   this.renderFormTitle()   }
                {   this.renderFormDescriptionShort()   }
                {   this.renderFormKeywords()   }
            </form>
        )
    }
}