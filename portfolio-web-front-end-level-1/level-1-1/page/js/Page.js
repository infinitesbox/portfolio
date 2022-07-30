class Page
{
    pageContainer = null
    buttonMenuResponsive = null
    menuResponsive = null

    constructor() 
    {
        this.pageContainer = document.querySelector('#page-container')

        this.buttonMenuResponsive = new ButtonMenuResponsive({
            element: document.querySelector('.button-menu-responsive'),
            onSelect: () => this.handleButtonMenuOnSelect(),
        })

        this.menuResponsive = new MenuResponsive({
            element: document.querySelector('.menu-responsive'),
            onSelect: (isSelected) => this.setScrollDisabled(isSelected),
            onClose: () => this.handleMenuResponsiveOnClose(),
        })
    }

    setScrollDisabled(isDisabled)
    {
        if(isDisabled) 
        {
            this.pageContainer.className = 'scroll-disabled'
        }
        else 
        {
            this.pageContainer.className = ''
        }
    }

    handleButtonMenuOnSelect()
    {
        this.menuResponsive.select()
    }

    handleMenuResponsiveOnClose()
    {
        this.buttonMenuResponsive.select()
    }
}