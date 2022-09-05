import '../sass/main.sass'
import '../sass/custom.sass'

import ButtonMenuResponsive from 'components/button-menu-responsive/js/ButtonMenuResponsive'
import MenuResponsive from './MenuResponsive'

export default class Page
{
    buttonMenuResponsive = null
    menuResponsive = null

    constructor(arg)
    {
        this.buttonMenuResponsive =  new ButtonMenuResponsive({
            element: document.querySelector('body > .button-menu-responsive'),
            onSelect: () => this.buttonMenuResponsiveHandleOnSelect(),
        })

        this.menuResponsive =  new MenuResponsive({
            element: document.querySelector('#page-menu-responsive'),
            onClose: () => this.menuResponsiveHandleOnClose(),
            onSelect: (isSelected) => this.menuResponsiveHandleOnSelect(isSelected),
        })
    }

    buttonMenuResponsiveHandleOnSelect()
    {
        this.menuResponsive.select()
    }   

    menuResponsiveHandleOnClose()
    {
        this.buttonMenuResponsive.setSelected(false)
    }

    menuResponsiveHandleOnSelect(isSelected)
    {
        const pageContainer = document.querySelector('#page-container')
        if(isSelected)
            pageContainer.classList.add('scroll-disabled')
        else
            pageContainer.classList.remove('scroll-disabled')
    }
}