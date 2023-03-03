const router = require('express').Router();
const User =require('../models/User');
const Post =require('../models/Post');
const bcrypt = require('bcrypt')

//UPDATE

router.put("/:id", async (req,res)=>{
    if (req.body.userId=== req.params.id){      // checking body id and url id is same or not
        if(req.body.password){                  //if password then hash it
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {  //finding id and updating
            $set:req.body                                                   // updating whatever is in the body
        },{new:true});
        res.status(200).json(updatedUser)

    } catch(err){
        res.status(500).json(err)

    }
    } else{
       res.send("You can update only your account!") 
    }
});

//Delete

router.delete("/:id", async (req,res)=>{
    if (req.body.userId=== req.params.id){      // checking body id and url id is same or not    
    
        try{ 
            const user = await User.findById(req.params.id);
            if (user) {
        try{ 
            await Post.deleteMany({username:user.username})
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")

    } catch(err){
        res.status(500).json(err)

    }
    } else{ 
        res.status(404).json("User not found");
}
} catch(err){
    res.status(500).json(err);
}
    }
else{
       res.send("You can delete only your account!") 
    }
});


router.get("/:id",async(req,res)=>{
    try{
        const user_to_find = await User.findById(req.params.id);
        const {password , ...others } = user_to_find._doc
        res.status(200).json(others)
    }
    catch (err){
        res.status(500).json(err)

    }
})

module.exports= router