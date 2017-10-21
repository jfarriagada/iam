import React,{ Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { reset } from 'redux-form'
import { Link } from 'react-router-dom'

class Post extends Component {

    componentDidMount(){
        this.props.load_posts() 
    }

    componentWillUnmount(){
        this.props.clear_posts()
    }

    list_posts = () => {
        const list = this.props.posts.map((post, value) => {
            var p = post.val()
            return(
                <div key={value}>
                    <h1 className="title"><Link to={`/${post.key}`}>{p.title}</Link></h1>
                    <p>{p.body}</p>
                    <strong className="column is-offset-9">{p.day} / {p.month} / {p.year}</strong>
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
            var ref = firebase.database().ref('posts/').limitToLast(7)
            ref.on('child_added', function(snapshot, prevChildKey) {
                dispatch({type: 'POST_LIST', data: snapshot})
            })
        },
        clear_posts: () => {
            dispatch({type: 'POST_CLEAR'})
        }
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post)
  