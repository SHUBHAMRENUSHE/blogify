import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './Write.css'

export default function Write() {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setfile]=useState(null)
    const {user} = useContext(Context)

    const handlesubmit= async(e)=>{
        e.preventDefault()
        const newpost={
            username:user.username,
            title,
            desc
        };
        if(file){
            const data = new FormData();
            const filename=Date.now()+ file.name;
            data.append("name",filename)
            data.append("file",file)        // refer api/index.js
            newpost.photo= filename;
            try{
                await axios.post("/upload",data);
            } catch(err){}
        }
            try
            {
            const res= await axios.post("/posts",newpost)
            window.location.replace("/post/"+ res.data._id);
            // window.location.replace("/");

            } catch(err){}
        
        // axios.post()
    }
  return (
    <div className='write'>
        {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt=''/>)}
        <form className="writeForm" onSubmit={handlesubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className='writeIcon fas fa-plus'></i>
                </label>
                <input type="file" id='fileInput' style={{display: "none"}}  onChange={(e)=>setfile(e.target.files[0])}/>
                <input type= "text" placeholder='Title' className='writeInput' autoFocus = {true}  onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your story...' type = "text" className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)} ></textarea>
            </div>
            <button className='writeSubmit' type='submit'> Publish</button>
        </form>
    </div>
  );
}
