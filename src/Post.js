import React, {useState, useEffect} from 'react';
import {db} from './firebase';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";


function Post({ postId,username, caption, imageUrl}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    useEffect(()=>{
        let unsebscribe;
        if(postId){
            unsebscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot =>{
                setComments(snapshot.docs.map(doc =>doc.data()));
            }));
        }
        return ()=>{
            unsebscribe();
        };

    },[postId]);

    const postComment = (event)=>{

    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar alt="Ahmed" className="post__avatar" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong>{username}</strong>: {caption} </h4>


         <form className="post__commentBox">
         <input 
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
         />
         <button className="post__button"
         disabled={!comment}
         type="submit"
         onClick={postComment} > 
            Post
         </button>

         </form>

        </div>
    )
}

export default Post
