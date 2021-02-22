const express=require('express');
require('./db/mongoose');
const taskRouter=require('./routers/task');
const userRouter= require('./routers/user');
const { ReplSet } = require('mongodb');
const { response } = require('express');
const app=express();
const port=process.env.PORT;


app.use(express.json()); 

// user routers
app.use(userRouter);

// task routers
app.use(taskRouter);


app.listen(port, () => {
    console.log('Success');
})