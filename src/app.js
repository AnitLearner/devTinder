 const express = require('express');

 const app = express();
// Request Handler Listening to the request
app.use("/test",(req,res) => {
    console.log('Request received');
    res.send('Hello, World Kya baat hai Helloo!');
});

 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
