import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class Article extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            options: {
                isDialogEditSelected: false,
                isDialogDestroySelected: false,
            }
        }
    }

    // --- LIFE CYCLE

    componentDidMount()
    {
        this.setState({
            ...this.state,
        })
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if(
            this.props.article && this.props.article !== prevProps.article
        )
        {
            this.setState({
                ...this.state,
            })
        }
    }

    // --- HANDLE EVENTS

    handleDialogEditOnClick()
    {
        this.props.editOnClick(this.props.article)
    }

    handleDialogDestroyOnClick()
    {
        this.props.destroyOnClick(this.props.article)
    }

    // --- RENDER

    getButtonEditClassSelected()
    {
        return this.state.options.isDialogEditSelected ? ' selected' : ''
    }

    getButtonDestroyClassSelected()
    {
        return this.state.options.isDialogDestroySelected ? ' selected' : ''
    }

    render()
    {
        return (

            <article className="article">

                <div className="block-1">
                    <div className={ "button-icon btn-rect" + this.getButtonEditClassSelected() } 
                        onClick={ () => this.handleDialogEditOnClick() }>
                        <FontAwesomeIcon icon={ solid('pencil') } />
                    </div>
                    <div className={ "button-icon btn-rect" + this.getButtonDestroyClassSelected() } 
                        onClick={ () => this.handleDialogDestroyOnClick() }>
                        <FontAwesomeIcon icon={ solid('xmark') } />
                    </div>
                </div>

                <div className="block-2">
                    <div className="icon">
                        <FontAwesomeIcon icon={ solid('newspaper') } />
                    </div>
                    <h6 className="title">{ this.props.article.title }</h6>
                </div>

                <div className="block-3">
                    <div className="description">
                        { this.props.article.description_short }
                    </div>
                    <div className="keywords">
                        {
                            this.props.article.keywords.map( (keyword, index) => {
                                    if(index < 2)
                                        return (<div className="keyword" key={ keyword.id }>{ keyword.value }</div>)
                                    else if(index === 2)
                                        return (<div className="keyword" key={ keyword.id }>+</div>)
                                    return (null)
                            })
                        }
                    </div>
                    <div className="date">0000-00-00</div>
                </div>
                  
            </article>
        )
    }
}