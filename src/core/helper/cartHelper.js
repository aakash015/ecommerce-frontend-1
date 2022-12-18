import { toast } from "react-toastify";
import { API } from "../../backend";



export const addItemToCart = async(item,cartItems,setCartItems,_id)=>{
    
  if(_id===undefined)
         return toast.warn("please Signin to continue");
        
         console.log("cartHelper")
         console.log(cartItems);
        
        const num = cartItems.filter(obj=>obj.product._id===item._id);
        // console.log("num here")
        // console.log(num);
        if(num.length>0 && num[0].quantity===num[0].product.stock)
         return toast.info('Sorry our stock for this product is over');

      //Todo: make a call here to push the object in array 
      //if there is same product in array the quantity of that must be updated and if there is no such 
      // product then item must be pushed with quantity 1
    try{  

      let object = {
        userid:_id,
        product:item._id,
        name:item.name,
        price:item.price
      }
    const middle = await fetch(`${API}/cart/addtocart`,{
       method:'POST',
       headers:{
        Accept:'application/json',
        "content-type":'application/json'
       },
       body:JSON.stringify(object)
     });

    const response = await middle.json();
     
    console.log("response from cartHelper")
    console.log(response);
    setCartItems(response.cart);

    // console.log(response);
  }
  catch(error){
     console.log("error");
  }  
      // console.log(item);
} 





export const removeItemFromCart = async(productId,setCartItems,userId)=>{
   

       console.log(userId);

       if(userId===undefined)
         return toast.warn("please Signin to continue");

      try{
        const middle = await fetch(`${API}/cart/removeitemfromcart`,{
          method:'PUT',
          headers:{
            Accept:'application/json',
            "content-type":'application/json'
          },
          body:JSON.stringify({_id:productId})
        });

        const response  = await middle.json();
        
        console.log("remove from cart response");
        console.log(response)
        setCartItems(response.cart);

      }
      catch(err){
         console.log("error")
      }

}


export const cartEmpty = next =>{

     if(typeof window!==undefined){
       localStorage.removeItem("cart");
       next();
     }
}

