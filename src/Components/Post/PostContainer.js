import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
// UI
import Spinner from '../UI/Spinner'
import Post from '../UI/Post'

var gif = "https://firebasestorage.googleapis.com/v0/b/iam-copy.appspot.com/o/banners%2Fgiphy.gif?alt=media&token=8731ddfb-6e8c-42e1-8d02-2769c120e2ed"

class PostContainer extends Component {

    componentDidMount(){
        this.props.load_posts()
    }

    componentWillUnmount = () => {
        this.props.clear_posts()
    }
    

    list_posts = () => {
        if(this.props.post.length > 0) {
            const list = this.props.post.map((post_key, value) => {
                var post = post_key.val()
                return(
                    <div key={value} className="column is-7 is-center">  
                        <Post
                            id={ post_key.key }
                            banner_url={ post.banner_url }
                            title={ post.title }
                            body_html={ post.body_html }
                            day={ post.day }
                            month={ post.month }
                            year={ post.year }
                            user_image={ post.user_image }
                            user_email={ post.user_email }
                        />
                    </div>
                )
            }).reverse()
            return list
        } else if(this.props.post.length === 0){
            return(
                <div className="column is-7 is-center">
                    <p className="title">¡ Bienvenido !</p>
                    <img className="image-post" src={ gif } />
                </div>
            )
        }else {
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
  
const mapDispatchToProps = (dispatch, ownProps) => {
    var url_path = ownProps.match.url
    if(url_path.length > 1){ url_path = url_path.replace("/","") }

    return {
        load_posts: () => {
            var ref = firebase.database().ref('posts/')

            if(url_path === '/'){
                ref.limitToLast(7).on('child_added', function(snapshot, prevChildKey) {
                    dispatch({type: 'POST_LIST', data: snapshot })
                })
            }
        },
        clear_posts: () => {
            dispatch({type: 'POST_CLEAR'})
            var ref = firebase.database().ref('posts/').limitToLast(7)
            ref.off('child_added')
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)