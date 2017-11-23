import React from 'react'
import { Link } from 'react-router-dom'
import { gif } from '../Post/PostContainer'


const Post = (props) => {
    var html = props.body_html   
    function createMarkup() { return {__html: html} }
    var title = props.title_html   
    function createMarkupTitle() { return {__html: title} }
    
    var banner_url = null
    if(props.banner_url === undefined){
        banner_url = gif 
    } else { 
        banner_url = props.banner_url
    }

    return (
        <div className="column is-offset-3">
            <div className="columns is-mobile">
                <img className="circular-image image is-64x64" src={ props.user_image } alt="avatar"/>
                <i className="avatar-email column is-6">{ props.user_email }</i>
            </div>
            <figure>
                <img className="image-post" src={banner_url} alt="imagen"/>
                <figcaption>
                    <p><Link dangerouslySetInnerHTML={createMarkupTitle()} to={`/article/${props.id}`}></Link></p>
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