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

// const bcrypt=require('bcryptjs');

// const myFunction= async() => {
//     const password = 'Me1230!';
//     const hashedPassword= await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare('me1230!',hashedPassword);
//     console.log(isMatch);
// }

// myFunction()