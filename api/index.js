const express =require('express'); 
const app = express();
const dotenv= require('dotenv')
const mongoose = require('mongoose')
const authroute = require('./routes/auth')
const userroute = require('./routes/Users')
const postroute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require("path")

dotenv.config();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    // useFindAndModify:true
})


// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser : true,
//     useUnifiedTopology: true,
//     // useFindAndModify:true
// }).then(console.log("Connected to mongoDB")).catch(err=>{
//     console.log(err)
// })




const storage = multer.diskStorage({   // Creating storage using multer
    destination:(req,file,cb)=>{        // initially our image 
        cb(null,"images");              // will go to images folder
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);           // and will be saved with this name
    }
});

const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{  // file is the "key" inb postman
    res.status(200).json("File has been uploaded")
})


app.use("/api/auth",authroute)
app.use("/api/Users",userroute)
app.use("/api/posts",postroute)
app.use("/api/categories",categoryRoute)

//Static files for deployment

app.use(express.static(path.join(__dirname,"./blogapp/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./blogapp/build/index.html"))
})

app.listen(process.env.PORT|| 5000)

// app.listen("5000",()=>{
//     console.log("Backend is running");
// })