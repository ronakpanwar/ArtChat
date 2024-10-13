const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    postImg:{
        type:String,
        default:null,
    },
    message:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    background:{
       type:String,
       default:"white",
       enum:["white","blue" , "red", "chex"]
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    }],
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'comments',
    }
    ],
    date:{
        type:Date,
        default:Date.now
    },

},{timestamps:true});

const Post = mongoose.model('posts' , postSchema);

module.exports = Post;