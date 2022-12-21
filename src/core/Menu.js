import React, { useContext, useEffect } from 'react'
import {NavLink,withRouter} from "react-router-dom" 
import {signout } from '../auth/helper';
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillSetting, AiOutlineHome,AiOutlineLogin,AiOutlineLogout,AiOutlineUserAdd} from 'react-icons/ai'
import './Menu.css'
import {RiShoppingBag3Fill} from 'react-icons/ri'
import { userContext } from '../contexts/userContext';

function Menu({history}){

     const {user,setUser} = useContext(userContext);

     const cartFunction = ()=>{
          const mediaQuery = window.matchMedia('(min-width: 575px)')
          if(mediaQuery.matches)
          {
              
              document.getElementById('left-cart').style.display = 'none'
              document.getElementById('right-cart').style.display = 'block'
          }
          else{
              
               document.getElementById('left-cart').style.display = 'block'
               document.getElementById('right-cart').style.display = 'none'
          }
     }

    useEffect(() => {
     // console.log("i am useeffect")
     cartFunction()
     window.addEventListener('resize',cartFunction)
    }, []);
   

    

  
  return (
     
    <nav className='navbar navbar-expand-sm sticky-top custom-nav-back'>
<button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon text-white"><GiHamburgerMenu /></span>
  </button>

  <ul className="navbar-nav ml-auto">

<li className="nav-item" id='left-cart'>
       <NavLink className='nav-link' to="/cart" exact ><RiShoppingBag3Fill style={{marginBottom:'5px',fontSize:'25px'}}/>
       </NavLink>
       
</li>
</ul>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li  className="nav-item">
             <NavLink className='nav-link' to="/" exact activeClassName='myclass'><AiOutlineHome style={{marginBottom:'5px'}}/> Home</NavLink>
        </li>
       
       {user && user.role===0&&(
            <li className="nav-item">
            <NavLink className='nav-link' to="/user/dashboard" exact activeClassName='myclass'>Dashboard</NavLink>
            </li>
       )} 
        
        {user&&user.role===1 && (
        <li className="nav-item">
            <NavLink className='nav-link' to="/admin/dashboard" exact activeClassName='myclass'><AiFillSetting style={{marginBottom:'5px'}}/> A. Dashboard</NavLink>
        </li>
       )}
     {!user&&(
          <>
          <li className="nav-item">
               <NavLink className='nav-link' to="/signup" exact activeClassName='myclass'><AiOutlineUserAdd style={{marginBottom:'5px'}}/> Signup</NavLink>
          </li>
          
          <li className="nav-item">
               <NavLink className='nav-link' to="/signin" exact activeClassName='myclass'><AiOutlineLogin style={{marginBottom:'5px'}}/> Signin</NavLink>
          </li>
  
        </>
     )} 
      </ul>

<ul className="navbar-nav ml-auto">

     <li className="nav-item" id='right-cart'>
            <NavLink className='nav-link' to="/cart" exact ><RiShoppingBag3Fill style={{marginBottom:'5px',fontSize:'25px'}}/>
            </NavLink>
     </li>

       {user && ( 
       <li className="nav-item">
        <span className='nav-link text-warning'
         onClick={()=>signout(setUser,()=>{
             history.push("/")
         })}
        >
          <AiOutlineLogout style={{marginBottom:'5px'}}/>  Signout
        </span>      
        </li>)
       }

</ul>  
      </div>

    {/* {console.log('rendering done')}   */}
    </nav>
    
  )
}

export default withRouter(Menu); 
//withrouter is here to automatically pickup the routes using Links from routes.js 
//withrouter provides history prop to the component wrapped