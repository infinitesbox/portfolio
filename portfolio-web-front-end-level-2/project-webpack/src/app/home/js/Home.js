import '../sass/main.sass'
import '../sass/custom.sass'

import Hero from './Hero'
import Projects from './Projects'
import Blog from './Blog'

export default class Home
{
    element = null
    _hero = null
    _projects = null
    _blog = null

    constructor(arg)
    {
        this.element = document.querySelector('#page-home')

        this._hero = new Hero({
            element: this.element.querySelector('.hero')
        })
        
        this._projects = new Projects({
            element: this.element.querySelector('.projects')
        })
        
        this._blog = new Blog({
            element: this.element.querySelector('.blog')
        })
    }
}