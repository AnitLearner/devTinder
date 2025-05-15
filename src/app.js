 const express = require('express');

 const app = express();
// Request Handler Listening to the request

app.get("/home",(req,res) => {
    console.log('Request received');
    res.send('Hello!');
});

app.post("/home",(req,res) => {
    console.log('Data received');
    res.send('Hello Duniya!');
});

app.use("/test",(req,res) => {
    console.log('Request received');
    res.send('Hello, World Kya baat hai Helloo!');
});

 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
