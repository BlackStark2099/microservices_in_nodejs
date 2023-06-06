import React from "react";
import { useRef,useState } from "react";
import axios from 'axios';

const PostForm = () => {
    const [title,setTitle] = useState("");
    const titleRef = useRef();
    const submitHandler = async (event) => {
        // event.preventDefault();
        setTitle(titleRef.current.value);
        await axios.post('http://localhost:4000/posts',{
            'title' : titleRef.current.value
        });
        titleRef.current.value = "";
    }

    return (
    <form onSubmit={submitHandler}>
        <div className="form-group">
            <label>Title</label>
            <input className="form-control" ref = {titleRef}></input>
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
    )
}


export default PostForm;