import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
// Css
import css from './Post.css'
// Forms
import EditPostForm from './EditPostForm'
import EditFileUpload from './EditFileUpload'

const EditPost = (props) => {
    

    const form = (data) => {
        data.banner_url = props.banner
        console.log(props.banner)
        console.log(data)
        props.edit(data)
    }
    
    return(
        <div className="section">
            <div className="column is-half is-offset-one-quarter">
                editar
            <EditFileUpload />
            <EditPostForm onSubmit={form}/>
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
        edit: (data) => {
            var ref = firebase.database().ref('posts/' + ownProps.match.params.id)
            ref.update(data)
            // redirect
            ownProps.history.push('/')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
