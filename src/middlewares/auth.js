// const adminAuth = (req,res,next) => {
//     console.log("Admin Auth is getting checked");
//     const token = "xyza";
//     const authtoken = token === 'xyz';
//     if (!authtoken) {
//         console.log("Admin Auth failed");
//         res.status(401).send("Unauthorized");
//     }
//     else {
//        next();
//     }
// }
// const userAuth = (req,res,next) => {
//     console.log("User Auth is getting checked");
//     const token = 'abc';
//     const usertoken = token === 'abc';
//     if (!usertoken) {
//         console.log("User Auth failed");
//         res.status(401).send("Unauthorized");
//     }
//     else {
//        next();
//     }
// }
// module.exports = {
//     adminAuth,
//     userAuth
// }
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
    // Read the token from req
    // Validate it
    // Find the user 
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token not found");
    }
    const decodedObj = await jwt.verify(token,"DEV_TINDER");
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        return res.status(401).send("User not found");
    }
    next();
}
catch(err){
    res.status(400).send("Error: " + err.message);
}
}