import "./Topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
export default function Topbar() {
    const  PF= "http://localhost:5000/images/"
    const {user,dispatch} = useContext(Context);

    const handlelogout = ()=>{
        dispatch({type:"LOGOUT"})
    }
  return (
      <>
    <div className='top'>
        <div className="topleft">
            {/* < a className="link" href="https://www.facebook.com/shubham.renushe.14" target= "_blank">
                <i className="topIcon fa-brands fa-facebook"></i>
            </a>
             <a href="https://www.linkedin.com/in/shubham-renushe-4010a41b2/" target="blank"> 
             <i className="topIcon fa-brands fa-linkedin"></i>
             </a>
            <a href="https://www.snapchat.com/add/shubham_renushe" target="blank">
                <i className="topIcon fa-brands fa-snapchat"></i>
             </a> */}
                 <h2>Blogify</h2>  
        </div>

        <div className="topcenter">
            <ul className="topList">
                <li className="topListItem"><Link className="link" to ="/"> HOME </Link></li>
                {/* <li className="topListItem"> <Link className="link" to ="/about"> ABOUT </Link></li> */}
                <li className="topListItem"> <Link className="link" to ="/contact"> CONTACT </Link></li>
                <li className="topListItem"> <Link className="link" to ="/write"> WRITE </Link></li>
                
            

                <li className="topListItem" onClick={handlelogout}> {user && "LOGOUT"}</li>
            </ul>

        </div>
        { user ?  ( <> 
        <Link to ="/settings">   
            <img className="topImg" src={PF+ user.profilepic} alt="" />
            </Link>
            {/* <i className="TopSearchIcon fas fa-search"></i> */}
            </>
            )
         : (
            <ul className="topList">
                <li className="topListItem"><Link className="link" to ="/login"> LOGIN </Link></li>
                <li className="topListItem"><Link className="link" to ="/register"> REGISTER </Link></li>
            </ul>
        )}
         

    </div>

    </>
  )
}
