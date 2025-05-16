
 const express = require('express');
 
const {adminAuth, userAuth} = require('./middlewares/auth.js');
 const app = express();

app.use("/admin",adminAuth);
app.get
('/admin/allData', (req, res) => {
    res.send('Hello, Admin!');
});


 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
