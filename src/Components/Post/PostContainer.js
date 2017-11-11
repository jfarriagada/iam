import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
// UI
import Spinner from '../UI/Spinner'
import Post from '../UI/Post'

class PostContainer extends Component {

    componentDidMount(){
        this.props.load_posts()
        this.setState({ post_loading : "data"})
    }

    list_posts = () => {
        if(this.props.post.length > 0) {
            const list = this.props.post.map((post_key, value) => {
                var post = post_key.val()
                return(
                    <div key={value} className="column is-half is-offset-one-quarter">  
                        <Post
                            id={post_key.key}
                            title={post.title}
                            body={post.body}
                            day={post.day}
                            month={post.month}
                            year={post.year}
                        />
                    </div>
                )
            }).reverse()
            return list
        } else {
            return <Spinner />
        }
    }   

    render(){
        return(
            <div className="section">
                { this.list_posts() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        load_posts: () => {
            var ref = firebase.database().ref('posts/').limitToLast(7)
            ref.on('child_added', function(snapshot, prevChildKey) {
                dispatch({type: 'POST_LIST', data: snapshot })
            })
        },
        clear_posts: () => {
            dispatch({type: 'POST_CLEAR'})
            var ref = firebase.database().ref('posts/').limitToLast(7)
            ref.off('child_added')
        }
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)