class Home
{
    element = null
    hero = null

    constructor(arg)
    {
        this.element = arg.element

        this.hero = new Hero({
            element: this.element.querySelector('.hero'),
        })
    }
}