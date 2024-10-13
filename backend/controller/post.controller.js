const Post = require('../modules/post');
const multer = require('multer');
const path = require('path');
const { identifyUser } = require("../midlewers/identifyUser");

const getAllPost = async (req, res) => {
    try {
        const data = await Post.find().populate({
            path:'comments',
            populate:({
                path:"userId",
                model: 'users'
            })
        });
        res.status(201).json({
            success: true,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}


const getUserPost = async (req, res) => {
    try {
        let userId = req.id;
        const data = await Post.find({ user: userId }).populate({path:'comments'
            , populate:({
             path:"userId",
             model: 'users'
            })
        });
        if (!data) {
            return res.json({ message: "You have no post" })
        }
        res.status(201).json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

const addPostWithoutImg = async (req, res) => {
    try {
        const { message, title , background} = req.body;
        
        const msg = await Post.create({
            message,
            user: req.id,
            title,
            background
        })
        res.status(201).json({ success: true
            ,message:"Post Add successfully.."
         });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }



}



const addPostWithImg = async (req,res)=>{
    try {
        const {message , title} = req.body ;
        const post = await Post.create({
          user:req.id,
          postImg:`/postImages/${req.file.filename}`,
          message,
          title,
        })
        
        res.status(201).json({success:true});
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
  
}


const likePost = async(req, res)=>{
    try {
        const postId = req.params.postId;   
        const userId = req.id; 
        const post = await Post.findById(postId);


        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }


        if (post.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: "You already liked this post" });
        }

      
        post.likes.push(userId);
        await post.save();

        return res.status(200).json({ success: true, message: "Post liked successfully", likes: post.likes.length });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


const unlikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.id;  

        const post = await Post.findById(postId);


        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }


        if (!post.likes.includes(userId)) {
            return res.status(400).json({ success: false, message: "You haven't liked this post" });
        }


        post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        await post.save();

        return res.status(200).json({ success: true, message: "Post unliked successfully", likes: post.likes.length });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};



module.exports = {
    getAllPost,
    getUserPost,
    addPostWithoutImg,
   addPostWithImg,
   likePost,
   unlikePost
}