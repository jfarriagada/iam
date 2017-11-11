import React, { Component } from 'react'


class FileUpload extends Component {
    render() {
        return (
            <div>
                <input type="file" onChange={this.props.onUpload}/>
                <br/>
                <img width="320" height="200" src={this.props.banner} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        banner: state.banner
    }
  }
  
const mapDispatchToProps = (dispatch) => {

    return {
        onUpload: () => {
            console.log("banner")
        }
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)