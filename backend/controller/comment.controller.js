const Comment = require('../modules/comment');
const Post = require('../modules/post');

const addComment =  async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(400).json({
                success:false,
                message:"Post not availabale.."
            })
        }
   
        const comment = await Comment.create({
            userId:req.id,
            postId:req.params.postId,
            message:req.body.message
        });
        

         post.comments.push(comment._id);
         await post.save();

        res.status(201).json({
            success:true ,
            message:"Comment Successfully...."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
  
}



module.exports = {
    addComment
}