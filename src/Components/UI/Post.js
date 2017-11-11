import React from 'react'
import { Link } from 'react-router-dom'

const Post = (props) => {
    return (
        <div>
            <h1 className="title"><Link to={`/${props.id}`}>{props.title}</Link></h1>
            <p>{props.body}</p>
            <strong className="column is-offset-9">{props.day} / {props.month} / {props.year}</strong>
            <br/>
        </div>
    )
}

export default Post