const {Router} = require('express');
const User = require('../modules/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { identifyUser } = require('../midlewers/identifyUser');
const { register, login, takeProfileById, updateProfile, logout } = require('../controller/user.controller');


const router = Router();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.resolve(`./public/profileImages/`));
   },
   filename: function (req, file, cb) {
     const filename = `${Date.now()}-${file.originalname}`;
     cb(null, filename)
   }
 })            
 
 const upload = multer({ storage: storage } );


router.post('/add-user' , register)
router.post('/login' , login)

//  router.get('/profile' , identifyUser, async(req, res)=>{
//     try {
//         let userid = req.id;
//         const user = await User.findById(userid).select("-password");
//         res.json(user);
//      } catch (error) {
//         console.error(error.message);
//         res.status(500).send("internal server error");
//      }
//  })

 router.get('/profile/:id' , identifyUser , takeProfileById )


router.post('/update', identifyUser, upload.single('img'), updateProfile);

router.get('/logout'  , logout)



module.exports = router;