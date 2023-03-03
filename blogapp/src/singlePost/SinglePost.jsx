import './SinglePost.css'
import { useLocation } from 'react-router-dom';
import { useState ,useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context/Context';
export default function SinglePost() {

    const location  = useLocation();
    const path = location.pathname.split("/")[2];  // it is post id
    const [post, setPosts] = useState({})
    const PF = "http://localhost:5000/images/"
const {user} = useContext(Context)
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [updateMode, setUpdateMode] = useState(false);

    useEffect(()=>{
        const getPost = async()=>{
            const res = await axios.get("/posts/" + path)
            setPosts(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    },[path])
    const handledelete=async()=>{
        try{
            await axios.delete(`/posts/${post._id}`,{
                data:{username:user.username},})
            window.location.replace("/");  // to go at home page
        } catch(err){}
        
    }

    const handleupdate = async ()=>{

        try{
            await axios.put(`/posts/${post._id}`,{
                username:user.username,
                title,
                desc,
            })
            setUpdateMode(false)  // to go at home page
        } catch(err){}

    }
  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {post.photo && (
            <img className='singlePostImg' src={PF +post.photo} alt =""/> )}
            { updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>{setTitle(e.target.value)}}/> : (
                <h1 className="singlePostTitle">
                
                {title}
            {post.username=== user?.username &&(         // if usernames r same then we can see update & del btns
            <div className="singlePostEdit">
            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>{setUpdateMode(true)}}></i>
            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handledelete}></i>            
            </div>
            )}
            </h1>
            )}
            
            <div className="singlePostInfo">
                <span className='singlePostAuthor'> Author:<Link to={`/?user=${post.username}`} className="link"> <b> {post.username}</b></Link></span>
                <span className='singlePostDate'>{new Date (post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e)=>{setDesc(e.target.value)}}/> : (<p className='singlePostDesc'>{desc}</p>) }
            {updateMode && (<button className="singlepostbutton" onClick={handleupdate}>Update</button>)}
            
            
        </div>
    
    </div>
  )
}
