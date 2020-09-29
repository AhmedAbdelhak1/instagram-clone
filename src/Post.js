import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar alt="Ahmed" className="post__avatar" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" src="https://images.dailyhive.com/20170827090910/lake-louise-alberta.jpg" alt=""/>
            <h4 className="post__text"><strong>Ahmed</strong>: caption</h4>
            
        </div>
    )
}

export default Post
