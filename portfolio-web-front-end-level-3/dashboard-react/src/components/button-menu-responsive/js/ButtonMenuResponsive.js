import React from 'react'

export default class ButtonMenuResponsive extends React.Component
{
    constructor(props) 
    {
        super(props)
        this.state = {
            isSelected: false,
        }
    }

    handleOnSelect()
    {   
        this.setSelected(!this.state.isSelected)
        this.props.onSelect(!this.state.isSelected)
    }

    setSelected(isSelected)
    {
        this.setState({
            isSelected: isSelected
        })
    }

    getClassSelected()
    {
        return (this.state.isSelected ? ' selected' : '')
    }

    render()
    {
        return (
            <div className={ "button-menu-responsive" + this.getClassSelected() }
                onClick={ () => this.handleOnSelect() }>
                <div></div>
            </div>
        )
    }
}