const express = require('express');
const requestRouter = express.Router();
module.exports = requestRouter;
const mongoose = require("mongoose");

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