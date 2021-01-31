const mongoose=require('mongoose');
const validator=require('validator');


const User= mongoose.model( 'User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be positive');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!');
            }
        }
    },
    
    password: {
        type: String,
        trim:true,
        required:true,
        validate (value) {
            if (value.length <= 6) {
                throw new Error('Length must be greater than 6!');
            }
            if (value.toLowerCase().includes('password')) {
                throw new Error('Cant contain password!');
            }
        }
    },
})

// const me= new User({
//     name: 'me2',
//     email: 'me2@gmail.COM',
//     password: 'minhhoang13   ',
// })
// me.save().then( (me) => {
//     console.log(me);
// }).catch( (error) => {
//     console.log(error);
// })
module.exports= User;
