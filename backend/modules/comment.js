const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
    },
    message:{
        type:String,

    },
    date:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true});

const Comment = mongoose.model('comments' , commentSchema);

module.exports = Comment;