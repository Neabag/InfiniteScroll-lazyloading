import React from 'react';

function Post(props) {
    return (
        <>
        <div className="postName">{props.name}</div>
        <div className="postName">{props.url}</div>
        </>
    )
}

export default Post
