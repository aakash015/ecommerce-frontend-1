import { API } from "../../backend";
//API MEANS : http://localhost:3100/api/




export const signup = async (user)=>{

    try {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
}



export const signin = async (user)=>{
  try {
    
    let response = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    });
    response = await response.json();
    return response;
  } catch (err) {
    return console.log(err);
  }
}


export const authenticate = (data,setUser)=>{
  if(typeof window!=="undefined"){

    setUser({
      ...data
    })
  }

}


export const signout = async (setUser,next)=>{

    if(typeof window!=="undefined"){ //window object defines an open window in the browser
     setUser(null)
           
      try {
         await fetch(`${API}/signout`, {
          method: "GET"
        });
        next();
        // return console.log("signout success");
      } catch (err) {
        return console.log(err);
      }
      
      
 }
}


