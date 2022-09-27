import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


export default class FormDescription extends React.Component
{
    editor = null
    editorTools = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['image'],

        ['clean'], 
    ]

    constructor(props)
    {
        super(props)
        this.editor = React.createRef()
    }

    clear()
    {
        this.editor.current.editor.setContents([])
    }

    // --- GET EDITOR

    getEditor()
    {
        // current.editor: Quill Not QuillReact
        return this.editor.current.editor
    }

    // --- RENDER

    renderFormDescription()
    {
        return (
            <div className="form-row">
                <label>Description</label>
                <ReactQuill ref={ this.editor }
                    theme="snow" modules={ { toolbar: this.editorTools } } />
                <div className="form-error">Name Required</div>
            </div>
        )
    }

    render()
    {
        return (
            <form onSubmit={ (event) => event.preventDefault() }
                className="tc-description">
                {   this.renderFormDescription()   }
            </form>
        )
    }
}