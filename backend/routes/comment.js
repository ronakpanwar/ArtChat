const {Router} = require("express");
const Comment = require('../modules/comment');
const { identifyUser } = require("../midlewers/identifyUser");


const router = Router();

router.get('/post-comment/:postId' , identifyUser , async(req,res)=>{
    const comment = await Comment.find({postId:req.params.postId}).populate('userId');
    res.json(comment);
})

router.post('/:postId' , identifyUser , async(req,res)=>{
    const comment = await Comment.create({
        userId:req.user.id,
        postId:req.params.postId,
        message:req.body.message
    });
    res.json(comment);
})


module.exports = router;