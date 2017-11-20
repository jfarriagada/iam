import React, {Component} from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
// Css
import css from './Post.css'
import EditFileUpload from './EditFileUpload'
// UI
import Toolbar from '../UI/Toolbar'

class EditPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            body_html: props.post_id.body_html,
            title: props.post_id.title,
            banner_url: props.post_id.banner_url
        }
    }
    
    saveData(title, text){
        var title_html = title.toString() // html text
        var body_html = text.toString() // html text
        var title = title_html.replace(/<[^>].?>/g,"") // convert html text to plain text
        var body = body_html.replace(/<[^>].?>/g,"") // convert html text to plain text
        var banner_url = this.props.banner

        var post_edited = {
            title: title,
            body: body,
            body_html: body_html,
            banner_url: banner_url
        }
        this.props.edit(post_edited)
    }
        
    render(){
        function createMarkupTitle(title) { return {__html: title}; }
        function createMarkupBody(body) { return {__html: body}; }
        
        return(
            <div className="section">
                <div className="column is-7 is-center">
                    <EditFileUpload banner_url={this.state.banner_url}/>
                    <Toolbar />
                    <div>
                        <h1 contentEditable="true" dangerouslySetInnerHTML={createMarkupTitle(this.state.title)} id="post-title" className="title"></h1>
                    </div>
                    <div>
                        <p contentEditable="true" dangerouslySetInnerHTML={createMarkupBody(this.state.body_html)} id="post-body"></p>
                    </div>
                    <a className="button is-primary" 
                        onClick={() => this.saveData(document.getElementById("post-title").innerHTML, document.getElementById("post-body").innerHTML)}>Guardar
                    </a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.session,
        banner: state.banner,
        post_id: state.post_id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        edit: (data) => {
            var ref = firebase.database().ref('posts/' + ownProps.match.params.id)
            ref.update(data)
            // redirect
            ownProps.history.push('/')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)