import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
// Css
import css from './Post.css'
// Forms
import EditPostForm from './EditPostForm'

const EditPost = (props) => {
    

    const form = (data) => {
        props.edit(data)
    }
    
    return(
        <div className="section">
            <div className="column is-half is-offset-one-quarter">
                editar
            <EditPostForm onSubmit={form}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.session,
        edit_post : state.edit_post
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
