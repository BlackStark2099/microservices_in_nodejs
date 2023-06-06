import React from "react";
import {useEffect,useState} from 'react';
import axios from 'axios';


const CommentLists = (props) => {
    const [commentsList,setCommentList] = useState([]);


    console.log("comments --------");
    console.log(props.comments);
    // if(props.comments != undefined){
        // setCommentList(props.comments);
    // }else{
    //     setCommentList([]);
    // }

    return <div>
        <h4>{props.comments.length} comments</h4>
        <div>
            {props.comments.map((comment => {
                return <div key = {comment.comment_id}>
                    <label>{comment.comment}</label>
                    </div>
            }))}
        </div>
    </div>
}

export default CommentLists;