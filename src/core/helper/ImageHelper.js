import React from 'react'
import { API } from '../../backend'



const ImageHelper = ({product}) => {

  // console.log(product)
  return (
    <div className="rounded p-2">
    <img
      
      src={product?`${API}/product/photo/${product._id}`:'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"'}
      alt="."
      style={{ maxHeight: "200px", maxWidth: "100%", filter:product.stock===0?"grayscale(100%)":""}}
      className="mb-3 rounded img-fluid"
    />
  </div>
  )
}

export default ImageHelper