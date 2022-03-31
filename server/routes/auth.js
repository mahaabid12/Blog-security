const User = require("../models/User");
const bcrypt=require("bcrypt")

const router= require("express").Router(); 


//register
router.post("/register",async (req,res)=>{
    try{
     const newUser= new User({
         username:req.body.username, 
         email:req.body.email, 
         password:req.body.password

     })

     await newUser.save(); 
     res.status(200).json(newUser)


    }catch(err){
        res.status(500).json(err) 
    }

})


//login 
router.post("/login",async(req,res)=>{
    try{
    const user= await User.findOne({  username:req.body.username})

    //!user&& res.status('400')
    if(!user) {
        res.status(400).json("please verify your credentials ")
    }


    const validate = await bcrypt.compare(req.body.password, user.password)
    const {password,...others}=user._doc;



    if(validate){
        res.status(200).json(others)
    }else{
        res.status(400).json("please verify your credentials")
    }

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router;