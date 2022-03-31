const express= require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const catRouter = require("./routes/categories");
const multer=require("multer")


const app=express();



dotenv.config();
app.use(express.json())
 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
  
}).then (()=>{console .log("connected")})
  .catch((error)=>{console.log(error)})


const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }

})

const upload= multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded");
})



app.use("/api/auth",authRoute)
app.use("/api/user", userRoute)
app.use("/api/post",postRoute)
app.use("/api/cat",catRouter)

app.listen(5000,()=>{
    console.log("app is running")
})

