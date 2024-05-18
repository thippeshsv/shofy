import React, { useContext,useState } from 'react'
import './ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/items/item'


const ShopCategory = (props) => {
let {all_product} = useContext(ShopContext)
let [sortBy, setSortBy]= useState('')

let sortProducts =(criteria) =>{
  let sortedProducts = [...all_product]

  switch(criteria){
    case 'priceLowToHigh':
      sortedProducts.sort((a,b)=> a.new_price - b.new_price);
      break;
    case 'priceHighToLow':
      sortedProducts.sort((a,b)=> b.new_price - a.new_price);
      break;
    default:
      break;
  }
  return sortedProducts;
}

let handleSortToChange =(criteria)=>{
  setSortBy(criteria)
}

  return (
    <div className='shop-category'>
      <img className='shopCategory-banner' src={props.banner} alt="" />
    <div className="shopCategory-indexSort">
      <p>
        <span>Showing 1-12</span> out of 36 products
      </p>
      <div className="shopCategory-sort">
       
        <select value={sortBy} onChange={(e)=> handleSortToChange(e.target.value)} className='form-select'>
        <option value="">Sort by</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
        
      </div>
    </div>
    <div className="shopCategory-products">
      {sortProducts(sortBy).map((item, i)=> {
        if(props.category === item.category){
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        }
        else{
          return null
        }
      })}
    </div>
    <div className="shopCategory-loadMore">
      Explore more
    </div>
    </div>
  )
}

export default ShopCategory
