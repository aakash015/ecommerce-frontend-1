import React, { useContext, useState } from 'react'
import { API } from './backend';
import { userContext } from './contexts/userContext'

const EditAddress = ({index}) => {


  
  const {user,setUser} = useContext(userContext);
  // const [toggle,setToggle]= useState(false);

  let _id;
  
  if(user){
    _id = user._id;
  }

  let addressArr  = user.address;

  
  const [values,setValues] = useState({
    name:"",
    address:"",
    state:"",
    pincode:"",
    phonenumber:""
  })


  const addressFill = () => {
       
   
    const addressArr = user.address;

   
    document.getElementById('name').value = addressArr[index].name;
    document.getElementById('address').value = addressArr[index].address;
    document.getElementById('state').value = addressArr[index].state;
    document.getElementById('pincode').value = addressArr[index].pincode;
    document.getElementById('phonenumber').value = addressArr[index].phonenumber;

  }

  

  const handleChange = (event,name)=>{
    setValues({...values,[name]: event.target.value})
    //[name] object key variable nhi ho sakti hai isliye hi ye syntax 
    //use kiya jaata hai 

  } 
  const {name,address,state,pincode,phonenumber} = values;
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

const form = ()=>{
 return  <form>
<div className="form-group">
<label for="exampleInputEmail1"><b>Full name (First and Last name)</b></label>
  <input type="text" className="form-control" value={name} id="name" aria-describedby="emailHelp" onChange={(e)=>handleChange(e,"name")}/>
</div>
<div className="form-group">
<label for="exampleFormControlTextarea1"><b>Address Details</b></label>
  <textarea type='' className="form-control" value={address} id="address" placeholder="Apartment,unit,building,floor,etc."  onChange={(e)=>handleChange(e,"address")}></textarea>
</div>

<div className="form-group">
<label for="exampleInputEmail1"><b>State / Province / Region</b></label>
  <input type="text" className="form-control" value={state} id="state" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"state")}/>
</div>

<div className="form-group">
  <div className='row'>
     <div className='col-sm-6'>
     <label for="exampleInputEmail1"><b>PIN Code</b></label>
     <input type="number" className="form-control" value={pincode} id="pincode" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"pincode")}/>
     </div>
     <div className='col-sm-6'>
     <label for="exampleInputEmail1"><b>Phone number</b></label>
     <input type="number" className="form-control" value={phonenumber} id="phonenumber" aria-describedby="emailHelp"  onChange={(e)=>handleChange(e,"phonenumber")}/>
     </div>
  </div>
</div>

</form>
}

  return (
    <>
    <button type="button" className="btn btn-primary ml-1" onClick={addressFill} id = "editAddress" data-toggle="modal" data-target="#editModal">
      Edit address 
    </button>

<div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
<div className="modal-dialog" role="document">
  <div className="modal-content" >
    <div className="modal-header bg-warning">
      <h5 className="modal-title" id="exampleModalLabel">Enter Address 🏠</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
     {form()}
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

export default EditAddress