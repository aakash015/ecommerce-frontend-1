import React from 'react'
import Menu from './Menu'
import {BsArrowRightCircle} from 'react-icons/bs' 
import './Base.css'
function Base({title="",description=""
,className="",src='',
image = false,
button = false,
children,
hidden = false
}) {

  return (
    <div>
        <Menu />
    
      
        <div  className='jumbotron jumbotron-fluid text-center' style={{backgroundImage:`url(${src})`,height:image===true?'300px':'200px'
        ,display:hidden?'none':'', backgroundColor:'black'
      }}>
          <h2 className='display-4 text-white' style={{fontWeight:'bold'}}>{title}</h2>
          {button && <button type='button' onClick={()=>{
             window.scrollTo({top:500,left:0,behavior:'smooth'})
          }} className='btn btn-outline-light mt-5 custom-jumbo-btn' style={{fontWeight:'bold',borderRadius:'20px'}}>VIEW PRODUCTS <BsArrowRightCircle /></button>}
          <p className='lead text-white'  style={{fontWeight:'bold'}}>{description}</p>
        </div>
         
            <div className={className}>
              {children}
            </div>
     

      
    </div>
  )
}

export default Base