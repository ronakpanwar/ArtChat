const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
    },
    like:{
        type:Boolean,
        default:'false'
    },
    date:{
        type:Date,
        default:Date.now,
    }
}, {timestamps:true});

const Like = mongoose.model("likes" , likeSchema);

module.exports = Like;
