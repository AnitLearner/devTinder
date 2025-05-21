const express = require('express');
const authRouter = express.Router();

const {validateSignUpData} = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post('/signup', async(req,res) => {
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

authRouter.post('/login', async (req, res)  => {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }
    const isMatch = user.validatePassword(password);

    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }
    else{
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true
      });
      res.send(user);
    }
    
  });

authRouter.post('/logout', async (req, res) => {
    res.clearCookie("token");
    res.send("Logout successful");
  });
module.exports = authRouter;