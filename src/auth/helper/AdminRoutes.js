import React, { useContext } from "react";
import {Route,Redirect} from "react-router-dom"
import { userContext } from "../../contexts/userContext";



const AdminRoutes = ({Component,...props})=>{

   const {user} = useContext(userContext)
   return(
    user&&user.role===1?(<Route
    render={ () => 
     <Component  {...props}/>} />):
   (<Redirect to={{ pathname:"/"}}/>)
   )
}


export default AdminRoutes;