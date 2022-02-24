const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phone:
    {
        type:Number,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,
    }
    
})

const User = mongooose.model('USER', userSchema);

module.exports = User;