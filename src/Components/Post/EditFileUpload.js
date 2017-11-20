import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

const Progress = (props) => {
    return (
        <div>
            <progress value={props.uploadValue} max="100"></progress><b> {Math.round(props.uploadValue)} %</b>
        </div>
    )
}


class FileUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
            uploadValue: 0,
            upload: false
        }
        
        this.handleUpload = this.handleUpload.bind(this)
    }
    
    componentDidMount = () => {
        if(this.props.banner_url !== null){
            const url = "https://firebasestorage.googleapis.com/v0/b/iamfarriagada.appspot.com/o/banners%2Fgiphy.gif?alt=media&token=2f67b1ba-e033-4862-a9b8-9336dc49c6a7"
            this.setState({banner_url: url})
        } else {
            this.setState({banner_url: this.props.banner_url})
        }

    }

    handleUpload(event) {
        this.setState({ upload: true }) // hidden progress

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
                <input  type="file" id="file-banner" onChange={this.handleUpload}/>
                    { this.state.upload ? <Progress uploadValue={this.state.uploadValue} /> : ""}
                <br/>
                <img className="image-post" src={this.state.banner_url} alt="banner" />
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