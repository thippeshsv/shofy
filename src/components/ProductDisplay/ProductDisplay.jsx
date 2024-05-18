import React, { useContext } from 'react'
import './productDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
// import { toastr } from 'react-redux-toastr'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify'

const ProductDisplay = (props) => {
    let {product} = props;
    let {addToCart} = useContext(ShopContext);
    // let notify = () => toast('Item Added to Cart')
    // (e)=>{e.preventDefault(); addToCart(product.id);return false;}
    let notify = () => {
       
    addToCart(product.id);
        toast.success('Item Added to Cart', {
          position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
        });
    
        return false;
      
    }

//     ,{
//       position: "top-right",
// autoClose: 5000,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light"
//     }

  return (
    <div className='productDisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productDisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">${product.old_price}</div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        Indulge in timeless elegance with our Floral Wrap Dress, a must-have addition to your wardrobe.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
               <div>S</div>
               <div>M</div>
               <div>L</div>
               <div>XL</div>
               <div>XXL</div>
            </div>
        </div>
        {/* (e)=>{e.preventDefault(); addToCart(product.id);return false;} */}
        <ToastContainer
        containerId="A"
position="top-center"
autoClose={5000}
hideProgressBar={true}
newestOnTop={false}
// closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
        <button  onClick={notify}>ADD TO CART</button>
     
        <p className='productdisplay-right-category'>Category : <span>Women, T-Shirt, Crop Top</span> </p>
        <p className='productdisplay-right-category'>Tags : <span>Modern, Latest </span> </p>

      </div>
    </div>
  )
}

export default ProductDisplay
