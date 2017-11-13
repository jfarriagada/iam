import React from 'react'
import { Link } from 'react-router-dom'

const Post = (props) => {
    return (
        <div>
            <figure>
                <img src={props.banner_url} />
                <figcaption>
                    <p className="titles"><Link to={`/post/${props.id}`}>{props.title}</Link></p>
                </figcaption>
            </figure>
            <hr />
            <p>{props.body}</p>
            <strong className="column is-offset-9">{props.day} / {props.month} / {props.year}</strong>
            <br/>
        </div>
    )
}

export default Post