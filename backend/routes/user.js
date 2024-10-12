const {Router} = require('express');
const User = require('../modules/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const { identifyUser } = require('../midlewers/identifyUser');
const JWT_TOKEN = "ARTCHAT-byRP";

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


router.post('/add-user' ,[
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
],async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name , email , password} = req.body;

    try {

        //  cheak if user exsists ?
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        
    //    Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

       user =await User.create({
            name,
            email,
            password:secPass
         })

         const data = {
            user: {
                id: user._id
            }
        };
      //   console.log(user._id);
         // Generate JWT token
         const authToken = jwt.sign(data, JWT_TOKEN);
         res.json({ success: true, authToken });
    
        
        
    } catch (error) {
        console.error(err.message);
        res.status(500).json('Internal server error');
    }

})


router.post('/login', [

    body('email', 'Enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists(),
 ], async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
       return res.status(400).json({ sucsess, errors: result.array() });
    }
 
    const { email, password } = req.body;
    try {
       let user = await User.findOne({ email });
       if (!user) {
          return res.status(400).json({ sucsess, errors: 'plese enter the correct Email' });
       }
 
       const passwordcode = await bcrypt.compare(password, user.password);
       if (!passwordcode) {
          return res.status(400).json({ sucsess, errors: 'plese enter the correct Password' });
       }
 
       const data = {
          user: {
             id: user._id
          }
       }
 
       const authToken = jwt.sign(data, JWT_TOKEN);
       
   
       res.json({ success:true, authToken })
 
    } catch (error) {
       console.error(error.message);
       res.status(500).json("internal server error");
    }
 
 })

 router.get('/profile' , identifyUser, async(req, res)=>{
    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.json(user);
     } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
     }
 })

 router.get('/profile/:id' , identifyUser ,async(req, res)=>{
   try {
      
      const user = await User.findById(req.params.id).select("-password");
      res.json(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
   }
 } )


router.post('/update', identifyUser, upload.single('img'), async (req, res) => {
   const { about } = req.body;
   const userId = req.user.id;

   try {
      const updateData = { about };

      if (req.file) {
         updateData.img = `/profileImages/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!user) {
         return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.json({ success: true, user });
   } catch (error) {
      res.status(500).json({ success: false, error: error.message });
   }
});



module.exports = router;