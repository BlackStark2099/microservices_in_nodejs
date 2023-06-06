const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require("axios");
const app = express()
const bodyParser = require('body-parser');
// Comments Service


const commentsById = {}
app.use(bodyParser.json()); 
app.use(cors());

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments',async (req,res) => {
    let comments = commentsById[req.params.id] || [];
    const id = randomBytes(4).toString('hex');
    const data = {
        'post_id' : req.params.id,
        'comment_id' : id,
        'status' : 'pending',
        'comment' : req.body['comment']
    }
    comments.push(
        data
    )
    commentsById[req.params.id] = comments
    await axios.post("http://event-bus-srv:5000/events",{
        "type": "CommentCreated",
        "data" : data
    }).catch((err) => {
        console.log(err.message);
    })


    
    res.status(200).send(comments);
});


app.post("/events", async (req,res)=>{
    console.log(req.body.type+ " type event is received in comments service");
    const {type , data } = req.body;
    
    if(type === "CommentModerated"){
        const comments = commentsById[data.post_id];
        tempComment = comments.find(comment => {
            return comment.comment_id === data.comment_id;
        })
        tempComment.status = data.status; 
        commentsById[data.post_id] = comments;
        await axios.post("http://event-bus-srv:5000/events",{
            "type" : "CommentUpdated",
            "data" : data
        }).catch((err)=>{
            console.log(err.message);
        });
    }
    res.status(200).send({"status" : "Success"});
})


app.listen(4001,()=>{
    console.log("listening at port 4001")
});

