
 const express = require('express');
 const app = express();
 const connectdb = require('./config/database');
 const User = require('./models/user');
 app.use(express.json());
 app.post('/signup',async (req,res) => {
  console.log(req.body);
    
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully");
 })
connectdb().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
}).catch((err) => {
    console.log("Database connection failed");
   
});
 
