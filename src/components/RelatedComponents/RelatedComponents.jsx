import React from 'react'
import './relatedproducts.css'
import data_product from '../Assets/data'
import Item from '../items/item'

const RelatedComponents = () => {
  return (
    <div className='relatedProdcuts'>
      <h1>Related Products</h1>
      <hr/>
      <duv className="relatedproducts-item">
{data_product.map((item,i)=>{
    return <Item  key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
})}
      </duv>
    </div>
  )
}

export default RelatedComponents
