import Page from './page/js/Page'
import Home from './home/js/Home'

export default class App
{
    _page = null
    _home = null

    constructor(arg)
    {
        this._page = new Page(arg)
    }

    page()
    {
        return this._page
    }

    home(arg)
    {
        this._home = new Home(arg)
        return this._home
    }
}