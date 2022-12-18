import React, { useContext, useEffect } from "react";
import {Route,Redirect} from "react-router-dom"
import { userContext } from "../../contexts/userContext";


const PrivateRoutes = ({Component,...props})=>{

   const {user} =  useContext(userContext)
    
   
   
   
   return(
      user?(<Route
      render={ () => 
       <Component  {...props}/>} />):
     (<Redirect to={{ pathname:"/signin"}}/>)
     )
       
}


export default PrivateRoutes;