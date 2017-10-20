import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
import { Link } from 'react-router-dom'

class Post extends Component {
    
    componentDidMount(){
        this.props.load_posts() 
    }

    list_posts = () => {
        const list = this.props.posts.map((post, value) => {
            return(
                <div>
                    <h1 key={value} className="title"><Link to='/'>{post.title}</Link></h1>
                    <p>{post.body}</p>
                    <strong className="column is-offset-9">{post.day} / {post.month} / {post.year}</strong>
                    <br/>
                </div>
            )
        }).reverse()
        return list
    }

    render(){
        return(
            <div className="section">
                <div className="column is-half is-offset-one-quarter">
                    {this.list_posts()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        load_posts: () => {
            console.log("post")
            var ref = firebase.database().ref('posts/').limitToLast(7)
            ref.on('child_added', function(snapshot, prevChildKey) {
                console.log('child_added')
                var post = snapshot.val()
                dispatch({type: 'POST_LIST', data: post})
            })
        },
        
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post)
  