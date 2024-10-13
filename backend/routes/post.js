const { Router } = require("express");
const Post = require('../modules/post');
const multer = require('multer');
const path = require('path');
const { identifyUser } = require("../midlewers/identifyUser");
const { getAllPost, getUserPost, addPostWithoutImg, addPostWithImg, likePost, unlikePost } = require("../controller/post.controller");

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

const upload = multer({ storage: storage })

router.get('/all-post', identifyUser, getAllPost)

router.get('/user-post', identifyUser, getUserPost)

router.post('/add', identifyUser, addPostWithoutImg)

router.post('/add-post', identifyUser, upload.single('postImg'), addPostWithImg)

router.post('/:postId/like' , identifyUser , likePost);

router.post('/:postId/unlike' , identifyUser , unlikePost)


module.exports = router;