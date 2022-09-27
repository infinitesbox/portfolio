import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            name: 'Project Demo',
            name_confirmation: '',
            project: null,
        }
    }

    clear()
    {
        this.setState({
            name: 'Project Demo',
            name_confirmation: '',
            project: null,
        })
    }

    // --- LIFE CYCLE

    componentDidUpdate() 
    {
        if(this.props.project !== this.state.project)
        {
            this.setState({
                ...this.state,
                project: this.props.project,
            })
        }
    }

    // --- HANDLE EVENTS

    handleFormNameConfirmationOnChange(event)
    {
        this.setState({
            ...this.state,
            name_confirmation: event.target.value,
        })
    }


    handleFormSubmitOnSubmit()
    {
        if(this.state.project.name === this.state.name_confirmation)
        {
            // SAVE IN BACK END
            console.log('SAVE DATA IN BACK END!')

            this.props.onSubmitDone({
                ...this.state.project
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
                        value={ this.state.name_confirmation }
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