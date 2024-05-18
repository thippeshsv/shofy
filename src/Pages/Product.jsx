import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrums from '../components/Breadcrums/Breadcrums'
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'
import Description from '../components/Description/Description'
import RelatedComponents from '../components/RelatedComponents/RelatedComponents'

const Product = () => {
  let {all_product} = useContext(ShopContext)
  let {productId} = useParams()
  let product = all_product.find((e)=>e.id===Number(productId) )
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <Description />
      <RelatedComponents/>
    </div>
  )
}

export default Product
