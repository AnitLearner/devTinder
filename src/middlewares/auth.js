const adminAuth = (req,res,next) => {
    console.log("Admin Auth is getting checked");
    const token = "xyza";
    const authtoken = token === 'xyz';
    if (!authtoken) {
        console.log("Admin Auth failed");
        res.status(401).send("Unauthorized");
    }
    else {
       next();
    }
}
const userAuth = (req,res,next) => {
    console.log("User Auth is getting checked");
    const token = 'abc';
    const usertoken = token === 'abc';
    if (!usertoken) {
        console.log("User Auth failed");
        res.status(401).send("Unauthorized");
    }
    else {
       next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}