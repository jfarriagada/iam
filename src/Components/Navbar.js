import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// redux 
import { connect } from 'react-redux'
// Components
import PostContainer from './Post/PostContainer'
import PostId from './Post/PostId'
import CreatePost from './Post/CreatePost'
import EditPost from './Post/EditPost'
import Header from './Header'
import NotFound from './UI/NotFound/NotFound'
// Firebase
import firebase from 'firebase'
  

class Navbar extends Component {

    componentWillMount () {
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            this.props.auth(user)
          } else {
            this.props.logout()
          }
        })
    }

    handleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider()
        
        firebase.auth().signInWithRedirect(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sessión`))
        .catch(error => console.log(`Error : ${error.code}: ${error.message}`))
    }
    
    handleLogout() {
        firebase.auth().signOut()
        .then(result => console.log('Te has salido con éxito.'))
        .catch(error => console.log(`Error : ${error.code}: ${error.message}`))
    }

    render() {
        return (
          <Router>
            <div className="hero-head">
                <Header 
                    onAuth={this.handleAuth.bind(this)}
                    onLogout={this.handleLogout.bind(this)}
                    user={this.props.user}
                    />
                <Switch>
                    <Route exact path='/' component={PostContainer} />
                    { this.props.user ? 
                        <Route exact path='/post/create' component={CreatePost} /> : 
                        <Route exact path='/' component={PostContainer} /> }
                    { this.props.user ? 
                        <Route exact path='/post/:id/edit' component={EditPost} /> : 
                        <Route exact path='/' component={PostContainer} /> }
                    { this.props.user ? 
                        <Route path='/post/:id' component={PostId} /> :
                        <Route exact path='/' component={PostContainer} /> }      
                    { this.props.user ? 
                        <Route component={NotFound} /> : 
                        <Route component={NotFound} /> }  
                </Switch>
            </div>
          </Router>
        )
    }
  }

const mapStateToProps = (state) => {
    return {
        user : state.session
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (user) => {
            dispatch({type:'USER_AUTH', user:user})
        },
        logout: () => {
            dispatch({type:'USER_LOGOUT'})
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
  


// navbar-burger for mobile
document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {

                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});