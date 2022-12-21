import React, { useContext, useEffect, useState } from 'react'
import { API } from '../backend';
import { userContext } from '../contexts/userContext'
import Base from '../core/Base'
import ImageHelper from '../core/helper/ImageHelper';

const UserDashboard = () => {
  
  
  const [data,setData] = useState(null);

  const {user} = useContext(userContext);
   
  let _id;
  
  if(user){
    _id = user._id
  }

  // let data;

  const datafunc = async()=>{
       
    
       const middle = await fetch(`${API}/order/getorders`,{
         body:JSON.stringify({_id:_id}),
         headers: {
          Accept: "application/json",
          "Content-type": "application/json"
         },
         method:'POST'
      });


      const temp = await middle.json();
       
      setData(temp)
  }

  useEffect(()=>{
    
    datafunc();
    
  }, []);
  
  
  return (
    <Base title='UserDashboard Page'>
    <h1>Your Orders</h1>
    <div className="row mb-2 ">
    {
      
      
      data!==null && data.map((d,index)=>{
       
         return d.products.map((t,i2)=>{

          return (<div className="col-md-5 ml-5 " key={i2}>
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
               
              
               <div className="col-12 d-lg-block">
               <ImageHelper  product={t}/>
              </div>
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{t.name}</h3>
                <div className="mb-1">qty:{t.quantity}</div>
                <div className="mb-1">Price:{t.price}</div>
                <div className='mb-1'>Deliver to</div>
                <h6 className="card-text mb-auto">
                  Name: {d.address.name}<br />
                  Address: {d.address.address}
                  </h6>
              </div>
              
            </div>
          </div>)
         })
          

          })
    }
    </div>
    </Base>
  );
  
}

export default UserDashboard;