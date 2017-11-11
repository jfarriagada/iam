import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
import { Link } from 'react-router-dom'

class PostId extends Component {
    
    componentDidMount(){
        this.props.load_post() 
    }

    componentWillUnmount(){
        this.props.clear_post_id()
    }


    render(){
        return(
            <div className="section">
                <div className="column is-half is-offset-one-quarter">
                    <h1 className="title">{this.props.post_id.title}</h1>
                    <p>{this.props.post_id.body}</p>
                    <Link to={`/${this.props.post_id_key}/edit`}>Edit</Link>
                    <button onClick={() => this.props.delete_post()}>Delete</button>
                    <strong className="column is-offset-9">{this.props.post_id.day} / {this.props.post_id.month} / {this.props.post_id.year}</strong>
                    <br/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post_id: state.post_id,
        post_id_key: state.post_id_key
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
            var ref = firebase.database().ref('posts/' + ownProps.match.params.id).remove()
            // redirect
            ownProps.history.push('/')
        }
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostId)
  