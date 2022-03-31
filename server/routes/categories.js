const Category = require("../models/Category")

const router= require("express").Router()

//create a new category 
router.post("/",async(req,res)=>{
    const newCat= new Category(req.body)
    try{
        await newCat.save()
        res.status(200).json(newCat)
    }catch(err){
        res.status(500).json(err)
    }
})

//get all the categories 
router.get("/",async(req,res)=>{
    try{
        const cats=await Category.find({})
        res.status(200).json(cats)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router