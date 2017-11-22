import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
// Css
import FileUpload from './FileUpload'
// UI
import Toolbar from '../UI/Toolbar'


const CreatePost = (props) => {

    const saveData = (title, text) => {
        var title_html = title.toString() // html text
        var body_html = text.toString() // html text
        var title = title_html.replace(/<[^>].?>/g,"") // convert html text to plain text
        var body = body_html.replace(/<[^>].?>/g,"") // convert html text to plain text

        firebase.database().ref('posts').push({
            user_uid: props.user.uid,
            title: title,
            title_html: title_html,
            body: body,
            body_html: body_html,
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            banner_url: props.banner,
            user_image: props.user.photoURL,
            user_email: props.user.email
        })
        .then(function(response){
            props.clear()
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="section">
            <div className="column is-7 is-center">
                <FileUpload />
                <Toolbar />
                <div>
                    <p contentEditable="true" id="post-title" className="title">Título</p>
                </div>
                <div>
                    <p contentEditable="true" id="post-body">Texto. . .</p>
                </div>
                <a className="button is-primary" 
                    onClick={() => saveData(document.getElementById("post-title").innerHTML, document.getElementById("post-body").innerHTML)}>Guardar
                </a>
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
