const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require("axios");

const app = express()
const bodyParser = require('body-parser');

// Moderation Service

app.use(bodyParser.json()); 
app.use(cors());


app.post("/events",async (req,res) => {
    console.log(req.body.type+ " type event is received in moderation service");
    const {type,data} = req.body
    if(type == 'CommentCreated'){
        if(data.comment.includes ('orange')){
            data.status = "rejected"
        }else{
            data.status = 'approved'
        }
        
        await axios.post("http://event-bus-srv:5000/events",{
            "type" : "CommentModerated",
            "data" : data
        }).catch((err)=>{
            console.log(err.message);
        });
    }
})


app.listen(4003,()=>{
    console.log("listening at port 4003");
})