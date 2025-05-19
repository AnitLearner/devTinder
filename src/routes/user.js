const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

// Get all the pending connection requests for the logged in user
userRouter.get('/user/requests/received', userAuth, async(req,res) => {
    try{
       const loggedInUser = req.user;
       const connectionRequests = await ConnectionRequest.find({
        toUserId : loggedInUser._id,
        status: 'interested'
       }).populate('fromUserId', ['firstName','lastName']);
       
       res.json({
        message: 'Data fetched Successfully',
        data : connectionRequests,
       })
    }
    catch(err){
        res.status(400).send('ERROR:' + err.message);
    }
})

// Now to see the user connection
userRouter.get('/user/connections',userAuth, async(req,res) => {
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
       $or : [
        {toUserId : loggedInUser._id, status:'accepted'},
        {
        fromUserId : loggedInUser._id,status : 'accepted'
        }
       ]
    }).populate('fromUserId', ['firstName','lastName']).populate('toUserId', ['firstName','lastName']);

const data = connections.map((row) => {
        if(row.fromUserId._id.toString()=== loggedInUser._id.toString()){
            return row.toUserId;
        }
         return row.fromUserId;
    });

    res.json({
        message: 'Data fetched Successfully',
        data : connections,
    })
})

userRouter.get('/user/feed',userAuth, async(req,res) => {
    try{
        // User should see all the user cards except
        // 0. his own card
        // 1. the users he has already connected with
        // 2. the users he has already sent connection requests to
        // 3. the users who have already sent him connection requests
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {
                    fromUserId : loggedInUser._id,
                },
                {
                    toUserId : loggedInUser._id,
                }
            ]
        }).select('fromUserId toUserId')
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })
        const users = await User.find({
            $and : [
           { _id : {
                $nin : Array.from(hideUserFromFeed)
            }},
            { _id : {
                $ne : loggedInUser._id
            }}
        ]
        }).select('firstName lastName');
        res.send(users);
    }
    catch(err){
        res.status(400).send('ERROR:' + err.message);
    }
})

module.exports = userRouter;