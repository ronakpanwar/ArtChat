const {Router} = require("express");
const Comment = require('../modules/comment');
const { identifyUser } = require("../midlewers/identifyUser");
const { addComment } = require("../controller/comment.controller");


const router = Router();

// router.get('/post-comment/:postId' , identifyUser , async(req,res)=>{
//     const comment = await Comment.find({postId:req.params.postId}).populate('userId');
//     res.json(comment);
// })

router.post('/:postId' , identifyUser , addComment)


module.exports = router;