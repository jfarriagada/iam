import React, { Component } from 'react';
// redux 
import { connect } from 'react-redux'
// Firebase
import { DB_CONFIG } from './firebase'
import firebase from 'firebase'
// Componets
import Navbar from './Components/Navbar'
import Footer from './Components/UI/Footer'

// Firebase config
firebase.initializeApp(DB_CONFIG);

class App extends Component {
  render() {
      return (
        <div>
          <Navbar />
          <Footer />
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
