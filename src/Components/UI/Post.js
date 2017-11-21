import React from 'react'
import { Link } from 'react-router-dom'

var gif = "https://firebasestorage.googleapis.com/v0/b/iamfarriagada.appspot.com/o/banners%2Fgiphy.gif?alt=media&token=b3ef320d-4fc5-46b6-bee3-f6fdffd62200"

const Post = (props) => {
    var html = props.body_html   
    function createMarkup() { return {__html: html}; }
    
    var banner_url = null
    if(props.banner_url !== null){
        banner_url = gif 
    } else { 
        banner_url = props.banner_url
    }

    return (
        <div>
            <div className="columns">
                <img className="circular-image image is-64x64" src={ props.user_image } alt="avatar"/>
                <i className="avatar-email">{ props.user_email }</i>
            </div>
            <figure>
                <img className="image-post" src={banner_url} />
                <figcaption>
                    <p><Link to={`/post/${props.id}`}>{props.title}</Link></p>
                </figcaption>
            </figure>
            <hr />
            <div dangerouslySetInnerHTML={createMarkup()}></div>
            <strong className="column is-offset-9">{props.day} / {props.month} / {props.year}</strong>
            <br/>
        </div>
    )
}

export default Post