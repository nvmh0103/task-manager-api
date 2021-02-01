const mongoose=require('mongoose');
const validator=require('validator');

mongoose.connect( 'mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})


// const Tasks=new Task({
    
// })
// Tasks.save().then( (task) =>{
//     console.log(task);
// }).catch( (error) => {
//     console.log(error);
// })
