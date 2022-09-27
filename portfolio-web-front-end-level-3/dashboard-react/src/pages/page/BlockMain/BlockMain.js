import React from 'react'
import {
    Routes,
    Route,
} from 'react-router-dom'
import ButtonMenuResponsive from 'components/button-menu-responsive/js/ButtonMenuResponsive'
import PageHome from 'pages/home/Home'
import PageProjects from 'pages/projects/home/Home'
import PageBlog from 'pages/blog/home/Home'

export default class BlockMain extends React.Component
{
    buttonMenuResponsive = null

    constructor(props)
    {
        super(props)
        this.state = {
            buttonMenuResponsiveIsSelected: false,
            isScrollDisabled: false,
        }

        this.buttonMenuResponsive = React.createRef()
    }

    setScrollDisabled(isDisabled)
    {
        this.setState({
            ...this.state,
            isScrollDisabled: isDisabled,
        })
    }

    // --- LIFE CYCLE

    componentDidUpdate(prevProps, prevState) 
    {
        if(
            this.props.blockLeftIsClosed === false 
            && this.props.blockLeftIsClosed !== this.state.buttonMenuResponsiveIsSelected
        )
        {
            this.setState({
                buttonMenuResponsiveIsSelected: false
            })
            this.buttonMenuResponsive.current.setSelected(false)
        }
    }

    handleOnSelect(isSelected)
    {
        this.setState({
            buttonMenuResponsiveIsSelected: isSelected
        })

        this.props.blockLeftOnSelect(isSelected)
    }

    // --- RENDER

    getClassScrollDisabled()
    {
        return this.state.isScrollDisabled ? ' scroll-disabled' : ''
    }

    render()
    {
        return (
            <div id="page-block-main" className={ this.getClassScrollDisabled() }>

                <ButtonMenuResponsive ref={ this.buttonMenuResponsive }
                    onSelect={ (isSelected) => this.handleOnSelect(isSelected) } />
                
                <div id="page-container">
                    <div id="page-content">
                        <Routes>
                            <Route path="/" element={ <PageHome /> } />
                            <Route path="/projects" element={ <PageProjects onPageScrollDisabled={ this.props.onPageScrollDisabled } /> }>
                                <Route path=":projectId" element={ <PageProjects onPageScrollDisabled={ this.props.onPageScrollDisabled } /> } />
                            </Route>
                            <Route path="/blog" element={ <PageBlog onPageScrollDisabled={ this.props.onPageScrollDisabled } /> }>
                                <Route path=":articleId" element={ <PageBlog onPageScrollDisabled={ this.props.onPageScrollDisabled } /> } />
                            </Route>
                        </Routes>
                    </div>
                    <div id="page-ending">
                        <div className="app">portfolio.com</div>
                        <div className="copyright">&copy;2022</div>
                    </div>
                </div>

            </div>
        )
    }
}