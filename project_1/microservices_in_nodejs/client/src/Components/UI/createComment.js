import React from "react";
import {useRef} from "react";
import axios from 'axios';

const CreateComment = (props) => {
    const commentRef = useRef();

    const formSubmitHandler = async (event) => {
        event.preventDefault()
        console.log("hello");
        await axios.post("http://localhost:4001/posts/"+props.id+"/comments",
        {
            "comment" : commentRef.current.value
        })
        commentRef.current.value = "";
    }

    return <form onSubmit={formSubmitHandler}>
        <div className="form-group">
            <label>Comments</label>
            <input className="form-control" ref={commentRef}></input>
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
}

export default CreateComment;