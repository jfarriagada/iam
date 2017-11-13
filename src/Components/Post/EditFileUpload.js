import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

class FileUpload extends Component {
    constructor(){
        super()
        this.state = {
            uploadValue: 0,
            banner: null
        }
        this.handleUpload = this.handleUpload.bind(this)
    }
    
    componentDidMount = () => {
      const url = this.props.edit_post.banner_url
      this.setState({banner: url})
    }

    handleUpload(event) {
        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`/banners/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', snapshot => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadValue: percentage
            })
        }, error => {
            console.log(error.message)
        }, () => {
            this.setState({
                uploadValue : 100,
                banner: task.snapshot.downloadURL
            })
            this.props.banner(task.snapshot.downloadURL)
        })
    }

   
    render() {
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <input type="file" id="file-banner" onChange={this.handleUpload}/>
                <br/>
                <img src={this.state.banner} />
            </div>
        )
    }
}
  
const mapStateToProps = (state) => {
    return {
        edit_post: state.edit_post
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        banner: (url) => {
            dispatch({type: 'BANNER_URL', data: url})
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)