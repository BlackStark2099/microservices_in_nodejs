const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require("axios");
const app = express()
const bodyParser = require('body-parser');


// Comments Service


const posts = {}
app.use(bodyParser.json()); 
app.use(cors());

app.post("/events",(req,res)=>{
    console.log(req.body.type+ " type event is received in query service");
    if(req.body.type === "PostCreated"){
        posts[req.body.data.id] = {
            'id' : req.body.data.id,
            'comments' : [],
            'title' : req.body.data.title
        }
    }else if(req.body.type === "CommentCreated"){
        posts[req.body.data.post_id].comments.push(req.body.data)
    }
    else if(req.body.type === "CommentUpdated"){
        const comment = posts[req.body.data.post_id].comments.find((comment) => {
            return comment.comment_id === req.body.data.comment_id;
        });
        comment.status = req.body.data.status; 
    }

    res.status(200).send({"status" : "Success"});
})

app.get("/get_all_posts",(req,res) => {
    res.status(200).send(posts);
});

app.listen(4002,()=>{
    console.log("listening at port 4002")
});

