import React from 'react'
import { Link } from 'react-router-dom'
import { gif } from '../Post/PostContainer'


const PostCard = (props) => {
    var title = props.title_html   
    function createMarkupTitle() { return {__html: title} }

    var banner_url = null
    if(props.banner_url === undefined){
        banner_url = gif 
    } else { 
        banner_url = props.banner_url
    }

    return (
        <div>
            <div className="columns is-mobile">
                <img className="circular-image image is-64x64" src={ props.user_image } alt="avatar"/>
                <i className="avatar-email column is-6">{ props.user_email }</i>
            </div>
            <figure>
                <img className="image-Card" src={banner_url} alt="banner"/>
                <figcaption >
                    <p><Link dangerouslySetInnerHTML={createMarkupTitle()} to={`/article/${props.id}`}></Link></p>
                </figcaption>
            </figure>
        </div>
    )
}

export default PostCard