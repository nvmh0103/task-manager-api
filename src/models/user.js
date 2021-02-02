const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userSchema= new mongoose.Schema({
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
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user= await User.findOne({ email });

    if (!user){
        throw new Error('Unable to login!');
    }
    const isMatch= await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

// hash password
userSchema.pre('save', async function(next) {
    const user=this;

    if (user.isModified('password')) {
        user.password= await bcrypt.hash(user.password,8);
    }

    next();
})

const User= mongoose.model( 'User', userSchema);

module.exports= User;
