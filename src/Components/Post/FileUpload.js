import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

var gif = "https://firebasestorage.googleapis.com/v0/b/iamfarriagada.appspot.com/o/banners%2Fgiphy.gif?alt=media&token=b3ef320d-4fc5-46b6-bee3-f6fdffd62200"

const Posgress = (props) => {
    return (
        <div>
            <progress value={props.uploadValue} max="100"></progress><b> {Math.round(props.uploadValue)} %</b>
        </div>
    )
}

class FileUpload extends Component {
    constructor(){
        super()
        this.state = {
            uploadValue: 0,
            banner: gif,
            upload: false
        }

        this.handleUpload = this.handleUpload.bind(this)
    }

    handleUpload(event) {
        this.setState({ upload: true })

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
                banner: task.snapshot.downloadURL,
                upload: false
            })
            this.props.banner(task.snapshot.downloadURL)
        })
    }
    

    render() {
        return (
            <div>
                <div>
                    <input  type="file" id="file-banner" onChange={this.handleUpload}/>
                    { this.state.upload ? <Posgress uploadValue={this.state.uploadValue} /> : ""}
                </div>
                <br/>
                <img className="image-post" src={this.state.banner} alt="banner"/>
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
        banner: (url) => {
            dispatch({type: 'BANNER_URL', data: url})
        }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)