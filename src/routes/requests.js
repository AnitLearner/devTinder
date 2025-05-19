const express = require('express');
const requestRouter = express.Router();
module.exports = requestRouter;

const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req,res,next) => { 
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = [
            'ignored',
            'interested'
        ]
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Invalid status");
        }

        // If there is an exiting Connection Request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ],
            fromUserId,
            toUserId
        });
        if(existingConnectionRequest){
            return res.status(400).send("Connection request already exists");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request sent successfully",
            data,
        })
    }
    catch(err){
        res.status(400).send('ERROR:' + err.message);
    }
}
);
requestRouter.post('/request/review/:status/:requestId', userAuth, async (req,res,next) => {
   try{
    const loggedInUser = req.user;
    const requestId = req.params.requestId;
    const status = req.params.status;
    const allowedStatus = [
        'accepted',
        'rejected'
    ]
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid status");
    }
    const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:'interested'
    })
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({
        message: 'Connection request ' + status + ' successfully',
    })
   }
   catch(err){
    res.status(400).send('ERROR:' + err.message);
   }
    

});