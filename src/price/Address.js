import React, { useContext, useState } from 'react'
import { API } from '../backend';
import { userContext } from '../contexts/userContext'

const Address = () => {

  
  const [values,setValues] = useState({
    name:"",
    address:"",
    state:"",
    pincode:"",
    phonenumber:""
  })

  const {user,setUser} = useContext(userContext);
  
  const {name,address,state,pincode,phonenumber} = values;

  let _id;

  if(user)
  _id = user._id;



  const handleChange = (event,name)=>{
    setValues({...values,[name]: event.target.value})
    //[name] object key variable nhi ho sakti hai isliye hi ye syntax 
    //use kiya jaata hai 

  } 

  const handleSubmit = async()=>{
     
   try{ 
    const middle = await fetch(`${API}/address/add`,{
      method:'PUT',
      headers:{
        Accept:'application/json',
        "content-type":'application/json'
      },
      body:JSON.stringify({
        _id,
       address:values        
      })
    })

    const response = await middle.json();


       setUser(response)
       setValues({ name:"",
       address:"",
       state:"",
       pincode:"",
       phonenumber:""})

    
   }
   catch(error)
   {
      console.log(error);
   }

}
  return (
     <>
       
<button type="button" className="btn btn-primary ml-1" data-toggle="modal" data-target="#exampleModal">
 Add address 
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content" >
      <div className="modal-header bg-warning">
        <h5 className="modal-title" id="exampleModalLabel">Enter Address 🏠</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div className="form-group">
  <label for="exampleInputEmail1"><b>Full name (First and Last name)</b></label>
    <input type="text" className="form-control" value={name} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>handleChange(e,"name")}/>
  </div>
  <div className="form-group">
  <label for="exampleFormControlTextarea1"><b>Address Details</b></label>
    <textarea type='' className="form-control" value={address} id="exampleInputPassword1" placeholder="Apartment,unit,building,floor,etc."  onChange={(e)=>handleChange(e,"address")}></textarea>
  </div>
 
  <div className="form-group">
  <label for="exampleInputEmail1"><b>State / Province / Region</b></label>
    <input type="text" className="form-control" value={state} id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"state")}/>
  </div>

  <div className="form-group">
    <div className='row'>
       <div className='col-sm-6'>
       <label for="exampleInputEmail1"><b>PIN Code</b></label>
       <input type="number" className="form-control" value={pincode} id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"pincode")}/>
       </div>
       <div className='col-sm-6'>
       <label for="exampleInputEmail1"><b>Phone number</b></label>
       <input type="number" className="form-control" value={phonenumber} id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"phonenumber")}/>
       </div>
    </div>
  </div>

</form>

      </div>
      <div className="modal-footer">
        <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
</div>

     </>
  )
}

export default Address