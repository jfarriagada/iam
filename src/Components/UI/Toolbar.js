import React from 'react'

const Toolbar = () => {
    return(
        <div className="post-toolbar">
            <button className="icon-button" title="Bold" onClick={() => document.execCommand('bold',false,'')}>
                <span className="icon-bold icon-font"></span>
            </button>
            <button className="icon-button" title="Italic" onClick={() => document.execCommand('italic',false,'')}>
                <span className="icon-italic icon-font"></span>
            </button>
            <button className="icon-button" title="Strikethrough" onClick={() => document.execCommand('strikethrough',false,'')}>
                <span className="icon-strikethrough icon-font"></span>
            </button>
            <button className="icon-button" title="Underline" onClick={() => document.execCommand('underline',false,'')}>
                <span className="icon-underline icon-font"></span>
            </button>
            <button className="icon-button" title="Undo" onClick={() => document.execCommand('undo',false,'')}>
                <span className="icon-undo icon-font"></span>
            </button>
            <button className="icon-button" title="Redo" onClick={() => document.execCommand('redo',false,'')}>
                <span className="icon-redo icon-font"></span>
            </button>
        </div>
    )
}

export default Toolbar
