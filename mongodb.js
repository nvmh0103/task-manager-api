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

    // db.collection('users').insertOne({
    //     name: 'somebody',
    //     age: 27,
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Cant insert user');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'me',
    //         age: 20,
    //     },
    //     {
    //         name: 'another',
    //         age: 27,
    //     }

    // ], (error, result) => {
    //     if (error){
    //         console.log('Cant insert');
    //     }

    //     console.log(result.ops);
    // })

    db.collection('tasks').insertMany([
        {
            description: 'clean house',
            completed: false,
        },
        {
            description: 'sleep',
            completed: true,
        },
        {
            description: 'cooking',
            completed: false,
        }
    ], (error, result) => {
        if (error){
            return console.log('Cant insert into tasks');
        }

        console.log(result.ops);
    })
});
