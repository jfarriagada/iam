import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
// UI
import Spinner from '../UI/Spinner'
import Post from '../UI/Post'




class PostId extends Component {
    
    componentDidMount(){
        this.props.load_post() 
    }

    componentWillUnmount(){
        this.props.clear_post_id()
    }

    /* Authentication buttons, solo el usuario que creo los post los puede editar y eliminar */
    PostIDButtons = () => {
        if(this.props.user !== null && this.props.user.uid === this.props.post_id.user_uid){
            return(
                <div class="postid-buttons column is-4 is-offset-8">
                    <Link className="button is-primary is-outlined" to={`/post/${this.props.post_id_key}/edit`}>Edit</Link>
                    <button className="button is-danger is-outlined" onClick={() => this.props.delete_post()}>Delete</button> 
                </div>
            )
        } 
    }

    show_post = () => {
        if(this.props.post_id_key.length !== 0) {
            return(
                <div>
                    { this.PostIDButtons() }
                    <Post
                        id={this.props.post_id_key}
                        banner_url={this.props.post_id.banner_url}
                        title_html={this.props.post_id.title_html}
                        body_html={this.props.post_id.body_html}
                        day={this.props.post_id.day}
                        month={this.props.post_id.month}
                        year={this.props.post_id.year}
                        user_image={ this.props.post_id.user_image }
                        user_email={ this.props.post_id.user_email } />
                </div>
            )
        } else {
            return <Spinner />
        }
    }


    render(){
        return(
            <div className="container columns is-center">
                { this.show_post() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post_id: state.post_id,
        post_id_key: state.post_id_key,
        user : state.session
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        load_post: () => {
            var ref = firebase.database().ref('posts/' + ownProps.match.params.id)
            ref.on('value', function(snapshot, prevChildKey) {
                dispatch({type: 'POST_ID', data: snapshot.val()})
                dispatch({type: 'POST_ID_KEY', id: snapshot.key})
            })
        },
        clear_post_id: () => {
            dispatch({type: 'POST_ID_CLEAR'})
        },
        delete_post: () => {
            firebase.database().ref('posts/' + ownProps.match.params.id).remove()
            // redirect
            ownProps.history.push('/')
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PostId)
