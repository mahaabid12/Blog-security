const Post = require("../models/Post")
const { post } = require("./auth")

const router=require("express").Router()

//create a post 
router.post("/new",async(req,res)=>{
    try{

        const newPost= new Post({
            title:req.body.title, 
            desc:req.body.desc, 
            username:req.body.username, 
            categories: req.body.categories
        })
        await newPost.save()
        res.status(200).json(newPost)
    }catch(err){
        res.status(500).json(err)
    }

})


//update post
//we have to verify the username 
router.put("/:id",async (req,res)=>{
   try{
       const post= await Post.findById(req.params.id); 
       if(post.username===req.body.username){
           try{
               const updatedPost= await Post.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true})
               res.status(200).json(updatedPost)
           }catch(err){
               res.status(500).json(err)
           }
       }else{
           res.status(400).json("not your posts")
       }
   }catch(err){
       res.status(500).json(err)
   }
})

//delete
router.delete("/:id",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id); 
        if(post.username===req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id,{$set:req.body,},{new:true})
                res.status(200).json("Deleted post")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(400).json("not your posts")
        }
    }catch(err){
        res.status(500).json(err)
    }
 })

 //getPost

 router.get("/:id",async(req,res)=>{
     try{
         const post= await Post.findById(req.params.id)
         res.status(200).json(post)
     }catch(err){
         res.status(500).json(err)
     }

 })

 //getposts 
 router.get("/", async(req,res)=>{
     //?username=
     const username=req.query.user
     const category=req.query.cat 
     try{
         let posts
         if(username){
             posts= await Post.find({username})
         }else if(category){
             posts=await Post.find({categories:{$in:[catName ]},})
         }else{
             posts= await Post.find({})
         }
         res.status(200).json(posts)
     }catch(err){
         res.status(500).json(er)
     }
 })




 module.exports=router