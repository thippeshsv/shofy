import React from 'react'
import Slider from '../components/Slider/Slider'
import Popular from '../components/popular/Popular'
import NewCollection from '../components/NewCollection/NewCollection'
import AdminProducts from '../components/AdminProducts/AdminProdcuts'


const Shop = () => {
  return (
    <div>
      <Slider/>
      <Popular/>
      <NewCollection/>
      <AdminProducts/>
  
    </div>
  )
}

export default Shop
