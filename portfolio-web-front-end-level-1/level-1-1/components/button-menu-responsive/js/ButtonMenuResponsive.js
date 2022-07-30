class ButtonMenuResponsive
{
    element = null
    onSelect = null

    constructor(arg) 
    {
        this.element = arg.element
        this.onSelect = arg.onSelect

        this.element.addEventListener('click', (event) => {
            event.stopPropagation()
            event.preventDefault()
            this.select()
        })
    }

    select(isSelected = null)
    {   
        if(isSelected === false || this.element.classList.contains('selected'))
        {
            this.element.classList.remove('selected')
            if(this.onSelect) this.onSelect(false)
        }
        else
        {
            this.element.classList.add('selected')
            if(this.onSelect) this.onSelect(true)
    
        }  
    }

    setSelected(isSelected)
    {
        if(isSelected) this.element.classList.add('selected')
        else this.element.classList.remove('selected')
    }
}