const express = require('express');
const {randomBytes} = require('crypto');
const axios = require("axios");
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');


const posts = {};
app.use(bodyParser.json()); 
app.use(cors());
app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post("/posts",async (req,res) => {
    
    const id = randomBytes(4).toString('hex');
    const data = {
        'id' : id,
        'title' : req.body['title']
    };
    posts[id] = data;
    

    await axios.post("http://event-bus-srv:5000/events",{
        "type": "PostCreated",
        "data" : data
    }).catch((err) => {
        console.log(err.message);
    })

    console.log("added a post");
    res.status(200).send(posts[id]);
});


app.post("/events",(req,res)=>{
    console.log(req.body.type+ " type event is received in posts service");
    res.status(200).send({"status" : "Success"});
});



app.listen(4000,()=>{
    console.log("listening at port 4000")
})