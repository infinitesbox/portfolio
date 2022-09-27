import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Project from './Project'
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
            projects: [],
            project: null, // to edit & delete
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
        // const projects = ...
    
        this.setState({ 
            projects: [ 
                /*
                { name: 'Project 1', description_short: 'Lorem ...', keywords: [], files: [], },
                { name: 'Project 2', description_short: 'Lorem ...', keywords: [], files: [], } 
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

    handleDialogCreateOnStore(project)
    {
        const projects = this.state.projects.slice()
        projects.push(project)
        this.setState({
            ...this.state,
            projects: projects,
        })
    }
    // --- END - CREATE

    // --- START - EDIT
    handleDialogEditOnClick(project = null)
    {
        this.props.onPageScrollDisabled(!this.state.options.isDialogEditSelected)

        this.setState({
            ...this.state,
            project: project,
            options: {
                ...this.state.options,
                isDialogEditSelected: !this.state.options.isDialogEditSelected,
            },
        })
    }

    handleDialogEditOnUpdate(project)
    {
        let projects = this.state.projects.slice()
        let index = projects.findIndex((_project) => _project.id === project.id)
        /*
        projects = projects.filter((_project) => _project.id !== project.id)
        projects.push(project)
        */
       
        projects[index] = {
            ...project,
        } 

        this.setState({
            ...this.state,
            project: project,
            projects: projects,
        })
    }
    // --- END - EDIT

    // --- START - DESTROY

    handleDialogDestroyOnClick(project = null)
    {
        this.props.onPageScrollDisabled(!this.state.options.isDialogDestroySelected)

        this.setState({
            ...this.state,
            project: project,
            options: {
                ...this.state.options,
                isDialogDestroySelected: !this.state.options.isDialogDestroySelected,
            },
        })
    }

    handleDialogDestroyOnDelete(project)
    {
        let projects = this.state.projects.slice()
        projects = this.state.projects.filter( (_project) => {
            return _project.id !== project.id
        })
        
        this.setState({
            ...this.state,
            projects: projects,
        })
    }

    // --- END - DESTROY

    // --- 

    // --- RENDER

    getButtonCreateClassSelected()
    {
        return this.state.options.isDialogCreateSelected ? ' selected' : ''
    }

    renderMessageEmpty()
    {
        if(this.state.projects.length === 0)
        {
            return (
                <div className="message-empty">
                    <div className="block-1">
                        <div className="text">
                            
                        </div>
                    </div>
                    <div className="block-2">
                        <p>
                            Thare are any <strong>Projects</strong>.
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
            <div id="page-projects-home">

                <div className="block-1">
                    <h1>Projects</h1>
                    <div className="options">
                        <div className={ "button-icon btn-rect" + this.getButtonCreateClassSelected() } 
                            onClick={ () => this.handleDialogCreateOnClick() }>
                            <FontAwesomeIcon icon={ solid('plus') } />
                        </div>
                    </div>
                </div>

                <div className="block-2">
                    { this.renderMessageEmpty() }
                    <div className="projects">
                        { 
                            this.state.projects.map( (project) => {
                                return (
                                    <Project key={ project.id } project={ project } 
                                        editOnClick={ (project) => this.handleDialogEditOnClick(project) }
                                        destroyOnClick={ (project) => this.handleDialogDestroyOnClick(project) }
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                
                <DialogCreate 
                    isSelected={ this.state.options.isDialogCreateSelected }
                    onClose={ () => this.handleDialogCreateOnClick() }
                    onStore={ (project) => this.handleDialogCreateOnStore(project) } />

                <DialogEdit
                    isSelected={ this.state.options.isDialogEditSelected }
                    onClose={ () => this.handleDialogEditOnClick() }
                    onUpdate={ (project) => this.handleDialogEditOnUpdate(project) } 
                    project= { this.state.project } />

                <DialogDestroy
                    isSelected={ this.state.options.isDialogDestroySelected }
                    onClose={ () => this.handleDialogDestroyOnClick() }
                    onDelete={ (project) => this.handleDialogDestroyOnDelete(project) } 
                    project= { this.state.project } />

            </div>
        )
    }
}