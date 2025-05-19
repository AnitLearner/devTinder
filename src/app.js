
 const express = require('express');
 const app = express();
 const connectdb = require('./config/database');
 const cookieParser = require('cookie-parser');
 

 app.use(express.json());
 app.use(cookieParser());

 const authRouter = require('./routes/auth');
 const profileRouter = require('./routes/profile'); 
 const requestRouter = require('./routes/requests');
 const userRouter = require('./routes/user');
 app.use('/', authRouter);
 app.use('/', profileRouter);
 app.use('/', requestRouter);
 app.use('/', userRouter);

 
 


connectdb().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });
}).catch((err) => {
    console.log("Database connection failed");
   
});
 
