import React, { Component } from 'react';
// redux 
import { connect } from 'react-redux'
// Firebase
import { DB_CONFIG } from './firebase'
import firebase from 'firebase'

// Firebase config
firebase.initializeApp(DB_CONFIG);

class App extends Component {
  render() {
      return (
        <div>
          Aloja :D
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
