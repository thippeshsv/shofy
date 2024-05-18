import React,{useContext} from 'react'
import './item.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer, toast } from 'react-toastify';

const Item = (props) => {

let handleAddToCart = (e) =>{
  e.preventDefault()
  addToCart(props.id);
  toast.success('Item added to cart',{
    position: "top-right",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
  })
}



    const {addToCart} = useContext(ShopContext);
  return (
    
    <div className="item">
      <Link to={`/product/${props.id}`}> <img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
${props.new_price}
            </div>
            <div className="item-price-old">
${props.old_price}
            </div>
            {/*  */}
            <button onClick={handleAddToCart} className='btn btn-light rounded-0   btn-sm ms-5'>ADD TO CART</button>
   
        </div>
        
    </div>
  
  )
}

export default Item;