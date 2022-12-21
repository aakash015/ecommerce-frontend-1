import React, { useEffect, useState } from 'react'
import { API } from '../backend';
import Base from '../core/Base'

const ManageOrders = () => {

  const [orders,setOrders] = useState(null);

  const orderFetch = async()=>{

     const middle = await fetch(`${API}/order/all`,{
       method:'GET',
      
    })
    
    const data = await middle.json();

      setOrders(data);
      // console.log(data);

  }

  useEffect(() => {
       
    orderFetch();
    
  }, []);

  return (
    
    <Base title='Welcome Admin!!!' description='Have a look at list of orders!!'>
     <div className="row mb-2 ">
    {
      orders.map((d)=>{
        <div className="col-md-4 box">
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">World</strong>
            <h3 className="mb-0">Featured post</h3>
            <div className="mb-1 text-muted">Nov 12</div>
            <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>

          </div>
          <div className="col-auto d-none d-lg-block">
            <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
  
          </div>
        </div>
      </div>
      })
     
  }
  </div>
    </Base>
    
  )
}

export default ManageOrders