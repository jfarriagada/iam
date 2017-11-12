import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
// Css
import css from './Post.css'
// Forms
import PostForm from './PostForm'
import FileUpload from './FileUpload'

const CreatePost = (props) => {

    const form = (data) => {
        firebase.database().ref('posts').push({
            user_uid: props.user.uid,
            title: data.title,
            body: data.body,
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

    return(
        <div className="section">
            <div className="column is-half is-offset-one-quarter">
                <FileUpload />
                <PostForm onSubmit={form}/>
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
            dispatch(reset('PostForm'))
            ownProps.history.push('/')
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
