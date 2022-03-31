const router= require("express").Router()
const bcrypt= require("bcrypt")
const Post = require("../models/Post")
const User = require("../models/User")


//update
router.put("/:id",async(req,res)=>{
//not saving another user it is the same user
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password,10)
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true} )

          res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }

    }else {
        res.status(400).json("please verify your id")
    }}
  



)

//delete 

router.delete("/:id",async(req,res)=>{
    if(req.body.userId===req.params.id){
        try{
        user= await User.findById(req.params.id)
           try{
              await Post.deleteMany({username:user.username})
              await User.findByIdAndDelete(req.params.id)
           }catch(err){
           res.status(500).json(err)}}
        catch(err){
           res.status(400).json("user not found")
       }
}else{res.status(400).json("you can only update your account ")}
})


router.get("/:id",async(req,res)=>{
    try{
    const user= await  User.findById(req.params.id)
    const {password,...others}=user._doc
    res.status(200).json(others)
    }catch(err){
     res.status(400).json(err)
    }


})

module.exports=router

