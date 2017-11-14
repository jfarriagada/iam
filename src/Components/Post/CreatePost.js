import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
// Css
import css from './Post.css'
import FileUpload from './FileUpload'


const CreatePost = (props) => {

    const saveData = (title, text) => {
        var title_html = title.toString() // html text
        var body_html = text.toString() // html text
        localStorage["lData"] = body_html;
        var title = title_html.replace(/<[^>].?>/g,"") // convert html text to plain text
        var body = body_html.replace(/<[^>].?>/g,"") // convert html text to plain text

        firebase.database().ref('posts').push({
            user_uid: props.user.uid,
            title: title,
            body: body,
            body_html: body_html,
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            banner_url: props.banner 
        })
        .then(function(response){
            props.clear()
        })
        .catch(error => console.log(error))
    }

    function formatoFuente(sCmd, sValue) {
        
        document.execCommand(sCmd, false, sValue);
        
    }


    return(
        <div className="section">
            <div className="column is-7 has-text-centered is-center">
                <FileUpload />
                
                <div className="post-toolbar">
                    <a className="button is-primary" 
                        onClick={() => saveData(document.getElementById("post-title").innerHTML, document.getElementById("post-body").innerHTML)}>Guardar
                    </a>
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
                <div contentEditable="true">
                    <p id="post-title" className="title">Título</p>
                    <p id="post-body">Ingrese texto . . .</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.session,
        banner: state.banner
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        clear: () => {
            ownProps.history.push('/')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
