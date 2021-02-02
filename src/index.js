const express=require('express');
require('./db/mongoose');
const taskRouter=require('./routers/task');
const userRouter= require('./routers/user');
const { ReplSet } = require('mongodb');
const { response } = require('express');
const app=express();
const port=process.env.port || 3000;


app.use(express.json()); 

// user routers
app.use(userRouter);

// task routers
app.use(taskRouter);

app.listen(port, () => {
    console.log('Success');
})

// const jwt=require('jsonwebtoken');

// // const bcrypt=require('bcryptjs');

// const myFunction= async() => {
//     const token=jwt.sign({ _id: 'abc123'}, 'thisisme', { expiresIn: '7 days'});
//     console.log(token);

//     const data=jwt.verify(token, 'thisisme');
//     console.log(data);
// }

// myFunction()