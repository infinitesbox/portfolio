import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            title: 'Article Demo',
            title_confirmation: '',
            article: null,
        }
    }

    clear()
    {
        this.setState({
            title: 'Article Demo',
            title_confirmation: '',
            article: null,
        })
    }

    // --- LIFE CYCLE

    componentDidUpdate() 
    {
        if(this.props.article !== this.state.article)
        {
            this.setState({
                ...this.state,
                article: this.props.article,
            })
        }
    }

    // --- HANDLE EVENTS

    handleFormNameConfirmationOnChange(event)
    {
        this.setState({
            ...this.state,
            title_confirmation: event.target.value,
        })
    }


    handleFormSubmitOnSubmit()
    {
        if(this.state.article.title === this.state.title_confirmation)
        {
            // SAVE IN BACK END
            console.log('SAVE DATA IN BACK END!')

            this.props.onSubmitDone({
                ...this.state.article
            })
            this.clear()
        }
    }

    // --- RENDER

    renderFormNameConfirmation()
    {
        return (
            <div className="form-row">
                <label>Name Confirmation</label>
                <div className="input-icon">
                    <input type="text" 
                        placeholder="Ex.: Bug Corrector"
                        value={ this.state.title_confirmation }
                        onChange={ (event) => this.handleFormNameConfirmationOnChange(event) } />
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('dice-d6') } />
                    </div>
                </div>
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    renderFormOnSubmit()
    {
        return (
            <div className="form-row">
                <div className="button-text" onClick={ () => this.handleFormSubmitOnSubmit() }>DESTROY</div>
            </div>
        )
    }

    render()
    {
        return (
            <form onSubmit={ (event) => event.preventDefault() }>
                {   this.renderFormNameConfirmation()   }
                {   this.renderFormOnSubmit()  }
            </form>
        )
    }
}