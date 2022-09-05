import ButtonIcon from 'components/button-icon/js/ButtonIcon'

export default class MenuResponsive
{
    element = null
    btnClose = null

    isSelected = false
    onSelect = null
    onClose = null
    idTimeout = null

    constructor(arg)
    {
        this.element = arg.element

        this.btnClose = new ButtonIcon({
            element: this.element.querySelector('.btn-close'),
            onSelect: () => this.handleClose(),
        })

        this.onSelect = arg.onSelect
        this.onClose = arg.onClose

        this.setup()
    }

    setup()
    {
        this.element.addEventListener('transitionend', () => {
            this.afterTransitionEnd()
        })
    }

    afterTransitionEnd()
    {
        if(!this.element.classList.contains('ready'))
        {
            this.element.classList.remove('selected')
            if(this.onSelect)
                this.onSelect(false)
        }
    }


    setSelected(isSelected)
    {
        this.isSelected = isSelected

        if(this.isSelected)
        {
            if(this.onSelect)
                this.onSelect(true)
            this.element.classList.add('selected')

            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {
                this.element.classList.add('ready')
                this.element.style.overflow = 'auto'
            }, 100)
        }
        else
        {
            this.element.style.overflow = 'hidden'
            this.element.classList.remove('ready')
        }
    }

    select()
    {
        this.isSelected = !this.isSelected

        if(this.isSelected)
        {
            if(this.onSelect)
                this.onSelect(true)
            this.element.classList.add('selected')

            clearTimeout(this.idTimeout)
            this.idTimeout = setTimeout(() => {
                this.element.classList.add('ready')
                this.element.style.overflow = 'auto'
            }, 100)
        }
        else
        {
            this.element.style.overflow = 'hidden'
            this.element.classList.remove('ready')
        }
    }

    handleClose()
    {
        this.setSelected(false)
        this.onClose()
    }
}