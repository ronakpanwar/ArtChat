const {Router} = require("express");
const Post = require('../modules/post');
const multer = require('multer');
const path = require('path');
const { identifyUser } = require("../midlewers/identifyUser");

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/postImages/`));
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename)
    }
  })            
  
  const upload = multer({ storage: storage } )

  router.get('/all-post' , identifyUser , async (req,res)=>{
    const data = await Post.find();
    res.json(data);
  })

  router.get('/user-post', identifyUser , async(req,res)=>{
    let userId = req.user.id;
    const data = await Post.find({user:userId});
    res.json(data);
  })

 
  router.post('/add' , identifyUser , async(req,res)=>{
    const {message , title} = req.body;
    const msg = await Post.create({
        message,
        user:req.user.id,
        title,
    })

    res.json({success:true});
  } )

  router.post('/add-post' , identifyUser ,upload.single('postImg') ,async (req,res)=>{
          const {message , title} = req.body ;
          const post = await Post.create({
            user:req.user.id,
            postImg:`/postImages/${req.file.filename}`,
            message,
            title,
          })
          
          res.json({success:true});

  })


module.exports = router;