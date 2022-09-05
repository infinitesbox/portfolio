export default class Component
{
    element = null

    constructor(arg)
    {
        this.element = arg.element ? arg.element : document.querySelector(arg.element)
    }
}