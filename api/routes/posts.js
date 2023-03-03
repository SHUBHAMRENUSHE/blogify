const router = require('express').Router();
const Post =require('../models/Post');
const User = require("../models/User");

//CREATE POST

router.post("/", async (req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)

    }catch (err){
        res.send(500).json(err)
    }
});

//UPDATE POST

router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username===req.body.username){
            const updatedpost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body,},{new:true});
            res.status(200).json("post updated")
        }else{
            res.status(401).json("You can update only your post")
        }

    }catch (err){
        res.status(500).json(err)
    }
});

// DELETE POST

router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username===req.body.username){
            try{
                await post.delete()
                res.status(200).json("post deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("You can delete only your post")
        }

    }catch (err){
        res.status(500).json(err)
    }
});


// FIND POST
router.get("/:id",async(req,res)=>{
    try{
        const post_to_find = await Post.findById(req.params.id);
        res.status(200).json(post_to_find)
    }
    catch (err){
        res.status(500).json(err)

    }
})


//GET ALL POSTS

router.get("/",async(req,res)=>{
    const username = req.query.user
    const catname = req.query.cat
    try{
        let posts
        if (username){
            posts = await Post.find({username:username})
        }else if (catname){
            posts = await Post.find({
                categories:{
                    $in:[catname],
                },
            })

        } else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
        
    }
    catch (err){
        res.status(500).json(err)

    }
})

module.exports= router