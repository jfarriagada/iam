import React from 'react'
import { Link } from 'react-router-dom'


const Post = (props) => {
    var html = props.body_html
    function createMarkup() { return {__html: html}; }
    
    var banner_url = null
    if(props.banner_url !== null){
        banner_url = "https://firebasestorage.googleapis.com/v0/b/iam-copy.appspot.com/o/banners%2Fgiphy.gif?alt=media&token=8731ddfb-6e8c-42e1-8d02-2769c120e2ed"
    } else { 
        banner_url = props.banner_url
    }

    return (
        <div>
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