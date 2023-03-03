import { Link } from 'react-router-dom'
import './Login.css'
import { useContext, useRef } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const{dispatch,isFetching}= useContext(Context)

  const handlesubmit = async(e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"})

    try{
      const res = await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
          
      dispatch({type: "LOGIN_SUCCESS",payload:res.data});
    } catch(err){
      dispatch({type: "LOGIN_FAILURE"})
    };
    
  } 
  // console.log(user);   //   contains res.data
  return (
    <div className='login'>
        <form className="loginForm" onSubmit={handlesubmit} >
            <span className='loginTitle'> Login </span>
            <label>Username </label>
            <input type="text" 
              placeholder='Enter username' 
              className='loginInput'
              ref={userRef}/>
            <label>Password </label>
            <input type="password"
              placeholder='Enter Password'
              className='loginInput'
              ref={passwordRef}/>
            <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
        </form> 
        <button className="loginRegisterButton" type='submit'>
            <Link className='link' to="/register"> REGISTER</Link>
        </button>   
    </div>
  )
}
