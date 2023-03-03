import './Home.css'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import { useState,useEffect } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom'

export default function Home() {

  const [posts,setPosts]=useState([])
  const {search} = useLocation()      // if we want to see specific user's all posts
                                      // in search goes the name of the user

  useEffect(()=>{
    const fetchposts = async()=>{
      const res = await axios.get("/posts"+ search)
      setPosts(res.data);
    }
    fetchposts()
  },[search])

  return (
    <>
    <Header/>
    <div className='home'>
    <Posts posts = {posts}/>
        <Sidebar/>
        
        
    </div>
    </>
  )
}

