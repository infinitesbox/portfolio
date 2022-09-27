import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default class Project extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            img_src: '',
            options: {
                isDialogEditSelected: false,
                isDialogDestroySelected: false,
            }
        }
    }

    // --- LIFE CYCLE

    componentDidMount()
    {
        if(this.props.project.files.length > 0)
        {
            let reader = new FileReader()
            let url = reader.readAsDataURL(this.props.project.files[0])

            reader.onload = (event) => {
                //console.log(reader.result)
                this.setState({
                    ...this.state,
                    img_src: [reader.result],
                })
            }
        }
        else
        {
            this.setState({
                ...this.state,
                img_src: '#',
            })
        }
    }

    componentDidUpdate(prevProps, prevState) 
    {
        if(
            this.props.project && this.props.project !== prevProps.project
        )
        {
            if(this.props.project.files.length > 0)
            {
                let reader = new FileReader()
                let url = reader.readAsDataURL(this.props.project.files[0])

                reader.onload = (event) => {
                    //console.log(reader.result)
                    this.setState({
                        ...this.state,
                        img_src: [reader.result],
                    })
                }
            }
            else
            {
                this.setState({
                    ...this.state,
                    img_src: '#',
                })
            }
        }
    }

    // --- HANDLE EVENTS

    handleDialogEditOnClick()
    {
        this.props.editOnClick(this.props.project)
    }

    handleDialogDestroyOnClick()
    {
        this.props.destroyOnClick(this.props.project)
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

    renderImage()
    {    
        return ( <img src={ this.state.img_src } /> )
    }

    render()
    {
        return (

            <article className="project">

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
                    <div className="date">00-00-0000</div>
                    <a href={ this.props.project.demo_url } target="_blank" className="button-demo">DEMO</a>
                </div>

                <div className="block-3">
                    <h6>{ this.props.project.name }</h6>
                    <p className="text">{ this.props.project.description_short}</p>
                </div>

                <div className="block-4">
                    { this.renderImage() }
                </div>

                <div className="block-5">
                    {
                        this.props.project.keywords.map( (keyword, index) => {
                                if(index < 2)
                                    return (<div className="keyword" key={ keyword.id }>{ keyword.value }</div>)
                                else if(index === 2)
                                    return (<div className="keyword" key={ keyword.id }>+</div>)
                        })
                    }
                </div>

            </article>
        )
    }
}