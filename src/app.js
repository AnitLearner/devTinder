
 const express = require('express');
 const app = express();
 const connectdb = require('./config/database');
 const User = require('./models/user');
 const {validateSignUpData} = require('./utils/validation');
 const bcrypt = require('bcrypt');
 const cookieParser = require('cookie-parser');
 const {userAuth} = require('./middlewares/auth');
 const jwt = require('jsonwebtoken');

 app.use(express.json());
 app.use(cookieParser());

  // Middleware for authentication
 // Need to creat the login api
  app.post('/login', async (req, res)  => {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    else{
      res.send("Login successful");
    }
    
  });
 app.post('/signup', async(req,res) => {
  validateSignUpData(req);
  const {firstName, lastName, emailId} = req.body;
  const myPlaintextPassword = req.body.password;
  const passwordHash = await bcrypt.hash(myPlaintextPassword, 10 );
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
  try{
    await user.save();
    res.send("User created successfully");
  }
  catch(err){
    res.status(400).send("Error saving the user");
 }
}
)
 // Suppose we need to find from the database
 app.get('/user',userAuth,async (req,res) => {
  const email = req.body.emailId;
  const users = await User.find({});
  if (users.length > 0) {
    res.send(users);
  } else {
    res.status(404).send("User not found");
  }
 })
connectdb().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
}).catch((err) => {
    console.log("Database connection failed");
   
});
 
