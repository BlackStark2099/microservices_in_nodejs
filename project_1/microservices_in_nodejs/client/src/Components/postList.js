import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import Post from "./UI/Post";


const PostLists = () =>{
    const [postList,setPostList] = useState([]);
    const [isLoading,setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4002/get_all_posts');
            console.log(response);
            setPostList(response.data);
        }
        fetchData();
    },[]);
    const renderedPosts = Object.values(postList);
    return(
        <div className="d-flex flex-row flex-wrap justify-content-between ">
            {renderedPosts.map((post) => <Post
            title = {post.title}
            id = {post.id}
            key = {post.id}
            comments =  {post.comments}
            ></Post>)}
        </div>
    )
}

export default PostLists;