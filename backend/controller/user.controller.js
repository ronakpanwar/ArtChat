const User = require('../modules/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


 const register = async (req, res)=>{


    const {name , email , password} = req.body;
    if(!name || !email || !password){
        return res.status(401).json({
            success:false ,
            message:'Somthing is missing....'
        })
    }

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

       
      //   console.log(user._id);
         // Generate JWT token
         
       return  res.status(201).json({ success: true, 
            message:"Account is created"
          });
    
        
        
    } catch (error) {
        console.error(err.message); 
        res.status(500).json('Internal server error');
    }

}


const login = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
       return res.status(400).json({ sucsess:false, errors: result.array() });
    }
 
    const { email, password } = req.body;
    try {
       let user = await User.findOne({ email });
       if (!user) {
          return res.status(400).json({ sucsess:false, errors: 'plese enter the correct Email' });
       }
 
       const passwordcode = await bcrypt.compare(password, user.password);
       if (!passwordcode) {
          return res.status(400).json({ sucsess:false, errors: 'plese enter the correct Password' });
       }
 
       const data = {
          userId:user._id
       }
 
       const authToken = jwt.sign(data, process.env.JWT_TOKEN);
       
   
       return res.status(201).cookie('token',authToken , {maxAge:1*24*60*60*1000 , sameSite:'strict'}).json({
         message:`wellcome back ${user.name}..`,
         user,
         success:true
       })
 
    } catch (error) {
       console.error(error.message);
       res.status(500).json("internal server error");
    }
 
 }



 const takeProfileById = async(req, res)=>{
    try {
       
       const user = await User.findById(req.params.id).select("-password");
       res.status(201).json(user);
    } catch (error) {
       console.error(error.message);
       res.status(500).send("internal server error");
    }
  }


const updateProfile = async (req, res) => {
    const { about,name } = req.body;
    const userId = req.id;
 
    try {
       const updateData = { about , name};
 
    //    if (req.file) {
    //       updateData.img = `/profileImages/${req.file.filename}`;
    //    }
 
       const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
 
       if (!user) {
          return res.status(404).json({ success:false, error: 'User not found' });
       }
 
       res.status(201).json({ success: true, user });
    } catch (error) {
       res.status(500).json({ success:false, error: error.message });
    }
 }  


module.exports = {
    register,
    login ,
    takeProfileById,
    updateProfile
}