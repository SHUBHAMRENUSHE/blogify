import './Sidebar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Sidebar() {

  const [cats,setcats] = useState([])

  useEffect(()=>{
    const getcats = async ()=>{
      const res = await axios.get("/categories")
      setcats(res.data)
    }
    getcats()
  },[])

  return (
    <>
    <div className='sidebar'>
        <div className="sidebarItem">
          <div className="sidebarTitle"> ABOUT OWNER</div>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className='abtimg' width="250" height="180" alt=''/>
            <p style={{textAlign:'center'}}>Myself Shubham Renushe pursuing bachelor's degree from RAIT  </p>
        </div>

        <div className="sidebarItem">
          {/* <div className="sidebartitle"> CATAGORIES</div>
            <ul className='sidebarList'>
              {cats.map((c)=>(
                <Link to= {`/?cat=${c.name}`} className= "link">
                <li className='sidebarListItem'> {c.name} </li>
                </Link>
              ))}
              
            </ul> */}
          </div> 

          <div className="sidebarItem">
          <div className="sidebarTitle"> FOLLOW US</div>
              <div className="sidebarSocial">
              < a className="link" href="https://www.facebook.com/shubham.renushe.14" target= "_blank">
                <i className="topIcon fa-brands fa-facebook"></i>
            </a>
             <a href="https://www.linkedin.com/in/shubham-renushe-4010a41b2/" target="blank"> 
             <i className="topIcon fa-brands fa-linkedin"></i>
             </a>
            <a href="https://www.snapchat.com/add/shubham_renushe" target="blank">
                <i className="topIcon fa-brands fa-snapchat"></i>
             </a>
              </div>
          </div>

    </div>
    </>
  )
}
