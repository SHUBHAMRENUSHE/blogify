import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import  './Settings.css'
import axios from 'axios'

export default function Settings() {
    const {user,dispatch}=useContext(Context)
    const  PF= "http://localhost:5000/images/"

    const [file,setfile]=useState(null)
    const [username,setUsername]=useState(null)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [success,setSuccess] = useState(false)

    const handlesubmit= async(e)=>{
        e.preventDefault()
        dispatch({type:"UPDATE_START"})
        const updatedUser={
            userId:user._id,
            username,
            email,
            password,
        };
        if(file){
            const data = new FormData();
            const filename=Date.now()+ file.name;
            data.append("name",filename)
            data.append("file",file)        // refer api/index.js
            updatedUser.profilepic= filename;
            try{
                await axios.post("/upload",data);
                
            } catch(err){}
        }
            try
            {
            const res= await axios.put("/users/"+user._id, updatedUser)
            setSuccess(true)
            dispatch({type:"UPDATE_SUCCESS",payload:res.data})

            } catch(err){dispatch({type:"UPDATE_FAILURE"})}
        
        // axios.post()
    }
  return (
    <div className='settings'>
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your account</span>
                {/* <span className="settingsDeleteTitle">Delete account account</span> */}
            </div>
            <form className="settingsForm" onSubmit={handlesubmit}>
                <label> Profile picture</label>
                <div className="settingsPP">
                
                    <img src={file? URL.createObjectURL(file) :PF+user.profilepic} alt=''/>
                </div>
                <label htmlFor='fileInput'>
                    <i className='settingsPPIcon far fa-user-circle'></i>
                    </label>    
                    <input type="file" id= "fileInput" style={{display: "none"}}
                    onChange={(e)=>setfile(e.target.files[0])}/>
                    <label> Username</label>
                    <input type="text" placeholder={user.username} onChange={(e)=>{setUsername(e.target.value)}} />
                    <label> E-mail</label>
                    <input type="email" placeholder={user.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label> Password</label>
                    <input type="password" placeholder={user.password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success && <span style={{color: 'green',textAlign:"center",marginTop:"20px"}}> Profile has been updated!</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}
