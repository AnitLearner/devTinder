const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type : String
    },
    lastName:{
        type : String
    },
    emailId:{
        type : String,
        
    },
    password:{
        type : String
    },
    age:{
        type : Number
    },
    gender:{
        type : String
    }

});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a model from the schema
userSchema.methods.getJWT = async function () {
    const user = this;
   const token = await jwt.sign({ _id: this._id }, "DEV_TINDER",{ expiresIn : '7d'});
    return token;
}
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};
const User = mongoose.model('User', userSchema);
module.exports = User;