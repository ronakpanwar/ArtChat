const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
      type:String,
      required:true,
    },
    img:{
        type:String,
        default:null,
    },
    email:{
       type:String,
       required:true,
       unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        default:null,
    },
    date:{
        type:Date,
        default:Date.now
    },

}, {timestamps:true});


const User = mongoose.model( "users", userSchema );

module.exports = User ;