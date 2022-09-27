import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

// Import React FilePond
import { FilePond } from 'react-filepond'
// Import FilePond styles
import 'filepond/dist/filepond.min.css'

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            project: {
                id: 0,
                demo_url: '',
                name: '',
                description_short: '',
                files: [],
                keywords: [],
            },
            keyword_tmp: '',
        }
    }

    clear()
    {
        this.setState({
            project: {
                id: 0,
                demo_url: '',
                name: '',
                description_short: '',
                files: [],
                keywords: [],
            },
            keyword_tmp: '',
        })
    }

    // --- HANDLE EVENTS

    handleFormDemoURLOnChange(event)
    {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                demo_url: event.target.value,
            },
        })
    }

    handleFormNameOnChange(event)
    {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                name: event.target.value,
            },
        })

        this.props.nameOnChange(event.target.value)
    }

    handleFormDescriptionShortOnChange(event)
    {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                description_short: event.target.value,
            },
        })
    }

    handleFormFileOnUpdate(files)
    {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                files: files,
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
            //input.blur()
            //if(onEnterKey) onEnterKey(input.checkValidity() ? input.value : '')
            this.handleKeywordsKeywordOnCreate()
            return false
        }
    }

    handleKeywordsKeywordOnCreate()
    {
        const keywords = this.state.project.keywords.slice()
        const date = Date.now()
        keywords.push({
            id: date,
            value: this.state.keyword_tmp,
        })

        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                keywords: keywords,
            },
            keyword_tmp: '',
        })
    }

    handleKeywordsKeywordOnDestroy(keyword)
    {
        let keywords = this.state.project.keywords.slice()
        keywords = keywords.filter(_keyword => _keyword.id !== keyword.id)

        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                keywords: keywords,
            }
        })
    }

    handleFormSubmitOnSubmit()
    {
        // SAVE IN BACK END
        console.log('SAVE DATA IN BACK END!')

        this.props.onSubmitDone({
            ...this.state.project,
            id: Date.now(),
        })

        this.clear()
    }

    // --- RENDER

    renderFormDemoURL()
    {
        return (
            <div className="form-row">
                <label>Demo URL</label>
                <div className="input-icon">
                    <input type="url" 
                        placeholder="Ex.: https://github.com/portfolio/"
                        value={ this.state.project.demo_url }
                        onChange={ (event) => this.handleFormDemoURLOnChange(event) } />
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('link') } />
                    </div>
                </div>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    renderFormName()
    {
        return (
            <div className="form-row">
                <label>Name</label>
                <div className="input-icon">
                    <input type="text" 
                        placeholder="Ex.: Bug Corrector"
                        value={ this.state.project.name }
                        onChange={ (event) => this.handleFormNameOnChange(event) } />
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
                    value={ this.state.project.description_short }
                    onChange={ (event) => this.handleFormDescriptionShortOnChange(event) }></textarea>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    renderFormImage()
    {
        return (
            <div className="form-row">
                <label>Image</label>
                <FilePond
                    ref={ ref => (this.pond = ref) }
                    files={ this.state.project.files }
                    allowMultiple={ false }
                    allowReorder={ true }
                    maxFiles={ 1 }
                    server={ null }
                    name="file"
                    //oninit={ () => this.handleInit() }
                    
                    onupdatefiles={ fileItems => {
                        // Set currently active file objects to this.state
                        const files = fileItems.map(fileItem => fileItem.file)
                        this.handleFormFileOnUpdate(files)
                    }}
                    credits={ null }
                    acceptedFileTypes={ ['image/png', 'image/jpeg'] } />
                <div className="form-error">Name Required</div>
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
                        this.state.project.keywords.map(keyword => this.renderFormKeywordsKeyword(keyword))
                    }
                </div>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    renderFormOnSubmit()
    {
        return (
            <div className="form-row">
                <div className="button-text" onClick={ () => this.handleFormSubmitOnSubmit() }>CREATE</div>
            </div>
        )
    }

    render()
    {
        return (
            <form onSubmit={ (event) => event.preventDefault() }>
                {   this.renderFormDemoURL()   }
                {   this.renderFormName()   }
                {   this.renderFormDescriptionShort()   }
                {   this.renderFormImage()  }
                {   this.renderFormKeywords()   }
                {   this.renderFormOnSubmit()  }
            </form>
        )
    }
}