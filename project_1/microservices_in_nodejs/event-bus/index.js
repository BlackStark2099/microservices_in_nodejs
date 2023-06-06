const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");


app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;
  
  console.log(req.body.type+ " type event is received in events service");

  console.log("event received : ",event);

  axios.post("http://posts-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  
  res.send({ status: "OK" });
});

app.listen(5000, () => {
  console.log("listening at port 5000");
});
