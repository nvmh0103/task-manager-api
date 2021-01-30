// CRUD 

const mongodb= require('mongodb');
const MongoClient=mongodb.MongoClient;


const connectionURL='mongodb://127.0.0.1:27017';
const databaseName='task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error){
        return console.log('Cant connect to database');
    }
    const db=client.db(databaseName);

    // db.collection('users').updateOne({ 
    //     _id: new mongodb.ObjectID("6014dd77b95bb405ac85be55"),
    // }, {
    //     $inc: {
    //         age: 1,
    //     }
    // }).then( (result) => {
    //     console.log(result);
    // }).catch( (error) => {
    //     console.log(error);
    // })
    // db.collection('tasks').updateMany({
    //     completed: false,
    // },{
    //     $set: {
    //         completed: true,
    //     }
    // }).then( (result) => {
    //     console.log('Success');
    // }).then( (error) => {
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then( (result) => {
    //     console.log('sucess');
    // }).catch( (error) => {
    //     console.log(error);
    // })
    db.collection('tasks').deleteOne({
        description: 'clean house',
    }).then( (result) => {
        console.log('success');
    }).catch( (error) => {
        console.log(error);
    }) 
})
