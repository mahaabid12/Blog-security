const mongoose=require("mongoose")
const bcrypt= require("bcrypt")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String, 
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true
    }, 
    profilePic:{
        type:String, 
        default:""
    },
},    {timestamps:true})   




userSchema.pre('save', async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,10)
    }
})

module.exports=mongoose.model("User", userSchema)
