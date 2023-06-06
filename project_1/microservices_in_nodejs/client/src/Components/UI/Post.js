import React from "react";
import CommentLists from "./CommentsList";
import CreateComment from "./createComment";

const Post = (props) => {
    return <div className="card"  style={{width: '30%',marginBottom : '20px'}} key={props.id}>
        <div className="card-body">
            <h3>{props.title}</h3>
        </div>
        <CommentLists id = {props.id} comments = {props.comments}></CommentLists>
        <CreateComment id = {props.id} ></CreateComment>
    </div>
}

export default Post;